<script lang="ts">
  import { onMount } from 'svelte';
  import PruebaTimer from '$lib/PruebaTimer.svelte';
  import DiscreteTimer from '$lib/DiscreteTimer.svelte';
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
        description: "Un integrante de la patrulla deberá personificar al animal de su patrulla con vestimenta y maquillaje. Deberá ser subida como una sesión de fotos con una escenografía. Deben describir los valores que transmite el animal.",
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
        description: "Inventar un cuento con temática de la Tropa San Luis en 100 palabras. Esta prueba es aparte del Lucho cuentero global. Este cuento debe ser publicado en el Instagram de la patrulla.",
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
        description: "Deberán conseguir los saludos de las siguientes personas. El del presidente gana todo, si hay empate se desempata con el del Papa.",
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
        description: "Deberán recrear la escena de Los 80 \"En esta casa no hay ni comunistas ni pinochetistas\", cambiando los diálogos con temática de la tropa, con una familia de la patrulla, incluyendo al patrullero o patrullera.",
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
        description: "Ganará la patrulla con mayor asistencia a las 11:00. Pueden haber empates.",
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
        description: "Habrán pruebas al azar durante todo el día que serán anunciadas en el momento. Estas mini-pruebas serán evaluadas por el Staff y sumadas al final del día.",
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
        description: "Un patrullero deberá deslizarse en un plástico jabonoso, este deberá intentar llegar lo más lejos posible. <div class='mt-2 text-sm bg-red-50 border border-red-200 p-2 rounded-md text-red-800 italic'>⚠️ <strong>Cláusula no negociable:</strong> Patrulleros lesionados serán descalificados y obligados a explicar a sus padres por qué creyeron que deslizarse a toda velocidad era una buena idea.</div>",
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
        description: "Deberán preparar un plato de comida (puede ser un plato de fondo, postre, etc). Deben traer todo preparado y montar ese día. Dispondrán de una cocinilla para recalentar en caso de ser necesario.",
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
        description: "2 parejas por patrulla deberán bailar canciones por rondas. Al final de cada ronda se elimina una pareja. Serán géneros musicales variados.",
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
        name: "Almuerzo",
        score: "ooooooooooK",
        inCharge: ["Pedro"],
        description: "Pausa para almorzar todos juntos.",
        criteria: [],
        inicio: "13:00",
        fin: "14:00",
        lugar: "Bombonera"
      },
      {
        name: "Pichanga",
        score: "AAA",
        inCharge: ["Pelao", "Pao", "Pedro"],
        description: "Se disputará una copa de fútbol entre equipos conformados por 3 integrantes de la patrulla y 2 expatrulleros, puede ser mixto. Ex patrulleros solo pueden jugar en una patrulla. Pueden contar con banca con integrantes de la patrulla. Los partidos serán distribuidos al azar. <strong>Deberán avisar los nombres de los expatrulleros a más tardar el 31 de mayo.</strong>",
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
        inCharge: ["Marti", "Fu", "Chopi"],
        description: "Uno por patrulla deberá dibujar una caricatura de cualquier Staff. Deberán hacerlo en menos de 10 minutos.",
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
        description: "Se pondrá una canción al azar, si se sabe la canción debe correr, tomar el micrófono y cantar. Deberán participar dos por patrulla.",
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
        description: "Integrantes de la patrulla deberán interpretar una canción romántica. Los instrumentos deben ser traídos por la patrulla. Al evaluar se priorizará la calidad de la interpretación por sobre la cantidad de integrantes.",
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
   * Puntajes por tipo de prueba y lugar
   * @type {Array<{tipo: string, primero: number, segundo: number, tercero: number, cuarto: number, quinto: number, noParticipa: number}>}
   */
  const puntajes = [
    { tipo: "AAA", primero: 3000, segundo: 2000, tercero: 1000, cuarto: 500, quinto: 0, noParticipa: -1000 },
    { tipo: "AA", primero: 2000, segundo: 1250, tercero: 750, cuarto: 300, quinto: 0, noParticipa: -500 },
    { tipo: "A", primero: 1000, segundo: 750, tercero: 300, cuarto: 100, quinto: 0, noParticipa: -250 },
    { tipo: "B", primero: 1000, segundo: 0, tercero: 0, cuarto: 0, quinto: 0, noParticipa: 0 }
  ];

  // FECHA GENERAL DEL SABADO 7 DE JUNIO 2025, 00:00:00
  const fechaSabado = new Date('2025-06-07T10:30:00-03:00');
  let tiempoSabado = '';
  let intervaloSabado: number;

  function calcularTiempoRestante(fechaLimite: Date): string | null {
    const ahora = new Date();
    const diferencia = fechaLimite.getTime() - ahora.getTime();
    if (diferencia <= 0) return null;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  onMount(() => {
    intervaloSabado = setInterval(() => {
      const tiempo = calcularTiempoRestante(fechaSabado);
      tiempoSabado = tiempo ? tiempo : '¡Tiempo finalizado!';
    }, 1000);
  });

  // Utilidad para obtener la fecha límite de cada prueba
  function obtenerFechaLimite(fechaStr: string): Date | null {
    if (!fechaStr) return null;
    // Buscar fecha y hora en el string
    // Ejemplo: "Lunes 2 de junio hasta las 18:00"
    const match = fechaStr.match(/(\d{1,2}) de junio.*?(\d{1,2}:\d{2})/i);
    if (!match) return null;
    const dia = match[1].padStart(2, '0');
    const hora = match[2];
    // Asumimos año 2025 y zona horaria -03:00 (Santiago)
    return new Date(`2025-06-${dia}T${hora}:00-03:00`);
  }

  let showIndex = false;
  function toggleIndex() {
    showIndex = !showIndex;
  }

  // Fecha para la publicación de las pruebas del día final
  const fechaPublicacionPruebasFinal = "17 de mayo a las 14:00";
  
  // Fecha exacta para la publicación automática (UTC -3, Santiago de Chile)
  const fechaPublicacionExacta = new Date('2024-05-17T14:00:00-03:00');
  
  // Determinar si ya se deben mostrar las pruebas del día final
  let mostrarPruebasFinal = false;
  
  onMount(() => {
    // Verificar si la fecha actual es posterior a la fecha de publicación
    function actualizarVisibilidadPruebas() {
      const ahora = new Date();
      mostrarPruebasFinal = ahora >= fechaPublicacionExacta;
    }
    
    // Verificar al cargar la página
    actualizarVisibilidadPruebas();
    
    // Verificar cada minuto por si el usuario mantiene la página abierta
    const intervaloVerificacion = setInterval(actualizarVisibilidadPruebas, 60000);
    
    return () => {
      clearInterval(intervaloVerificacion);
    };
  });
</script>

<main class="relative">
  <!-- Decorative elements -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),rgba(255,255,255,0))]"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full mix-blend-multiply filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <div class="container mx-auto px-4 py-8 relative z-10">
    <div class="mb-12 text-center">
      <span class="inline-block text-4xl font-extrabold text-primary animate-bounce bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        🎉🔥 ¡La semana empieza ya! 🚀🏕️
      </span>
      <div class="mt-4 text-xl font-semibold text-primary">
        ⏳ Tienen 3 semanas para preparar las pruebas, ¡así que empiecen ya! 💪😎
      </div>
      <div class="mt-6 text-lg font-bold text-white bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-2xl px-8 py-4 inline-block shadow-lg transform hover:scale-105 transition-transform duration-300">
        ⏰ Cuenta regresiva para el Día Final (Sábado 7 de Junio):<br>
        <span class="text-3xl font-black tracking-wider">{tiempoSabado}</span>
      </div>
    </div>

    <h1 class="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
      Pruebas Semana San Luisina
    </h1>

    <div class="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <p class="mb-6 text-lg text-gray-700 leading-relaxed">
        🏁 Las pruebas se dividen en dos categorías: las pruebas de la <span class="font-semibold text-primary">"Previa"</span> y las del <span class="font-semibold text-primary">"Día Final"</span> (sábado 7 de junio).<br>
        <br>
        📸 Las pruebas de la <span class="font-semibold text-primary">"Previa"</span> deben ser subidas al Instagram de cada patrulla utilizando el <span class="font-semibold text-primary">#semanasanluisina2025</span> en el día indicado. <span class="font-semibold text-red-800">No antes ni después.</span><br>
        <br>
        ⏰ El atraso en la entrega implica pérdida de puntaje.<br>
        <br>
        🤝 Se evalúa en términos generales la participación de la patrulla.
      </p>
      <div class="mb-8 text-xl text-center font-bold text-primary bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
        📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales, cuyas bases serán subidas el 17 de mayo.
      </div>
    </div>

    <div class="mb-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
      <h2 id="tabla-puntajes" class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Tabla de Puntajes
      </h2>
      <p class="mb-6 text-lg text-gray-700 leading-relaxed text-center">
        🏕️ Dependiendo del lugar obtenido en la Semana San Luisina, obtendrán puntaje para el campamento de verano.
      </p>
      <div class="overflow-x-auto rounded-xl shadow-lg">
        <table class="min-w-full w-full bg-white rounded-xl text-center text-xs sm:text-sm md:text-base">
          <thead class="bg-gradient-to-r from-red-800 to-orange-600 text-white">
            <tr>
              <th class="py-3 px-2 sm:px-4">Tipo</th>
              <th class="py-3 px-2 sm:px-4">1°</th>
              <th class="py-3 px-2 sm:px-4">2°</th>
              <th class="py-3 px-2 sm:px-4">3°</th>
              <th class="py-3 px-2 sm:px-4">4°</th>
              <th class="py-3 px-2 sm:px-4">5°</th>
              <th class="py-3 px-2 sm:px-4 whitespace-nowrap">No participación</th>
            </tr>
          </thead>
          <tbody>
            {#each puntajes as p}
              <tr class="border-b even:bg-gray-50 hover:bg-orange-50 transition-colors duration-200">
                <td class="py-3 px-2 sm:px-4 font-bold text-primary text-xs sm:text-base">{p.tipo}</td>
                <td class="py-3 px-2 sm:px-4">{p.primero}</td>
                <td class="py-3 px-2 sm:px-4">{p.segundo}</td>
                <td class="py-3 px-2 sm:px-4">{p.tercero}</td>
                <td class="py-3 px-2 sm:px-4">{p.cuarto}</td>
                <td class="py-3 px-2 sm:px-4">{p.quinto}</td>
                <td class="py-3 px-2 sm:px-4 text-red-800 font-semibold">{p.noParticipa}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Índice -->
    <div class="mb-12 flex justify-center">
      <div class="bg-white/40 backdrop-blur-sm rounded-xl p-4 max-w-2xl w-full">
        <div class="flex flex-col items-center space-y-4">
          <a href="#pruebas-previa" class="text-base font-medium text-gray-700 hover:text-red-800 transition-colors duration-200">
            Pruebas de la Previa
          </a>
          <div class="flex flex-wrap justify-center gap-2 text-sm">
            {#each tests.previa as test, i}
              <a href="#prueba-{i}" class="text-gray-600 hover:text-red-800 transition-colors duration-200 px-3 py-1.5 bg-white/50 hover:bg-white/80 rounded-lg shadow-sm">
                {test.name}
              </a>
            {/each}
          </div>
          <a href="#pruebas-final" class="text-base font-medium text-gray-700 hover:text-red-800 transition-colors duration-200">
            Pruebas del Día Final
          </a>
        </div>
      </div>
    </div>

    <!-- Pruebas de la Previa -->
    <section id="pruebas-previa" class="mb-16">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Pruebas de la Previa
      </h2>

      <!-- Cronograma de entrega de pruebas -->
      <div class="mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Cronograma de entrega
        </h3>
        
        <div class="relative">
          <!-- Línea de tiempo vertical -->
          <div class="absolute left-14 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
          
          <!-- Cronograma -->
          <div class="space-y-6 relative">
            <!-- Lunes -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">2 Jun</span>
              <div class="bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-primary">Lunes 2 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hasta las 18:00
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Promo STL <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                  </span>
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Brain Rot <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Martes -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">3 Jun</span>
              <div class="bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-primary">Martes 3 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hasta las 18:00
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Doblaje <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AAA</span>
                  </span>
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Lucho Furro <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AAA</span>
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Miércoles -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">4 Jun</span>
              <div class="bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-primary">Miércoles 4 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hasta las 18:00
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Lucho cuentero <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                  </span>
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Lienzo <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Jueves -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">5 Jun</span>
              <div class="bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-primary">Jueves 5 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hasta las 18:00
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Fotografía <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                  </span>
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Saludos <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Viernes -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">6 Jun</span>
              <div class="bg-gradient-to-r from-purple-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-purple-400">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-primary">Viernes 6 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Hasta las 18:00
                  </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Lucho Musical <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                  </span>
                  <span class="px-3 py-1 text-xs bg-white rounded shadow-sm flex items-center">
                    <span class="w-2 h-2 bg-red-600 rounded-full mr-1"></span>
                    Recrear la escena de Los 80 <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AAA</span>
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Final -->
            <div class="pl-20 relative">
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span class="absolute left-7 top-1/2 -translate-y-1/2 text-xs font-bold text-right w-6">7 Jun</span>
              <div class="bg-gradient-to-r from-orange-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-orange-400">
                <div class="flex justify-between items-center">
                  <h4 class="font-bold text-primary">Sábado 7 de junio</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Día Final
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-8">
        {#each tests.previa as test, i}
          <div id="prueba-{i}" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex justify-between items-start mb-6">
              <h3 class="text-2xl font-bold text-primary">
                {test.name}
              </h3>
              <div class="text-right">
                <span class="bg-gradient-to-r {test.score === 'B' ? 'from-yellow-500 to-amber-600' : 'from-red-800 to-orange-600'} text-white px-6 py-2 rounded-full font-bold shadow-lg">
                  {test.score}
                </span>
              </div>
            </div>
            
            <div class="mb-6 flex flex-wrap items-center gap-2">
              <div class="flex gap-2 items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium text-primary">Encargados:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each test.inCharge as person}
                  <span class="px-3 py-1 bg-white rounded-full text-gray-800 shadow-sm border border-gray-200 text-sm">
                    {person}
                  </span>
                {/each}
              </div>
            </div>

            <div class="mb-6 bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-orange-300">
              <h4 class="font-semibold mb-2 text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Descripción:
              </h4>
              <p class="text-gray-700 leading-relaxed pl-1">{@html test.description}</p>
              {#if test.name === "Recrear la escena de Los 80"}
                <div class="mt-4 aspect-video w-full">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/0NIS5BsywKY" title="Los 80 - &quot;En esta casa no hay ni comunistas ni pinochetistas&quot;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              {/if}
            </div>

            <div class="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-blue-300 mb-6">
              <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Criterios a evaluar:
              </h4>
              <div class="flex flex-wrap gap-2">
                {#each test.criteria as criterion}
                  <span class="px-3 py-1.5 bg-white rounded-md text-gray-700 shadow-sm border border-gray-100 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                    {criterion}
                  </span>
                {/each}
              </div>
            </div>

            {#if test.fecha}
              <div class="bg-gradient-to-r from-indigo-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-300">
                <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Fecha de subida:
                </h4>
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center">
                    <span class="inline-flex items-center bg-purple-100 text-purple-800 px-2 py-0.5 rounded mr-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Instagram
                    </span>
                    <span class="text-gray-700">{test.fecha}</span>
                  </div>
                  <DiscreteTimer fechaStr={test.fecha} label="Tiempo restante:" />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>

    <!-- Pruebas de la Semana -->
    <section id="pruebas-final">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Pruebas del día final
      </h2>
      <div class="mb-8 text-xl text-center font-bold text-primary bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
        {#if mostrarPruebasFinal}
          📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales.
        {:else}
          📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales cuyas bases serán publicadas el {fechaPublicacionPruebasFinal}.
        {/if}
      </div>
      
      {#if mostrarPruebasFinal}
        <!-- Timeline del día -->
        <div class="mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Cronograma del día
          </h3>
          
          <div class="relative">
            <!-- Línea de tiempo vertical -->
            <div class="absolute left-16 top-0 h-full w-0.5 bg-gradient-to-b from-red-500 to-yellow-500"></div>
            
            <!-- Eventos -->
            <div class="space-y-6 relative">
              <!-- Bombonera -->
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">11:00</span>
                <div class="bg-gradient-to-r from-red-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-red-400">
                  <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-red-100 text-red-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Bombonera
                      </span>
                      Actividades
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      11:00 - 12:00
                    </span>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-2 py-1 text-xs bg-white rounded shadow-sm">Guatazo Vikingo</span>
                    <span class="px-2 py-1 text-xs bg-white rounded shadow-sm">Lucho Master Chef</span>
                    <span class="px-2 py-1 text-xs bg-white rounded shadow-sm">Pasapalabra</span>
                  </div>
                </div>
              </div>
              
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">12:00</span>
                <div class="bg-gradient-to-r from-red-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-red-400">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-red-100 text-red-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Bombonera
                      </span>
                      Lucho Bailetón
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      12:00 - 13:00
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">13:00</span>
                <div class="bg-gradient-to-r from-red-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-orange-400">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-orange-100 text-orange-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Bombonera
                      </span>
                      Almuerzo
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      13:00 - 14:00
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Actividades paralelas -->
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">14:00</span>
                <div class="grid md:grid-cols-2 gap-3">
                  <div class="bg-gradient-to-r from-red-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-red-400">
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="font-bold text-primary">
                        <span class="inline-flex items-center bg-red-100 text-red-800 px-2 py-0.5 rounded mr-2 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Bombonera
                        </span>
                        Pichanga
                      </h4>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        14:00 - 17:00
                      </span>
                    </div>
                  </div>
                  <div class="bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400">
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="font-bold text-primary">
                        <span class="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Teatro
                        </span>
                        Actividades
                      </h4>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        14:00 - 15:00
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      <span class="px-2 py-1 text-xs bg-white rounded shadow-sm">Imita a tu Staff</span>
                      <span class="px-2 py-1 text-xs bg-white rounded shadow-sm">Caricaturiza a tu Staff</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">15:00</span>
                <div class="bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400 md:ml-[calc(50%+0.375rem)]">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Teatro
                      </span>
                      El que se la sabe cante
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      15:00 - 15:30
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Llegada de padres -->
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-green-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">16:00</span>
                <div class="bg-gradient-to-r from-green-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-green-400">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Llegada de papás
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hora autorizada
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">16:00</span>
                <div class="bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400 md:ml-[calc(50%+0.375rem)]">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Teatro
                      </span>
                      Lucho Romántico
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      16:00 - 17:00
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="pl-20 relative">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-red-600 z-10 flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="absolute left-9 top-1/2 -translate-y-1/2 text-xs font-bold text-center bg-white px-1 rounded-full shadow-sm z-10">17:00</span>
                <div class="bg-gradient-to-r from-yellow-50 to-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-400">
                  <div class="flex justify-between items-center">
                    <h4 class="font-bold text-primary">
                      <span class="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mr-2 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Teatro
                      </span>
                      Premiación
                    </h4>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Cierre del evento
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pruebas del día final - Grid -->
        <div class="grid gap-8">
          {#each tests.semana as test, i}
            <div id="prueba-final-{i}" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300 {test.score === 'B' ? 'border-4 border-yellow-400 ring-2 ring-yellow-300' : ''}">
              <div class="flex justify-between items-start mb-6">
                <h3 class="text-2xl font-bold text-primary">
                  {#if test.name === "Guatazo Vikingo"}
                    {test.name} <span class="ml-2 inline-block bg-yellow-100 border border-yellow-400 px-3 py-1 rounded-full text-yellow-800 text-xs font-bold transform -rotate-2">¡Talvez! 🤔</span>
                  {:else}
                    {test.name}
                  {/if}
                </h3>
                <div class="text-right">
                  <span class="bg-gradient-to-r {test.score === 'B' ? 'from-yellow-500 to-amber-600' : 'from-red-800 to-orange-600'} text-white px-6 py-2 rounded-full font-bold shadow-lg">
                    {test.score}
                  </span>
                </div>
              </div>
              
              <div class="mb-6 flex flex-wrap items-center gap-2">
                <div class="flex gap-2 items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="font-medium text-primary">Encargados:</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  {#each test.inCharge as person}
                    <span class="px-3 py-1 bg-white rounded-full text-gray-800 shadow-sm border border-gray-200 text-sm">
                      {person}
                    </span>
                  {/each}
                </div>
              </div>

              {#if test.inicio}
                <div class="mb-6 flex flex-col">
                  <div class="flex gap-2 items-center bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 shadow-sm">
                    <div class="flex-none text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="flex gap-2 items-center">
                      <span class="font-semibold text-gray-900">{test.inicio}</span>
                      {#if test.fin}
                        <span class="text-gray-500">→</span>
                        <span class="font-semibold text-gray-900">{test.fin}</span>
                      {/if}
                    </div>
                    {#if test.lugar}
                      <div class="ml-auto flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="font-medium text-primary">{test.lugar}</span>
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}

              <div class="mb-6 bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-orange-300">
                <h4 class="font-semibold mb-2 text-primary flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Descripción:
                </h4>
                <p class="text-gray-700 leading-relaxed pl-1">{@html test.description}</p>
              </div>

              {#if test.criteria && test.criteria.length > 0}
                <div class="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-blue-300">
                  <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Criterios a evaluar:
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    {#each test.criteria as criterion}
                      <span class="px-3 py-1.5 bg-white rounded-md text-gray-700 shadow-sm border border-gray-100 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200">
                        {criterion}
                      </span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center transform hover:scale-[1.02] transition-all duration-300">
          <p class="text-3xl font-bold text-primary">Próximamente</p>
          <p class="text-gray-500 mt-4 text-xl">Las pruebas del día final serán publicadas el {fechaPublicacionPruebasFinal}</p>
          <div class="mt-8">
            <DiscreteTimer fechaStr={fechaPublicacionPruebasFinal} label="Tiempo restante para la publicación:" />
          </div>
        </div>
      {/if}
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

  @media (max-width: 640px) {
    table {
      font-size: 0.85rem;
    }
    th, td {
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    th {
      font-size: 0.95em;
    }
    td {
      font-size: 0.95em;
    }
  }
</style>
