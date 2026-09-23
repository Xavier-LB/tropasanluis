<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Search,
		ArrowRight,
		ArrowDown,
		ArrowUp,
		SlidersHorizontal,
		Share2,
		X
	} from 'lucide-svelte';
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
	let filtersOpen = false;
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
	$: catalogueQuery = filtersQuery(filters);
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
	function sortBy(sort: string) {
		filters = { ...filters, sort };
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
		fetchCatalog()
			.then((c) => (catalog = c))
			.catch(
				() =>
					(updateError =
						'Mostramos la última carga incluida en la web. No pudimos consultar cambios más recientes.')
			);
	});
</script>

<svelte:head
	><title>Sitios para campamento | Tropa San Luis</title><meta
		name="description"
		content="Lugares para campamentos scout en Chile. Busca por región, capacidad, hectáreas, agua potable, baños y distancia desde Santiago."
	/></svelte:head
>
<div class="catalog-list">
	<header class="list-heading">
		<h1>Sitios de campamento</h1>
	</header>
	{#if sharing}<p class="list-message" role="status">{sharing}</p>{/if}
	{#if updateError}<p class="notice">{updateError}</p>{/if}
	<form
		on:submit|preventDefault={syncUrl}
		on:input={(event) => {
			if (event.target instanceof HTMLInputElement && event.target.type !== 'checkbox')
				queueMicrotask(syncUrl);
		}}
		on:change={() => queueMicrotask(syncUrl)}
		class:filters-expanded={filtersOpen}
		aria-label="Filtrar lugares"
	>
		<div class="filter-toolbar">
			<label class="search-field" for="site-search"
				>Buscar nombre, localidad o característica
				<span class="search-input"
					><Search size={17} aria-hidden="true" /><input
						id="site-search"
						type="search"
						placeholder="Nombre, comuna, característica…"
						bind:value={filters.q}
					/></span
				>
			</label>
			<label
				>Región<select bind:value={filters.region}
					><option value="">Todas las regiones</option>{#each REGIONS as r}<option value={r}
							>{r}</option
						>{/each}</select
				></label
			>
			<NumberField label="Personas para acampar" placeholder="Mínimo" bind:value={filters.people} />
			<NumberField
				label="Distancia desde Santiago"
				placeholder="Máximo km"
				bind:value={filters.maxDistance}
			/>
			<button
				class="filter-toggle"
				type="button"
				aria-expanded={filtersOpen}
				aria-controls="extra-filters"
				on:click={() => (filtersOpen = !filtersOpen)}
				><SlidersHorizontal size={16} aria-hidden="true" /><span class="desktop-label"
					>Más filtros</span
				><span class="mobile-label">Filtros{filterCount ? ` (${filterCount})` : ''}</span></button
			>
			<button class="quiet" type="button" on:click={clear}>Limpiar</button>
		</div>
		<div id="extra-filters" hidden={!filtersOpen}>
			<div class="extra-fields">
				<div>
					<span class="field-label">Grupos habituales</span>
					<div class="presets">
						{#each ['60', '300', '400'] as n}<button
								type="button"
								aria-pressed={filters.people === n}
								on:click={() => preset(n)}>{n} pers.</button
							>{/each}
					</div>
				</div>
				<label
					>Medición de distancia<select bind:value={filters.distanceMode}
						><option value="road">Por carretera (estimada)</option><option value="straight"
							>En línea recta</option
						></select
					></label
				>
				<div>
					<label
						>Superficie<select bind:value={filters.areaScope}
							><option value="total">Hectáreas totales</option><option value="camp"
								>Hectáreas para acampar</option
							></select
						></label
					>
					<div class="range">
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
						><option value="">Sin preferencia</option><option value="si">Con electricidad</option
						><option value="no">Sin electricidad</option></select
					></label
				>
				<label
					>Acceso de bus al predio<select bind:value={filters.bus}
						><option value="">Sin preferencia</option><option value="si">Informado</option><option
							value="no">Sin acceso</option
						></select
					></label
				>
			</div>
			<fieldset class="extra-tags">
				<legend>Características</legend>
				<div class="tag-options">
					{#each TAGS as tag}<label class="check"
							><input type="checkbox" value={tag} bind:group={filters.tags} />{tag}</label
						>{/each}
				</div>
			</fieldset>
			<label class="check"
				><input type="checkbox" bind:checked={filters.unknown} />Incluir datos pendientes</label
			>
		</div>
	</form>
	{#if filterCount}<div class="chips" aria-label="Filtros activos">
			{#each active as [key, label]}<button
					type="button"
					on:click={() => remove(key)}
					aria-label={`Quitar filtro ${label}`}
					>{label}: {values[String(filters[key as keyof Filters])] ||
						filters[key as keyof Filters]}<X size={13} aria-hidden="true" /></button
				>{/each}
			{#each filters.tags as tag}<button
					type="button"
					on:click={() => {
						filters = { ...filters, tags: filters.tags.filter((t) => t !== tag) };
						syncUrl();
					}}
					aria-label={`Quitar etiqueta ${tag}`}>{tag}<X size={13} aria-hidden="true" /></button
				>{/each}
		</div>{/if}
	<section aria-label="Resultados de búsqueda">
		<div class="table-toolbar">
			<div class="result-count">
				<h2 aria-live="polite">{results.length} {results.length === 1 ? 'lugar' : 'lugares'}</h2>
				{#if pendingCount && filterCount}<span class="muted">{pendingCount} por confirmar</span
					>{/if}
			</div>
			<label class="table-sort"
				>Ordenar<select bind:value={filters.sort} on:change={syncUrl}
					><option value="name">Nombre</option><option value="distance">Menor distancia</option
					><option value="capacity">Mayor capacidad</option><option value="area"
						>Mayor superficie</option
					><option value="reviewed">Revisión reciente</option></select
				></label
			>
		</div>
		<p class="table-note" id="table-note">
			S/d: sin datos. Servicios y capacidad por confirmar con el lugar. Distancia {filters.distanceMode ===
			'straight'
				? 'en línea recta'
				: 'estimada por carretera'} desde Plaza de Armas.
		</p>
		<p class="scroll-hint">Desliza la tabla para ver más columnas. El nombre queda fijo.</p>
		{#if results.length === 0}
			<div class="empty">
				<h2>No hay lugares con esta combinación</h2>
				<p>Prueba ampliar la región o incluir datos pendientes.</p>
				<button on:click={clear}>Limpiar filtros</button>
			</div>
		{:else}
			<!-- Scrollable region must be keyboard-focusable for arrow-key scrolling. -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="table-scroll"
				role="region"
				aria-label="Tabla de sitios, desplazable"
				tabindex="0"
				aria-describedby="table-note"
			>
				<table class="site-table">
					<caption class="sr-only"
						>Sitios de campamento. Abre el nombre de un lugar para ver contactos, fuentes, fotos y
						antecedentes.</caption
					>
					<thead
						><tr>
							<th
								scope="col"
								class="name-column"
								aria-sort={filters.sort === 'name' ? 'ascending' : undefined}
								><button class:sorted={filters.sort === 'name'} on:click={() => sortBy('name')}
									>Lugar{#if filters.sort === 'name'}<ArrowUp
											size={14}
											aria-hidden="true"
										/>{/if}</button
								></th
							>
							<th scope="col" class="place-column">Comuna / región</th>
							<th
								scope="col"
								class="number-column"
								aria-sort={filters.sort === 'distance' ? 'ascending' : undefined}
								><button
									class:sorted={filters.sort === 'distance'}
									on:click={() => sortBy('distance')}
									>Km{#if filters.sort === 'distance'}<ArrowUp
											size={14}
											aria-hidden="true"
										/>{/if}</button
								></th
							>
							<th
								scope="col"
								class="number-column"
								aria-sort={filters.sort === 'capacity' ? 'descending' : undefined}
								><button
									class:sorted={filters.sort === 'capacity'}
									on:click={() => sortBy('capacity')}
									>Personas{#if filters.sort === 'capacity'}<ArrowDown
											size={14}
											aria-hidden="true"
										/>{/if}</button
								><span class="column-unit">en carpas</span></th
							>
							<th
								scope="col"
								class="number-column"
								aria-sort={filters.sort === 'area' ? 'descending' : undefined}
								><button class:sorted={filters.sort === 'area'} on:click={() => sortBy('area')}
									>Ha{#if filters.sort === 'area'}<ArrowDown
											size={14}
											aria-hidden="true"
										/>{/if}</button
								><span class="column-unit"
									>{filters.areaScope === 'camp' ? 'acampada' : 'totales'}</span
								></th
							>
							<th scope="col" class="service-column"
								>Agua<span class="column-unit">potable</span></th
							>
							<th scope="col" class="service-column">Baños</th>
							<th scope="col" class="tags-column">Entorno / etiquetas</th>
							<th scope="col" class="file-column"><span class="sr-only">Ficha completa</span></th>
						</tr></thead
					>
					<tbody
						>{#each results.slice(0, limit) as { site, pending } (site.id)}
							{@const distance =
								filters.distanceMode === 'straight'
									? site.distance?.straightKm
									: site.distance?.roadKm}
							{@const area = filters.areaScope === 'camp' ? site.campAreaHa : site.areaHa}
							{@const tags = [
								...(site.kind !== 'por-confirmar' ? [values[site.kind]] : []),
								...site.environments,
								...site.tags
							].join(' · ')}
							{@const href = `/sitios/${site.id}${catalogueQuery ? `?${catalogueQuery}` : ''}`}
							<tr class="site-row">
								<th scope="row" class="name-column"
									><a class="site-name" {href}>{site.name}</a>{#if pending.length}<span
											class="row-pending"
											title={`Falta confirmar: ${pending.join(', ')}`}
											>Datos pendientes<span class="sr-only">: {pending.join(', ')}</span></span
										>{/if}</th
								>
								<td class="place-column"
									><span>{site.commune || site.locality || 'S/d'}</span><span class="cell-secondary"
										>{site.region}</span
									></td
								>
								<td class="numeric" class:no-data={distance == null}
									>{distance == null ? 'S/d' : formatNumber(distance)}</td
								>
								<td class="numeric" class:no-data={site.capacity === null}
									>{site.capacity === null
										? site.accommodation === 'cabanas'
											? 'Cabañas'
											: 'S/d'
										: formatNumber(site.capacity)}</td
								>
								<td
									class="numeric"
									class:no-data={area === null}
									title={area === null && site.areaNote ? site.areaNote : undefined}
									>{area === null ? (site.areaNote ? 'Revisar' : 'S/d') : formatNumber(area)}</td
								>
								<td
									class:service-yes={site.water === 'si'}
									class:no-data={site.water === 'sin-datos'}
									>{site.water === 'si' ? 'Sí' : site.water === 'no' ? 'No' : 'S/d'}</td
								>
								<td
									class:service-yes={site.toilets === 'si'}
									class:no-data={site.toilets === 'sin-datos'}
									>{site.toilets === 'si'
										? 'Sí'
										: site.toilets === 'no'
											? 'No'
											: site.toilets === 'en-construccion'
												? 'En obra'
												: 'S/d'}</td
								>
								<td class="tags-column"
									><span class="table-tags" title={tags}>{tags || 'S/d'}</span></td
								>
								<td class="file-column"
									><a class="file-link" {href} aria-label={`Ver ficha de ${site.name}`}
										><ArrowRight size={17} aria-hidden="true" /></a
									></td
								>
							</tr>
						{/each}</tbody
					>
				</table>
			</div>
		{/if}
		<div class="table-footer">
			<span>Mostrando {Math.min(limit, results.length)} de {results.length}</span
			>{#if results.length > limit}<button class="load-more" on:click={() => (limit += 20)}
					>Mostrar más lugares ({results.length - limit} restantes)</button
				>{/if}
			<button class="quiet" on:click={share}
				><Share2 size={16} aria-hidden="true" />Compartir búsqueda</button
			><a href="/sitios/guia">Cómo se mantienen los datos</a>
		</div>
	</section>
</div>
