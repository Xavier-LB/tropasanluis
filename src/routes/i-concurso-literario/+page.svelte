<script lang="ts">
  import { onMount } from 'svelte';
  import DiscreteTimer from '$lib/DiscreteTimer.svelte';
  
  /**
   * URL del Google Form
   * Nota: Deberás reemplazar esta URL con tu formulario real de Google
   */
  let googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd1szUobTn94UkDnWOolPMXxVCmxzIdSHO9sKsC31jVWQD1ng/viewform?usp=header";
  
  /**
   * Fecha de lanzamiento del formulario
   */
  const fechaLanzamiento = "24 de mayo de 2025 a las 00:00";
  let formularioActivo = false;
  
  onMount(() => {
    // Verificar si ya pasó la fecha de lanzamiento
    const fechaLimite = new Date("2025-05-24T00:00:00-04:00");
    const ahora = new Date();
    formularioActivo = ahora >= fechaLimite;
  });

  /**
   * Metadatos para SEO y redes sociales
   */
  const pageTitle = "Concurso literario STL";
  const pageDescription = "Participa en el concurso Lucho Cuentero de la Tropa San Luis. Comparte tu historia de máximo 100 palabras sobre experiencias scout.";
  const pageImage = "/bases-i-concurso-literario.webp";
  const pageUrl = "https://tropasanluis.cl/i-concurso-literario";
</script>

<svelte:head>
  <!-- Metadatos básicos -->
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta name="keywords" content="lucho cuentero, scouts, tropa san luis, concurso, cuento, relato, scout" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content={pageImage} />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageUrl} />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={pageDescription} />
  <meta property="twitter:image" content={pageImage} />
  
  <!-- Información adicional -->
  <meta name="author" content="Tropa San Luis" />
  <link rel="canonical" href={pageUrl} />
</svelte:head>

<div class="prose max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold text-center mb-6 text-red-600">I CONCURSO LITERARIO TROPA SAN LUIS</h1>
  
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <div class="bg-gray-50 p-4 border border-gray-200 rounded-md mb-6">
      
      <!-- Imagen de las bases -->
      <div class="mb-6">
        <img 
          src="/bases-i-concurso-literario.webp" 
          alt="Bases del concurso Lucho Cuentero" 
          class="w-full rounded-md shadow-sm" 
        />
      </div>
      
      <div class="text-center">
        <a 
          href="/bases-i-concurso-literario.pdf" 
          download
          class="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Descargar Bases Completas (PDF)</span>
        </a>
      </div>
      
      <p class="mt-4 text-sm text-center text-gray-600">
        Recuerda leer detenidamente las bases antes de enviar tu cuento.
        <br>El plazo de recepción se cierra el 14 de junio a las 20:00 horas.
      </p>
    </div>
  </div>
  
  <div class="bg-white shadow-lg rounded-lg overflow-hidden p-6 text-center">
    {#if formularioActivo}
      <!-- Botón para enviar cuento -->
      <a 
        href={googleFormUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
        Enviar mi cuento
      </a>
    {:else}
      <div class="mb-4">
        <p class="font-medium text-gray-700">El formulario estará disponible a partir del 24 de mayo de 2025</p>
      </div>
      
      <DiscreteTimer 
        fechaStr={fechaLanzamiento}
        customDate="2025-05-24T00:00:00-04:00" 
        label="Tiempo para abrir el formulario:" 
      />
    {/if}
  </div>
</div> 