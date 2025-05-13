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
        description: "Inventar un cuento con temática de la Tropa San Luis en 100 palabras. Los cuentos deben ser subidos a través del formulario disponible en <a href='/lucho-cuentero' class='text-red-600 font-bold hover:underline'>la página del concurso →</a>",
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
    semana: []
  };

  /**
   * Puntajes por tipo de prueba y lugar
   * @type {Array<{tipo: string, primero: number, segundo: number, tercero: number, cuarto: number, quinto: number, noParticipa: number}>}
   */
  const puntajes = [
    { tipo: "AAA", primero: 3000, segundo: 2000, tercero: 1000, cuarto: 500, quinto: 0, noParticipa: -1000 },
    { tipo: "AA", primero: 2000, segundo: 1250, tercero: 750, cuarto: 300, quinto: 0, noParticipa: -500 },
    { tipo: "A", primero: 1000, segundo: 750, tercero: 300, cuarto: 100, quinto: 0, noParticipa: -250 }
  ];

  // FECHA GENERAL DEL SABADO 7 DE JUNIO 2025, 00:00:00
  const fechaSabado = new Date('2025-06-07T00:00:00-04:00');
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
    // Asumimos año 2025 y zona horaria -04:00
    return new Date(`2025-06-${dia}T${hora}:00-04:00`);
  }

  let showIndex = false;
  function toggleIndex() {
    showIndex = !showIndex;
  }

  // Fecha para la publicación de las pruebas del día final
  const fechaPublicacionPruebasFinal = "viernes 17 de mayo a las 12:00";
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
      <div class="grid gap-8">
        {#each tests.previa as test, i}
          <div id="prueba-{i}" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex justify-between items-start mb-6">
              <h3 class="text-2xl font-bold text-primary">{test.name}</h3>
              <div class="text-right">
                <span class="bg-gradient-to-r from-red-800 to-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                  {test.score}
                </span>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="font-semibold mb-2 text-primary">Encargados:</h4>
              <p class="text-gray-700">{test.inCharge.join(", ")}</p>
            </div>

            <div class="mb-6">
              <h4 class="font-semibold mb-2 text-primary">Descripción:</h4>
              <p class="text-gray-700 leading-relaxed">{@html test.description}</p>
              {#if test.name === "Recrear la escena de Los 80"}
                <div class="mt-4 aspect-video w-full">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/0NIS5BsywKY" title="Los 80 - &quot;En esta casa no hay ni comunistas ni pinochetistas&quot;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
              {/if}
            </div>

            <div>
              <h4 class="font-semibold mb-2 text-primary">Criterios a evaluar:</h4>
              <ul class="list-disc list-inside text-gray-700 space-y-2">
                {#each test.criteria as criterion}
                  <li class="hover:text-red-800 transition-colors duration-200">{criterion}</li>
                {/each}
              </ul>
            </div>

            {#if test.fecha}
              <div class="mt-12 border-t border-gray-200 pt-6">
                <h4 class="font-semibold mb-2 text-primary">Fecha de subida:</h4>
                <p class="text-gray-700 mb-2">{test.fecha}</p>
                <DiscreteTimer fechaStr={test.fecha} label="Tiempo restante:" />
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
        📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales cuyas bases serán subidas el 17 de mayo.
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center transform hover:scale-[1.02] transition-all duration-300">
        <p class="text-3xl font-bold text-primary">Próximamente</p>
        <p class="text-gray-500 mt-4 text-xl">Las pruebas de la semana serán publicadas próximamente</p>
        <div class="mt-4">
          <DiscreteTimer fechaStr={fechaPublicacionPruebasFinal} label="Publicación:" />
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
