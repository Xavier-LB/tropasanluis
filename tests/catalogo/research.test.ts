import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../../src/lib/catalog/seed';
import { catalogCsv } from '../../src/lib/catalog/export';
import { defaults, searchSites } from '../../src/lib/catalog/search';

const site = (id: string) => seed.sites.find((s) => s.id === id)!;

test('aforos históricos, discrepancias y agua no potable afectan los filtros', () => {
	const strict = {
		...defaults,
		tags: [],
		people: '60',
		water: 'si',
		toilets: 'si',
		unknown: false
	};
	const ids = searchSites(seed.sites, strict).map((r) => r.site.id);
	assert.ok(ids.includes('rucahue-conaripe'));
	assert.ok(!ids.includes('el-bosque-panguipulli'), '40 personas no alcanzan para 60');
	assert.ok(!ids.includes('somolafquen-coihueco'), 'agua no potable no pasa el filtro');
	assert.ok(!ids.includes('arena-y-sol-conaripe'), '120/125 permanece sin aforo normalizado');
	assert.ok(!ids.includes('refugio-del-guerrero'), '80/100 permanece sin aforo normalizado');
	assert.equal(site('nisoleufu').capacity, 250);
	assert.match(site('nisoleufu').capacityNote, /250–300/);
	assert.ok(
		!searchSites(seed.sites, { ...strict, people: '300' }).some((r) => r.site.id === 'nisoleufu')
	);
	assert.equal(site('nisoleufu').sources[0].sourceDate, '2023-12');
	assert.equal(site('nisoleufu').verifiedAt, null);
	assert.notEqual(site('inalafquen-traitraico').id, site('los-copihues-traitraico').id);
	assert.equal(site('laguna-esmeralda').areaHa, null, '11 ha de laguna no son 11 ha de terreno');
	assert.equal(site('lafken').capacity, null, '16 parcelas no determinan capacidad');
	assert.equal(site('lafken').toiletCount, 6);
});

test('rutas nuevas conservan fuente pública y no acreditan acceso de bus', () => {
	const sites = seed.sites.filter((s) => s.sources.some((r) => r.id === 'mapa-publico-sernatur'));
	assert.equal(sites.length, 17);
	for (const s of sites) {
		assert.equal(s.bus, 'sin-datos');
		assert.ok(s.sources.some((r) => r.url.includes('disfrutasantiago.cl')));
		assert.ok(s.distance!.roadKm! >= s.distance!.straightKm);
		assert.ok(s.distance!.sourceUrl.startsWith('https://router.project-osrm.org/'));
	}
});

test('CSV conserva acentos, separa campos y neutraliza fórmulas y teléfonos', () => {
	const example = structuredClone(site('rucahue-conaripe'));
	example.name = '=HYPERLINK("https://example.com");malicioso';
	example.notes = 'Primera línea; dato "citado"\nSegunda línea';
	const csv = catalogCsv([example]);
	assert.ok(csv.startsWith('\uFEFF"ID";"Lugar";"Región"'));
	assert.ok(csv.includes('"\'=HYPERLINK(""https://example.com"");malicioso"'));
	assert.ok(csv.includes('"\'+56985803840 | oriedemann@gmail.com"'));
	assert.ok(csv.includes('"Primera línea; dato ""citado""\nSegunda línea"'));
	assert.ok(csv.includes('2023-12'));
	assert.ok(csv.endsWith('\r\n'));
	assert.ok(csv.includes('"Sin datos"'));
});
