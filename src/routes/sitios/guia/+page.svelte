<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head><title>Cómo se mantiene el catálogo | Tropa San Luis</title></svelte:head>
<div class="measure">
	<a class="back" href="/sitios"><ArrowLeft size={17} aria-hidden="true" />Volver al catálogo</a>
	<h1>Un lugar, todas sus referencias</h1>
	<p>
		El catálogo reúne datos de planillas, presentaciones y páginas de los lugares. Una ficha puede
		tener varias fuentes, y cada una conserva su fecha y procedencia.
	</p>
	<section class="detail-section">
		<h2>Cómo interpretar una ficha</h2>
		<p>
			<strong>Informado</strong> significa que una fuente declara ese dato. No es una inspección
			reciente. <strong>Por confirmar</strong> significa que falta información suficiente; no que el
			servicio no exista.
		</p>
		<p>
			Si las fuentes se contradicen, conservamos la diferencia. Por ejemplo, dos superficies
			distintas no se promedian. Un río no acredita agua potable, y la cantidad de asistentes de una
			visita no fija la capacidad máxima del predio.
		</p>
		<p>
			Las distancias parten de Plaza de Armas de Santiago. Los kilómetros por carretera son
			estimaciones de automóvil de OSRM con cartografía OpenStreetMap, sin tráfico. Los kilómetros
			en línea recta aparecen por separado. Ninguno certifica acceso de bus o estado del camino.
		</p>
	</section>
	<section class="detail-section">
		<h2>Fotos y contactos</h2>
		<p>
			Preferimos enlazar la página, álbum o publicación original. No copiamos galerías de personas
			ni el contenido completo de grupos privados a este catálogo abierto. Los contactos públicos
			deben corresponder al lugar y conservar una fuente.
		</p>
	</section>
</div>
