import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { build } from 'esbuild';
import { compile, compileModule } from 'svelte/compiler';
import seed from '../../src/lib/catalog/seed';

// Cada prueba ejecuta componentes y el router/historial reales de SvelteKit en un DOM aislado.
const { JSDOM } = createRequire(import.meta.url)('jsdom');
const kit = resolve('node_modules/@sveltejs/kit/src/runtime');
let bundle: string;
const draftKey = 'tropa-sitios-aporte-v1';
const savedForm = {
	id: '11111111-1111-4111-8111-111111111111',
	type: 'correccion',
	siteId: seed.sites[0].id,
	name: 'Nombre corregido',
	region: 'Maule',
	locality: 'Localidad corregida',
	content: 'Corrección pendiente de envío',
	contributor: 'Revisión sintética',
	email: 'privado@example.com',
	permission: true
};
before(async () => {
	const result = await build({
		stdin: {
			contents: `
import Catalog from './src/routes/sitios/+page.svelte';
import Contribution from './src/routes/sitios/aportar/+page.svelte';
import Detail from './src/routes/sitios/[id]/+page.svelte';
import Root from './tests/catalogo/fixtures/Router.svelte';
import { start as startRouter, goto } from '${kit}/client/client.js';
import { flushSync, tick } from 'svelte';
import { get } from 'svelte/store';
import { page } from '$app/stores';
export { flushSync, tick };
export const currentPage = () => get(page);
export const navigate = goto;
export let stop = () => {};
export const start = () => startRouter({
 root: function(options) {
  const root = new Root(options);
  stop = () => root.$destroy();
  return root;
 },
 nodes: [
  async () => ({}), async () => ({}),
  async () => ({ component: Catalog }),
  async () => ({ component: Contribution }),
  async () => ({ component: Detail })
 ],
 dictionary: { '/sitios': [2], '/sitios/aportar': [3], '/sitios/[id]': [4] },
 server_loads: [], matchers: {},
 hooks: { reroute: () => {}, handleError: ({ error }) => { throw error; } }
}, document.body);
`,
			resolveDir: process.cwd()
		},
		bundle: true,
		write: false,
		format: 'iife',
		globalName: 'CatalogoTest',
		platform: 'browser',
		conditions: ['browser'],
		define: {
			__SVELTEKIT_CLIENT_ROUTING__: 'true',
			__SVELTEKIT_EMBEDDED__: 'false',
			__SVELTEKIT_DEV__: 'false',
			__SVELTEKIT_APP_VERSION_POLL_INTERVAL__: '0',
			__SVELTEKIT_APP_VERSION_FILE__: '"version.json"'
		},
		logOverride: { 'suspicious-nullish-coalescing': 'silent' },
		alias: { $lib: resolve('src/lib') },
		plugins: [
			{
				name: 'svelte-test',
				setup(b) {
					b.onResolve({ filter: /^\$app\// }, (args) => ({
						path: resolve(kit, 'app', args.path.slice(5) + '.js')
					}));
					const virtual: Record<string, string> = {
						'esm-env': 'export const BROWSER = true, DEV = false;',
						'__sveltekit/paths': 'export const base = "", assets = "", app_dir = "_app";',
						'__sveltekit/environment': 'export const version = "test";'
					};
					b.onResolve({ filter: /^(esm-env|__sveltekit\/)/ }, (args) => ({
						path: args.path,
						namespace: 'config'
					}));
					b.onLoad({ filter: /.*/, namespace: 'config' }, (args) => ({
						contents: virtual[args.path]
					}));
					b.onLoad({ filter: /\.svelte\.js$/ }, (args) => ({
						contents: compileModule(readFileSync(args.path, 'utf8'), {
							filename: args.path,
							generate: 'client'
						}).js.code,
						resolveDir: resolve(args.path, '..')
					}));
					b.onLoad({ filter: /\.svelte$/ }, (args) => ({
						contents: compile(readFileSync(args.path, 'utf8'), {
							filename: args.path,
							generate: 'client',
							compatibility: { componentApi: 4 },
							css: 'injected'
						}).js.code,
						resolveDir: resolve(args.path, '..')
					}));
				}
			}
		]
	});
	bundle = result.outputFiles[0].text;
});
async function open(
	t: { after(fn: () => Promise<void>): void },
	route: string,
	query = '',
	draft?: object
) {
	const dom = new JSDOM('', {
		url: `https://tropasanluis.cl/sitios${route ? '/' + route : ''}${query}`,
		runScripts: 'outside-only',
		pretendToBeVisual: true
	});
	const w = dom.window;
	w.scrollTo = () => {};
	w.HTMLElement.prototype.scrollIntoView = () => {};
	w.Request = Request;
	w.Response = Response;
	w.SVGAElement = w.SVGElement;
	w.IntersectionObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
	w.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
	const requests: {
		options?: RequestInit;
		respond: (response: unknown) => void;
		reject: (error: Error) => void;
	}[] = [];
	w.fetch = (_url: string, options?: RequestInit) =>
		new Promise((respond, reject) => requests.push({ options, respond, reject }));
	if (draft) w.localStorage.setItem(draftKey, JSON.stringify(draft));
	w.eval(bundle);
	await w.CatalogoTest.start();
	const settle = async () => {
		await new Promise((r) => setImmediate(r));
		w.CatalogoTest.flushSync();
		await w.CatalogoTest.tick();
	};
	t.after(async () => {
		await w.CatalogoTest.stop();
		w.close();
	});
	await settle();
	const field = (label: string): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => {
		const labels = Array.from(w.document.querySelectorAll('label')) as HTMLLabelElement[];
		const matched = labels.find((l) =>
			l.textContent?.replace(/\s+/g, ' ').trim().startsWith(label)
		);
		const node = matched?.control;
		assert.ok(node, `Campo: ${label}`);
		return node as HTMLInputElement;
	};
	const edit = async (label: string, value: string) => {
		const node = field(label);
		node.value = value;
		node.dispatchEvent(
			new w.Event(node.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })
		);
		await settle();
	};
	const submit = async () => {
		w.document
			.querySelector('form')!
			.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
		await settle();
	};
	return {
		w,
		requests,
		field,
		edit,
		submit,
		settle,
		load: async (catalog = seed) => {
			requests
				.find((r) => r.options?.method !== 'POST')!
				.respond({ ok: true, json: async () => catalog });
			await settle();
		},
		navigate: async (url: string) => {
			await w.CatalogoTest.navigate(url);
			await settle();
		}
	};
}
const draft = (form = savedForm) => ({ savedAt: Date.now(), form });

test('recargar sitio/tipo recupera el borrador coincidente, su ID y los datos privados', async (t) => {
	const f = await open(t, 'aportar', `?sitio=${savedForm.siteId}&tipo=correccion`, draft());
	assert.equal(f.field('Qué información').value, savedForm.content);
	assert.equal(f.field('Correo').value, savedForm.email);
	assert.equal((f.field('Tengo autorización') as HTMLInputElement).checked, false);
	await f.edit('Qué información', 'Corrección ampliada');
	const stored = JSON.parse(f.w.localStorage.getItem(draftKey)).form;
	assert.equal(stored.id, savedForm.id);
	assert.equal(stored.siteId, savedForm.siteId);
	assert.equal(stored.type, savedForm.type);
});

test('restaurar correcciones no aplica defaults del sitio ni antes ni después del fetch', async (t) => {
	for (const query of ['', `?sitio=${savedForm.siteId}&tipo=correccion`]) {
		const f = await open(t, 'aportar', query, draft());
		for (const loaded of [false, true]) {
			if (loaded) await f.load();
			assert.equal(f.field('Nombre del lugar').value, savedForm.name);
			assert.equal(f.field('Región').value, savedForm.region);
			assert.equal(f.field('Comuna o localidad').value, savedForm.locality);
		}
	}
});

test('borradores ajenos o vencidos no contaminan un enlace nuevo', async (t) => {
	for (const saved of [
		draft({ ...savedForm, siteId: seed.sites[1].id }),
		draft({ ...savedForm, type: 'visita' }),
		{ ...draft(), savedAt: Date.now() - 8 * 86400000 }
	]) {
		const f = await open(t, 'aportar', `?sitio=${savedForm.siteId}&tipo=correccion`, saved);
		assert.equal(f.field('Nombre del lugar').value, seed.sites[0].name);
		assert.equal(f.field('Qué información').value, '');
		await f.edit('Qué información', 'Aporte nuevo');
		assert.notEqual(JSON.parse(f.w.localStorage.getItem(draftKey)).form.id, savedForm.id);
	}
});

test('sitio que solo existe en el catálogo vivo se precarga al resolver el fetch', async (t) => {
	const site = {
		...seed.sites[0],
		id: 'solo-vivo',
		name: 'Lugar nuevo',
		region: 'Maule' as const,
		locality: 'Localidad nueva'
	};
	const f = await open(t, 'aportar', '?sitio=solo-vivo&tipo=correccion');
	await f.load({ ...seed, sites: [...seed.sites, site] });
	assert.equal(f.field('Ya existe').value, site.id);
	assert.equal(f.field('Nombre del lugar').value, site.name);
	assert.equal(f.field('Región').value, site.region);
	assert.equal(f.field('Comuna o localidad').value, site.locality);
});

test('fetch tardío respeta ediciones y borradores de sitios solo vivos', async (t) => {
	const site = {
		...seed.sites[0],
		id: 'solo-vivo',
		name: 'Lugar nuevo',
		region: 'Maule' as const,
		locality: 'Localidad nueva'
	};
	const catalog = { ...seed, sites: [...seed.sites, site] };
	const f = await open(t, 'aportar', '?sitio=solo-vivo&tipo=correccion');
	await f.edit('Nombre del lugar', 'Nombre editado durante la carga');
	await f.load(catalog);
	assert.equal(f.field('Nombre del lugar').value, 'Nombre editado durante la carga');
	assert.equal(f.field('Comuna o localidad').value, site.locality);
	const restored = await open(
		t,
		'aportar',
		'?sitio=solo-vivo&tipo=correccion',
		draft({ ...savedForm, siteId: site.id })
	);
	await restored.load(catalog);
	assert.equal(restored.field('Nombre del lugar').value, savedForm.name);
	assert.equal(restored.field('Región').value, savedForm.region);
	assert.equal(restored.field('Comuna o localidad').value, savedForm.locality);
});

test('navegación dentro de /sitios sincroniza controles, resultados y límite sin revertir filtros locales', async (t) => {
	const f = await open(t, '', '?q=puquio');
	await f.load();
	assert.equal(f.field('Buscar nombre').value, 'puquio');
	await f.edit('Buscar nombre', 'quilches');
	assert.equal(new URL(f.w.location.href).searchParams.get('q'), 'quilches');
	assert.equal(f.field('Buscar nombre').value, 'quilches');
	// Una navegación posterior debe restaurar el query original.
	await f.navigate('/sitios?q=puquio');
	assert.equal(f.field('Buscar nombre').value, 'puquio');
	await f.navigate('/sitios?q=puquio&people=60');
	assert.equal(f.field('Personas').value, '60');
	assert.match(f.w.document.querySelector('tr.site-row')?.textContent || '', /Puquio/i);
	await f.navigate('/sitios');
	assert.equal(f.field('Buscar nombre').value, '');
	const more = f.w.document.querySelector('button.load-more');
	more.click();
	await f.settle();
	assert.ok(f.w.document.querySelectorAll('tr.site-row').length > 20);
	await f.navigate('/sitios?sort=capacity');
	assert.equal(f.w.document.querySelectorAll('tr.site-row').length, 20);
	assert.equal(f.field('Ordenar').value, 'capacity');
	f.w.history.back();
	await new Promise<void>((r) => f.w.addEventListener('popstate', () => r(), { once: true }));
	await f.settle();
	assert.equal(f.field('Ordenar').value, 'name');
	f.w.history.forward();
	await new Promise<void>((r) => f.w.addEventListener('popstate', () => r(), { once: true }));
	await f.settle();
	assert.equal(f.field('Ordenar').value, 'capacity');
});

test('ordenar desde una columna conserva filtros y excluir pendientes se refleja en la URL', async (t) => {
	const f = await open(t, '', '?people=60&water=si&toilets=si');
	await f.load();
	const header = Array.from(f.w.document.querySelectorAll('thead button')).find(
		(node: any) => node.textContent.trim() === 'Personas'
	) as HTMLButtonElement;
	header.click();
	await f.settle();
	assert.equal(f.field('Ordenar').value, 'capacity');
	assert.equal(new URL(f.w.location.href).searchParams.get('people'), '60');
	const checkbox = f.field('Incluir datos pendientes') as HTMLInputElement;
	checkbox.click();
	await f.settle();
	assert.equal(checkbox.checked, false);
	assert.equal(new URL(f.w.location.href).searchParams.get('unknown'), '0');
	assert.equal(f.w.document.querySelectorAll('tr.site-row').length, 1);
	assert.match(f.w.document.querySelector('tr.site-row').textContent, /Puquio/);
	assert.equal(
		f.w.document.querySelector('th[aria-sort="descending"] button').textContent.trim(),
		'Personas'
	);
});

test('abrir ficha y Back restaura filtros, resultados y URL con el historial real de SvelteKit', async (t) => {
	const f = await open(t, '', '?q=puquio');
	await f.load();
	const historyLength = f.w.history.length;
	await f.edit('Buscar nombre', 'quilches');
	await f.edit('Personas', '60');
	await f.edit('Ordenar', 'capacity');
	const filteredUrl = f.w.location.href;
	const results = f.w.document.querySelector(
		'section[aria-label="Resultados de búsqueda"]'
	).textContent;
	assert.equal(f.w.history.length, historyLength, 'editar filtros reemplaza la entrada actual');
	assert.ok(f.w.history.state['sveltekit:history']);
	assert.ok(f.w.history.state['sveltekit:navigation']);
	const link = f.w.document.querySelector('tr.site-row a.site-name');
	assert.ok(link);
	const detailUrl = link.href;
	assert.equal(new URL(detailUrl).search, new URL(filteredUrl).search);
	const click = new f.w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
	// JSDOM no asigna which=1 al clic principal, que es lo que usa el router de Kit.
	Object.defineProperty(click, 'which', { value: 1 });
	link.dispatchEvent(click);
	await new Promise<void>((r) => f.w.requestAnimationFrame(() => f.w.setTimeout(r, 0)));
	await f.settle();
	assert.equal(f.w.location.href, detailUrl);
	assert.equal(f.w.document.querySelector('#site-search'), null, 'la ficha desmonta el catálogo');
	assert.equal(f.w.history.length, historyLength + 1);
	assert.equal(
		f.w.document.querySelector('a.back').href,
		filteredUrl,
		'el regreso explícito conserva filtros'
	);
	for (let visit = 0; visit < 2; visit++) {
		const back = new Promise<void>((r) =>
			f.w.addEventListener('popstate', () => r(), { once: true })
		);
		f.w.history.back();
		await back;
		await f.settle();
		assert.equal(f.w.location.href, filteredUrl);
		assert.equal(f.w.CatalogoTest.currentPage().url.href, filteredUrl);
		assert.equal(f.field('Buscar nombre').value, 'quilches');
		assert.equal(f.field('Personas').value, '60');
		assert.equal(f.field('Ordenar').value, 'capacity');
		assert.equal(
			f.w.document.querySelector('section[aria-label="Resultados de búsqueda"]').textContent,
			results
		);
		if (visit === 0) {
			const forward = new Promise<void>((r) =>
				f.w.addEventListener('popstate', () => r(), { once: true })
			);
			f.w.history.forward();
			await forward;
			await f.settle();
			assert.equal(f.w.location.href, detailUrl);
		}
	}
});

test('409 conserva el aporte, renueva su referencia y permite reenviar sin perder el borrador', async (t) => {
	const f = await open(t, 'aportar', '', draft());
	await f.load();
	f.field('Tengo autorización').click();
	await f.submit();
	const sent = f.requests.at(-1)!;
	const original = JSON.parse(sent.options!.body as string);
	assert.equal(original.id, savedForm.id);
	sent.respond({
		ok: false,
		status: 409,
		json: async () => ({ error: 'Referencia en conflicto' })
	});
	await f.settle();
	const recovered = JSON.parse(f.w.localStorage.getItem(draftKey)).form;
	assert.notEqual(recovered.id, original.id);
	assert.match(recovered.id, /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/);
	assert.equal(recovered.content, original.content);
	assert.equal(recovered.email, original.email);
	assert.equal(f.field('Qué información').value, original.content);
	assert.match(
		f.w.document.querySelector('[role="alert"]').textContent,
		/referencia nueva.*Vuelve a enviarlo/
	);
	await f.submit();
	const retry = f.requests.at(-1)!;
	assert.deepEqual(JSON.parse(retry.options!.body as string), { ...original, id: recovered.id });
	// Una confirmación perdida mantiene el ID para que el siguiente intento sea idempotente.
	retry.reject(new Error('Sin conexión'));
	await f.settle();
	assert.equal(JSON.parse(f.w.localStorage.getItem(draftKey)).form.id, recovered.id);
	await f.submit();
	const last = f.requests.at(-1)!;
	assert.deepEqual(JSON.parse(last.options!.body as string), { ...original, id: recovered.id });
	last.respond({ ok: true, json: async () => ({ id: recovered.id, status: 'pendiente' }) });
	await f.settle();
	assert.equal(f.w.localStorage.getItem(draftKey), null);
	assert.match(f.w.document.body.textContent, /Tu aporte quedó recibido/);
});

test('el envío pendiente bloquea todos los campos y tipos; tras un error permite editar y reintentar', async (t) => {
	for (const type of ['sitio', 'texto', 'correccion', 'visita']) {
		const f = await open(t, 'aportar', '', {
			savedAt: Date.now(),
			form: { ...savedForm, type, visitDate: '2026', group: 'Grupo sintético' }
		});
		await f.load();
		f.field('Tengo autorización').click();
		await f.submit();
		const sent = f.requests.at(-1)!;
		assert.equal(sent.options?.method, 'POST');
		for (const node of f.w.document.querySelectorAll('input, select, textarea, button')) {
			assert.ok(node.matches(':disabled'), `${type}: ${node.outerHTML}`);
		}
		const count = f.requests.length;
		await f.submit();
		assert.equal(f.requests.length, count, 'no envía dos veces mientras está pendiente');
		sent.respond({ ok: false, status: 503, json: async () => ({ error: 'Reintenta más tarde' }) });
		await f.settle();
		const stored = JSON.parse(f.w.localStorage.getItem(draftKey)).form;
		assert.equal(stored.id, savedForm.id);
		assert.equal(stored.content, savedForm.content);
		assert.equal(f.w.document.querySelectorAll(':disabled').length, 0);
		await f.edit(
			type === 'texto' ? 'Pega el texto' : 'Qué información',
			'Contenido ampliado después del error'
		);
		assert.equal(
			JSON.parse(f.w.localStorage.getItem(draftKey)).form.content,
			'Contenido ampliado después del error'
		);
		await f.submit();
		const retry = f.requests.at(-1)!;
		assert.equal(
			JSON.parse(retry.options!.body as string).content,
			'Contenido ampliado después del error'
		);
		retry.respond({ ok: true, json: async () => ({ id: savedForm.id, status: 'pendiente' }) });
		await f.settle();
		assert.equal(f.w.localStorage.getItem(draftKey), null);
		assert.match(f.w.document.body.textContent, /Tu aporte quedó recibido/);
	}
});

test('el catálogo vivo refresca defaults intactos de sitios del seed y respeta ediciones por campo', async (t) => {
	const original = seed.sites[0];
	const live = {
		...original,
		name: 'Nombre vigente',
		region: 'Maule' as const,
		locality: 'Localidad vigente'
	};
	const catalog = { ...seed, sites: seed.sites.map((s) => (s.id === live.id ? live : s)) };
	const fields = [
		['Nombre del lugar', 'name', original.name],
		['Región', 'region', original.region],
		['Comuna o localidad', 'locality', original.locality || original.commune]
	] as const;
	for (const edited of [null, ...fields]) {
		const f = await open(t, 'aportar', `?sitio=${original.id}&tipo=correccion`);
		if (edited) {
			await f.edit(edited[0], edited[1] === 'region' ? 'Biobío' : 'Valor editado');
			// Volver a escribir el valor original también es una decisión del usuario.
			await f.edit(edited[0], edited[2]);
		}
		await f.load(catalog);
		for (const [label, key, initial] of fields) {
			const expected = edited?.[1] === key ? initial : live[key];
			assert.equal(f.field(label).value, expected);
			assert.equal(JSON.parse(f.w.localStorage.getItem(draftKey)).form[key], expected);
		}
	}
	const restored = await open(
		t,
		'aportar',
		`?sitio=${original.id}&tipo=correccion`,
		draft({
			...savedForm,
			name: original.name,
			region: original.region,
			locality: original.locality || original.commune
		})
	);
	await restored.load(catalog);
	for (const [label, , initial] of fields) assert.equal(restored.field(label).value, initial);
});
