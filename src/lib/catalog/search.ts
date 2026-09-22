import type { Site } from './model';
export const normalize = (text: string) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim();
export type Filters = {
	q: string;
	region: string;
	people: string;
	maxDistance: string;
	distanceMode: string;
	minArea: string;
	maxArea: string;
	areaScope: string;
	water: string;
	toilets: string;
	kind: string;
	accommodation: string;
	environment: string;
	electricity: string;
	bus: string;
	tags: string[];
	unknown: boolean;
	sort: string;
};
export const defaults: Filters = {
	q: '',
	region: '',
	people: '',
	maxDistance: '',
	distanceMode: 'road',
	minArea: '',
	maxArea: '',
	areaScope: 'total',
	water: '',
	toilets: '',
	kind: '',
	accommodation: '',
	environment: '',
	electricity: '',
	bus: '',
	tags: [],
	unknown: true,
	sort: 'name'
};
export function readFilters(p: URLSearchParams): Filters {
	const f = { ...defaults, tags: p.getAll('tag') };
	for (const k of Object.keys(defaults) as (keyof Filters)[]) {
		if (k === 'tags' || k === 'unknown') continue;
		if (p.has(k)) (f[k] as string) = p.get(k)!.slice(0, 250);
	}
	f.unknown = p.get('unknown') !== '0';
	return f;
}
export function filtersQuery(f: Filters) {
	const p = new URLSearchParams();
	for (const k of Object.keys(defaults) as (keyof Filters)[]) {
		if (k === 'tags') {
			for (const t of f.tags) p.append('tag', t);
		} else if (k === 'unknown') {
			if (!f.unknown) p.set('unknown', '0');
		} else if (f[k] !== defaults[k] && f[k]) p.set(k, String(f[k]));
	}
	return p.toString();
}
const num = (v: string) =>
	v !== '' && Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : null;
export function matchSite(site: Site, f: Filters): { matches: boolean; pending: string[] } {
	const pending: string[] = [];
	if (
		f.q &&
		!normalize(
			[
				site.name,
				...site.aliases,
				site.region,
				site.commune,
				site.locality,
				site.description,
				...site.tags
			].join(' ')
		).includes(normalize(f.q))
	)
		return { matches: false, pending };
	if (f.region && site.region !== f.region) return { matches: false, pending };
	if (site.status === 'cerrado') return { matches: false, pending };
	if (f.accommodation && site.accommodation !== f.accommodation && site.accommodation !== 'mixto')
		return { matches: false, pending };
	if (f.kind && site.kind !== f.kind) {
		if (site.kind === 'por-confirmar') pending.push('tipo de lugar');
		else return { matches: false, pending };
	}
	const people = num(f.people);
	if (people) {
		if (site.accommodation === 'cabanas') return { matches: false, pending };
		if (site.capacity === null) pending.push('capacidad para acampar');
		else if (site.capacity < people) return { matches: false, pending };
	}
	const distance =
		f.distanceMode === 'straight' ? site.distance?.straightKm : site.distance?.roadKm;
	const maxDistance = num(f.maxDistance);
	if (maxDistance) {
		if (distance == null) pending.push('distancia');
		else if (distance > maxDistance) return { matches: false, pending };
	}
	const area = f.areaScope === 'camp' ? site.campAreaHa : site.areaHa;
	const minArea = num(f.minArea),
		maxArea = num(f.maxArea);
	if (minArea || maxArea) {
		if (area === null) pending.push('superficie');
		else if ((minArea && area < minArea) || (maxArea && area > maxArea))
			return { matches: false, pending };
	}
	for (const [field, label] of [
		['water', 'agua potable'],
		['toilets', 'baños'],
		['electricity', 'electricidad'],
		['bus', 'acceso de bus']
	] as const) {
		if (!f[field]) continue;
		const value = site[field];
		if (value === 'sin-datos' || value === 'en-construccion') {
			pending.push(value === 'en-construccion' ? 'baños operativos' : label);
		} else if (value !== f[field]) return { matches: false, pending };
	}
	if (f.environment && !site.environments.includes(f.environment as never))
		return { matches: false, pending };
	if (f.tags.some((t) => !site.tags.includes(t as never))) return { matches: false, pending };
	return { matches: f.unknown || pending.length === 0, pending };
}
export function searchSites(sites: Site[], f: Filters) {
	return sites
		.map((site) => ({ site, ...matchSite(site, f) }))
		.filter((x) => x.matches)
		.sort((a, b) => {
			if (a.pending.length === 0 && b.pending.length > 0) return -1;
			if (b.pending.length === 0 && a.pending.length > 0) return 1;
			const value = (s: Site) =>
				f.sort === 'distance'
					? f.distanceMode === 'straight'
						? s.distance?.straightKm
						: s.distance?.roadKm
					: f.sort === 'area'
						? f.areaScope === 'camp'
							? s.campAreaHa
							: s.areaHa
						: s.capacity;
			if (['distance', 'area', 'capacity'].includes(f.sort)) {
				const x = value(a.site),
					y = value(b.site);
				if (x == null && y != null) return 1;
				if (y == null && x != null) return -1;
				if (x != null && y != null && x !== y) return f.sort === 'distance' ? x - y : y - x;
			}
			if (f.sort === 'reviewed' && a.site.reviewedAt !== b.site.reviewedAt)
				return b.site.reviewedAt.localeCompare(a.site.reviewedAt);
			return a.site.name.localeCompare(b.site.name, 'es');
		});
}
export function candidates(sites: Site[], name: string, locality: string) {
	const words = normalize(name)
		.split(/\s+/)
		.filter((w) => w.length > 3 && !['camping', 'sitio', 'campamento', 'centro'].includes(w));
	return sites
		.filter(
			(s) =>
				words.some((w) => normalize(s.name + ' ' + s.aliases.join(' ')).includes(w)) ||
				(locality.length > 4 && normalize(s.locality) === normalize(locality))
		)
		.slice(0, 5);
}
export const stateLabel = (value: string) =>
	({
		si: 'Informado',
		no: 'No informado por la fuente',
		'sin-datos': 'Por confirmar',
		'en-construccion': 'En construcción'
	})[value] || value;
export const formatNumber = (n: number) =>
	new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 }).format(n);
