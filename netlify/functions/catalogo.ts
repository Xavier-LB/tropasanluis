import { getStore } from '@netlify/blobs';
import type { Context, Config } from '@netlify/functions';
import seed from '../../src/lib/catalog/seed.json';
import { catalogSchema, contributionSchema } from '../../src/lib/catalog/model';

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
	new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff',
			...headers
		}
	});
const storeName = (context: Context) =>
	context.deploy.context === 'production' ? 'sitios-catalogo-v1' : 'sitios-catalogo-preview-v1';

export function createHandler(storeFactory: typeof getStore = getStore) {
	return async function handler(request: Request, context: Context) {
		try {
			const store = storeFactory({ name: storeName(context), consistency: 'strong' });
			if (request.method === 'GET') {
				const saved = await store.get('catalogo', { type: 'json' });
				const catalog = catalogSchema.parse(saved ?? seed);
				return json(catalog, 200, { 'Cache-Control': 'public, max-age=30, must-revalidate' });
			}
			if (request.method !== 'POST')
				return json({ error: 'Método no permitido.' }, 405, { Allow: 'GET, POST' });
			if (request.headers.get('origin') !== new URL(request.url).origin)
				return json({ error: 'Envía el aporte desde la página del catálogo.' }, 403);
			if (!request.headers.get('content-type')?.startsWith('application/json'))
				return json({ error: 'Formato no válido.' }, 415);
			if (Number(request.headers.get('content-length') || 0) > 24000)
				return json({ error: 'El aporte es demasiado largo.' }, 413);
			const raw = await request.text();
			if (new TextEncoder().encode(raw).byteLength > 24000)
				return json({ error: 'El aporte es demasiado largo.' }, 413);
			let input: unknown;
			try {
				input = JSON.parse(raw);
			} catch {
				return json({ error: 'El aporte no es válido.' }, 400);
			}
			const parsed = contributionSchema.safeParse(input);
			if (!parsed.success)
				return json(
					{
						error: parsed.error.issues
							.map((i) => i.message)
							.slice(0, 3)
							.join(' ')
					},
					400
				);
			const data = parsed.data;
			if (data.website) return json({ error: 'No se pudo procesar el aporte.' }, 400);
			const submissions = storeFactory({
				name:
					context.deploy.context === 'production'
						? 'sitios-aportes-v1'
						: 'sitios-aportes-preview-v1',
				consistency: 'strong'
			});
			const key = `pendientes/${data.id}`;
			const result = await submissions.setJSON(
				key,
				{ ...data, receivedAt: new Date().toISOString(), status: 'pendiente', reviewNote: '' },
				{ onlyIfNew: true }
			);
			// Blobs puede informar modified=true ante un error no-412: confirmar siempre la lectura.
			const previous = (await submissions.get(key, {
				type: 'json',
				consistency: 'strong'
			})) as Record<string, unknown> | null;
			if (!previous) throw new Error('Persistencia no confirmada');
			if (
				Object.entries(data).some(
					([field, value]) => JSON.stringify(previous[field]) !== JSON.stringify(value)
				)
			) {
				if (result.modified) throw new Error('Persistencia no confirmada');
				return json(
					{
						error:
							'Esta referencia ya fue recibida con otros datos. Abre un nuevo aporte para registrar cambios.'
					},
					409
				);
			}
			// El identificador del cliente evita duplicados por reintentos, sin devolver datos privados.
			return json({ id: data.id, status: 'pendiente' }, result.modified ? 201 : 200);
		} catch (error) {
			console.error(
				'Catálogo: operación no completada',
				error instanceof Error ? error.name : 'Error'
			);
			return json(
				{
					error:
						'No pudimos guardar o recuperar los datos. Intenta nuevamente; no borraremos tu borrador.'
				},
				503
			);
		}
	};
}
export default createHandler();
export const config: Config = {
	rateLimit: { windowLimit: 40, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
