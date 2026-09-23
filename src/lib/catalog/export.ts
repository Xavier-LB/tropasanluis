import type { Site } from './model';

const state = (value: string) =>
	({ si: 'Sí', no: 'No', 'sin-datos': 'Sin datos', 'en-construccion': 'En construcción' })[value] ||
	value;
const number = (value: number | null | undefined) =>
	value == null ? '' : String(value).replace('.', ',');

// Comillas CSV no bastan para impedir que Excel ejecute una celda como fórmula.
const cell = (value: unknown) => {
	let text = String(value ?? '');
	if (/^[\s\u0000-\u001f]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
	return `"${text.replaceAll('"', '""')}"`;
};

export function catalogCsv(sites: Site[]): string {
	const columns = [
		'ID',
		'Lugar',
		'Región',
		'Comuna',
		'Localidad',
		'Alojamiento',
		'Tipo',
		'Personas en carpas',
		'Nota de capacidad',
		'Capacidad en alojamiento',
		'Ha totales',
		'Ha para acampar',
		'Nota de superficie',
		'Agua potable',
		'Baños',
		'Cantidad de baños',
		'Electricidad',
		'Acceso de bus',
		'Entorno',
		'Etiquetas',
		'Km por carretera desde Plaza de Armas',
		'Km en línea recta desde Plaza de Armas',
		'Método de distancia',
		'Contactos públicos',
		'Mapa',
		'Fotos',
		'Otros enlaces',
		'Fuentes y fechas',
		'Observaciones de las fuentes',
		'Notas',
		'Revisión documental',
		'Verificación en terreno',
		'Ficha'
	];
	const rows = sites.map((s) => [
		s.id,
		s.name,
		s.region,
		s.commune,
		s.locality,
		s.accommodation,
		s.kind,
		number(s.capacity),
		s.capacityNote,
		number(s.lodgingCapacity),
		number(s.areaHa),
		number(s.campAreaHa),
		s.areaNote,
		state(s.water),
		state(s.toilets),
		number(s.toiletCount),
		state(s.electricity),
		state(s.bus),
		s.environments.join(' | '),
		s.tags.join(' | '),
		number(s.distance?.roadKm),
		number(s.distance?.straightKm),
		s.distance?.method || '',
		s.contacts.map((c) => c.value).join(' | '),
		s.mapUrl,
		s.links
			.filter((l) => l.kind === 'fotos')
			.map((l) => l.url)
			.join(' | '),
		s.links
			.filter((l) => l.kind !== 'fotos')
			.map((l) => l.url)
			.join(' | '),
		s.sources
			.map((r) => `${r.title} (${r.sourceDate || 'sin fecha'}): ${r.url || r.locator}`)
			.join(' | '),
		s.observations.map((o) => `${o.field}: ${o.value} [${o.sourceId}]`).join(' | '),
		s.notes,
		s.reviewedAt,
		s.verifiedAt || '',
		`https://tropasanluis.cl/sitios/${s.id}`
	]);
	return '\uFEFF' + [columns, ...rows].map((row) => row.map(cell).join(';')).join('\r\n') + '\r\n';
}
