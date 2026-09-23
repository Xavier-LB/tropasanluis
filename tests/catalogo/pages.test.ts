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
before(async () => {
	const result = await build({
		stdin: {
			contents: `
import Catalog from './src/routes/sitios/+page.svelte';
import History from './src/routes/sitios/historial/+page.svelte';
import Guide from './src/routes/sitios/guia/+page.svelte';
import { load as retiredForm } from './src/routes/sitios/aportar/+page.ts';
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
  async () => ({ universal: { load: retiredForm } }),
  async () => ({ component: Detail }),
  async () => ({ component: History }),
  async () => ({ component: Guide })
 ],
 dictionary: { '/sitios': [2], '/sitios/aportar': [3], '/sitios/historial': [5], '/sitios/guia': [6], '/sitios/[id]': [4] },
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
async function open(t: { after(fn: () => Promise<void>): void }, route: string, query = '') {
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
	w.TextEncoder = TextEncoder;
	w.TextDecoder = TextDecoder;
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
	return {
		w,
		requests,
		field,
		edit,
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

test('las rutas de consulta conservan contenido sin acciones de ingreso', async (t) => {
	for (const route of ['', 'las-nalcas-rupanco', 'historial', 'guia']) {
		const f = await open(t, route);
		if (route !== 'guia') await f.load();
		assert.ok(f.w.document.querySelector('h1')?.textContent);
		assert.equal(f.w.document.querySelector('a[href*="/aportar"]'), null);
		assert.equal(f.w.document.querySelector('input[type="email"], textarea'), null);
		assert.equal(
			f.requests.some((r) => r.options?.method === 'POST'),
			false
		);
	}
});

test('un enlace antiguo de aportes vuelve al catálogo sin mostrar el formulario', async (t) => {
	const f = await open(t, 'aportar', '?tipo=visita&sitio=las-nalcas-rupanco');
	await f.load();
	assert.equal(f.w.location.pathname, '/sitios');
	assert.ok(f.w.document.querySelector('#site-search'));
	assert.equal(f.w.document.querySelector('input[type="email"], textarea'), null);
});
