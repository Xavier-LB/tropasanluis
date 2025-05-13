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
  let iframeHeight = "1500px";
</script>

<div class="prose max-w-4xl mx-auto">
  <h1 class="text-3xl font-bold text-center mb-6 text-red-600">Para Lucho en 100 Palabras</h1>
  
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 class="text-xl font-semibold mb-4">Envía tu cuento</h2>
    <p class="mb-6">
      Comparte tu historia para el concurso "Para Lucho en 100 Palabras". Tu cuento debe tener un máximo de 100 palabras
      y estar relacionado con experiencias scout en la Tropa San Luis.
    </p>
    
    <div class="bg-gray-50 p-4 border border-gray-200 rounded-md mb-6">
      <h3 class="text-lg font-medium mb-2">Bases del concurso:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li>Cada cuento debe tener un título original</li>
        <li>Extensión máxima: 100 palabras (sin contar el título)</li>
        <li>Temática: Experiencias scout en la Tropa San Luis</li>
        <li>Se aceptará un máximo de 3 cuentos por persona</li>
        <li>Los cuentos seleccionados serán publicados en nuestra web</li>
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