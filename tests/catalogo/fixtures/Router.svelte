<script>
	import { afterUpdate } from 'svelte';
	export let stores;
	export let page;
	export let constructors;
	export let components = [];
	export let data_1 = null;
	export let form = null;
	// El contrato del root generado por Kit: publicar page antes de montar la ruta
	// y notificar el store después de actualizarla.
	$: stores.page.set(page);
	afterUpdate(() => stores.page.notify());
</script>

<svelte:component this={constructors[1]} bind:this={components[1]} data={data_1} {form} />
