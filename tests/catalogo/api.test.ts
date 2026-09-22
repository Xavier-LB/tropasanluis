import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';
import { createHandler } from '../../netlify/functions/catalogo';
import { contributionSchema } from '../../src/lib/catalog/model';
const url = 'https://tropasanluis.cl/.netlify/functions/catalogo';
const origin = new URL(url).origin;
const contribution = () => ({
	id: randomUUID(),
	type: 'sitio',
	siteId: '',
	name: 'Prueba sintética',
	region: 'Por confirmar',
	locality: '',
	capacity: null,
	areaHa: null,
	water: 'sin-datos',
	toilets: 'sin-datos',
	contact: '',
	sourceUrl: '',
	content: 'Registro sintético para probar el guardado privado.',
	contributor: 'Prueba',
	group: '',
	email: 'prueba@example.com',
	visitDate: null,
	visitStatus: 'realizado',
	people: null,
	shareVisit: false,
	permission: true,
	website: ''
});
function harness(write: 'normal' | 'missing' | 'different' = 'normal', failRead = false) {
	const stores = new Map<string, Map<string, unknown>>();
	const factory = ((o: { name: string }) => {
		if (!stores.has(o.name)) stores.set(o.name, new Map());
		const map = stores.get(o.name)!;
		return {
			get: async (k: string, options: { consistency?: string }) => {
				if (k.startsWith('pendientes/')) {
					assert.equal(options.consistency, 'strong');
					if (failRead) throw new Error('Lectura no disponible');
				}
				return map.get(k) ?? null;
			},
			setJSON: async (k: string, v: unknown, options: { onlyIfNew: boolean }) => {
				if (options.onlyIfNew && map.has(k)) return { modified: false };
				if (write === 'missing') return { modified: true };
				if (write === 'different') {
					map.set(k, { ...(v as object), content: 'Otro contenido privado' });
					return { modified: true };
				}
				map.set(k, structuredClone(v));
				return { modified: true };
			}
		};
	}) as unknown as typeof getStore;
	return { stores, handler: createHandler(factory) };
}
const context = { deploy: { context: 'production' } } as Context;
const post = (data: unknown, headers: Record<string, string> = {}) =>
	new Request(url, {
		method: 'POST',
		headers: { origin, 'Content-Type': 'application/json', ...headers },
		body: JSON.stringify(data)
	});
test('aporte se conserva privado, reintento idempotente y cambios de contenido no se pierden', async () => {
	const { handler, stores } = harness();
	const data = contribution();
	assert.equal((await handler(post(data), context)).status, 201);
	assert.equal((await handler(post(data), context)).status, 200);
	assert.equal(stores.get('sitios-aportes-v1')!.size, 1);
	assert.equal(
		(await handler(post({ ...data, content: 'Cambió el contenido' }), context)).status,
		409
	);
	const publicResponse = await handler(new Request(url), context);
	const text = await publicResponse.text();
	assert.equal(publicResponse.status, 200);
	assert.equal(text.includes(data.email), false);
	assert.equal(text.includes(data.name), false);
	const saved = stores.get('sitios-aportes-v1')!.get(`pendientes/${data.id}`) as { status: string };
	assert.equal(saved.status, 'pendiente');
});
test('modified=true no confirma recepción si la lectura falta, difiere o falla', async () => {
	const data = contribution();
	for (const [write, failRead] of [
		['missing', false],
		['different', false],
		['normal', true]
	] as const) {
		const { handler } = harness(write, failRead);
		const response = await handler(post(data), context);
		assert.equal(response.status, 503);
		const body = await response.text();
		assert.equal(body.includes(data.email), false);
		assert.equal(body.includes(data.content), false);
		assert.equal(body.includes('Otro contenido privado'), false);
		assert.equal(body.includes(data.id), false);
	}
});
test('SDK real: un PUT no-412 fallido no anuncia éxito y permite reintentar el mismo ID', async () => {
	let fail = true;
	let saved: unknown = null;
	const methods: string[] = [];
	const factory = ((options: { name: string }) =>
		getStore({
			...options,
			siteID: 'sitio-de-prueba',
			token: 'token-de-prueba',
			consistency: 'strong',
			edgeURL: 'https://cache.example',
			uncachedEdgeURL: 'https://strong.example',
			fetch: async (input, init) => {
				assert.equal(new URL(String(input)).origin, 'https://strong.example');
				methods.push(init!.method!);
				if (init!.method === 'put') {
					assert.equal(new Headers(init!.headers).get('if-none-match'), '*');
					if (fail) return new Response('Error privado del servicio', { status: 400 });
					if (saved) return new Response(null, { status: 412 });
					saved = JSON.parse(init!.body as string);
					return new Response(null, { status: 200 });
				}
				return saved ? Response.json(saved) : new Response(null, { status: 404 });
			}
		})) as typeof getStore;
	const handler = createHandler(factory);
	const data = contribution();
	const failed = await handler(post(data), context);
	assert.equal(failed.status, 503);
	assert.equal((await failed.text()).includes('Error privado del servicio'), false);
	assert.deepEqual(methods, ['put', 'get']);
	fail = false;
	assert.equal((await handler(post(data), context)).status, 201);
	assert.equal((await handler(post(data), context)).status, 200);
	assert.equal((saved as Record<string, unknown>).email, data.email);
});
test('reintentar tras perder la confirmación conserva el aporte y su revisión privada', async () => {
	const { handler, stores } = harness();
	const data = contribution();
	const first = await handler(post(data), context);
	assert.deepEqual(await first.json(), { id: data.id, status: 'pendiente' });
	const saved = stores.get('sitios-aportes-v1')!.get(`pendientes/${data.id}`) as Record<
		string,
		unknown
	>;
	saved.status = 'descartado';
	saved.reviewNote = 'Nota interna de revisión';
	const response = await handler(post(data), context);
	assert.equal(response.status, 200);
	assert.deepEqual(await response.json(), { id: data.id, status: 'pendiente' });
	assert.equal(saved.status, 'descartado');
	assert.equal(saved.reviewNote, 'Nota interna de revisión');
});
test('rechaza origen ajeno, métodos de administración, exceso de tamaño y campos no permitidos', async () => {
	const { handler, stores } = harness();
	assert.equal(
		(await handler(post(contribution(), { origin: 'https://otro.example' }), context)).status,
		403
	);
	assert.equal((await handler(new Request(url, { method: 'PUT' }), context)).status, 405);
	assert.equal(
		(await handler(post({ ...contribution(), content: 'a'.repeat(25000) }), context)).status,
		413
	);
	assert.equal(
		(await handler(post({ ...contribution(), status: 'publicado' }), context)).status,
		400
	);
	assert.equal((await handler(post({ ...contribution(), website: 'spam' }), context)).status, 400);
	assert.equal(stores.get('sitios-aportes-v1'), undefined);
});
test('preview usa almacenamiento separado y errores no anuncian recepción', async () => {
	const { handler, stores } = harness();
	assert.equal(
		(await handler(post(contribution()), { deploy: { context: 'deploy-preview' } } as Context))
			.status,
		201
	);
	assert.equal(stores.has('sitios-aportes-v1'), false);
	assert.equal(stores.get('sitios-aportes-preview-v1')!.size, 1);
	const failed = createHandler((() => {
		throw new Error('Sin conexión');
	}) as unknown as typeof getStore);
	assert.equal((await failed(post(contribution()), context)).status, 503);
	assert.equal(
		contributionSchema.safeParse({ ...contribution(), type: 'visita', visitDate: null }).success,
		false
	);
});
