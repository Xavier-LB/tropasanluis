import { randomUUID } from 'node:crypto';
import { catalogSchema, type Catalog } from '../../src/lib/catalog/model';

export interface Archive {
	get(key: string): Promise<unknown | null>;
	put(key: string, data: unknown): Promise<void>;
}

// Conserva ambos estados. Si falla una escritura, el catálogo actual sigue recuperable.
export async function publish(archive: Archive, candidate: unknown, fallback: Catalog) {
	const proposed = catalogSchema.parse(candidate);
	const current = catalogSchema.parse((await archive.get('catalogo')) ?? fallback);
	if (proposed.version !== current.version) {
		throw new Error(
			'El catálogo cambió desde la exportación. Exporta de nuevo y aplica tus cambios sobre esa versión.'
		);
	}
	const now = new Date().toISOString();
	const version = `${now.slice(0, 19).replaceAll(':', '-')}-${randomUUID().slice(0, 8)}`;
	const next = catalogSchema.parse({ ...proposed, version, updatedAt: now });
	await archive.put(`versiones/${version}/antes`, current);
	await archive.put(`versiones/${version}/despues`, next);
	const latest = catalogSchema.parse((await archive.get('catalogo')) ?? fallback);
	if (latest.version !== current.version)
		throw new Error('Otra revisión publicó cambios. Se conservó el respaldo; vuelve a exportar.');
	await archive.put('catalogo', next);
	const saved = catalogSchema.parse(await archive.get('catalogo'));
	if (saved.version !== version)
		throw new Error(
			'No se pudo confirmar esta publicación. Revisa las versiones antes de reintentar.'
		);
	return next;
}

export async function restore(
	archive: Archive,
	snapshotKey: string,
	expectedVersion: string,
	fallback: Catalog
) {
	if (!/^versiones\/[a-zA-Z0-9T.-]+\/(antes|despues)$/.test(snapshotKey))
		throw new Error('Usa la clave completa de una versión guardada.');
	const snapshot = catalogSchema.parse(await archive.get(snapshotKey));
	return publish(archive, { ...snapshot, version: expectedVersion }, fallback);
}
