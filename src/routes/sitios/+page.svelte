<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Search, ArrowRight, Plus, SlidersHorizontal, Share2, X } from 'lucide-svelte';
	import seed from '$lib/catalog/seed';
	import { REGIONS, TAGS, ENVIRONMENTS, type Catalog } from '$lib/catalog/model';
	import {
		defaults,
		readFilters,
		filtersQuery,
		searchSites,
		formatNumber,
		type Filters
	} from '$lib/catalog/search';
	import { fetchCatalog } from '$lib/catalog/api';
	import NumberField from '$lib/catalog/NumberField.svelte';
	let catalog = seed as Catalog;
	let filters: Filters = readFilters($page.url.searchParams);
	let filterUrl = $page.url;
	let limit = 20,
		sharing = '',
		updateError = '';
	let filtersOpen = true;
	const labels: Record<string, string> = {
		q: 'Búsqueda',
		region: 'Región',
		people: 'Personas',
		maxDistance: 'Hasta km',
		minArea: 'Desde ha',
		maxArea: 'Hasta ha',
		water: 'Agua potable',
		toilets: 'Baños',
		kind: 'Tipo',
		accommodation: 'Alojamiento',
		environment: 'Entorno',
		electricity: 'Electricidad',
		bus: 'Bus'
	};
	const values: Record<string, string> = {
		si: 'Sí',
		no: 'No',
		rustico: 'Rústico',
		equipado: 'Equipado',
		mixto: 'Mixto',
		carpas: 'Carpas',
		cabanas: 'Cabañas'
	};
	$: if ($page.url !== filterUrl) {
		filterUrl = $page.url;
		filters = readFilters($page.url.searchParams);
		limit = 20;
	}
	$: results = searchSites(catalog.sites, filters);
	$: active = Object.entries(labels).filter(([k]) => Boolean(filters[k as keyof Filters]));
	$: pendingCount = results.filter((r) => r.pending.length).length;
	$: filterCount = active.length + filters.tags.length;
	function syncUrl() {
		limit = 20;
		const q = filtersQuery(filters);
		return goto('/sitios' + (q ? '?' + q : ''), {
			replaceState: true,
			noScroll: true,
			keepFocus: true,
			state: $page.state
		});
	}
	function clear() {
		filters = { ...defaults, tags: [] };
		syncUrl();
	}
	function remove(key: string) {
		filters = { ...filters, [key]: defaults[key as keyof Filters] };
		syncUrl();
	}
	function preset(people: string) {
		filters = { ...filters, people: filters.people === people ? '' : people };
		syncUrl();
	}
	async function share() {
		await syncUrl();
		try {
			await navigator.clipboard.writeText(location.href);
			sharing = 'Enlace copiado. La búsqueda se conserva al compartirlo.';
		} catch {
			sharing = 'Copia el enlace desde la barra de direcciones: ya incluye los filtros.';
		}
	}
	onMount(() => {
		const media = matchMedia('(min-width:901px)');
		filtersOpen = media.matches;
		const resize = () => (filtersOpen = media.matches);
		media.addEventListener('change', resize);
		fetchCatalog()
			.then((c) => (catalog = c))
			.catch(
				() =>
					(updateError =
						'Mostramos la última carga incluida en la web. No pudimos consultar cambios más recientes.')
			);
		return () => media.removeEventListener('change', resize);
	});
</script>

<svelte:head
	><title>Sitios para campamento | Tropa San Luis</title><meta
		name="description"
		content="Lugares para campamentos scout en Chile. Busca por región, capacidad, hectáreas, agua potable, baños y distancia desde Santiago."
	/></svelte:head
>
<header class="intro">
	<div>
		<h1>Encuentra el próximo campamento</h1>
		<p>Lugares reunidos por la Tropa San Luis, para compartir entre grupos scout.</p>
	</div>
	<div class="actions">
		<a class="button primary" href="/sitios/aportar"
			><Plus size={18} aria-hidden="true" />Aportar un lugar</a
		>
	</div>
</header>
<div class="searchbar">
	<Search size={20} aria-hidden="true" /><label class="sr-only" for="site-search"
		>Buscar nombre, localidad o característica</label
	><input
		id="site-search"
		type="search"
		placeholder="Busca un lugar, comuna o característica…"
		bind:value={filters.q}
		on:input={() => queueMicrotask(syncUrl)}
	/>
</div>
{#if updateError}<p class="notice">{updateError}</p>{/if}
<div class="workspace">
	<form
		on:submit|preventDefault={syncUrl}
		on:input={() => queueMicrotask(syncUrl)}
		on:change={() => queueMicrotask(syncUrl)}
		aria-label="Filtrar lugares"
	>
		<details class="filters" bind:open={filtersOpen}>
			<summary
				><span
					><SlidersHorizontal
						size={17}
						style="display:inline;vertical-align:middle;margin-right:6px"
						aria-hidden="true"
					/>Filtros {filterCount ? `(${filterCount})` : ''}</span
				><span class="small muted">Abrir / cerrar</span></summary
			>
			<div class="filter-fields">
				<div class="filter-title">
					<h2>Tu campamento</h2>
					<button class="quiet" type="button" on:click={clear}>Limpiar</button>
				</div>
				<label
					>Región<select bind:value={filters.region}
						><option value="">Todas las regiones</option>{#each REGIONS as r}<option value={r}
								>{r}</option
							>{/each}</select
					></label
				>
				<div>
					<NumberField
						label="Personas para acampar"
						placeholder="Sin mínimo"
						bind:value={filters.people}
					/>
					<div class="presets">
						{#each ['60', '300', '400'] as n}<button
								type="button"
								aria-pressed={filters.people === n}
								on:click={() => preset(n)}>{n}</button
							>{/each}
					</div>
				</div>
				<div>
					<NumberField
						label="Distancia desde Santiago"
						placeholder="Máximo de km"
						bind:value={filters.maxDistance}
					/><label class="small" style="margin-top:8px"
						>Medición<select bind:value={filters.distanceMode}
							><option value="road">Por carretera (estimada)</option><option value="straight"
								>En línea recta</option
							></select
						></label
					><span class="hint">Desde Plaza de Armas. El acceso final debe confirmarse.</span>
				</div>
				<div>
					<label
						>Superficie<select bind:value={filters.areaScope}
							><option value="total">Hectáreas totales</option><option value="camp"
								>Hectáreas para acampar</option
							></select
						></label
					>
					<div class="range" style="margin-top:8px">
						<NumberField
							label="Desde"
							placeholder="ha"
							min={0.01}
							step="any"
							bind:value={filters.minArea}
						/><NumberField
							label="Hasta"
							placeholder="ha"
							min={0.01}
							step="any"
							bind:value={filters.maxArea}
						/>
					</div>
				</div>
				<label
					>Agua potable<select bind:value={filters.water}
						><option value="">Sin preferencia</option><option value="si"
							>Con agua potable informada</option
						><option value="no">Sin agua potable</option></select
					></label
				>
				<label
					>Baños<select bind:value={filters.toilets}
						><option value="">Sin preferencia</option><option value="si"
							>Con baños, incluso sencillos</option
						><option value="no">Sin baños</option></select
					></label
				>
				<details class="full">
					<summary>Más filtros y etiquetas</summary>
					<div class="filter-fields">
						<label
							>Tipo de lugar<select bind:value={filters.kind}
								><option value="">Todos</option><option value="rustico">Rústico</option><option
									value="equipado">Equipado</option
								><option value="mixto">Mixto</option></select
							></label
						>
						<label
							>Alojamiento<select bind:value={filters.accommodation}
								><option value="">Todos</option><option value="carpas">Carpas</option><option
									value="cabanas">Cabañas / refugios</option
								></select
							></label
						>
						<label
							>Entorno acuático<select bind:value={filters.environment}
								><option value="">Cualquiera</option>{#each ENVIRONMENTS as e}<option>{e}</option
									>{/each}</select
							></label
						>
						<label
							>Electricidad<select bind:value={filters.electricity}
								><option value="">Sin preferencia</option><option value="si"
									>Con electricidad</option
								><option value="no">Sin electricidad</option></select
							></label
						>
						<label
							>Acceso de bus al predio<select bind:value={filters.bus}
								><option value="">Sin preferencia</option><option value="si">Informado</option
								><option value="no">Sin acceso</option></select
							></label
						>
						<fieldset style="border:0;padding:0">
							<legend style="font-size:.9rem;font-weight:600">Características</legend>
							<div class="tag-options">
								{#each TAGS as tag}<label class="check"
										><input type="checkbox" value={tag} bind:group={filters.tags} />{tag}</label
									>{/each}
							</div>
						</fieldset>
					</div>
				</details>
				<label class="check full"
					><input type="checkbox" bind:checked={filters.unknown} />Incluir lugares con datos
					pendientes</label
				>
			</div>
		</details>
	</form>
	<section aria-label="Resultados de búsqueda">
		<div class="results-header">
			<div>
				<h2 aria-live="polite">{results.length} {results.length === 1 ? 'lugar' : 'lugares'}</h2>
				{#if pendingCount && filterCount}<span class="small muted"
						>{results.length - pendingCount} con los datos buscados · {pendingCount} por confirmar</span
					>{/if}
			</div>
			<label
				>Ordenar<select bind:value={filters.sort} on:change={syncUrl}
					><option value="name">Nombre</option><option value="distance">Menor distancia</option
					><option value="capacity">Mayor capacidad</option><option value="area"
						>Mayor superficie</option
					><option value="reviewed">Revisión reciente</option></select
				></label
			>
		</div>
		{#if filterCount}<div class="chips" aria-label="Filtros activos">
				{#each active as [key, label]}<button
						type="button"
						on:click={() => remove(key)}
						aria-label={`Quitar filtro ${label}`}
						>{label}: {values[String(filters[key as keyof Filters])] ||
							filters[key as keyof Filters]}<X size={13} aria-hidden="true" /></button
					>{/each}{#each filters.tags as tag}<button
						type="button"
						on:click={() => {
							filters = { ...filters, tags: filters.tags.filter((t) => t !== tag) };
							syncUrl();
						}}
						aria-label={`Quitar etiqueta ${tag}`}>{tag}<X size={13} aria-hidden="true" /></button
					>{/each}
			</div>{/if}
		<p class="notice">
			Son antecedentes para empezar a buscar. La capacidad, el agua potable y los baños deben
			confirmarse con cada lugar.
		</p>
		{#if results.length === 0}<div class="empty">
				<h2>No hay lugares con esta combinación</h2>
				<p>
					Prueba ampliar la región o incluir datos pendientes. Todavía estamos completando las
					fichas.
				</p>
				<button on:click={clear}>Limpiar filtros</button>
			</div>{/if}
		{#each results.slice(0, limit) as { site, pending } (site.id)}
			<article class="result">
				<div class="result-head">
					<div>
						<h3><a href={`/sitios/${site.id}`}>{site.name}</a></h3>
						<div class="location">{[site.commune, site.region].filter(Boolean).join(' · ')}</div>
					</div>
					{#if site.distance}<span class="badge"
							>{filters.distanceMode !== 'straight' && site.distance.roadKm !== null
								? `${formatNumber(site.distance.roadKm)} km por carretera`
								: `${formatNumber(site.distance.straightKm)} km en línea recta`}</span
						>{/if}
				</div>
				<p class="result-description">{site.description}</p>
				<dl class="facts">
					<div>
						<dt>Personas en carpas</dt>
						<dd>
							{site.capacity
								? `${formatNumber(site.capacity)} aprox.`
								: site.accommodation === 'cabanas'
									? 'Solo cabañas / refugios'
									: 'Por confirmar'}
						</dd>
					</div>
					<div>
						<dt>Superficie total</dt>
						<dd>
							{site.areaHa
								? `${formatNumber(site.areaHa)} ha`
								: site.areaNote
									? 'Dato por revisar'
									: 'Por confirmar'}
						</dd>
					</div>
					<div>
						<dt>Agua potable</dt>
						<dd>
							{site.water === 'si'
								? 'Informada'
								: site.water === 'no'
									? 'No disponible'
									: 'Por confirmar'}
						</dd>
					</div>
					<div>
						<dt>Baños</dt>
						<dd>
							{site.toilets === 'si'
								? 'Informados'
								: site.toilets === 'no'
									? 'No disponibles'
									: site.toilets === 'en-construccion'
										? 'En construcción'
										: 'Por confirmar'}
						</dd>
					</div>
				</dl>
				{#if site.environments.length || site.tags.length}<div class="tags">
						{#each [...site.environments, ...site.tags].slice(0, 6) as tag}<span class="tag"
								>{tag}</span
							>{/each}
					</div>{/if}
				{#if pending.length}<p class="pending">
						Falta confirmar para esta búsqueda: {pending.join(', ')}.
					</p>{/if}
				<div class="result-footer">
					<span
						>{site.sources.length}
						{site.sources.length === 1 ? 'fuente' : 'fuentes'} · Vigencia por confirmar</span
					><a href={`/sitios/${site.id}`}>Ver ficha<ArrowRight size={16} aria-hidden="true" /></a>
				</div>
			</article>{/each}
		{#if results.length > limit}<button class="load-more" on:click={() => (limit += 20)}
				>Mostrar más lugares ({results.length - limit} restantes)</button
			>{/if}
		<div class="actions" style="margin-top:26px">
			<button class="quiet" on:click={share}
				><Share2 size={17} aria-hidden="true" />Compartir búsqueda</button
			><a class="button quiet" href="/sitios/guia">Cómo se mantienen los datos</a>
		</div>
		{#if sharing}<p class="small muted" role="status">{sharing}</p>{/if}
	</section>
</div>
