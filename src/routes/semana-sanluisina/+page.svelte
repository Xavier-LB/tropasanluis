<script>
  import { onMount } from 'svelte';
  import PruebaTimer from '$lib/PruebaTimer.svelte';
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
        name: "Promo Semana Sanluisina",
        score: "AA",
        inCharge: ["Pao", "Chopi", "Marcelo"],
        description: "Deben promocionar la Tropa San Luis",
        criteria: [
          "5 integrantes minimo",
          "Edicion del video",
          "Calidad del video (Imagen y audio)",
          "Creatividad"
        ],
        fecha: "Lunes 2 de junio hasta las 18:00"
      },
      {
        name: "Brain Rot",
        score: "A",
        inCharge: ["Pelao", "Pedro", "Chopi"],
        description: "Hacer un Brain Rot con el animal de la patrulla, debera ser subido a Instagram y se considerara cantidad de likes. Debe ser subido el lunes 2 de junio hasta las 18:00. Los likes se contarán hasta el viernes 6 de junio a las 12 PM.",
        criteria: [
          "Likes de Instagram",
          "Originalidad",
          "Coherencia de la historia"
        ],
        fecha: "Lunes 2 de junio hasta las 18:00 (likes hasta viernes 6 de junio, 12 PM)"
      },
      {
        name: "Doblaje",
        score: "AAA",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Deberan recrear el video clip de una cancion",
        criteria: [
          "Participacion de la patrulla",
          "Vestimenta",
          "Localizaciones",
          "Calidad del video (Imagen y audio)",
          "Similitud al video original",
          "Edicion del video"
        ],
        fecha: "Martes 3 de junio hasta las 18:00"
      },
      {
        name: "Lucho Furro",
        score: "AAA",
        inCharge: ["Pedro", "Fu", "Marti"],
        description: "Un integrante de la patrulla debera personificar al animal de su patrulla con vestimenta y maquillaje, debera ser subida como una secion de fotos con una escenografia. Deben describir los valores que transmite el animal.",
        criteria: [
          "Maquillaje",
          "Vestimenta",
          "Calidad de fotos",
          "Uso de colores",
          "Cratividad",
          "Uso de materiales reciclados",
          "Escenografía"
        ],
        fecha: "Martes 3 de junio hasta las 18:00"
      },
      {
        name: "Lucho en 100 Palabras",
        score: "AA",
        inCharge: ["Marcelo", "Pelao", "Viky"],
        description: "Invitar un cuento con tematica de la Tropa San Luis en 100 palabras (Imitando Santiago en 100 palabras)",
        criteria: [
          "Originalidad",
          "Ortografía",
          "Pertinencia San Luisina",
          "Coherencia",
          "Coheción",
          "Estructura"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00"
      },
      {
        name: "Lienzo",
        score: "AA",
        inCharge: ["Renato (MA)", "Marti", "Browne"],
        description: "En una hoja de Block (34x48), hacer un lienzo que represente la tropa (No a la patrulla)",
        criteria: [
          "Originalidad",
          "Tecnica",
          "Mensaje",
          "Comprención",
          "Uso de colores",
          "Tecnica"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00"
      },
      {
        name: "Fotografia",
        score: "A",
        inCharge: ["Browne", "Marcelo", "Dani"],
        description: "Tomar una foto artisica de un entorno natural, la foto debe tener un título",
        criteria: [
          "Calidad de la imagen",
          "Originalidad",
          "Encuadre",
          "Enfoque",
          "Luminocidad"
        ],
        fecha: "Jueves 5 de junio hasta las 18:00"
      },
      {
        name: "Saludos",
        score: "AA",
        inCharge: ["Chopi", "Pao", "Pedro"],
        description: "Deberan conseguir los saludos de las siguientes personas. El del presidente ganan todo, si hay empate se desempata con la del Papa",
        criteria: [
          "2 Musicos",
          "2 Politicos",
          "2 Influencer",
          "2 Futbolistas",
          "El Papa",
          "El presidente de Chile (Boric)"
        ],
        fecha: "Jueves 5 de junio hasta las 18:00"
      },
      {
        name: "Cantar un himno con una patrulla de otro grupo (con guitarra)",
        score: "AA",
        inCharge: ["Marcelo", "Chopi", "Xavier"],
        description: "Deberan grabarse cantando un himno de la tropa con una patrulla de otro grupo scout",
        criteria: [
          "Intrerpretacion Musical",
          "5 integrantes de una patrulla de otro grupo Scout",
          "Pañolines (de la STL y del otro grupo)"
        ],
        fecha: "Viernes 6 de junio hasta las 18:00"
      },
      {
        name: "Recrear la escena de los 80",
        score: "AAA",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Deberen recrear la escena de los 80, cambiando los dialogos con tematica de la tropa, con una familia de la patrulla, incluyendo al patrullero o patrullera (https://www.youtube.com/watch?v=0NIS5BsywKY&ab_channel=El13)",
        criteria: [
          "Fidelidad a la escena original",
          "Originalidad de los dialogos",
          "Vestuario",
          "Escenario",
          "Actuacion",
          "Calidad Audio y video"
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
  let intervaloSabado;

  function calcularTiempoRestante(fechaLimite) {
    const ahora = new Date();
    const diferencia = fechaLimite - ahora;
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
  function obtenerFechaLimite(fechaStr) {
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
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6 text-center">
    <span class="inline-block text-3xl font-extrabold text-primary animate-bounce">🎉🔥 ¡La semana empieza ya! 🚀🏕️</span>
    <div class="mt-2 text-xl font-semibold text-primary">⏳ Tienen 3 semanas para preparar las pruebas, ¡así que empiecen ya! 💪😎</div>
    <div class="mt-4 text-2xl font-bold text-red-600 bg-yellow-100 rounded-xl px-6 py-3 inline-block shadow animate-pulse">
      ⏰ Cuenta regresiva para el Día Final (Sábado 7 de Junio):<br>
      <span class="text-3xl">{tiempoSabado}</span>
    </div>
  </div>
  <h1 class="text-4xl font-bold mb-8 text-center">Pruebas Semana San Luisina</h1>

  <div class="mb-8">
    <p class="mb-4 text-lg text-gray-700">
      🏁 Las pruebas se dividen en dos categorías: las pruebas de la <span class="font-semibold">"Previa"</span> y las del <span class="font-semibold">"Día final"</span> (sábado 7 de junio).<br>
      📸 Las pruebas de la <span class="font-semibold">"Previa"</span> deben ser subidas al Instagram de cada patrulla utilizando el <span class="font-semibold">#semanasanluisina2025</span> en el día y horario indicado. <span class="font-semibold">No se puede subir antes ni después de la hora límite.</span><br>
      ⏰ El atraso en la entrega implica pérdida de puntaje.<br>
      🤝 Se evalúa en términos generales la participación de la patrulla.<br>
      🏕️ Dependiendo del lugar obtenido en la semana sanluisina, obtendrán puntaje para el campamento de verano.
    </p>
    <div class="mb-6 text-xl text-center font-bold text-primary">
      📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales cuyas bases serán subidas el 17 de mayo.
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full w-full bg-white rounded-lg shadow text-center text-xs sm:text-sm md:text-base">
        <thead class="bg-primary text-white">
          <tr>
            <th class="py-2 px-1 sm:px-2">Tipo</th>
            <th class="py-2 px-1 sm:px-2">1°</th>
            <th class="py-2 px-1 sm:px-2">2°</th>
            <th class="py-2 px-1 sm:px-2">3°</th>
            <th class="py-2 px-1 sm:px-2">4°</th>
            <th class="py-2 px-1 sm:px-2">5°</th>
            <th class="py-2 px-1 sm:px-2 whitespace-nowrap">No participación</th>
          </tr>
        </thead>
        <tbody>
          {#each puntajes as p}
            <tr class="border-b even:bg-gray-50">
              <td class="py-2 px-1 sm:px-2 font-bold text-primary text-xs sm:text-base">{p.tipo}</td>
              <td class="py-2 px-1 sm:px-2">{p.primero}</td>
              <td class="py-2 px-1 sm:px-2">{p.segundo}</td>
              <td class="py-2 px-1 sm:px-2">{p.tercero}</td>
              <td class="py-2 px-1 sm:px-2">{p.cuarto}</td>
              <td class="py-2 px-1 sm:px-2">{p.quinto}</td>
              <td class="py-2 px-1 sm:px-2 text-red-600 font-semibold">{p.noParticipa}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Pruebas de la Previa -->
  <section class="mb-12">
    <h2 class="text-3xl font-semibold mb-6 text-primary">Pruebas de la Previa</h2>
    <div class="grid gap-6">
      {#each tests.previa as test}
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">{test.name}</h3>
            <div class="text-right">
              <span class="bg-primary text-white px-4 py-2 rounded-full font-bold">
                {test.score}
              </span>
            </div>
          </div>
          
          <div class="mb-4">
            <h4 class="font-semibold mb-2">Encargados:</h4>
            <p class="text-gray-700">{test.inCharge.join(", ")}</p>
          </div>

          {#if test.fecha}
            <div class="mb-4">
              <h4 class="font-semibold mb-2">Fecha de subida:</h4>
              <p class="text-gray-700">{test.fecha}</p>
              <PruebaTimer fechaStr={test.fecha} />
            </div>
          {/if}

          <div class="mb-4">
            <h4 class="font-semibold mb-2">Descripción:</h4>
            <p class="text-gray-700">{test.description}</p>
          </div>

          <div>
            <h4 class="font-semibold mb-2">Criterios a evaluar:</h4>
            <ul class="list-disc list-inside text-gray-700">
              {#each test.criteria as criterion}
                <li>{criterion}</li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Pruebas de la Semana -->
  <section>
    <h2 class="text-3xl font-semibold mb-6 text-primary">Pruebas del día final</h2>
    <div class="mb-6 text-xl text-center font-bold text-primary">
      📅 El sábado 7 de junio tendremos una reunión extendida con las pruebas presenciales cuyas bases serán subidas el 17 de mayo.
    </div>
    <div class="bg-white rounded-lg shadow-lg p-8 text-center">
      <p class="text-2xl font-bold text-gray-600">Próximamente</p>
      <p class="text-gray-500 mt-2">Las pruebas de la semana serán publicadas próximamente</p>
    </div>
  </section>
</div>

<style>
  :global(body) {
    background-color: #f3f4f6;
  }
  
  .text-primary {
    color: #1a365d;
  }
  
  .bg-primary {
    background-color: #1a365d;
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
