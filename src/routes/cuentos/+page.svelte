<script lang="ts">
  /**
   * URL del Google Form embedido
   * Nota: Deberás reemplazar esta URL con tu formulario real de Google
   */
//   let googleFormUrl = "https://docs.google.com/forms/d/e/AQUI_TU_ID_DE_FORMULARIO/viewform?embedded=true";
  let googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd1szUobTn94UkDnWOolPMXxVCmxzIdSHO9sKsC31jVWQD1ng/viewform?embedded=true";
  
  /**
   * Altura del iframe para mostrar el formulario
   */
  let iframeHeight = "1200px";
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
      <h3 class="text-lg font-medium mb-2">Instrucciones:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Escribe un título para tu cuento</li>
        <li>Incluye tu nombre completo</li>
        <li>Tu cuento debe tener máximo 100 palabras</li>
        <li>El contenido debe relacionarse con experiencias en la Tropa San Luis</li>
      </ul>
    </div>
  </div>
  
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <!-- Google Form iframe -->
    <iframe 
      src={googleFormUrl} 
      width="100%" 
      height={iframeHeight}
      frameborder="0" 
      marginheight="0" 
      marginwidth="0"
      title="Formulario de envío de cuentos"
      class="w-full">
      Cargando formulario...
    </iframe>
  </div>
</div> 