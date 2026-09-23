import { getStore } from '@netlify/blobs';
import type { Context, Config } from '@netlify/functions';
import seed from '../../src/lib/catalog/seed.json';
import { catalogSchema } from '../../src/lib/catalog/model';

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
		if (request.method !== 'GET')
			return json({ error: 'El catálogo es solo de consulta.' }, 405, { Allow: 'GET' });
		try {
			const store = storeFactory({ name: storeName(context), consistency: 'strong' });
			const saved = await store.get('catalogo', { type: 'json' });
			const catalog = catalogSchema.parse(saved ?? seed);
			return json(catalog, 200, { 'Cache-Control': 'public, max-age=30, must-revalidate' });
		} catch (error) {
			console.error(
				'Catálogo: operación no completada',
				error instanceof Error ? error.name : 'Error'
			);
			return json(
				{
					error: 'No pudimos recuperar el catálogo. Intenta nuevamente.'
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
