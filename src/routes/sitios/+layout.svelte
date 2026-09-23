<script lang="ts">
	import '$lib/catalog/catalog.css';
	import '$lib/catalog/catalog-list.css';
	import { page } from '$app/stores';
</script>

<div class="catalog" class:compact-catalog={$page.url.pathname === '/sitios'}>
	<nav class="subnav" aria-label="Sitios de campamento">
		<a href="/sitios" aria-current={$page.url.pathname === '/sitios' ? 'page' : undefined}
			>Catálogo</a
		>
		<a
			href="/sitios/historial"
			aria-current={$page.url.pathname === '/sitios/historial' ? 'page' : undefined}
			>Campamentos y visitas</a
		>
	</nav>
	<slot />
</div>
