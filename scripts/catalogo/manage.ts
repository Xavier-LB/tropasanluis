import { spawnSync } from 'node:child_process';
import {
	mkdtempSync,
	readFileSync,
	writeFileSync,
	rmSync,
	mkdirSync,
	lstatSync,
	realpathSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve, sep } from 'node:path';
import seed from '../../src/lib/catalog/seed';
import { catalogSchema } from '../../src/lib/catalog/model';
import { z } from 'zod';
import { publish, restore, type Archive } from './workflow';

// Usa la sesión de Netlify CLI del operador. No crea ni guarda credenciales.
const store = 'sitios-catalogo-v1';
const inbox = 'sitios-aportes-v1';
const siteId = 'f79a89e9-a3d3-45a4-8214-dae956ba6ee7';
const projectDir = process.cwd();
const [command, arg, extra] = process.argv.slice(2);
const temp = mkdtempSync(join(tmpdir(), 'sitios-revision-'));
let counter = 0;
function cli(args: string[]) {
	const result = spawnSync('netlify', [...args, '--cwd', projectDir], {
		encoding: 'utf8',
		maxBuffer: 32 * 1024 * 1024,
		cwd: projectDir,
		env: {
			...process.env,
			NETLIFY_SITE_ID: siteId,
			NETLIFY_API_URL: 'https://api.netlify.com',
			NETLIFY_API_HOST: 'api.netlify.com'
		}
	});
	if (result.status !== 0)
		throw new Error(
			`Netlify no completó ${args[0]}. Comprueba la sesión y el sitio enlazado. No se muestran datos privados en este error.`
		);
	return result.stdout;
}
function list(name: string) {
	return JSON.parse(cli(['blobs:list', name, '--json'])).blobs as { key: string }[];
}
function get(name: string, key: string): unknown | null {
	// Una falla de red nunca se interpreta como catálogo vacío.
	if (!list(name).some((blob) => blob.key === key)) return null;
	const path = join(temp, `${counter++}.json`);
	cli(['blobs:get', name, key, '--output', path]);
	return JSON.parse(readFileSync(path, 'utf8'));
}
function put(name: string, key: string, value: unknown) {
	const path = join(temp, `${counter++}.json`);
	writeFileSync(path, JSON.stringify(value, null, 2), { mode: 0o600 });
	cli(['blobs:set', name, key, '--input', path, '--force']);
}
const archive: Archive = {
	get: async (key) => get(store, key),
	put: async (key, value) => put(store, key, value)
};
function output(path: string, data: unknown) {
	if (!path)
		throw new Error('Indica una ruta de salida fuera de static/ y de repositorios públicos.');
	const absolute = resolve(path);
	// Resuelve también padres enlazados cuando el archivo aún no existe.
	// Un enlace final roto se rechaza: no debe crear su destino sin validarlo.
	const target = lstatSync(absolute, { throwIfNoEntry: false })
		? realpathSync(absolute)
		: join(realpathSync(dirname(absolute)), basename(absolute));
	const publicRepo = realpathSync(projectDir);
	if (target === publicRepo || target.startsWith(publicRepo + sep))
		throw new Error('Guarda exportaciones y aportes fuera del repositorio público.');
	writeFileSync(target, JSON.stringify(data, null, 2) + '\n', { mode: 0o600 });
	console.log(`Guardado: ${target}`);
}
try {
	// Comprobación local del proyecto enlazado: evita operar sobre otro sitio por accidente.
	const linked = JSON.parse(readFileSync('.netlify/state.json', 'utf8'));
	if (
		linked.siteId !== siteId ||
		(process.env.NETLIFY_SITE_ID && process.env.NETLIFY_SITE_ID !== siteId)
	)
		throw new Error('El proyecto debe estar enlazado a tropasanluis.');
	// Un endpoint alternativo podría resolver el mismo ID fuera del sitio validado.
	if (process.env.NETLIFY_API_URL && process.env.NETLIFY_API_URL !== 'https://api.netlify.com')
		throw new Error('NETLIFY_API_URL debe apuntar a https://api.netlify.com.');
	if (process.env.NETLIFY_API_HOST && process.env.NETLIFY_API_HOST !== 'api.netlify.com')
		throw new Error('NETLIFY_API_HOST debe apuntar a api.netlify.com.');
	if (command === 'exportar')
		output(arg, catalogSchema.parse((await archive.get('catalogo')) ?? seed));
	else if (command === 'bandeja') {
		if (!arg) throw new Error('Indica un archivo privado de salida.');
		const entries = list(inbox);
		const submissions = entries
			.filter((e) => e.key.startsWith('pendientes/'))
			.map((e) => get(inbox, e.key));
		output(arg, { exportedAt: new Date().toISOString(), submissions });
	} else if (command === 'publicar') {
		const candidate = JSON.parse(readFileSync(arg, 'utf8'));
		const next = await publish(archive, candidate, seed);
		console.log(
			`Publicado: ${next.version}. ${next.sites.length} lugares y ${next.visits.length} registros históricos.`
		);
	} else if (command === 'versiones') {
		console.log(
			list(store)
				.filter((e) => e.key.startsWith('versiones/'))
				.map((e) => e.key)
				.join('\n') || 'Sin cambios posteriores a la carga inicial.'
		);
	} else if (command === 'restaurar') {
		if (!extra) throw new Error('Indica la versión actual exportada como tercer argumento.');
		const next = await restore(archive, arg, extra, seed);
		console.log(`Restaurado como una nueva versión: ${next.version}`);
	} else if (command === 'revisar') {
		const decision = JSON.parse(readFileSync(arg, 'utf8'));
		if (
			!['publicado', 'descartado'].includes(decision.status) ||
			typeof decision.note !== 'string' ||
			!decision.note.trim()
		)
			throw new Error('La revisión requiere estado publicado/descartado y una nota.');
		const uuid = z.string().uuid().parse(decision.id);
		const key = `pendientes/${uuid}`;
		const original = get(inbox, key);
		if (!original || typeof original !== 'object') throw new Error('No existe ese aporte.');
		const reviewId = new Date().toISOString().replaceAll(':', '-');
		put(inbox, `revisiones/${uuid}/${reviewId}`, original);
		put(inbox, key, {
			...original,
			status: decision.status,
			reviewNote: decision.note,
			reviewedAt: new Date().toISOString()
		});
		console.log('Revisión registrada. El texto original se conserva.');
	} else {
		throw new Error(
			'Uso: yarn catalogo exportar ARCHIVO | bandeja ARCHIVO | publicar ARCHIVO | versiones | restaurar CLAVE VERSION_ACTUAL | revisar ARCHIVO_DECISION'
		);
	}
} catch (error) {
	console.error(error instanceof Error ? error.message : 'No se completó la operación.');
	process.exitCode = 1;
} finally {
	rmSync(temp, { recursive: true, force: true });
}
