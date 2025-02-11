<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white">
	<!-- Header -->
	<header class="bg-red-500 text-white p-4">
		<div class="mx-auto flex justify-center items-center">
			<div class="bg-white rounded-full p-5">
				<img src="/logo-stl.png" alt="Logo" class="h-16" />
			</div>
			<!-- <div class="font-bold text-xl">Tropa San Luis</div> -->
		</div>
		<nav class="space-x-4 flex justify-center items-center mt-3">
			<a href="/" class="hover:underline">Inicio</a>
			<a href="/staff" class="hover:underline">Staff</a>
			<a href="/patrullas" class="hover:underline">Patrullas</a>
			<a href="/fotos" class="hover:underline">Fotos</a>
			<a href="/himnos" class="hover:underline">Himnos</a>
		</nav>
	</header>

	<!-- Contenido principal -->
	<main class="flex-grow container mx-auto p-4">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="bg-red-500 text-white p-4 text-center">
		© 2025 Tropa Scout. Todos los derechos reservados.
	</footer>
</div>
