<script lang="ts">
	import '$lib/catalog/catalog.css';
	import { page } from '$app/stores';
</script>

<div class="catalog">
	<nav class="subnav" aria-label="Sitios de campamento">
		<a href="/sitios" aria-current={$page.url.pathname === '/sitios' ? 'page' : undefined}
			>Catálogo</a
		>
		<a
			href="/sitios/historial"
			aria-current={$page.url.pathname === '/sitios/historial' ? 'page' : undefined}
			>Campamentos y visitas</a
		>
		<a
			href="/sitios/aportar"
			aria-current={$page.url.pathname === '/sitios/aportar' ? 'page' : undefined}
			>Aportar un dato</a
		>
	</nav>
	<slot />
</div>
