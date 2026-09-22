import { z } from 'zod';

export const REGIONS = [
	'Arica y Parinacota',
	'Tarapacá',
	'Antofagasta',
	'Atacama',
	'Coquimbo',
	'Valparaíso',
	'Metropolitana',
	'O’Higgins',
	'Maule',
	'Ñuble',
	'Biobío',
	'La Araucanía',
	'Los Ríos',
	'Los Lagos',
	'Aysén',
	'Magallanes',
	'Por confirmar'
] as const;
export const TAGS = [
	'Bosque',
	'Sombra',
	'Terreno plano',
	'Fogón',
	'Duchas',
	'Agua caliente',
	'Lavaderos',
	'Mesas y bancas',
	'Quincho',
	'Exclusividad',
	'Almacén',
	'Cabañas',
	'Senderos',
	'Señal telefónica',
	'Camino de tierra'
] as const;
export const ENVIRONMENTS = ['Río', 'Estero', 'Lago', 'Playa', 'Piscina'] as const;
export const YES_NO = ['si', 'no', 'sin-datos'] as const;
export const safeUrl = z
	.string()
	.max(1500)
	.refine(
		(v) =>
			!v ||
			(/^https?:\/\//i.test(v) &&
				(() => {
					try {
						const u = new URL(v);
						return !u.username && !u.password;
					} catch {
						return false;
					}
				})()),
		'Usa una dirección http o https válida.'
	);
const text = (max = 1000) => z.string().trim().max(max);
const count = z.number().int().min(1).max(1000000).nullable();
const area = z.number().positive().max(1000000).nullable();
const day = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/)
	.refine((v) => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v);
export const partialDate = z
	.string()
	.regex(/^\d{4}(-\d{2}(-\d{2})?)?$/)
	.refine(
		(v) =>
			!Number.isNaN(Date.parse(v)) &&
			(v.length < 10 || new Date(v).toISOString().slice(0, 10) === v),
		'Fecha inválida.'
	);
export const sourceSchema = z
	.object({
		id: text(150).min(1),
		title: text(180).min(1),
		locator: text(180),
		type: z.enum(['archivo', 'web', 'aporte', 'visita']),
		url: safeUrl,
		sourceDate: partialDate.nullable(),
		checkedAt: day,
		note: text(1500)
	})
	.strict();
export const contactSchema = z
	.object({
		name: text(100),
		role: text(100),
		kind: z.enum(['telefono', 'correo', 'web']),
		value: text(500).min(1),
		sourceId: text(150).min(1),
		public: z.literal(true)
	})
	.strict()
	.superRefine((c, ctx) => {
		if (c.kind === 'telefono' && !/^\+56[2-9]\d{8}$/.test(c.value))
			ctx.addIssue({
				code: 'custom',
				message: 'El teléfono público debe tener formato +56 y nueve dígitos.'
			});
		if (c.kind === 'correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value))
			ctx.addIssue({ code: 'custom', message: 'Correo inválido.' });
		if (c.kind === 'web' && !safeUrl.safeParse(c.value).success)
			ctx.addIssue({ code: 'custom', message: 'Enlace inválido.' });
	});
export const siteSchema = z
	.object({
		id: z
			.string()
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
			.max(100),
		name: text(150).min(2),
		aliases: z.array(text(150)).max(15),
		region: z.enum(REGIONS),
		commune: text(150),
		locality: text(200),
		description: text(2500),
		accommodation: z.enum(['carpas', 'cabanas', 'mixto', 'por-confirmar']),
		kind: z.enum(['rustico', 'equipado', 'mixto', 'por-confirmar']),
		capacity: count,
		capacityNote: text(500),
		lodgingCapacity: count,
		areaHa: area,
		campAreaHa: area,
		areaNote: text(500),
		water: z.enum(YES_NO),
		toilets: z.enum(['si', 'no', 'sin-datos', 'en-construccion']),
		toiletCount: count,
		electricity: z.enum(YES_NO),
		bus: z.enum(YES_NO),
		environments: z.array(z.enum(ENVIRONMENTS)).max(5),
		tags: z.array(z.enum(TAGS)).max(20),
		mapUrl: safeUrl,
		coordinates: z
			.object({
				lat: z.number().min(-90).max(90),
				lon: z.number().min(-180).max(180),
				precision: z.enum(['predio', 'aproximada']),
				sourceUrl: safeUrl
			})
			.strict()
			.nullable(),
		distance: z
			.object({
				roadKm: z.number().nonnegative().nullable(),
				straightKm: z.number().nonnegative(),
				origin: text(200),
				method: text(200),
				calculatedAt: day,
				sourceUrl: safeUrl
			})
			.strict()
			.nullable(),
		contacts: z.array(contactSchema).max(20),
		links: z
			.array(
				z
					.object({
						label: text(100),
						url: safeUrl,
						kind: z.enum(['web', 'fotos', 'publicacion', 'mapa'])
					})
					.strict()
			)
			.max(25),
		sources: z.array(sourceSchema).min(1).max(100),
		fieldSources: z.record(z.string(), z.array(z.string()).max(30)),
		observations: z
			.array(z.object({ field: text(100), value: text(1500), sourceId: text(150) }).strict())
			.max(100),
		notes: text(3000),
		reviewedAt: day,
		verifiedAt: day.nullable(),
		status: z.enum(['por-confirmar', 'informado', 'cerrado'])
	})
	.strict()
	.superRefine((s, ctx) => {
		const ids = new Set(s.sources.map((source) => source.id));
		if (ids.size !== s.sources.length)
			ctx.addIssue({ code: 'custom', message: 'Fuentes repetidas.' });
		for (const id of [
			...Object.values(s.fieldSources).flat(),
			...s.contacts.map((c) => c.sourceId),
			...s.observations.map((o) => o.sourceId)
		])
			if (!ids.has(id))
				ctx.addIssue({ code: 'custom', message: 'Hay una referencia a una fuente inexistente.' });
		if (s.campAreaHa !== null && s.areaHa !== null && s.campAreaHa > s.areaHa)
			ctx.addIssue({
				code: 'custom',
				message: 'La superficie de acampada no puede superar la superficie total.'
			});
	});
export type Site = z.infer<typeof siteSchema>;
export type Source = z.infer<typeof sourceSchema>;
export const visitSchema = z
	.object({
		id: text(100).min(1),
		siteId: text(100).nullable(),
		place: text(200),
		group: text(150).min(1),
		date: partialDate,
		status: z.enum(['realizado', 'exploracion', 'planificado', 'cancelado', 'por-confirmar']),
		people: count,
		notes: text(2500),
		sourceUrl: safeUrl,
		public: z.literal(true)
	})
	.strict();
export type Visit = z.infer<typeof visitSchema>;
export const catalogSchema = z
	.object({
		schemaVersion: z.literal(1),
		version: text(100),
		updatedAt: z.string(),
		sites: z.array(siteSchema).max(10000),
		visits: z.array(visitSchema).max(10000)
	})
	.strict()
	.superRefine((c, ctx) => {
		if (new Set(c.sites.map((s) => s.id)).size !== c.sites.length)
			ctx.addIssue({ code: 'custom', message: 'Identificadores de sitios repetidos.' });
		if (new Set(c.visits.map((s) => s.id)).size !== c.visits.length)
			ctx.addIssue({ code: 'custom', message: 'Identificadores de visitas repetidos.' });
		if (c.visits.some((v) => v.siteId !== null && !c.sites.some((s) => s.id === v.siteId)))
			ctx.addIssue({ code: 'custom', message: 'Visita asociada a un sitio inexistente.' });
	});
export type Catalog = z.infer<typeof catalogSchema>;
export const contributionSchema = z
	.object({
		id: z.string().uuid(),
		type: z.enum(['sitio', 'texto', 'correccion', 'visita']),
		siteId: text(100),
		name: text(150),
		region: text(100),
		locality: text(300),
		capacity: count,
		areaHa: area,
		water: z.enum(YES_NO),
		toilets: z.enum(['si', 'no', 'sin-datos', 'en-construccion']),
		contact: text(600),
		sourceUrl: safeUrl,
		content: text(12000),
		contributor: text(100).min(2),
		group: text(150),
		email: z.string().email().max(200),
		visitDate: partialDate.nullable(),
		visitStatus: z.enum(['realizado', 'exploracion', 'planificado', 'cancelado', 'por-confirmar']),
		people: count,
		shareVisit: z.boolean(),
		permission: z.literal(true),
		website: text(200)
	})
	.strict()
	.superRefine((c, ctx) => {
		if (!c.name && !c.siteId)
			ctx.addIssue({
				code: 'custom',
				message: 'Indica el nombre del lugar o elige uno existente.'
			});
		if (!c.content && !c.sourceUrl)
			ctx.addIssue({
				code: 'custom',
				message: 'Agrega una descripción o un enlace de referencia.'
			});
		if (c.type === 'visita' && !c.visitDate)
			ctx.addIssue({ code: 'custom', message: 'Indica al menos el año de la visita.' });
	});
export type Contribution = z.infer<typeof contributionSchema>;
export type Submission = Contribution & {
	receivedAt: string;
	status: 'pendiente' | 'publicado' | 'descartado';
	reviewNote: string;
	reviewedAt?: string;
};

export function emptySite(id: string, name: string, source: Source): Site {
	return {
		id,
		name,
		aliases: [],
		region: 'Por confirmar',
		commune: '',
		locality: '',
		description: '',
		accommodation: 'por-confirmar',
		kind: 'por-confirmar',
		capacity: null,
		capacityNote: '',
		lodgingCapacity: null,
		areaHa: null,
		campAreaHa: null,
		areaNote: '',
		water: 'sin-datos',
		toilets: 'sin-datos',
		toiletCount: null,
		electricity: 'sin-datos',
		bus: 'sin-datos',
		environments: [],
		tags: [],
		mapUrl: '',
		coordinates: null,
		distance: null,
		contacts: [],
		links: [],
		sources: [source],
		fieldSources: {},
		observations: [],
		notes: '',
		reviewedAt: new Date().toISOString().slice(0, 10),
		verifiedAt: null,
		status: 'por-confirmar'
	};
}
