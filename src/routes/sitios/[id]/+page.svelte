<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ArrowLeft, ExternalLink, MapPin } from 'lucide-svelte';
	import seed from '$lib/catalog/seed';
	import type { Catalog, Site } from '$lib/catalog/model';
	import { fetchCatalog } from '$lib/catalog/api';
	import { formatNumber, filtersQuery, readFilters } from '$lib/catalog/search';
	let catalog = seed as Catalog,
		loading = true,
		error = '';
	$: returnQuery = filtersQuery(readFilters($page.url.searchParams));
	$: site = catalog.sites.find((s) => s.id === $page.params.id);
	$: visits = catalog.visits
		.filter((v) => v.siteId === $page.params.id)
		.sort((a, b) => b.date.localeCompare(a.date));
	const yn = (v: string) =>
		v === 'si'
			? 'Sí, informado'
			: v === 'no'
				? 'No disponible'
				: v === 'en-construccion'
					? 'En construcción; operación por confirmar'
					: 'Sin información';
	function from(field: string, s: Site) {
		const ids = s.fieldSources[field] || [];
		return s.sources
			.filter((f) => ids.includes(f.id))
			.map((f) => `${f.title}, ${f.locator}`)
			.join(' · ');
	}
	onMount(() => {
		fetchCatalog()
			.then((c) => (catalog = c))
			.catch(() => (error = 'No pudimos consultar las últimas actualizaciones.'))
			.finally(() => (loading = false));
	});
</script>

<svelte:head
	><title>{site ? site.name : 'Ficha de lugar'} | Sitios Tropa San Luis</title><meta
		name="description"
		content={site?.description || 'Ficha de un sitio de campamento scout.'}
	/></svelte:head
>
<a class="back" href={`/sitios${returnQuery ? `?${returnQuery}` : ''}`}
	><ArrowLeft size={17} aria-hidden="true" />Volver al catálogo</a
>
{#if site}
	<header class="intro">
		<div>
			<h1>{site.name}</h1>
			<p>{[site.locality, site.commune, site.region].filter(Boolean).join(' · ')}</p>
		</div>
	</header>
	<p class="measure">{site.description}</p>
	<div class="tags">
		{#if site.kind !== 'por-confirmar'}<span class="tag"
				>{site.kind === 'rustico'
					? 'Rústico'
					: site.kind === 'equipado'
						? 'Equipado'
						: 'Mixto'}</span
			>{/if}{#each [...site.environments, ...site.tags] as tag}<span class="tag">{tag}</span>{/each}
	</div>
	<p class="notice">
		Ficha revisada el {site.reviewedAt}. {site.verifiedAt
			? `Última comprobación de servicios: ${site.verifiedAt}.`
			: 'Los servicios y la capacidad todavía deben confirmarse con el lugar.'}
		<a href="#fuentes">Ver fuentes</a>
	</p>
	{#if error}<p class="notice">{error}</p>{/if}
	<div class="detail-grid">
		<div>
			<section class="detail-section">
				<h2>Lo esencial para acampar</h2>
				<dl class="data-list">
					<div class="data-row">
						<dt>Personas en carpas</dt>
						<dd>
							{site.capacity
								? `${formatNumber(site.capacity)} personas`
								: site.accommodation === 'cabanas'
									? 'La referencia es de cabañas'
									: 'Por confirmar'}{#if site.capacityNote}<small>{site.capacityNote}</small
								>{/if}{#if from('capacity', site)}<small>{from('capacity', site)}</small>{/if}
						</dd>
					</div>
					{#if site.lodgingCapacity}<div class="data-row">
							<dt>Personas bajo techo</dt>
							<dd>
								{formatNumber(site.lodgingCapacity)}<small>{from('lodgingCapacity', site)}</small>
							</dd>
						</div>{/if}
					<div class="data-row">
						<dt>Agua potable</dt>
						<dd>{yn(site.water)}<small>{from('water', site)}</small></dd>
					</div>
					<div class="data-row">
						<dt>Baños</dt>
						<dd>
							{yn(site.toilets)}{#if site.toiletCount}<small
									>Cantidad informada: {site.toiletCount}</small
								>{/if}<small>{from('toilets', site)}</small>
						</dd>
					</div>
					<div class="data-row">
						<dt>Superficie total</dt>
						<dd>
							{site.areaHa
								? `${formatNumber(site.areaHa)} hectáreas`
								: 'Por confirmar'}{#if site.areaNote}<small>{site.areaNote}</small>{/if}<small
								>{from('areaHa', site)}</small
							>
						</dd>
					</div>
					<div class="data-row">
						<dt>Área para acampar</dt>
						<dd>
							{site.campAreaHa
								? `${formatNumber(site.campAreaHa)} hectáreas`
								: 'Por confirmar'}<small>{from('campAreaHa', site)}</small>
						</dd>
					</div>
					<div class="data-row">
						<dt>Electricidad</dt>
						<dd>{yn(site.electricity)}<small>{from('electricity', site)}</small></dd>
					</div>
					<div class="data-row">
						<dt>Acceso de bus</dt>
						<dd>{yn(site.bus)}<small>{from('bus', site)}</small></dd>
					</div>
				</dl>
			</section>
			{#if site.notes || site.observations.length}<section class="detail-section">
					<h2>Detalles por tener en cuenta</h2>
					{#if site.notes}<p>{site.notes}</p>{/if}{#each site.observations as o}<p class="notice">
							<strong>{o.field}: {o.value}.</strong><br /><span class="small"
								>{site.sources.find((s) => s.id === o.sourceId)?.title} · {site.sources.find(
									(s) => s.id === o.sourceId
								)?.locator}</span
							>
						</p>{/each}
				</section>{/if}
			<section class="detail-section">
				<h2>Ubicación y distancia</h2>
				{#if site.distance}<dl class="data-list">
						<div class="data-row">
							<dt>Por carretera</dt>
							<dd>
								{site.distance.roadKm !== null
									? `${formatNumber(site.distance.roadKm)} km estimados`
									: 'Recorrido por confirmar'}
							</dd>
						</div>
						<div class="data-row">
							<dt>En línea recta</dt>
							<dd>{formatNumber(site.distance.straightKm)} km</dd>
						</div>
					</dl>
					<p class="small muted" style="margin-top:15px">
						Desde {site.distance.origin}. Calculado el {site.distance.calculatedAt}. {site.distance
							.method} El punto puede estar dentro del predio: confirma la entrada y el acceso de bus.
					</p>{:else}<p class="muted">
						Todavía no hay una distancia calculada al predio. No usamos el centro de la comuna como
						si fuera la entrada del lugar.
					</p>{/if}{#if site.mapUrl}<a
						class="button"
						href={site.mapUrl}
						target="_blank"
						rel="noopener noreferrer"
						><MapPin size={17} aria-hidden="true" />Abrir ubicación de referencia</a
					>{/if}
			</section>
			<section class="detail-section">
				<h2>Campamentos y visitas</h2>
				{#if visits.length}{#each visits as v}<article class="visit">
							<time>{v.date}</time>
							<div>
								<h3>{v.group}</h3>
								<p>{v.status}{v.people ? ` · ${v.people} asistentes` : ''}</p>
								<p>{v.notes}</p>
							</div>
						</article>{/each}{:else}<p class="muted">
						Aún no hay visitas vinculadas a este predio. El historial general conserva las salidas
						cuyo lugar exacto falta identificar.
					</p>{/if}
			</section>
			<section class="detail-section" id="fuentes">
				<h2>De dónde vienen los datos</h2>
				{#each site.sources as s}<article class="source">
						<strong>{s.title}</strong>
						<p>
							{s.locator} · {s.sourceDate
								? `Fecha de la fuente: ${s.sourceDate}`
								: 'Fuente sin fecha de vigencia'} · Revisada: {s.checkedAt}
						</p>
						<p class="muted">{s.note}</p>
						{#if s.url}<a href={s.url} target="_blank" rel="noopener noreferrer"
								>Abrir fuente<ExternalLink
									size={13}
									style="display:inline;margin-left:5px"
									aria-hidden="true"
								/></a
							>{/if}
					</article>{/each}
			</section>
		</div>
		<aside>
			<div class="contact-panel">
				<h2>Contactar al lugar</h2>
				{#if site.contacts.length}{#each site.contacts as c}<div class="contact-item">
							<strong class="small">{c.name}</strong>
							<p class="muted">{c.role}</p>
							<a
								href={c.kind === 'telefono'
									? `tel:${c.value}`
									: c.kind === 'correo'
										? `mailto:${c.value}`
										: c.value}
								target={c.kind === 'web' ? '_blank' : undefined}
								rel={c.kind === 'web' ? 'noopener noreferrer' : undefined}
								>{c.kind === 'web' ? 'Abrir canal del lugar' : c.value}<ExternalLink
									size={14}
									aria-hidden="true"
								/></a
							>
						</div>{/each}
					<p class="hint">
						Canales de contacto públicos. La disponibilidad y tarifas se consultan directamente.
					</p>{:else}<p class="muted">
						Falta confirmar un contacto que podamos compartir públicamente.
					</p>
				{/if}
			</div>
			{#if site.links.length}<section class="detail-section" style="margin-top:25px">
					<h2>Fotos y enlaces</h2>
					<div class="link-list">
						{#each site.links as l}<a
								class="button"
								href={l.url}
								target="_blank"
								rel="noopener noreferrer">{l.label}<ExternalLink size={15} aria-hidden="true" /></a
							>{/each}
					</div>
					<p class="hint">
						Los enlaces abren las publicaciones o páginas originales. Algunas pueden requerir
						iniciar sesión.
					</p>
				</section>{/if}
		</aside>
	</div>
{:else if loading}<p role="status">Buscando la ficha…</p>{:else}<div class="empty">
		<h1>No encontramos este lugar</h1>
		<p>
			{error || 'Puede que el enlace sea antiguo o que la ficha aún esté pendiente de revisión.'}
		</p>
		<a class="button primary" href="/sitios">Explorar el catálogo</a>
	</div>{/if}
