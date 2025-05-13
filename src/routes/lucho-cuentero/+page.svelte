<script lang="ts">
  /**
   * URL del Google Form
   * Nota: Deberás reemplazar esta URL con tu formulario real de Google
   */
  let googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd1szUobTn94UkDnWOolPMXxVCmxzIdSHO9sKsC31jVWQD1ng/viewform?usp=header";
</script>

<div class="prose max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold text-center mb-6 text-red-600">Lucho cuentero</h1>
  
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 class="text-xl font-semibold mb-4">Envía tu cuento</h2>
    <p class="mb-6">
      Comparte tu historia para el concurso "Lucho cuentero". Tu cuento debe tener un máximo de 100 palabras
      y estar relacionado con experiencias scout en la Tropa San Luis.
    </p>
    
    <div class="bg-gray-50 p-4 border border-gray-200 rounded-md mb-6">
      
      <!-- Imagen de las bases -->
      <div class="mb-6">
        <img 
          src="/bases-lucho-cuentero.webp" 
          alt="Bases del concurso Lucho Cuentero" 
          class="w-full rounded-md shadow-sm" 
        />
      </div>
      
      <div class="text-center">
        <a 
          href="/bases-lucho-cuentero.pdf" 
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
    <!-- Botón para enviar cuento -->
    <a 
      href={googleFormUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
      Enviar mi cuento
    </a>

  </div>
</div> 