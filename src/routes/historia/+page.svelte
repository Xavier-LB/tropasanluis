<script lang="ts">
  import { onMount } from 'svelte';
  
  // Datos para la línea de tiempo
  const timelineEvents = [
    { year: 1933, event: "El 21 de junio se realiza una excursión preparatoria. El 29 de junio se oficializa la fundación de la brigada de exploradores. Es donde empezamos a formar parte de los Exploradores de Chile-Sección San Ignacio. Su fundador es el P. Luis Ramírez Silva S.J. y el primer jefe es el profesor Guillermo Laurente." },
    { year: 1935, event: "Se habla indistintamente de club de excursionistas, brigada scout o brigada de exploradores." },
    { year: 1951, event: "Se fundan las primeras patrullas del grupo scout. Los Lobos y los Halcones." },
    { year: 1952, event: "Se fundan las patrullas Cóndores y Castores." },
    { year: 1953, event: "Se funda la patrulla Tigres." },
    { year: 1955, event: "Se funda la patrulla Pumas. Se ve necesaria la reestructuración y pasa a reconocerse la Brigada, como Grupo Scout San Ignacio. El 18 de mayo se constituyen las Tropas San Ignacio y San Luis. Jefe de la STI es Diego Richard y jefe de la STL es Emilio Gálvez. La STI pasa a estar conformada por los Lobos, Cóndores y Pumas, mientras la San Luis es conformada por los Halcones, Castores y Tigres." },
    { year: 1957, event: "Se crea oficialmente a la patrulla Antílopes un día 1 de mayo, a partir de las patrullas Tigres y Cóndores, Su primer jefe es Cristián Yañez (Tigre)." },
    { year: 1959, event: "Nace la Tropa Cruz de la Montaña el 5 de agosto, formando 2 nuevas patrullas, Los Búfalos y Las Águilas. Más tarde se independizará para ser la base del Grupo Scout del Colegio San Ignacio El Bosque." },
    { year: 1968, event: "La patrulla Tigres gana el campamento nacional de pistas. Nace la Tropa Cruz del Sur (vivirá hasta 1977)." },
    { year: 1969, event: "Nace la Tropa Cruz de las Praderas (vivirá hasta 1972)." },
    { year: 1970, event: "La Tropa San Luis crea una manada con el mismo nombre, al igual que la STI. Las tropas Cruz del Sur y Cruz de las Praderas crean la Manada Cruz de la Selva (ya en el San Ignacio del Bosque). Al mismo tiempo que nace la Avanzada de los Pioneros un 20 de junio." },
    { year: 1971, event: "El Grupo se extiende hasta una escuela vecina donde se forma otra Tropa. El crecimiento es tal que pasamos a tener la categoría de Localidad, con voz y voto en la Asamblea Nacional. La localidad tiene 4 grupos: San Luis (Manada y Tropa), San Ignacio (Manada y Tropa), Cruz del Sur (Manada y 2 Tropas), Guatemala (1 Tropa). Los Pioneros pasan a depender de la Localidad." },
    { year: 1972, event: "La patrulla Búfalos es refundada, y rescatada de la Tropa Cruz de las Montañas, esta Tropa ahora perteneciente al Grupo Scout del San Ignacio el Bosque. Se tomará como fecha de fundación de estas patrullas la primera vez que se fundaron en el SIAO (1959). La Manada San Luis se disuelve y se crea la Manada Yumenantú." },
    { year: 1974, event: "La Federación de Scouts Católicos se fusiona con la antigua Asociación. La localidad vuelve a ser Grupo Scout San Ignacio, Conformada por 2 manadas (San Ignacio y Yumenantu) y 3 Tropas (San Luis, San Ignacio y Cruz del Sur)." },
    { year: 1977, event: "A fines de año se ve necesario fusionar las Manadas existentes, quedando así una sola, la Manada Yumenantú. Se disuelve la Tropa Cruz del Sur. Queda solo una patrulla, la cual es integrada a la STI (Leopardos)." },
    { year: 1978, event: "Nace la Tropa San Francisco Javier." },
    { year: 1982, event: "Se Refunda la patrulla Águilas, la cual al igual que los Búfalos es rescatada de la Tropa Cruz de las Montañas, y se refunda en su institución de origen, el Grupo Scout San Ignacio (Alonso Ovalle). Para lo cual se toma su fecha de fundación en este grupo, como la fundación definitiva de la patrulla. La Tropa San Luis cumple 30 años de vida." },
    { year: 1984, event: "Por medio de una guerra de pañolines entre Águilas y Halcones, se disuelve la patrulla Águilas." },
    { year: 1985, event: "Desaparece la Manada Paillimanque. El Guía de Guías esconde su pañolín de Tropa bajo una cascada, formando una capsula del tiempo." },
    { year: 1986, event: "Se disuelve la patrulla Búfalos, por medio de una guerra de pañolines contra los Tigres. Ganan los Tigres. Renacen los Pioneros, por medio de scouts salidos de las tres Tropas, los cuales desean seguir viviendo en comunidad al estilo scout. Más tarde se institucionalizará la rama Ruta. En septiembre se realiza el \"Campamento de la Paz\", en las Palmas de Cocalán (Palmerías). Asisten alrededor de 300 personas. Mientras se realiza el Campamento de Palmerías, el 10 de septiembre fallece el P. Luis Ramírez S.J. Fundador del Scoutismo en el SIAO. La noticia llega al campamento." },
    { year: 1993, event: "Se crea la rama Ruta oficialmente." },
    { year: 1999, event: "Se disuelve la patrulla Halcones." },
    { year: 2001, event: "Se refunda la patrulla Búfalos el día 15 de agosto. La tropa pasa a tener 4 patrullas." },
    { year: 2005, event: "Se refunda la patrulla Halcones. La Tropa pasa a tener 5 patrullas." },
    { year: 2008, event: "Se disuelve al inicio del año la patrulla Castores. Dentro del mismo año, y gracias a la gestión de parte de los Antílopes para conseguir gente, se logró salvar de la disolución. Campamento de Grupo, Palmerías. Después de 10 años de no ir a este lugar, se realiza con una asistencia de 320 scouts, convirtiéndose en el campamento de mayor asistencia y participación en la historia del Grupo." },
    { year: 2010, event: "Comienza el ingreso en las Manadas desde 3ro hasta 5to básico, y en las Tropas se reestructura desde 6to básico hasta 1ro medio. Se refunda la patrulla Castores al principio del año. Y en octubre de este mismo año, en el Jamboree Urbano, realizado en el Parque O'Higgins se refunda la Patrulla Águilas, debido a la gran cantidad de personas que poseía la Tropa." },
    { year: 2012, event: "Se disuelve la patrulla Águilas en el cambio de mando." },
    { year: 2015, event: "Se disuelven las patrullas Halcones y los Castores. La Tropa pasa a tener 3 patrullas." },
    { year: 2016, event: "Comienza a nivel nacional un cambio de mentalidad, el feminismo surge fuertemente hasta lograr radicarse definitivamente en el año 2018. En este año (2016) se terminan las danzas de contenido misógino." },
    { year: 2018, event: "El día 5 de mayo se refunda la patrulla Halcones. La Tropa está de vuelta con 4 patrullas. Fallece nuestro ex jefe de Tropa, Raúl \"gordo\" Jara. Nuestro actual jefe de Tropa (Vicente Espinoza) preside todas las ceremonias. Generaciones de SanLuisinos se reúnen tanto en el velorio como en el funeral en torno a esta figura." },
    { year: 2020, event: "Comienza la pandemia Covid-19, la Tropa es obligada a suspender toda actividad presencial." },
    { year: 2023, event: "El 5 de enero se lleva a cabo el primer campamento luego de 3 años en Cachapoal." }
  ];

  // Información sobre San Luis Gonzaga
  const aboutPatron = {
    birth: "9 de marzo de 1568 en Castiglione delle Stiviere, Marquesado de Castiglione",
    death: "21 de junio de 1591 en Roma",
    description: "Religioso Jesuita Italiano. Beatificado por Paulo V el 19 de octubre de 1605, y canonizado el 13 de diciembre de 1726 por Benedicto XIII, quien lo declaró patrón de la juventud, título confirmado por Pío XI el 13 de junio de 1926. Su fiesta se celebra el 21 de junio.",
    history: "Hijo mayor de 7 hermanos, era el primogénito de una familia de alta alcurnia. Estudió letras, ciencias y filosofía, leyó textos religiosos que le hicieron tomar la decisión de entrar en la Compañía de Jesús. En 1560-1593 la peste hizo estragos en Roma, causando miles de muertes. Luis atendió con heroísmo a los apestados, donde contrajo la enfermedad. Así moría a los 23 años, tras una vida rica en experiencias."
  };
  
  // Información sobre las patrullas actualmente
  const patrullas = [
    { nombre: "Halcones", fundacion: "1951", status: "Activa" },
    { nombre: "Castores", fundacion: "1952", status: "Activa" },
    { nombre: "Tigres", fundacion: "1953", status: "Activa" },
    { nombre: "Antílopes", fundacion: "1957", status: "Activa" },
    { nombre: "Búfalos", fundacion: "1959", status: "Activa" },
    { nombre: "Águilas", fundacion: "1959", status: "Disuelta" }
  ];
  
  // Jefes de la Tropa
  const jefes = [
    { periodo: "2010", nombre: "Camilo Duran \"Tarro\"" },
    { periodo: "2011", nombre: "Ignacio Manríquez" },
    { periodo: "2012", nombre: "Cristóbal Rojas" },
    { periodo: "2013-2014", nombre: "Ignacio Gimpert" },
    { periodo: "2015-2016", nombre: "Salvador Sacur \"Pape\"" },
    { periodo: "2017-2018", nombre: "Vicente Espinoza" },
    { periodo: "2019-2022", nombre: "Aníbal Ormeño" },
    { periodo: "2022-2024", nombre: "Agustín Browne" },
    { periodo: "2025-presente", nombre: "Catalina Fuentes \"Fu\"" }
  ];
  
  // Para animar elementos cuando sean visibles
  let timelineRef: HTMLElement | null = null;
  let isIntersecting = false;
  
  // Función para manejar el error de carga de imagen
  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/logo-stl-2.png';
  }
  
  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isIntersecting = true;
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      
      if (timelineRef) {
        observer.observe(timelineRef);
      }
      
      return () => observer.disconnect();
    } else {
      // Fallback para navegadores que no soportan IntersectionObserver
      isIntersecting = true;
    }
  });
</script>

<svelte:head>
  <title>Historia - Tropa San Luis</title>
  <meta name="description" content="Conoce la historia de la Tropa San Luis desde su fundación en 1952 hasta la actualidad." />
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Encabezado -->
  <div class="mb-12 text-center">
    <h1 class="text-5xl font-bold mb-6 text-center relative inline-block bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
      Historia de la Tropa San Luis
      <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-full"></div>
    </h1>
    <p class="text-lg text-gray-700 mt-6">
      Desde su fundación en 1952, la Tropa San Luis ha forjado una rica historia de tradiciones, servicio y hermandad scout.
    </p>
    <div class="flex justify-center mt-8">
      <img src="/logo-stl-2.png" alt="Logo Tropa San Luis" class="w-32 h-32 object-contain" />
    </div>
  </div>

  <!-- San Luis Gonzaga - Nuestro Patrono -->
  <section class="mb-16 bg-white rounded-lg p-8 shadow-md">
    <h2 class="text-3xl font-bold text-red-600 mb-4">San Luis Gonzaga - Nuestro Patrono</h2>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-3/5">
        <p class="mb-3"><strong>Nacimiento:</strong> {aboutPatron.birth}</p>
        <p class="mb-3"><strong>Fallecimiento:</strong> {aboutPatron.death}</p>
        <p class="mb-3">{aboutPatron.description}</p>
        <p>{aboutPatron.history}</p>
      </div>
      <div class="md:w-2/5 flex justify-center items-start">
        <div class="rounded-lg overflow-hidden shadow-md">
          <img src="/san-luis-gonzaga.jpg" alt="San Luis Gonzaga" class="w-full h-auto" 
               on:error={handleImageError} />
        </div>
      </div>
    </div>
  </section>

  <!-- Nuestra Tradición -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold text-red-600 mb-6">Nuestra Tradición</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-semibold text-red-600 mb-3">Los Colores de la Tropa</h3>
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 bg-red-600 rounded-md mr-3"></div>
          <p><strong>Rojo:</strong> Pasión</p>
        </div>
        <div class="flex items-center">
          <div class="w-8 h-8 bg-white border border-gray-300 rounded-md mr-3"></div>
          <p><strong>Blanco:</strong> Pureza</p>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-6 shadow-md">
        <h3 class="text-xl font-semibold text-red-600 mb-3">El Himno de la Tropa</h3>
        <p class="text-sm mb-4 italic">Coro:</p>
        <p class="mb-1 text-center font-medium text-gray-700">Tropa San Luis (bis x3)</p>
        <p class="mb-3 text-center font-medium text-gray-700">¡San Luis!</p>
        <p class="text-center text-gray-700">Venceremos siempre en un Raid<br>
        Con ferviente, Entusiasmo y Ardor</p>
        <div class="mt-3 text-center">
          <a href="/himnos" class="text-red-600 hover:underline">Escuchar el himno completo</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Información de las patrullas -->
  <section class="mb-16 bg-white rounded-lg p-8 shadow-md">
    <h2 class="text-3xl font-bold text-red-600 mb-6">Nuestras Patrullas</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr class="bg-red-100 text-red-800">
            <th class="py-3 px-4 text-left">Patrulla</th>
            <th class="py-3 px-4 text-left">Fundación</th>
            <th class="py-3 px-4 text-left">Estado Actual</th>
          </tr>
        </thead>
        <tbody>
          {#each patrullas as patrulla, i}
            <tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td class="py-3 px-4 border-b border-gray-200">{patrulla.nombre}</td>
              <td class="py-3 px-4 border-b border-gray-200">{patrulla.fundacion}</td>
              <td class="py-3 px-4 border-b border-gray-200">
                <span class={`inline-block px-2 py-1 rounded text-xs font-medium ${patrulla.status === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {patrulla.status}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Jefes de la Tropa -->
  <section class="mb-16 bg-white rounded-lg p-8 shadow-md">
    <h2 class="text-3xl font-bold text-red-600 mb-6">Jefes de la Tropa</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {#each jefes as jefe}
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition">
          <div class="text-4xl text-red-500 mb-2">👤</div>
          <p class="font-semibold text-gray-800">{jefe.nombre}</p>
          <p class="text-sm text-gray-600">{jefe.periodo}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Línea de tiempo -->
  <section class="mb-16" bind:this={timelineRef}>
    <h2 class="text-3xl font-bold text-red-600 mb-10 text-center">Línea de Tiempo</h2>
    
    <div class="relative">
      <!-- Línea vertical central -->
      <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200"></div>
      
      <div class="space-y-12">
        {#each timelineEvents as event, i}
          <div class={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} relative transition-all duration-500 ${isIntersecting ? 'opacity-100' : 'opacity-0'}`}
               style={`transition-delay: ${i * 100}ms`}>
            
            <!-- Círculo central -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-red-600 shadow-lg z-10 flex items-center justify-center text-white font-bold border-4 border-white">
              {event.year}
            </div>
            
            <!-- Contenido -->
            <div class="w-full md:w-5/12 md:mx-4 mt-12 md:mt-0">
              <div class={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border-l-4 ${i % 2 === 0 ? 'border-red-600' : 'border-orange-500'}`}>
                <h3 class="text-xl font-bold text-gray-800">{event.year}</h3>
                <p class="text-gray-700 mt-2">{event.event}</p>
              </div>
            </div>
            
            <!-- Espacio para el otro lado -->
            <div class="hidden md:block w-5/12"></div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Sitios de Campamento -->
  <section class="mb-16 bg-white rounded-lg p-8 shadow-md">
    <h2 class="text-3xl font-bold text-red-600 mb-6">Campamentos Emblemáticos</h2>
    <p class="mb-6">A lo largo de nuestra historia, hemos realizado campamentos en diversos lugares de Chile, cada uno con sus propias experiencias y memorias:</p>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Primer Campamento</h4>
        <p>San Fabian (1953)</p>
      </div>
      
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Lago Calafquén</h4>
        <p>Varios años (1967, 1970, 1975, 1979, 1980)</p>
      </div>
      
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Puerto Fonk</h4>
        <p>1959, 1968, 1982</p>
      </div>
      
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Villarica</h4>
        <p>1954, 1965, 1975, 1978, 1981</p>
      </div>
      
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Rupanco</h4>
        <p>1969, 2006, 2010, 2015</p>
      </div>
      
      <div class="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        <h4 class="font-semibold text-red-600">Más Reciente</h4>
        <p>Quillayes de Tomé (2024)</p>
      </div>
    </div>
    
    <p class="mt-6 text-sm text-gray-600 text-center">Para una lista completa de todos nuestros campamentos, consulta nuestros archivos históricos.</p>
  </section>

  <!-- Botón para volver -->
  <div class="text-center mb-8">
    <a href="/" class="inline-block px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">
      Volver al Inicio
    </a>
  </div>
</div>

<style>
  /* Estilos adicionales si se necesitan */
  :global(body) {
    background-color: #f9fafb;
  }
</style> 