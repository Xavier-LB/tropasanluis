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
  <h1 class="text-3xl font-bold text-center mb-6 text-red-600">Lucho cuentero</h1>
  
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 class="text-xl font-semibold mb-4">Envía tu cuento</h2>
    <p class="mb-6">
      Comparte tu historia para el concurso "Lucho cuentero". Tu cuento debe tener un máximo de 100 palabras
      y estar relacionado con experiencias scout en la Tropa San Luis.
    </p>
    
    <div class="bg-gray-50 p-4 border border-gray-200 rounded-md mb-6">
      <h3 class="text-lg font-medium mb-2">🏆 BASES I° CONCURSO LITERARIO TROPA SAN LUIS 🏆</h3>
      <ol class="list-decimal pl-5 space-y-2">
        <li>👨‍👩‍👧‍👦 Podrán participar todos aquellos que actualmente integren o alguna vez hayan integrado la Tropa San Luis.</li>
        <li>🏕️ La temática de los cuentos debe estar relacionada con experiencias vividas dentro de la Tropa San Luis.</li>
        <li>📝 Los cuentos no pueden superar las 100 palabras, sin contar el título.</li>
        <li>🔢 Cada participante puede presentar un máximo de tres cuentos, los cuales puede enviar en formato PDF ingresando al sitio <a href="https://www.tropasanluis.cl/lucho-cuentero" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-800">www.tropasanluis.cl/lucho-cuentero</a>. En esta página deberá llenar un formulario en el que se indique título del cuento, nombre completo, edad, relación con la Tropa (tropero/a, staff, extropero/a o exstaff), correo electrónico y número telefónico.</li>
        <li>👤 El relato debe incluir el nombre completo del autor/a, su edad y relación con la Tropa.</li>
        <li>📅 El plazo de recepción de cuentos se abrirá el sábado 24 de mayo y se cerrará el sábado 14 de junio a las 20:00 horas.</li>
        <li>👨‍⚖️ El jurado estará integrado por el Staff de Dirigentes de la Tropa San Luis, ninguno de sus constituyentes podrá participar en calidad de autor en el concurso.</li>
        <li>🥇 El jurado seleccionará 10 cuentos finalistas, de los cuales dirimirá un Primer Lugar, un Segundo Lugar, un Tercer Lugar. Además, el jurado elegirá dos menciones especiales: Premio al Talento Sanluisino (tropero/a) y Premio al Talento Exsanluisino (extroperos/as y exstaffs).</li>
        <li>🎁 El cuento ganador del Primer Lugar recibirá xxx; el Segundo Lugar, xxx; y el Tercer Lugar, xxx. Las dos menciones especiales: Premio al Talento Sanluisino y Premio al Talento Exsanluisino, recibirán xxx.</li>
        <li>📱 Luego de la ceremonia de premiación, los 10 cuentos finalistas se publicarán en la página web <a href="https://www.tropasanluis.cl" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-800">www.tropasanluis.cl</a> y en diferentes soportes para su difusión.</li>
        <li>📚 El compendio de cuentos se reunirá en un libro.</li>
        <li>✍️ Los cuentos deben tener el carácter de originales (de autoría propia). Los cuentos no pueden ser plagios, es decir, copias en lo sustancial de obras ajenas, dándolas como propias. En caso de infringirse lo anterior, el participante será plenamente responsable por todo tipo de daños y el cuento será descalificado.</li>
        <li>🆕 Los cuentos deben tener el carácter de inéditos (no haber sido publicados antes en cualquier formato, incluyendo internet y redes sociales).</li>
        <li>📖 Por la sola participación en el concurso el autor/a acepta que su cuento, junto con su nombre y apellidos, su relación con la Tropa y su edad, puedan ser incorporados en la edición de un libro con los mejores cuentos del concurso para ser distribuido gratuitamente.</li>
        <li>🤖 Por la sola participación en el concurso el autor/a de un cuento confirma que no ha utilizado ninguna herramienta de inteligencia artificial para su creación o edición.</li>
      </ol>
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