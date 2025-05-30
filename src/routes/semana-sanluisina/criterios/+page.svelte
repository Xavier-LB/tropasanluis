<script lang="ts">
  /**
   * @typedef {Object} Test
   * @property {string} name - Name of the test
   * @property {string} score - Score of the test (AAA, AA, or A)
   * @property {string[]} inCharge - People in charge of the test
   * @property {string} description - Description of the test
   * @property {string[]} criteria - Evaluation criteria
   * @property {string} [fecha] - Fecha de subida (opcional)
   * @property {string} [inicio] - Hora de inicio (opcional)
   * @property {string} [fin] - Hora de fin (opcional)
   * @property {string} [lugar] - Lugar de la prueba (opcional)
   * @property {boolean} [talvez] - Indica si la prueba es tentativa (opcional)
   */

  /**
   * @type {Object.<string, Test[]>}
   */
  const tests = {
    previa: [
      {
        name: "Promo STL",
        score: "AA",
        inCharge: ["Pao", "Chopi", "Marcelo"],
        description: "Hacer un video promocional de la Tropa San Luis en general (no la patrulla).",
        criteria: [
          "5 integrantes mínimo",
          "Edición del video",
          "Calidad del video (imagen y audio)",
          "Creatividad"
        ],
        fecha: "Lunes 2 de junio hasta las 18:00"
      },
      {
        name: "Brain Rot",
        score: "A",
        inCharge: ["Pelao", "Pedro", "Chopi", "Flaxo"],
        description: "Hacer un Brain Rot con el animal de la patrulla, deberá ser subido a Instagram y se considerará la cantidad de likes. Los likes se contarán hasta el viernes 6 de junio a las 12:00.",
        criteria: [
          "Likes de Instagram",
          "Originalidad",
          "Coherencia de la historia"
        ],
        fecha: "Lunes 2 de junio hasta las 18:00 (likes hasta viernes 6 de junio, 12:00)"
      },
      {
        name: "Lucho City Tour",
        score: "AA",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Deberán sacarse fotos de la patrulla en lugares históricos de la ciudad de Santiago.",
        criteria: [
          "Mayor número de lugares visitados",
          "Mayor porcentaje de integrantes de la patrulla en cada foto"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00"
      },
      {
        name: "Doblaje",
        score: "AAA",
        inCharge: ["Marcelo", "Pelao", "Xavier", "Flaxo"],
        description: "Deberán recrear el videoclip de una canción.",
        criteria: [
          "Participación de la patrulla",
          "Vestimenta",
          "Localizaciones",
          "Calidad del video (imagen y audio)",
          "Similitud al video original",
          "Edición del video"
        ],
        fecha: "Martes 3 de junio hasta las 18:00"
      },
      {
        name: "Lucho Furro",
        score: "AAA",
        inCharge: ["Pedro", "Fu", "Marti"],
        description: "Un integrante de la patrulla deberá personificar al animal de su patrulla con vestimenta y maquillaje.",
        criteria: [
          "Maquillaje",
          "Vestimenta",
          "Calidad de fotos",
          "Uso de colores",
          "Creatividad",
          "Uso de materiales reciclados",
          "Escenografía"
        ],
        fecha: "Martes 3 de junio hasta las 18:00"
      },
      {
        name: "Lucho Musical",
        score: "AA",
        inCharge: ["Marcelo", "Chopi", "Xavier"],
        description: "Deberán grabarse cantando un himno de la tropa con toda la patrulla y una patrulla de otro grupo scout (con guitarra).",
        criteria: [
          "Interpretación musical",
          "Toda la patrulla y 5 integrantes de una patrulla de otro grupo scout",
          "Pañolines (de la STL y del otro grupo)"
        ],
        fecha: "Viernes 6 de junio hasta las 18:00"
      },
      {
        name: "Lucho cuentero",
        score: "AA",
        inCharge: ["Marcelo", "Pelao", "Viky"],
        description: "Inventar un cuento con temática de la Tropa San Luis en 100 palabras.",
        criteria: [
          "Originalidad",
          "Ortografía",
          "Pertinencia San Luisina",
          "Coherencia",
          "Cohesión",
          "Estructura"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00"
      },
      {
        name: "Lienzo",
        score: "AA",
        inCharge: ["Renato (MA)", "Marti", "Browne"],
        description: "En una hoja de block (34x48), hacer un lienzo que represente la tropa (no a la patrulla).",
        criteria: [
          "Originalidad",
          "Técnica",
          "Mensaje",
          "Comprensión",
          "Uso de colores",
          "Técnica"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00"
      },
      {
        name: "Fotografía",
        score: "A",
        inCharge: ["Browne", "Marcelo", "Dani", "Flaxo"],
        description: "Tomar una foto artística de un entorno natural. La foto debe tener un título.",
        criteria: [
          "Calidad de la imagen",
          "Originalidad",
          "Encuadre",
          "Enfoque",
          "Luminosidad"
        ],
        fecha: "Jueves 5 de junio hasta las 18:00"
      },
      {
        name: "Saludos",
        score: "AA",
        inCharge: ["Chopi", "Pao", "Pedro"],
        description: "Deberán conseguir los saludos de las siguientes personas.",
        criteria: [
          "2 Músicos",
          "2 Políticos",
          "2 Influencers",
          "2 Futbolistas",
          "1 Ex Staff (2010 o antes)",
          "1 Chofer de micro",
          "El Papa",
          "El presidente de Chile (Boric)"
        ],
        fecha: "Jueves 5 de junio hasta las 18:00"
      },
      {
        name: "Recrear la escena de Los 80",
        score: "AAA",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Deberán recrear la escena de Los 80 \"En esta casa no hay ni comunistas ni pinochetistas\", cambiando los diálogos con temática de la tropa.",
        criteria: [
          "Fidelidad a la escena original",
          "Originalidad de los diálogos",
          "Vestuario",
          "Escenario",
          "Actuación",
          "Calidad de audio y video"
        ],
        fecha: "Viernes 6 de junio hasta las 18:00"
      }
    ],
    semana: [
      {
        name: "Asistencia",
        score: "B",
        inCharge: ["Staff"],
        description: "Ganará la patrulla con mayor asistencia a las 11:00.",
        criteria: [
          "Porcentaje de patrulleros presentes a las 11:00"
        ],
        inicio: "11:00",
        lugar: "Bombonera"
      },
      {
        name: "Pruebas Relámpago",
        score: "B",
        inCharge: ["Pedro", "Pao", "Marti"],
        description: "Habrán pruebas al azar durante todo el día que serán anunciadas en el momento.",
        criteria: [
          "Desempeño en las pruebas sorpresa",
          "Rapidez de reacción",
          "Participación"
        ],
        inicio: "Todo el",
        fin: "día",
        lugar: ""
      },
      {
        name: "Guatazo Vikingo",
        score: "AA",
        inCharge: ["Xavier", "Chopi", "Pao"],
        description: "Un patrullero deberá deslizarse en un plástico jabonoso, este deberá intentar llegar lo más lejos posible.",
        criteria: [
          "Distancia alcanzada",
          "Estilo al deslizarse",
          "Caída épica (puntos extra)",
          "Técnica de impulso"
        ],
        inicio: "11:00",
        fin: "12:00",
        lugar: "Bombonera"
      },
      {
        name: "Lucho Master Chef",
        score: "A",
        inCharge: ["Staff"],
        description: "Deberán preparar un plato de comida (puede ser un plato de fondo, postre, etc).",
        criteria: [
          "Textura",
          "Sabor",
          "Presentación"
        ],
        inicio: "11:00",
        fin: "11:30",
        lugar: "Bombonera"
      },
      {
        name: "Pasapalabra",
        score: "A",
        inCharge: ["Pelao", "Marti", "Viky"],
        description: "Tienen que responder una serie de palabras en orden alfabético, dentro de un máximo de 5 minutos.",
        criteria: [
          "Gana el que responda más preguntas"
        ],
        inicio: "11:00",
        fin: "12:00",
        lugar: "Bombonera"
      },
      {
        name: "Lucho Bailetón",
        score: "AA",
        inCharge: ["Fu", "Marcelo", "Viky"],
        description: "3 parejas por patrulla deberán bailar canciones por rondas.",
        criteria: [
          "Ritmo",
          "Coordinación",
          "Creatividad",
          "Expresión corporal"
        ],
        inicio: "12:00",
        fin: "13:00",
        lugar: "Bombonera"
      },
      {
        name: "Pichanga",
        score: "AAA",
        inCharge: ["Pelao", "Pao", "Pedro"],
        description: "Se disputará una copa de fútbol entre equipos conformados por 3 integrantes de la patrulla y 2 expatrulleros.",
        criteria: [],
        inicio: "14:00",
        fin: "17:00",
        lugar: "Bombonera"
      },
      {
        name: "Imita a tu Staff",
        score: "A",
        inCharge: ["Xavier", "Marcelo", "Fu"],
        description: "Un integrante de cada patrulla deberá imitar a un integrante del Staff en un máximo de 3 minutos.",
        criteria: [
          "Vestimenta",
          "Humor",
          "Similitud"
        ],
        inicio: "14:00",
        fin: "15:00",
        lugar: "Teatro"
      },
      {
        name: "Caricaturiza a tu Staff",
        score: "A",
        inCharge: ["Marti", "Viky", "Chopi"],
        description: "Uno por patrulla deberá dibujar una caricatura de cualquier Staff.",
        criteria: [
          "Humor",
          "Técnica",
          "Calidad"
        ],
        inicio: "14:00",
        fin: "14:30",
        lugar: "Teatro"
      },
      {
        name: "El que se la sabe cante",
        score: "A",
        inCharge: ["Pelao", "Marcelo", "Fu"],
        description: "Se pondrá una canción al azar, si se sabe la canción debe correr, tomar el micrófono y cantar.",
        criteria: [
          "El que cante más canciones bien"
        ],
        inicio: "15:00",
        fin: "15:30",
        lugar: "Teatro"
      },
      {
        name: "Lucho Romántico",
        score: "AA",
        inCharge: ["Xavier", "Marcelo", "Chopi"],
        description: "Integrantes de la patrulla deberán interpretar una canción romántica.",
        criteria: [
          "Ritmo",
          "Afinación",
          "Dicción",
          "Técnica instrumental",
          "Transmisión del sentido de la canción",
          "Presencia escénica"
        ],
        inicio: "16:00",
        fin: "17:00",
        lugar: "Teatro"
      },
      {
        name: "Premiación",
        score: "A",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Ceremonia de cierre y entrega de premios a las patrullas ganadoras.",
        criteria: [],
        inicio: "17:00",
        fin: "",
        lugar: "Teatro"
      }
    ]
  };

  /**
   * Función para obtener el color del borde según el puntaje
   * @param {string} score - Puntaje de la prueba
   * @returns {string} Clase CSS para el color del borde
   */
  function getBorderColor(score: string): string {
    switch (score) {
      case 'AAA': return 'border-red-600';
      case 'AA': return 'border-orange-500';
      case 'A': return 'border-blue-500';
      case 'B': return 'border-yellow-500';
      default: return 'border-gray-400';
    }
  }

  /**
   * Función para obtener el color del badge según el puntaje
   * @param {string} score - Puntaje de la prueba
   * @returns {string} Clases CSS para el gradiente del badge
   */
  function getBadgeColor(score: string): string {
    switch (score) {
      case 'AAA': return 'from-red-600 to-red-700';
      case 'AA': return 'from-orange-500 to-orange-600';
      case 'A': return 'from-blue-500 to-blue-600';
      case 'B': return 'from-yellow-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  }

  // Variables para la calculadora
  let puntajeTotalSemana = 0;
  let puntajeCampamento = 0;

  /**
   * Función para calcular el puntaje del campamento
   * @param {number} puntajeTotal - Puntaje total de la Semana San Luisina
   * @returns {number} Puntaje para el campamento de verano
   */
  function calcularPuntajeCampamento(puntajeTotal: number): number {
    return Math.round(puntajeTotal * 0.2);
  }

  /**
   * Función reactiva para actualizar el puntaje del campamento
   */
  $: puntajeCampamento = calcularPuntajeCampamento(puntajeTotalSemana);

  /**
   * Función para formatear números con separadores de miles
   * @param {number} num - Número a formatear
   * @returns {string} Número formateado
   */
  function formatNumber(num: number): string {
    return num.toLocaleString('es-CL');
  }
</script>

<svelte:head>
  <title>Criterios de Evaluación - Semana San Luisina</title>
  <meta name="description" content="Criterios de evaluación para todas las pruebas de la Semana San Luisina 2025" />
</svelte:head>

<main class="relative">
  <!-- Decorative elements -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),rgba(255,255,255,0))]"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full mix-blend-multiply filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <div class="container mx-auto px-4 py-8 relative z-10">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Criterios de Evaluación
      </h1>
      <p class="text-xl text-gray-700 mb-6">
        Todos los criterios que se utilizarán para evaluar las pruebas de la Semana San Luisina
      </p>
      <div class="flex justify-center">
        <a href="/semana-sanluisina" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-800 to-orange-600 text-white rounded-lg font-semibold hover:from-red-900 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a las Pruebas
        </a>
      </div>
    </div>

    <!-- Pruebas de la Previa -->
    <section class="mb-16">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Criterios - Pruebas de la Previa
      </h2>

      <div class="grid gap-6">
        {#each tests.previa as test}
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 {getBorderColor(test.score)}">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div class="flex items-center gap-3 mb-3 md:mb-0">
                <h3 class="text-2xl font-bold text-primary">{test.name}</h3>
                <span class="bg-gradient-to-r {getBadgeColor(test.score)} text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {test.score}
                </span>
              </div>
              
              {#if test.fecha}
                <div class="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium text-purple-800">{test.fecha}</span>
                </div>
              {/if}
            </div>

            <div class="mb-4">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Criterios de evaluación:
              </h4>
              
              {#if test.criteria && test.criteria.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {#each test.criteria as criterion, index}
                    <div class="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                      <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r {getBadgeColor(test.score)} text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span class="text-gray-700 font-medium">{criterion}</span>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <span class="text-gray-500 italic">Sin criterios específicos de evaluación</span>
                </div>
              {/if}
            </div>

            <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200">
              <div class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="text-sm text-gray-600 font-medium">Encargados:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each test.inCharge as person}
                  <span class="px-2 py-1 bg-white rounded-full text-gray-700 shadow-sm border border-gray-200 text-sm">
                    {person}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Pruebas del Día Final -->
    <section class="mb-16">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Criterios - Pruebas del Día Final
      </h2>

      <div class="grid gap-6">
        {#each tests.semana.filter(test => test.name !== "Almuerzo") as test}
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-l-4 {getBorderColor(test.score)}">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div class="flex items-center gap-3 mb-3 md:mb-0">
                <h3 class="text-2xl font-bold text-primary">{test.name}</h3>
                <span class="bg-gradient-to-r {getBadgeColor(test.score)} text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {test.score}
                </span>
              </div>
              
              <div class="flex flex-wrap gap-2 items-center">
                {#if test.inicio}
                  <div class="flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium text-red-800">
                      {test.inicio}{#if test.fin && test.fin !== ""} - {test.fin}{/if}
                    </span>
                  </div>
                {/if}
                
                {#if test.lugar}
                  <div class="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-sm font-medium text-blue-800">{test.lugar}</span>
                  </div>
                {/if}
              </div>
            </div>

            <div class="mb-4">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Criterios de evaluación:
              </h4>
              
              {#if test.criteria && test.criteria.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {#each test.criteria as criterion, index}
                    <div class="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                      <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r {getBadgeColor(test.score)} text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span class="text-gray-700 font-medium">{criterion}</span>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <span class="text-gray-500 italic">Sin criterios específicos de evaluación</span>
                </div>
              {/if}
            </div>

            <div class="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200">
              <div class="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="text-sm text-gray-600 font-medium">Encargados:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each test.inCharge as person}
                  <span class="px-2 py-1 bg-white rounded-full text-gray-700 shadow-sm border border-gray-200 text-sm">
                    {person}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Resumen de Puntajes -->
    <section class="mb-16">
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <h3 class="text-2xl font-bold text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent mb-6">
          Sistema de Puntajes
        </h3>
        <div class="overflow-x-auto rounded-xl shadow-lg">
          <table class="min-w-full w-full bg-white rounded-xl text-center">
            <thead class="bg-gradient-to-r from-red-800 to-orange-600 text-white">
              <tr>
                <th class="py-3 px-4">Tipo</th>
                <th class="py-3 px-4">1°</th>
                <th class="py-3 px-4">2°</th>
                <th class="py-3 px-4">3°</th>
                <th class="py-3 px-4">4°</th>
                <th class="py-3 px-4">5°</th>
                <th class="py-3 px-4">No participación</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b even:bg-gray-50">
                <td class="py-3 px-4 font-bold text-red-600">AAA</td>
                <td class="py-3 px-4">3000</td>
                <td class="py-3 px-4">2000</td>
                <td class="py-3 px-4">1000</td>
                <td class="py-3 px-4">500</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4 text-red-800 font-semibold">-1000</td>
              </tr>
              <tr class="border-b even:bg-gray-50">
                <td class="py-3 px-4 font-bold text-orange-600">AA</td>
                <td class="py-3 px-4">2000</td>
                <td class="py-3 px-4">1250</td>
                <td class="py-3 px-4">750</td>
                <td class="py-3 px-4">300</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4 text-red-800 font-semibold">-500</td>
              </tr>
              <tr class="border-b even:bg-gray-50">
                <td class="py-3 px-4 font-bold text-blue-600">A</td>
                <td class="py-3 px-4">1000</td>
                <td class="py-3 px-4">750</td>
                <td class="py-3 px-4">300</td>
                <td class="py-3 px-4">100</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4 text-red-800 font-semibold">-250</td>
              </tr>
              <tr class="border-b even:bg-gray-50">
                <td class="py-3 px-4 font-bold text-yellow-600">B</td>
                <td class="py-3 px-4">1000</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4">0</td>
                <td class="py-3 px-4">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Cálculo de Puntajes Máximos -->
    <section class="mb-16">
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-2 border-green-200">
        <h3 class="text-2xl font-bold text-center bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Puntajes Máximos Posibles
        </h3>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Pruebas de la Previa -->
          <div class="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <h4 class="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Pruebas de la Previa
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span class="font-semibold text-red-800">AAA (3 pruebas)</span>
                <span class="font-bold text-red-900">9,000 pts</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span class="font-semibold text-orange-800">AA (6 pruebas)</span>
                <span class="font-bold text-orange-900">12,000 pts</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span class="font-semibold text-blue-800">A (2 pruebas)</span>
                <span class="font-bold text-blue-900">2,000 pts</span>
              </div>
              <div class="border-t-2 border-green-300 pt-3 mt-4">
                <div class="flex justify-between items-center font-bold text-lg">
                  <span class="text-green-800">Subtotal Previa:</span>
                  <span class="text-green-900 text-xl">23,000 pts</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Pruebas del Día Final -->
          <div class="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <h4 class="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pruebas del Día Final
            </h4>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span class="font-semibold text-red-800">AAA (1 prueba)</span>
                <span class="font-bold text-red-900">3,000 pts</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <span class="font-semibold text-orange-800">AA (3 pruebas)</span>
                <span class="font-bold text-orange-900">6,000 pts</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span class="font-semibold text-blue-800">A (6 pruebas)</span>
                <span class="font-bold text-blue-900">6,000 pts</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span class="font-semibold text-yellow-800">B (2 pruebas)</span>
                <span class="font-bold text-yellow-900">2,000 pts</span>
              </div>
              <div class="border-t-2 border-green-300 pt-3 mt-4">
                <div class="flex justify-between items-center font-bold text-lg">
                  <span class="text-green-800">Subtotal Día Final:</span>
                  <span class="text-green-900 text-xl">17,000 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Final -->
        <div class="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-6 text-center shadow-lg">
          <h4 class="text-2xl font-bold mb-2">🏆 PUNTAJE MÁXIMO TOTAL</h4>
          <div class="text-5xl font-black mb-2">40,000</div>
          <p class="text-green-100 text-lg">puntos para el campamento de verano</p>
          <div class="mt-4 text-sm text-green-100 bg-green-700/30 rounded-lg p-3">
            <strong>Nota:</strong> Este es el puntaje máximo teórico si una patrulla gana todas las 23 pruebas en primer lugar.
          </div>
        </div>

        <!-- Desglose detallado -->
        <div class="mt-8 bg-white rounded-xl p-6 shadow-lg border border-green-100">
          <h4 class="text-lg font-bold text-green-800 mb-4 text-center">📊 Desglose por Categoría</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div class="text-2xl font-bold text-red-600">4</div>
              <div class="text-sm text-red-800">Pruebas AAA</div>
              <div class="text-lg font-semibold text-red-900">12,000 pts</div>
            </div>
            <div class="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div class="text-2xl font-bold text-orange-600">9</div>
              <div class="text-sm text-orange-800">Pruebas AA</div>
              <div class="text-lg font-semibold text-orange-900">18,000 pts</div>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div class="text-2xl font-bold text-blue-600">8</div>
              <div class="text-sm text-blue-800">Pruebas A</div>
              <div class="text-lg font-semibold text-blue-900">8,000 pts</div>
            </div>
            <div class="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div class="text-2xl font-bold text-yellow-600">2</div>
              <div class="text-sm text-yellow-800">Pruebas B</div>
              <div class="text-lg font-semibold text-yellow-900">2,000 pts</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculadora de Puntaje para Campamento -->
    <section class="mb-16">
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
        <h3 class="text-2xl font-bold text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calculadora de Puntaje para Campamento de Verano
        </h3>

        <div class="max-w-2xl mx-auto">
          <!-- Explicación -->
          <div class="bg-white rounded-xl p-6 shadow-lg border border-blue-100 mb-6">
            <h4 class="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ¿Cómo funciona?
            </h4>
            <p class="text-gray-700 leading-relaxed">
              El puntaje final para el <strong>campamento de verano</strong> se calcula multiplicando 
              el total de puntos obtenidos en la Semana San Luisina por <strong>0.2</strong>.
            </p>
            <div class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <code class="text-blue-800 font-mono">Puntaje Campamento = Puntaje Total × 0.2</code>
            </div>
          </div>

          <!-- Calculadora -->
          <div class="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div class="space-y-6">
              <!-- Input -->
              <div>
                <label for="puntajeTotal" class="block text-lg font-semibold text-blue-800 mb-3">
                  Ingresa el puntaje total de la Semana San Luisina:
                </label>
                <div class="relative">
                  <input 
                    id="puntajeTotal"
                    type="number" 
                    bind:value={puntajeTotalSemana}
                    min="0" 
                    max="40000"
                    placeholder="Ej: 25000"
                    class="w-full px-4 py-3 text-xl font-semibold border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    pts
                  </div>
                </div>
              </div>

              <!-- Resultado -->
              <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 text-center">
                <h4 class="text-xl font-bold mb-2">🏕️ Puntaje para Campamento de Verano</h4>
                <div class="text-4xl font-black mb-2">
                  {formatNumber(puntajeCampamento)}
                </div>
                <p class="text-blue-100">puntos para el campamento</p>
              </div>

              <!-- Ejemplos rápidos -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  on:click={() => puntajeTotalSemana = 40000}
                  class="p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors duration-200 text-center"
                >
                  <div class="font-bold text-green-800">Máximo</div>
                  <div class="text-sm text-green-600">40,000 pts</div>
                  <div class="text-xs text-green-500">= 8,000 campamento</div>
                </button>
                
                <button 
                  on:click={() => puntajeTotalSemana = 25000}
                  class="p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg transition-colors duration-200 text-center"
                >
                  <div class="font-bold text-yellow-800">Promedio Alto</div>
                  <div class="text-sm text-yellow-600">25,000 pts</div>
                  <div class="text-xs text-yellow-500">= 5,000 campamento</div>
                </button>
                
                <button 
                  on:click={() => puntajeTotalSemana = 15000}
                  class="p-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors duration-200 text-center"
                >
                  <div class="font-bold text-orange-800">Promedio</div>
                  <div class="text-sm text-orange-600">15,000 pts</div>
                  <div class="text-xs text-orange-500">= 3,000 campamento</div>
                </button>
              </div>

              <!-- Información adicional -->
              <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h5 class="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Información importante:
                </h5>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li>• El puntaje máximo posible para el campamento es <strong>8,000 puntos</strong></li>
                  <li>• Los puntajes negativos por no participación también se multiplican por 0.2</li>
                  <li>• El resultado se redondea al número entero más cercano</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: linear-gradient(to bottom right, white, #fee2e2, #fecaca);
    background-attachment: fixed;
  }
  
  :global(html) {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  :global(#svelte) {
    min-height: 100vh;
  }
  
  .text-primary {
    color: #1a365d;
  }
  
  .bg-primary {
    background-color: #1a365d;
  }

  main {
    min-height: 100vh;
    width: 100%;
    position: relative;
  }
</style> 