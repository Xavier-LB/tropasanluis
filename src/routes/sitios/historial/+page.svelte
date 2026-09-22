<script lang="ts">
	import { onMount } from 'svelte';
	import { Search, Plus } from 'lucide-svelte';
	import seed from '$lib/catalog/seed';
	import type { Catalog } from '$lib/catalog/model';
	import { normalize } from '$lib/catalog/search';
	import { fetchCatalog } from '$lib/catalog/api';
	let catalog = seed as Catalog,
		q = '',
		status = '',
		limit = 25;
	$: visits = catalog.visits
		.filter(
			(v) =>
				(!q || normalize(`${v.place} ${v.group} ${v.date} ${v.notes}`).includes(normalize(q))) &&
				(!status || v.status === status)
		)
		.sort((a, b) => b.date.localeCompare(a.date));
	const names: Record<string, string> = {
		realizado: 'Realizado',
		exploracion: 'Exploración',
		planificado: 'Planificado',
		cancelado: 'Cancelado',
		'por-confirmar': 'Realización por confirmar'
	};
	onMount(() => {
		fetchCatalog()
			.then((c) => (catalog = c))
			.catch(() => {});
	});
</script>

<svelte:head><title>Campamentos y visitas | Tropa San Luis</title></svelte:head>
<header class="intro">
	<div>
		<h1>Los lugares donde hemos estado</h1>
		<p>Historial de campamentos y experiencias compartidas por los grupos.</p>
	</div>
	<a class="button primary" href="/sitios/aportar?tipo=visita"
		><Plus size={18} aria-hidden="true" />Registrar visita</a
	>
</header>
<p class="notice">
	Las primeras {seed.visits.length} referencias provienen del historial de verano de la tropa. Muchas
	nombran una localidad: todavía falta identificar el predio. Los asistentes de una visita no representan
	la capacidad máxima del lugar.
</p>
<div class="form-grid">
	<div class="searchbar">
		<Search size={20} aria-hidden="true" /><label class="sr-only" for="history-search"
			>Buscar lugar, grupo o año</label
		><input
			id="history-search"
			type="search"
			placeholder="Busca un lugar, grupo o año…"
			bind:value={q}
		/>
	</div>
	<label
		>Estado<select bind:value={status}
			><option value="">Todos los estados</option>{#each Object.entries(names) as [k, v]}<option
					value={k}>{v}</option
				>{/each}</select
		></label
	>
</div>
<p class="small muted" aria-live="polite">{visits.length} registros</p>
{#if !visits.length}<div class="empty">
		<h2>No hay visitas con estos filtros</h2>
		<p>Prueba otro nombre o año.</p>
	</div>{/if}
<div class="visits">
	{#each visits.slice(0, limit) as v (v.id)}<article class="visit">
			<time>{v.date}</time>
			<div>
				<h2 style="font-size:1.1rem;margin-bottom:6px">
					{v.siteId ? catalog.sites.find((s) => s.id === v.siteId)?.name || v.place : v.place}
				</h2>
				<p>
					<strong>{v.group}</strong> · {names[v.status]}{v.people
						? ` · ${v.people} asistentes`
						: ''}
				</p>
				<p class="muted">{v.notes}</p>
				{#if v.siteId}<a href={`/sitios/${v.siteId}`}>Ver ficha del lugar</a
					>{:else if v.status !== 'cancelado'}<a
						href={`/sitios/aportar?tipo=correccion&nombre=${encodeURIComponent(v.place)}`}
						>Aportar la ubicación del predio</a
					>{/if}{#if v.sourceUrl}<span class="small">
						· <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer">Fuente</a></span
					>{/if}
			</div>
		</article>{/each}
</div>
{#if visits.length > limit}<button class="load-more" on:click={() => (limit += 25)}
		>Mostrar más registros</button
	>{/if}
