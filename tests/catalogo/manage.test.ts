import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
	mkdtempSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
	rmSync,
	existsSync,
	realpathSync,
	symlinkSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import seed from '../../src/lib/catalog/seed';

const siteId = 'f79a89e9-a3d3-45a4-8214-dae956ba6ee7';
const otherSite = '00000000-0000-4000-8000-000000000000';
const script = fileURLToPath(new URL('../../scripts/catalogo/manage.ts', import.meta.url));
const loader = import.meta.resolve('tsx');
function fixture(t: { after(fn: () => void): void }, linked = siteId) {
	const root = realpathSync(mkdtempSync(join(tmpdir(), 'catalogo-cli-test-')));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	const project = join(root, 'project');
	const bin = join(root, 'bin');
	mkdirSync(join(project, '.netlify'), { recursive: true });
	mkdirSync(bin);
	writeFileSync(join(project, '.netlify/state.json'), JSON.stringify({ siteId: linked }));
	const dataPath = join(root, 'data.json');
	const logPath = join(root, 'calls.jsonl');
	writeFileSync(dataPath, JSON.stringify({}));
	writeFileSync(
		join(bin, 'netlify'),
		`#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
const [command, store, key] = args;
fs.appendFileSync(process.env.CATALOGO_TEST_LOG, JSON.stringify({ args, cwd: process.cwd(), siteId: process.env.NETLIFY_SITE_ID, api: process.env.NETLIFY_API_URL, host: process.env.NETLIFY_API_HOST }) + '\\n');
const data = JSON.parse(fs.readFileSync(process.env.CATALOGO_TEST_DATA, 'utf8'));
const blobs = data[store] ||= {};
if (command === 'blobs:list') console.log(JSON.stringify({ blobs: Object.keys(blobs).map(key => ({ key })) }));
else if (command === 'blobs:get') fs.writeFileSync(args[args.indexOf('--output') + 1], JSON.stringify(blobs[key]));
else if (command === 'blobs:set') {
 blobs[key] = JSON.parse(fs.readFileSync(args[args.indexOf('--input') + 1], 'utf8'));
 fs.writeFileSync(process.env.CATALOGO_TEST_DATA, JSON.stringify(data));
} else process.exit(2);
`,
		{ mode: 0o700 }
	);
	const run = (args: string[], env: NodeJS.ProcessEnv = {}) =>
		spawnSync(process.execPath, ['--import', loader, script, ...args], {
			cwd: project,
			encoding: 'utf8',
			env: {
				...process.env,
				NETLIFY_SITE_ID: '',
				NETLIFY_API_URL: '',
				NETLIFY_API_HOST: '',
				PATH: `${bin}:${process.env.PATH}`,
				CATALOGO_TEST_LOG: logPath,
				CATALOGO_TEST_DATA: dataPath,
				...env
			}
		});
	return { root, project, run, dataPath, logPath };
}

test('administración rechaza sitio enlazado, sitio efectivo o API ajenos antes de invocar Netlify', (t) => {
	const f = fixture(t);
	for (const env of [
		{ NETLIFY_SITE_ID: otherSite },
		{ NETLIFY_API_URL: 'https://otro.example' },
		{ NETLIFY_API_HOST: 'otro.example' }
	]) {
		const result = f.run(['versiones'], env);
		assert.equal(result.status, 1);
		assert.equal(existsSync(f.logPath), false);
	}
	const wrong = fixture(t, otherSite);
	assert.equal(wrong.run(['versiones'], { NETLIFY_SITE_ID: siteId }).status, 1);
	assert.equal(existsSync(wrong.logPath), false);
});

test('lecturas, publicación, restauración y revisión quedan vinculadas al sitio validado', (t) => {
	const f = fixture(t);
	const id = '11111111-1111-4111-8111-111111111111';
	writeFileSync(
		f.dataPath,
		JSON.stringify({
			'sitios-catalogo-v1': { catalogo: seed },
			'sitios-aportes-v1': {
				[`pendientes/${id}`]: { id, email: 'privado@example.com', content: 'Original privado' }
			}
		})
	);
	const candidate = join(f.root, 'candidate.json');
	const decision = join(f.root, 'decision.json');
	writeFileSync(candidate, JSON.stringify(seed));
	writeFileSync(decision, JSON.stringify({ id, status: 'descartado', note: 'Revisión sintética' }));
	const run = (args: string[]) => {
		const result = f.run(args, { NETLIFY_SITE_ID: siteId });
		assert.equal(result.status, 0, result.stderr);
	};
	run(['exportar', join(f.root, 'export.json')]);
	run(['bandeja', join(f.root, 'inbox.json')]);
	run(['versiones']);
	run(['publicar', candidate]);
	const published = JSON.parse(readFileSync(f.dataPath, 'utf8'))['sitios-catalogo-v1'].catalogo;
	run(['restaurar', `versiones/${published.version}/antes`, published.version]);
	run(['revisar', decision]);
	const calls = readFileSync(f.logPath, 'utf8')
		.trim()
		.split('\n')
		.map((line) => JSON.parse(line));
	assert.deepEqual(
		new Set(calls.map((c) => c.args[0])),
		new Set(['blobs:list', 'blobs:get', 'blobs:set'])
	);
	for (const call of calls) {
		assert.equal(call.siteId, siteId);
		assert.equal(call.api, 'https://api.netlify.com');
		assert.equal(call.host, 'api.netlify.com');
		assert.equal(call.cwd, f.project);
		assert.equal(call.args[call.args.indexOf('--cwd') + 1], f.project);
	}
	const saved = JSON.parse(readFileSync(f.dataPath, 'utf8'));
	assert.deepEqual(saved['sitios-catalogo-v1'].catalogo.sites, seed.sites);
	assert.equal(saved['sitios-aportes-v1'][`pendientes/${id}`].content, 'Original privado');
	assert.equal(saved['sitios-aportes-v1'][`pendientes/${id}`].status, 'descartado');
});

test('exportaciones y bandeja rechazan destinos dentro del repo mediante symlinks', (t) => {
	const f = fixture(t);
	const publicDir = join(f.project, 'static');
	mkdirSync(publicDir);
	const original = join(publicDir, 'existente.json');
	writeFileSync(original, 'No sobrescribir');
	const alias = join(f.root, 'repo-enlazado');
	symlinkSync(f.project, alias, 'dir');
	const nested = join(f.root, 'salidas');
	mkdirSync(nested);
	symlinkSync(publicDir, join(nested, 'publico'), 'dir');
	symlinkSync(original, join(f.root, 'archivo-enlazado.json'));
	symlinkSync(join(publicDir, 'destino-inexistente.json'), join(f.root, 'enlace-roto.json'));
	for (const command of ['exportar', 'bandeja']) {
		for (const path of [
			join(publicDir, 'nuevo.json'),
			join(alias, 'static', 'nuevo.json'),
			join(nested, 'publico', 'nuevo.json'),
			join(f.root, 'archivo-enlazado.json'),
			join(f.root, 'enlace-roto.json')
		]) {
			const result = f.run([command, path]);
			assert.equal(result.status, 1, `${command} ${path}: ${result.stderr}`);
			assert.equal(existsSync(join(publicDir, 'nuevo.json')), false);
			assert.equal(existsSync(join(publicDir, 'destino-inexistente.json')), false);
			assert.equal(readFileSync(original, 'utf8'), 'No sobrescribir');
		}
	}
});

test('salidas privadas con padres symlink y prefijo similar al repo se canonicalizan', (t) => {
	const f = fixture(t);
	const privateDir = f.project + '-privado';
	mkdirSync(privateDir);
	const alias = join(f.root, 'privado-enlazado');
	symlinkSync(privateDir, alias, 'dir');
	for (const command of ['exportar', 'bandeja']) {
		const target = join(privateDir, command + '.json');
		const result = f.run([command, join(alias, command + '.json')]);
		assert.equal(result.status, 0, result.stderr);
		assert.equal(result.stdout.trim(), `Guardado: ${target}`);
		assert.ok(JSON.parse(readFileSync(target, 'utf8')));
	}
});
