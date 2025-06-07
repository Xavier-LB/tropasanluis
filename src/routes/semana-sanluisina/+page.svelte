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
   * @property {string} [instagram] - Enlace de Instagram (opcional)
   */

  // Tipos para TypeScript
  type TipoPrueba = 'AAA' | 'AA' | 'A';
  type PruebaId = 'promo' | 'doblaje' | 'furro' | 'cuentero' | 'lienzo' | 'cityTour' | 'foto' | 'saludos' | 'musical' | 'escena80' | 'brainRot';
  
  interface Prueba {
    id: PruebaId;
    nombre: string;
    tipo: TipoPrueba;
  }

  interface PuntajePrueba {
    puntaje: number | null;
    link?: string;
  }

  interface Puntajes {
    [key: string]: PuntajePrueba;
  }

  interface Patrulla {
    nombre: string;
    emoji: string;
    colors: {
      bg: string;
      cardBg: string;
      text: string;
      labelText: string;
    };
    puntajes: Puntajes;
    total: number;
    lider?: boolean;
  }

  // Datos de las pruebas y sus tipos
  const pruebas: Prueba[] = [
    { id: 'promo', nombre: 'Promo STL', tipo: 'AA' },
    { id: 'doblaje', nombre: 'Doblaje', tipo: 'AAA' },
    { id: 'furro', nombre: 'L. Furro', tipo: 'AAA' },
    { id: 'cuentero', nombre: 'L. Cuentero', tipo: 'AA' },
    { id: 'lienzo', nombre: 'Lienzo', tipo: 'AA' },
    { id: 'cityTour', nombre: 'City Tour', tipo: 'AA' },
    { id: 'foto', nombre: 'Fotografía', tipo: 'A' },
    { id: 'saludos', nombre: 'Saludos', tipo: 'AA' },
    { id: 'musical', nombre: 'Musical', tipo: 'AA' },
    { id: 'escena80', nombre: 'Escena 80', tipo: 'AAA' },
    { id: 'brainRot', nombre: 'Brain Rot', tipo: 'A' }
  ];

  // Datos de las patrullas con sus puntajes
  const patrullas: Patrulla[] = [
    {
      nombre: 'ANTÍLOPES',
      emoji: '🦌',
      colors: {
        bg: 'bg-gradient-to-r from-blue-600 to-blue-800',
        cardBg: 'bg-white/20',
        text: 'text-white',
        labelText: 'text-white/80'
      },
      puntajes: {
        promo: { puntaje: 300, link: 'https://www.instagram.com/p/DKahiySAqDh/' },
        doblaje: { puntaje: 515, link: 'https://www.instagram.com/p/DKdRIEGgXid/' },
        furro: { puntaje: -1000 },
        cuentero: { puntaje: 250, link: 'https://www.instagram.com/p/DKfpoKiP1hp/' },
        lienzo: { puntaje: -125, link: 'https://www.instagram.com/p/DKf0tqGAmmi/' },
        cityTour: { puntaje: 300, link: 'https://www.instagram.com/p/DKfoE4QvRJR' },
        foto: { puntaje: 1000, link: 'https://www.instagram.com/p/DKiF0cNPfyP/' },
        saludos: { puntaje: 0, link: 'https://www.instagram.com/p/DKiM-XsP6Lk' },
        musical: { puntaje: -500 },
        escena80: { puntaje: -1000 },
        brainRot: { puntaje: 300, link: 'https://www.instagram.com/p/DKaij_jAxU3/' }
      },
      total: 40
    },
    {
      nombre: 'BÚFALOS',
      emoji: '🐃',
      colors: {
        bg: 'bg-white border-l-8 border-red-600',
        cardBg: 'bg-red-50 border border-red-200',
        text: 'text-black',
        labelText: 'text-red-500'
      },
      puntajes: {
        promo: { puntaje: 2000, link: 'https://www.instagram.com/p/DKaioWJAbko/' },
        doblaje: { puntaje: 500, link: 'https://www.instagram.com/p/DKdGaaBA1Sp/' },
        furro: { puntaje: 1975, link: 'https://www.instagram.com/p/DKdGM_6A_Q5' },
        cuentero: { puntaje: 750, link: 'https://www.instagram.com/p/DKfqpJQg7BI/' },
        lienzo: { puntaje: 1250, link: 'https://www.instagram.com/p/DKfrD4TAGv5/' },
        cityTour: { puntaje: 0, link: 'https://www.instagram.com/p/DKfq8_JghB5' },
        foto: { puntaje: 1000, link: 'https://www.instagram.com/p/DKiOvEyvT0R/' },
        saludos: { puntaje: 1155, link: 'https://www.instagram.com/p/DKiR2gyAjdb' },
        musical: { puntaje: -500 },
        escena80: { puntaje: 1000, link: 'https://www.instagram.com/p/DKk0IskAjcv/' },
        brainRot: { puntaje: 100, link: 'https://www.instagram.com/p/DKag7hRvR-z/' }
      },
      total: 9230
    },
    {
      nombre: 'CASTORES',
      emoji: '🦫',
      colors: {
        bg: 'bg-gradient-to-r from-blue-500 to-yellow-400 border-4 border-yellow-500',
        cardBg: 'bg-yellow-200 border border-yellow-300',
        text: 'text-black',
        labelText: 'text-yellow-800'
      },
      puntajes: {
        promo: { puntaje: 1250, link: 'https://www.instagram.com/p/DKahYBmvP0p/' },
        doblaje: { puntaje: 3000, link: 'https://www.instagram.com/p/DKdFQgbyOWL/' },
        furro: { puntaje: 3000, link: 'https://www.instagram.com/p/DKdGCD-AMfZ' },
        cuentero: { puntaje: 2000, link: 'https://www.instagram.com/p/DKfqoOvyjkK/' },
        lienzo: { puntaje: 300, link: 'https://www.instagram.com/p/DKfph9tP8Sy/' },
        cityTour: { puntaje: 1250, link: 'https://www.instagram.com/p/DKfnihtvW2x' },
        foto: { puntaje: 750, link: 'https://www.instagram.com/p/DKiA_ukvvD4/' },
        saludos: { puntaje: 300, link: 'https://www.instagram.com/p/DKiPUJ7gP-9' },
        musical: { puntaje: 1250, link: 'https://www.instagram.com/p/DKkyYtsvJrX/' },
        escena80: { puntaje: 3000, link: 'https://www.instagram.com/p/DKk0BXXyxwg/' },
        brainRot: { puntaje: 750, link: 'https://www.instagram.com/p/DKahLlAybTk/' }
      },
      total: 16850,
      lider: true
    },
    {
      nombre: 'HALCONES',
      emoji: '🦅',
      colors: {
        bg: 'bg-gradient-to-r from-amber-800 to-amber-600',
        cardBg: 'bg-amber-200 border border-amber-300',
        text: 'text-black',
        labelText: 'text-amber-800'
      },
      puntajes: {
        promo: { puntaje: 0, link: 'https://www.instagram.com/p/DKahEG6JbMz/' },
        doblaje: { puntaje: 1775, link: 'https://www.instagram.com/p/DKdLJ9JpxxX/' },
        furro: { puntaje: 1000, link: 'https://www.instagram.com/p/DKcxga0JIuv' },
        cuentero: { puntaje: 0, link: 'https://www.instagram.com/p/DKfoeLDJell/' },
        lienzo: { puntaje: 2000, link: 'https://www.instagram.com/p/DKeiSsbOna7' },
        cityTour: { puntaje: 615, link: 'https://www.instagram.com/p/DKft8SCJZad' },
        foto: { puntaje: 300, link: 'https://www.instagram.com/p/DKh9VOZJQKt/' },
        saludos: { puntaje: 620, link: 'https://www.instagram.com/p/DKiSmskJEaV' },
        musical: { puntaje: -500 },
        escena80: { puntaje: -1000 },
        brainRot: { puntaje: 750, link: 'https://www.instagram.com/p/DKZqh25tMPB/' }
      },
      total: 5560
    },
    {
      nombre: 'TIGRES',
      emoji: '🐅',
      colors: {
        bg: 'bg-gradient-to-r from-purple-600 to-purple-800',
        cardBg: 'bg-white/20',
        text: 'text-white',
        labelText: 'text-white/80'
      },
      puntajes: {
        promo: { puntaje: 750, link: 'https://www.instagram.com/p/DKajXCxxjx_/' },
        doblaje: { puntaje: 3000, link: 'https://www.instagram.com/p/DKdGBx4AqLV/' },
        furro: { puntaje: 500, link: 'https://www.instagram.com/p/DKcw0XWA8l6' },
        cuentero: { puntaje: 1250, link: 'https://www.instagram.com/p/DKfl_GUvEKf/' },
        lienzo: { puntaje: 750, link: 'https://www.instagram.com/p/DKfT8eVvSRu' },
        cityTour: { puntaje: 2000, link: 'https://www.instagram.com/p/DKfmc-2vlfu' },
        foto: { puntaje: 100, link: 'https://www.instagram.com/p/DKht_lQAGiw/' },
        saludos: { puntaje: 2000, link: 'https://www.instagram.com/p/DKiO8YDAXPh' },
        musical: { puntaje: 2000, link: 'https://www.instagram.com/p/DKkvtdJvUbF' },
        escena80: { puntaje: 2000, link: 'https://www.instagram.com/p/DKkurENPenl/' },
        brainRot: { puntaje: 1000, link: 'https://www.instagram.com/p/DKZgk5nAAGs/' }
      },
      total: 15350
    }
  ];

  // Ordenar patrullas por puntaje total (mayor a menor)
  const patrullasOrdenadas = [...patrullas].sort((a, b) => b.total - a.total);

  /**
   * Obtiene las penalizaciones aplicadas para una prueba específica
   * @param {string} testName - Nombre de la prueba
   * @returns {Array} Array de penalizaciones
   */
  function getPenalizaciones(testName: string) {
    switch (testName) {
      case "Doblaje":
        return [
          { patrulla: "HALCONES", monto: -225, razon: "Retraso en la entrega" },
          { patrulla: "ANTÍLOPES", monto: -485, razon: "Retraso en la entrega" }
        ];
      case "Lucho Furro":
        return [
          { patrulla: "BÚFALOS", monto: -50, razon: "Retraso en la entrega" }
        ];
      case "Lucho cuentero":
        return [
          { patrulla: "ANTÍLOPES", monto: -50, razon: "Se pasaron de las 100 palabras" }
        ];
      case "Lienzo":
        return [
          { patrulla: "ANTÍLOPES", monto: -425, razon: "Retraso en la entrega" }
        ];
      case "Lucho City Tour":
        return [
          { patrulla: "HALCONES", monto: -135, razon: "Retraso en la entrega" }
        ];
      case "Saludos":
        return [
          { patrulla: "BÚFALOS", monto: -95, razon: "Retraso en la entrega" },
          { patrulla: "HALCONES", monto: -130, razon: "Retraso en la entrega" }
        ];
      default:
        return [];
    }
  }

  /**
   * Obtiene la penalización específica de una patrulla para una prueba
   * @param {string} testName - Nombre de la prueba
   * @param {string} patrullaName - Nombre de la patrulla
   * @returns {Object|null} Penalización o null si no existe
   */
  function getPenalizacionPatrulla(testName: string, patrullaName: string) {
    const penalizaciones = getPenalizaciones(testName);
    return penalizaciones.find(p => p.patrulla === patrullaName) || null;
  }

  /**
   * Verifica si han pasado más de 24 horas desde la fecha límite de una prueba
   * @param {string} fechaStr - Fecha en formato "Día X de mes hasta las HH:MM"
   * @returns {boolean} True si han pasado más de 24 horas desde la fecha límite
   */
  function pruebaExpirada(fechaStr: string): boolean {
    if (!fechaStr) return false;
    
    try {
      // Extraer información de la fecha
      const fechaRegex = /(\w+)\s+(\d+)\s+de\s+(\w+)\s+hasta\s+las\s+(\d+):(\d+)/i;
      const match = fechaStr.match(fechaRegex);
      
      if (!match) return false;
      
      const [, dia, fecha, mes, hora, minuto] = match;
      
      // Mapear nombres de meses a números
      const meses: { [key: string]: number } = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
        'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
        'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      };
      
      const mesNum = meses[mes.toLowerCase()];
      if (mesNum === undefined) return false;
      
      // Crear fecha límite (asumiendo año 2025)
      const fechaLimite = new Date(2025, mesNum, parseInt(fecha), parseInt(hora), parseInt(minuto));
      
      // Agregar 24 horas a la fecha límite
      const fechaLimiteMas24h = new Date(fechaLimite.getTime() + 1 * 60 * 60 * 1000);
      
      // Comparar con la fecha actual
      const ahora = new Date();
      
      return ahora > fechaLimiteMas24h;
    } catch (error) {
      console.error('Error al parsear fecha:', error);
      return false;
    }
  }

  /**
   * Función para obtener el color del tipo de prueba
   * @param {TipoPrueba} tipo - Tipo de prueba (AAA, AA, A)
   * @returns {string} Clase CSS para el color
   */
  function getColorTipo(tipo: TipoPrueba): string {
    switch(tipo) {
      case 'AAA': return 'text-red-400';
      case 'AA': return 'text-yellow-400';
      case 'A': return 'text-green-400';
      default: return 'text-gray-400';
    }
  }

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
        fecha: "Lunes 2 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKahEG6JbMz/"
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
        fecha: "Lunes 2 de junio hasta las 18:00 (likes hasta viernes 6 de junio, 12:00)",
        fechaLikes: "Viernes 6 de junio hasta las 12:00"
      },
      {
        name: "Lucho City Tour",
        score: "AA",
        inCharge: ["Marcelo", "Pelao", "Xavier"],
        description: "Deberán sacarse fotos de la patrulla en lugares históricos de la ciudad de Santiago. Los lugares a visitar son los siguientes:",
        criteria: [
          "Mayor número de lugares visitados",
          "Mayor porcentaje de integrantes de la patrulla en cada foto"
        ],
        fecha: "Miércoles 4 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKft8SCJZad",
        locations: [
          {
            name: "Museo Nacional de Bellas Artes",
            description: "Este museo, inaugurado en 1910, fue diseñado por el arquitecto franco-chileno Emilio Jéquier, quien también diseñó la Estación Mapocho y el Palacio de los Tribunales de Justicia. El edificio está inspirado en el Petit Palais de París y alberga más de 3,000 obras de arte, incluyendo una destacada colección de esculturas africanas."
          },
          {
            name: "Museo de Historia Natural",
            description: "Fundado en 1830 por el naturalista francés Claudio Gay, este museo es uno de los más antiguos de América. Su colección incluye una réplica de un Diplodocus y la momia chinchorro más antigua del mundo, de más de 7,000 años de antigüedad."
          },
          {
            name: "Palacio de La Moneda",
            description: "Originalmente construido en 1805 como casa de acuñación de monedas, el Palacio de La Moneda se convirtió en sede del gobierno en 1846. Durante el golpe de Estado de 1973, fue bombardeado, lo que causó la pérdida de importantes documentos históricos, incluida el Acta de Independencia de 1818."
          },
          {
            name: "Castillo Hidalgo (Cerro Santa Lucía)",
            description: "Construido en 1816 como fortaleza militar, el Castillo Hidalgo se encuentra en el Cerro Santa Lucía, lugar donde Pedro de Valdivia fundó Santiago en 1541. En 1971, se instaló un mural de cerámica en honor a Gabriela Mistral, que aún puede ser visitado."
          },
          {
            name: "Virgen del Cerro San Cristóbal",
            description: "La estatua de la Inmaculada Concepción, de 14 metros de altura y 36 toneladas de peso, fue inaugurada en 1908. En su pedestal se encuentra una pequeña capilla donde el Papa Juan Pablo II oró y bendijo la ciudad en 1987."
          },
          {
            name: "Templo Bahai",
            description: "Inaugurado en 2016, este templo es uno de los ocho Bahá'ís en el mundo y el único en Sudamérica. Diseñado por el arquitecto canadiense Siamak Hariri, su estructura de nueve pétalos permite el paso de la luz natural, simbolizando la unidad y la iluminación espiritual."
          },
          {
            name: "Estatua Condorito",
            description: "Ubicada en el Parque del Cómic de San Miguel, esta estatua rinde homenaje al icónico personaje creado por Pepo. El parque fue inaugurado en 2006 y cuenta con diversas esculturas y viñetas que celebran la historia del cómic chileno."
          },
          {
            name: "Ex Congreso Nacional",
            description: "El edificio del ex Congreso Nacional, inaugurado en 1876, fue construido en el terreno donde se encontraba la Iglesia de la Compañía de Jesús, destruida por un incendio en 1863. En sus jardines se instalaron faroles y una fuente traídos desde Francia en el siglo XIX."
          },
          {
            name: "Casa Valdés Bustamante",
            description: "Construida en 1906 y adquirida en 1909 por el historiador y diplomático Francisco Valdés Vergara, ex estudiante del Colegio San Ignacio. Fue diseñada por el renombrado arquitecto Ricardo Larraín Bravo, una de las figuras más importantes de la arquitectura chilena de principios del siglo XX. De estilo neogótico, fue declarada Monumento Nacional en 2018. Próximamente albergará un café que rendirá homenaje a la obra arquitectónica de Larraín Bravo."
          },
          {
            name: "La Casa Colorada",
            description: "Construida entre 1769 y 1779 por el arquitecto portugués Joseph de la Vega, esta casa fue la residencia de Mateo de Toro y Zambrano, presidente de la Primera Junta Nacional de Gobierno. Actualmente, funciona como museo y es uno de los mejores ejemplos de arquitectura colonial en Santiago."
          },
          {
            name: "Iglesia San Francisco",
            description: "La Iglesia San Francisco, construida en 1618, es el edificio más antiguo de Santiago que ha resistido múltiples terremotos. En su museo se encuentra la Sala Gabriela Mistral, que alberga objetos personales de la poeta, incluyendo réplicas de su medalla y diploma del Premio Nobel de Literatura."
          }
        ]
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
        fecha: "Martes 3 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKdLJ9JpxxX/"
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
        fecha: "Martes 3 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKcxga0JIuv"
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
        fecha: "Miércoles 4 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKfoeLDJell/"
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
        fecha: "Miércoles 4 de junio hasta las 18:00",
        instagram: "https://www.instagram.com/p/DKeiSsbOna7"
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
        fecha: "Jueves 5 de junio hasta las 18:00",
        instagram: {
          antilopes: "https://www.instagram.com/p/DKiF0cNPfyP/",
          tigres: "https://www.instagram.com/p/DKht_lQAGiw/",
          halcones: "https://www.instagram.com/p/DKh9VOZJQKt/",
          castores: "https://www.instagram.com/p/DKiA_ukvvD4/",
          bufalos: "https://www.instagram.com/p/DKiOvEyvT0R/"
        }
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
        fecha: "Jueves 5 de junio hasta las 18:00",
        instagram: {
          antilopes: "https://www.instagram.com/p/DKiM-XsP6Lk/",
          tigres: "https://www.instagram.com/p/DKiO8YDAXPh/",
          halcones: "https://www.instagram.com/p/DKiSmskJEaV/",
          castores: "https://www.instagram.com/p/DKiPUJ7gP-9/",
          bufalos: "https://www.instagram.com/p/DKiR2gyAjdb/"
        }
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
        description: "3 parejas por patrulla deberán bailar canciones por rondas. Al final de cada ronda se elimina una pareja. Las parejas deben estar compuestas por 1 patrullero y un apoderado de la tropa, staff de otra unidad y/o alumno del colegio. Serán géneros musicales variados.",
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
        inCharge: ["Marti", "Viky", "Chopi"],
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
  
  // Variable para controlar el toggle de lugares a visitar
  let mostrarLugares = false;

  // Variables para controlar el toggle de puntajes por patrulla
  let mostrarPuntajes: { [key: string]: boolean } = {};

  /**
   * Determina el estado de un día en el cronograma considerando fecha y hora límite
   * @param {number} indiceDia - Índice del día (0-5)
   * @returns {'pasado' | 'actual' | 'futuro'} Estado del día
   */
  function getEstadoDia(indiceDia: number): 'pasado' | 'actual' | 'futuro' {
    const ahora = new Date();
    const año = 2025;
    
    // Definir las fechas del cronograma con hora límite (18:00)
    const fechasLimite = [
      new Date(año, 5, 2, 18, 0), // Lunes 2 junio 18:00
      new Date(año, 5, 3, 18, 0), // Martes 3 junio 18:00
      new Date(año, 5, 4, 18, 0), // Miércoles 4 junio 18:00
      new Date(año, 5, 5, 18, 0), // Jueves 5 junio 18:00
      new Date(año, 5, 6, 18, 0), // Viernes 6 junio 18:00
      new Date(año, 5, 7, 18, 0)  // Sábado 7 junio 18:00
    ];
    
    // Verificar si el índice es válido
    if (indiceDia < 0 || indiceDia >= fechasLimite.length) {
      return 'futuro';
    }
    
    const fechaLimiteDia = fechasLimite[indiceDia];
    const fechaInicioDia = new Date(fechaLimiteDia.getFullYear(), fechaLimiteDia.getMonth(), fechaLimiteDia.getDate(), 0, 0, 0);
    
    // Si ya pasó la hora límite del día, está en el pasado
    if (ahora > fechaLimiteDia) {
      return 'pasado';
    }
    
    // Si estamos dentro del día (después del inicio pero antes de la hora límite), es actual
    if (ahora >= fechaInicioDia && ahora <= fechaLimiteDia) {
      return 'actual';
    }
    
    // Si aún no llegamos al día, es futuro
    return 'futuro';
  }

  // Fecha para la publicación de las pruebas del día final
  const fechaPublicacionPruebasFinal = "17 de mayo a las 14:00";
  
  // Fecha exacta para la publicación automática (UTC -3, Santiago de Chile)
  const fechaPublicacionExacta = new Date('2025-05-17T14:00:00-03:00');
  
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
      <div class="mt-6 text-lg font-bold text-white bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-2xl px-8 py-4 inline-block shadow-lg transform hover:scale-105 transition-transform duration-300">
        ⏰ Cuenta regresiva para el Día Final (Sábado 7 de Junio):<br>
        <span class="text-3xl font-black tracking-wider">{tiempoSabado}</span>
      </div>
    </div>

    <h1 class="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
      Pruebas Semana San Luisina
    </h1>

    <!-- Tabla de Posiciones Actuales -->
    <div class="mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8">
      <h2 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent flex items-center justify-center">
        🏆 Tabla de Posiciones Actuales
      </h2>

      <!-- Tabla de puntajes compacta para móvil -->
      <div class="space-y-3 sm:space-y-4">
        {#each patrullasOrdenadas as patrulla, index}
          <div class="{patrulla.colors.bg} rounded-xl shadow-md overflow-hidden">
            <div class="p-4 sm:p-5">
              <!-- Header compacto de la patrulla -->
              <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-3 lg:space-y-0">
                <div class="flex items-center justify-between lg:justify-start">
                  <div class="flex items-center space-x-3">
                    <span class="text-xl sm:text-2xl">{patrulla.emoji}</span>
                    <div class="flex flex-col">
                      <h3 class="text-base sm:text-lg font-bold {patrulla.colors.text}">{patrulla.nombre}</h3>
                      <div class="text-xs sm:text-sm {patrulla.nombre === 'BÚFALOS' ? 'text-red-500' : 'text-white'} opacity-75">
                        Posición #{index + 1}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Botón toggle - visible en móvil -->
                  <button
                    class="lg:hidden p-2 rounded-full {patrulla.colors.cardBg} {patrulla.colors.text} hover:opacity-80 transition-all duration-200 transform {mostrarPuntajes[patrulla.nombre] ? 'rotate-180' : ''} flex-shrink-0"
                    on:click={() => mostrarPuntajes[patrulla.nombre] = !mostrarPuntajes[patrulla.nombre]}
                    aria-label="Toggle detalles de puntajes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                <div class="flex justify-center lg:justify-end lg:flex-row lg:items-center lg:space-x-3">
                  <div class="{patrulla.lider ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'} px-4 py-2 rounded-lg font-bold text-base sm:text-lg">
                    {patrulla.total.toLocaleString()} pts
                  </div>
                  
                  <!-- Botón toggle - visible en desktop -->
                  <button
                    class="hidden lg:block p-2 rounded-full {patrulla.colors.cardBg} {patrulla.colors.text} hover:opacity-80 transition-all duration-200 transform {mostrarPuntajes[patrulla.nombre] ? 'rotate-180' : ''} flex-shrink-0"
                    on:click={() => mostrarPuntajes[patrulla.nombre] = !mostrarPuntajes[patrulla.nombre]}
                    aria-label="Toggle detalles de puntajes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Puntajes por prueba - colapsables -->
              {#if mostrarPuntajes[patrulla.nombre]}
                <div class="mt-4 pt-4 border-t border-white/20 animate-in slide-in-from-top duration-300">
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 {patrulla.colors.text}">
                    {#each pruebas as prueba}
                      {#if patrulla.puntajes[prueba.id].puntaje !== null}
                        <div class="{patrulla.colors.cardBg} rounded-lg p-2 sm:p-3 text-center relative">
                          <div class="text-xs sm:text-sm {patrulla.colors.labelText} flex flex-col items-center justify-center gap-1">
                            <span class="leading-tight text-center">{prueba.nombre}</span>
                            <span class="{getColorTipo(prueba.tipo)} font-bold text-xs">{prueba.tipo}</span>
                          </div>
                          <div class="font-semibold text-sm sm:text-base mt-2">{patrulla.puntajes[prueba.id].puntaje}</div>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Instrucción para expandir detalles -->
      <div class="mt-6 text-center text-sm text-gray-600 px-4">
        <p class="flex items-center justify-center gap-2 flex-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Toca la flecha para ver los puntajes detallados por prueba</span>
        </p>
      </div>
    </div>

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
          <!-- Enlace destacado a criterios -->
          <div class="mb-4">
            <a href="/semana-sanluisina/criterios" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver Todos los Criterios de Evaluación
            </a>
          </div>
          
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
          <div class="flex flex-wrap justify-center gap-2 text-sm">
            {#each tests.semana as test, i}
              <a href="#prueba-final-{i}" class="text-gray-600 hover:text-red-800 transition-colors duration-200 px-3 py-1.5 bg-white/50 hover:bg-white/80 rounded-lg shadow-sm">
                {test.name}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Pruebas de la Previa -->
    <section id="pruebas-previa" class="mb-16">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Pruebas de la Previa
      </h2>

      <!-- Cronograma de entrega de pruebas -->
      

      <div class="grid gap-8">
        {#each tests.previa as test, i}
          <div id="prueba-{i}" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300 relative">
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
              {#if test.name === "Lucho City Tour" && test.locations}
                <div class="mt-4 space-y-2">
                  <button 
                    class="flex items-center gap-2 font-semibold text-primary hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                    on:click={() => mostrarLugares = !mostrarLugares}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200 {mostrarLugares ? 'rotate-90' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Lugares a visitar ({test.locations.length})
                  </button>
                  
                  {#if mostrarLugares}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 animate-in slide-in-from-top duration-300">
                      {#each test.locations as location}
                        <div class="bg-white p-2 rounded-lg shadow-sm border border-orange-100 hover:border-orange-300 transition-colors duration-200">
                          <h6 class="font-semibold text-orange-700 mb-1 flex items-center text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location.name}
                          </h6>
                          <p class="text-gray-600 text-xs">{location.description}</p>
                        </div>
                      {/each}
                    </div>
                  {/if}
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

            <!-- Resultados por patrulla -->
                          {#if test.name === "Promo STL" || test.name === "Doblaje" || test.name === "Lucho Furro" || test.name === "Lucho cuentero" || test.name === "Lienzo" || test.name === "Lucho City Tour" || test.name === "Fotografía" || test.name === "Saludos" || test.name === "Lucho Musical" || test.name === "Recrear la escena de Los 80" || test.name === "Brain Rot"}
              {@const pruebaKey = test.name === "Promo STL" ? "promo" : 
                                test.name === "Doblaje" ? "doblaje" :
                                test.name === "Lucho Furro" ? "furro" :
                                test.name === "Lucho cuentero" ? "cuentero" :
                                test.name === "Lienzo" ? "lienzo" :
                                test.name === "Lucho City Tour" ? "cityTour" :
                                test.name === "Fotografía" ? "foto" :
                                test.name === "Saludos" ? "saludos" :
                                test.name === "Lucho Musical" ? "musical" :
                                test.name === "Recrear la escena de Los 80" ? "escena80" :
                                "brainRot"}
              {@const patrullasConPuntaje = patrullas.filter(p => p.puntajes[pruebaKey]?.puntaje !== null || p.puntajes[pruebaKey]?.link)}
              {#if patrullasConPuntaje.length > 0}
                <div class="bg-gradient-to-r from-emerald-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-300 mb-6">
                  <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                    <span class="text-2xl">🏆</span>
                    Resultados por patrulla:
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {#each patrullasConPuntaje.sort((a, b) => (b.puntajes[pruebaKey]?.puntaje || 0) - (a.puntajes[pruebaKey]?.puntaje || 0)) as patrulla, index}
                      {@const puntajeData = patrulla.puntajes[pruebaKey]}
                      {#if puntajeData}
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200">
                          <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                              <span class="text-lg">{patrulla.emoji}</span>
                              <span class="font-semibold text-sm {patrulla.colors.text === 'text-white' ? 'text-gray-800' : patrulla.colors.text}">{patrulla.nombre}</span>
                              {#if index === 0 && puntajeData.puntaje !== null}
                                <span class="text-yellow-500">👑</span>
                              {/if}
                            </div>
                            {#if puntajeData.puntaje !== null}
                              <span class="font-bold text-lg {(puntajeData.puntaje || 0) < 0 ? 'text-red-600' : (puntajeData.puntaje || 0) === 0 ? 'text-gray-500' : 'text-green-600'}">
                                {(puntajeData.puntaje || 0) >= 0 ? '+' : ''}{puntajeData.puntaje || 0} pts
                              </span>
                            {:else}
                                <span class="font-medium text-xs text-gray-400 italic">
                                  Pendiente evaluación
                                </span>
                            {/if}
                          </div>
                          
                          {#if puntajeData.link}
                            <a 
                              href={puntajeData.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm w-full justify-center mb-2"
                            >
                              <span class="text-sm">📸</span>
                              Ver en Instagram
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          {/if}
                          
                          <!-- Mostrar penalización si existe -->
                          {#if getPenalizacionPatrulla(test.name, patrulla.nombre)}
                            <div class="text-xs text-red-600 italic">
                              ⚠️ Penalización: {getPenalizacionPatrulla(test.name, patrulla.nombre)?.monto} pts ({getPenalizacionPatrulla(test.name, patrulla.nombre)?.razon})
                            </div>
                          {/if}
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>
              {/if}
            {/if}



            {#if test.fecha && !pruebaExpirada(test.fecha)}
              <div class="bg-gradient-to-r from-indigo-50 to-white rounded-lg p-4 shadow-sm border-l-4 border-indigo-300">
                <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
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
            
            <!-- Temporizador especial para Brain rot (conteo de likes) -->
            {#if test.name === "Brain Rot" && test.fechaLikes && !pruebaExpirada(test.fechaLikes)}
              <div class="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-4 shadow-sm border-l-4 border-pink-400">
                <h4 class="font-semibold mb-3 text-primary flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Límite para conteo de likes:
                </h4>
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center">
                    <span class="inline-flex items-center bg-pink-100 text-pink-800 px-2 py-0.5 rounded mr-2 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Likes
                    </span>
                    <span class="text-gray-700">{test.fechaLikes}</span>
                  </div>
                  <DiscreteTimer fechaStr={test.fechaLikes} label="Tiempo restante para likes:" />
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

    <!-- Cronograma del día final -->
    <section class="mb-16">
      <h2 class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Cronograma del Día Final
      </h2>
      
      {#if mostrarPruebasFinal}
        <!-- Timeline del día -->
        <div class="mb-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h3 class="text-xl font-bold text-primary mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
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
                    <a href="#prueba-final-2" class="px-2 py-1 text-xs bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 cursor-pointer flex items-center">
                      Guatazo Vikingo <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                    </a>
                    <a href="#prueba-final-3" class="px-2 py-1 text-xs bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 cursor-pointer flex items-center">
                      Lucho Master Chef <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                    </a>
                    <a href="#prueba-final-4" class="px-2 py-1 text-xs bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 cursor-pointer flex items-center">
                      Pasapalabra <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                    </a>
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
                      <a href="#prueba-final-5" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                        Lucho Bailetón <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                      </a>
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
                      <a href="#prueba-final-6" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                        Almuerzo
                      </a>
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
                        <a href="#prueba-final-7" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                          Pichanga <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AAA</span>
                        </a>
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
                      <a href="#prueba-final-8" class="px-2 py-1 text-xs bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 cursor-pointer flex items-center">
                        Imita a tu Staff <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                      </a>
                      <a href="#prueba-final-9" class="px-2 py-1 text-xs bg-white rounded shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 cursor-pointer flex items-center">
                        Caricaturiza a tu Staff <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                      </a>
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
                      <a href="#prueba-final-10" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                        El que se la sabe cante <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                      </a>
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
                      <a href="#prueba-final-11" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                        Lucho Romántico <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">AA</span>
                      </a>
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
                      <a href="#prueba-final-12" class="hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                        Premiación <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded">A</span>
                      </a>
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
      {:else}
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center transform hover:scale-[1.02] transition-all duration-300">
          <p class="text-3xl font-bold text-primary">Próximamente</p>
          <p class="text-gray-500 mt-4 text-xl">El cronograma del día final será publicado el {fechaPublicacionPruebasFinal}</p>
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
