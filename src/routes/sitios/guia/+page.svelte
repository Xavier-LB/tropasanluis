<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head><title>Cómo se mantiene el catálogo | Tropa San Luis</title></svelte:head>
<div class="measure">
	<a class="back" href="/sitios"><ArrowLeft size={17} aria-hidden="true" />Volver al catálogo</a>
	<h1>Un lugar, todas sus referencias</h1>
	<p>
		El catálogo reúne datos de planillas, páginas de los lugares y aportes de grupos scout. Una
		ficha puede tener varias fuentes, y cada una conserva su fecha y procedencia.
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
		<h2>Agregar, corregir y contar una visita</h2>
		<p>
			Usa <a href="/sitios/aportar">Aportar un dato</a> para completar un formulario, pegar una publicación
			o registrar una salida. El sistema sugiere lugares parecidos antes de crear uno nuevo.
		</p>
		<p>
			Los aportes se guardan para revisión. Se comprueba la fuente, se separan contactos del lugar
			de datos internos y se decide si corresponde completar una ficha o crear otra. El correo de
			quien aporta nunca se publica.
		</p>
		<p>
			Una visita puede ser realizada, exploratoria, planificada o cancelada. Solo las experiencias
			autorizadas para compartir pasan al historial público.
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
	<section class="detail-section">
		<h2>Revisión y mantenimiento</h2>
		<p>
			Los responsables revisan los aportes con el acceso existente al <a
				href="https://app.netlify.com/projects/tropasanluis/blobs"
				target="_blank"
				rel="noopener noreferrer">panel privado del sitio</a
			>. Las correcciones conservan una copia de la versión anterior y se pueden restaurar. No hace
			falta volver a importar todos los documentos para actualizar una ficha.
		</p>
		<p>
			La primera carga contiene 30 lugares de las listas 2024 y avanzada, además del historial de
			verano. Las planillas antiguas y el respaldo de Facebook quedan como fuentes pendientes de
			revisar por lotes.
		</p>
	</section>
</div>
