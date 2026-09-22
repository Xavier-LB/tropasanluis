import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../../src/lib/catalog/seed';
import { publish, restore, type Archive } from '../../scripts/catalogo/workflow';
function memory() {
	const data = new Map<string, unknown>();
	const archive: Archive = {
		get: async (k) => structuredClone(data.get(k) ?? null),
		put: async (k, v) => {
			data.set(k, structuredClone(v));
		}
	};
	return { data, archive };
}
test('publicación y restauración mantienen versiones completas y rechazan ediciones obsoletas', async () => {
	const { data, archive } = memory();
	const draft = structuredClone(seed);
	draft.sites[0].description = 'Cambio revisado de prueba';
	const published = await publish(archive, draft, seed);
	assert.notEqual(published.version, seed.version);
	assert.deepEqual(data.get(`versiones/${published.version}/antes`), seed);
	await assert.rejects(publish(archive, draft, seed), /cambió/);
	const restored = await restore(
		archive,
		`versiones/${published.version}/antes`,
		published.version,
		seed
	);
	assert.deepEqual(restored.sites, seed.sites);
	assert.deepEqual(restored.visits, seed.visits);
	assert.deepEqual(data.get(`versiones/${restored.version}/antes`), published);
});
test('una falla de respaldo no reemplaza el catálogo publicado', async () => {
	const { data, archive } = memory();
	data.set('catalogo', seed);
	const broken: Archive = {
		get: archive.get,
		put: async () => {
			throw new Error('Sin conexión');
		}
	};
	await assert.rejects(publish(broken, seed, seed), /Sin conexión/);
	assert.deepEqual(data.get('catalogo'), seed);
});
test('detecta otra publicación entre el respaldo y la escritura', async () => {
	const { data, archive } = memory();
	let reads = 0;
	const racing: Archive = {
		put: archive.put,
		get: async (key) => {
			if (key === 'catalogo' && ++reads === 2) return { ...seed, version: 'otra-version' };
			return archive.get(key);
		}
	};
	await assert.rejects(publish(racing, seed, seed), /Otra revisión/);
	assert.equal(data.has('catalogo'), false);
	assert.equal(data.size, 2);
});
