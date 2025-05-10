<script>
  import { onMount, onDestroy } from 'svelte';

  // Lista de fotos para el carrusel
  const photos = [
    { src: "/2013.webp", caption: "2013" },
    { src: "/Campamento de Invierno 2001.webp", caption: "Campamento de Invierno 2001" },
    { src: "/Campamento de Invierno 2004 - Olmué.webp", caption: "Campamento de Invierno 2004 - Olmué" },
    { src: "/Campamento de Otoño 2005 - Reserva Nacional Rio Cipreses.webp", caption: "Campamento de Otoño 2005 - Reserva Nacional Río Cipreses" },
    { src: "/Campamento de Otoño 2010 - Olmué.webp", caption: "Campamento de Otoño 2010 - Olmué" },
    { src: "/Campamento de Primavera 2001 - Boca-Nieve.webp", caption: "Campamento de Primavera 2001 - Boca-Nieve" },
    { src: "/Campamento de Septiembre 2005 - Olmué.webp", caption: "Campamento de Septiembre 2005 - Olmué" },
    { src: "/Campamento de Verano 2004 - Vilches.webp", caption: "Campamento de Verano 2004 - Vilches" },
    { src: "/Campamento de Verano 2005 - Fundo Enco, Panguipulli.webp", caption: "Campamento de Verano 2005 - Fundo Enco, Panguipulli" },
    { src: "/Campamento de Verano 2008 - Bullileo.webp", caption: "Campamento de Verano 2008 - Bullileo" },
    { src: "/Jamboree 2002 - STL.webp", caption: "Jamboree 2002 - STL" }
  ];

  let currentIndex = 0;
  let interval;

  const next = () => {
    currentIndex = (currentIndex + 1) % photos.length;
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  };

  onMount(() => {
    // Auto-avanzar el carrusel cada 5 segundos
    interval = setInterval(next, 5000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Bienvenidos a la Tropa San Luis ♥️</title>
  <meta name="description" content="Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos." />
  <meta property="og:title" content="Bienvenidos a la Tropa San Luis ♥️" />
  <meta property="og:description" content="Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos." />
  <meta property="og:image" content="/portada.webp" />
  <meta property="og:url" content="https://tropasanluis.cl/" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="text-center">
  <!-- Carrusel de fotos -->
  <div class="relative mx-auto max-w-4xl">
    <div class="overflow-hidden rounded-lg">
      <img src="{photos[currentIndex].src}" alt="{photos[currentIndex].caption}" class="w-full object-cover" style="height: 500px;" />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent py-3 px-4">
        <p class="text-white drop-shadow-2xl">
          {photos[currentIndex].caption}
        </p>
      </div>
    </div>
    <!-- Botones de navegación -->
    <button on:click={prev} class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none">
      &#8592;
    </button>
    <button on:click={next} class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none">
      &#8594;
    </button>
  </div>

  <!-- Texto de bienvenida -->
  <h1 class="text-4xl font-bold mb-6 text-red-600 mt-8">Bienvenidos a la Tropa San Luis ♥️</h1>
  <p class="text-lg text-gray-700 max-w-2xl mx-auto">
    Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos.
  </p>

  <a href="/semana-sanluisina"
     class="block mx-auto mb-8 w-fit px-10 py-6 text-5xl font-extrabold text-white bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-3xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-yellow-400/60 hover:rotate-1 animate-pulse border-4 border-white drop-shadow-lg"
     style="letter-spacing: 0.05em; text-shadow: 0 4px 24px #0008;">
    Semana San Luisina
  </a>
</section>
    
