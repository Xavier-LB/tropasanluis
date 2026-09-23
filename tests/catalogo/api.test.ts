import test from 'node:test';
import assert from 'node:assert/strict';
import type { Context } from '@netlify/functions';
import type { getStore } from '@netlify/blobs';
import { createHandler } from '../../netlify/functions/catalogo';
import seed from '../../src/lib/catalog/seed';

const url = 'https://tropasanluis.cl/.netlify/functions/catalogo';
const context = { deploy: { context: 'production' } } as Context;

test('el catálogo rechaza nuevos envíos antes de acceder al almacenamiento', async () => {
	let opened = 0;
	const handler = createHandler((() => {
		opened++;
		throw new Error('No debe abrir ningún almacén para escrituras');
	}) as unknown as typeof getStore);
	for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
		const response = await handler(
			new Request(url, {
				method,
				headers: { origin: new URL(url).origin, 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: 'sitio', name: 'Aporte desde una pestaña antigua' })
			}),
			context
		);
		assert.equal(response.status, 405);
		assert.equal(response.headers.get('allow'), 'GET');
		assert.match((await response.json()).error, /solo de consulta/);
	}
	assert.equal(opened, 0);
});

test('la consulta conserva el catálogo guardado y usa la semilla solo si no existe', async () => {
	const saved = { ...seed, version: 'catalogo-guardado' };
	for (const catalog of [null, saved]) {
		const handler = createHandler(((options: { name: string }) => {
			assert.equal(options.name, 'sitios-catalogo-v1');
			return {
				get: async (key: string) => {
					assert.equal(key, 'catalogo');
					return catalog;
				}
			};
		}) as unknown as typeof getStore);
		const response = await handler(new Request(url), context);
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), catalog ?? seed);
	}
});

test('preview consulta su propio catálogo y una falla no expone datos internos', async () => {
	const handler = createHandler(((options: { name: string }) => {
		assert.equal(options.name, 'sitios-catalogo-preview-v1');
		return { get: async () => null };
	}) as unknown as typeof getStore);
	const response = await handler(new Request(url), {
		deploy: { context: 'deploy-preview' }
	} as Context);
	assert.equal(response.status, 200);
	const failed = createHandler((() => {
		throw new Error('Detalle privado del almacenamiento');
	}) as unknown as typeof getStore);
	const error = await failed(new Request(url), context);
	assert.equal(error.status, 503);
	assert.equal((await error.text()).includes('Detalle privado'), false);
});
