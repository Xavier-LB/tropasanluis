import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../../src/lib/catalog/seed';
import { catalogSchema, partialDate, contactSchema, safeUrl } from '../../src/lib/catalog/model';
import {
	defaults,
	matchSite,
	searchSites,
	readFilters,
	filtersQuery
} from '../../src/lib/catalog/search';
const site = (id: string) => seed.sites.find((s) => s.id === id)!;
const filter = (patch: Partial<typeof defaults>) => ({ ...defaults, tags: [], ...patch });

test('la carga inicial conserva lugares, referencias únicas y estados históricos', () => {
	assert.equal(seed.sites.length, 30);
	assert.equal(seed.visits.length, 75);
	assert.equal(seed.visits.filter((v) => v.status === 'cancelado').length, 1);
	assert.ok(seed.visits.every((v) => v.siteId === null));
	const rows = seed.sites.flatMap((s) =>
		s.sources.filter((r) => r.type === 'archivo').map((r) => r.id)
	);
	assert.equal(rows.length, 33);
	assert.equal(new Set(rows).size, 33);
	assert.notEqual(site('tani-ruka').id, site('el-pantano').id);
});
test('capacidad de carpas: 60 y 300 califican; 400 supera la capacidad informada', () => {
	for (const people of ['60', '300'])
		assert.equal(matchSite(site('el-puquio'), filter({ people, unknown: false })).matches, true);
	assert.equal(matchSite(site('el-puquio'), filter({ people: '400' })).matches, false);
	assert.equal(matchSite(site('cabanas-asmar'), filter({ people: '60' })).matches, false);
	assert.equal(
		matchSite(site('quilches'), filter({ people: '60', unknown: false })).matches,
		false
	);
	assert.deepEqual(matchSite(site('quilches'), filter({ people: '60' })).pending, [
		'capacidad para acampar'
	]);
});
test('desconocido y baños en construcción no se anuncian como servicios disponibles', () => {
	const strict = filter({ water: 'si', toilets: 'si', unknown: false });
	assert.equal(matchSite(site('predio-san-fabian'), strict).matches, false);
	assert.ok(
		matchSite(site('predio-san-fabian'), { ...strict, unknown: true }).pending.includes(
			'baños operativos'
		)
	);
	assert.equal(matchSite(site('el-puquio'), strict).matches, true);
	assert.equal(matchSite(site('el-puquio'), { ...strict, electricity: 'si' }).matches, false);
});
test('superficies contradictorias y de acampada se conservan pendientes', () => {
	assert.equal(site('lafken').areaHa, null);
	assert.ok(site('lafken').observations.length >= 2);
	assert.equal(matchSite(site('lafken'), filter({ minArea: '20', unknown: false })).matches, false);
	assert.equal(
		matchSite(site('hacienda-los-hualles'), filter({ minArea: '200', unknown: false })).matches,
		true
	);
	assert.equal(
		matchSite(
			site('hacienda-los-hualles'),
			filter({ minArea: '200', areaScope: 'camp', unknown: false })
		).matches,
		false
	);
});
test('distancia por carretera no se sustituye silenciosamente por línea recta', () => {
	assert.equal(seed.sites.filter((s) => s.coordinates).length, 12);
	assert.equal(seed.sites.filter((s) => s.distance?.roadKm !== null && s.distance).length, 9);
	const s = site('lago-algormaz');
	assert.equal(matchSite(s, filter({ maxDistance: '2000', unknown: false })).matches, false);
	assert.equal(
		matchSite(s, filter({ maxDistance: '2000', distanceMode: 'straight', unknown: false })).matches,
		true
	);
});
test('filtros compartibles, búsqueda sin tildes, etiquetas y nulos al final', () => {
	const f = filter({
		q: 'Conaripe',
		people: '60',
		tags: ['Bosque', 'Sombra'],
		unknown: false,
		sort: 'distance',
		distanceMode: 'straight'
	});
	assert.deepEqual(readFilters(new URLSearchParams(filtersQuery(f))), f);
	assert.ok(searchSites(seed.sites, filter({ q: 'coñaripe' })).length > 0);
	assert.equal(searchSites(seed.sites, filter({ q: 'lugar-inexistente-xyz' })).length, 0);
	const sorted = searchSites(seed.sites, filter({ sort: 'capacity' }));
	assert.equal(sorted[0].site.id, 'el-puquio');
});
test('validación rechaza referencias rotas, campos privados y URLs ejecutables', () => {
	assert.equal(safeUrl.safeParse('javascript:alert(1)').success, false);
	assert.equal(safeUrl.safeParse('https://user:password@example.com').success, false);
	assert.equal(safeUrl.safeParse('https://example.com/galeria').success, true);
	assert.equal(partialDate.safeParse('2026-02-31').success, false);
	const invalid = structuredClone(seed);
	invalid.sites[0].fieldSources.water = ['inexistente'];
	assert.equal(catalogSchema.safeParse(invalid).success, false);
	assert.equal(catalogSchema.safeParse({ ...seed, email: 'privado@example.com' }).success, false);
	assert.equal(
		contactSchema.safeParse({
			name: 'Camping',
			role: 'Reservas',
			kind: 'telefono',
			value: '123',
			sourceId: 'web',
			public: true
		}).success,
		false
	);
});
