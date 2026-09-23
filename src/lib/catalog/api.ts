import type { Catalog } from './model';
export const ENDPOINT = '/.netlify/functions/catalogo';
export async function fetchCatalog(): Promise<Catalog> {
	const r = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
	if (!r.ok) throw new Error('No pudimos cargar las últimas actualizaciones.');
	return r.json();
}
