import type { Catalog, Contribution } from './model';
export const ENDPOINT = '/.netlify/functions/catalogo';
export class ContributionError extends Error {
	constructor(
		message: string,
		public status: number
	) {
		super(message);
	}
}
export async function fetchCatalog(): Promise<Catalog> {
	const r = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
	if (!r.ok) throw new Error('No pudimos cargar las últimas actualizaciones.');
	return r.json();
}
export async function sendContribution(data: Contribution) {
	const r = await fetch(ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	const body = await r
		.json()
		.catch(() => ({ error: 'No se pudo enviar. Tu borrador se mantiene en este dispositivo.' }));
	if (!r.ok) throw new ContributionError(body.error || 'No se pudo enviar el aporte.', r.status);
	return body as { id: string; status: string };
}
