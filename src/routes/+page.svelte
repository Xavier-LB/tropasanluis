<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Lista de fotos para el carrusel
  const photos = [
    { src: "/2013.webp", caption: "2013" },
    { src: "/Campamento de Invierno 2001.webp", caption: "Campamento de Invierno 2001" },
    { src: "/Campamento de Invierno 2004 - Olmue.webp", caption: "Campamento de Invierno 2004 - Olmué" },
    { src: "/Campamento de Otono 2005 - Reserva Nacional Rio Cipreses.webp", caption: "Campamento de Otoño 2005 - Reserva Nacional Río Cipreses" },
    { src: "/Campamento de Otono 2010 - Olmue.webp", caption: "Campamento de Otoño 2010 - Olmué" },
    { src: "/Campamento de Primavera 2001 - Boca-Nieve.webp", caption: "Campamento de Primavera 2001 - Boca-Nieve" },
    { src: "/Campamento de Septiembre 2005 - Olmue.webp", caption: "Campamento de Septiembre 2005 - Olmué" },
    { src: "/Campamento de Verano 2004 - Vilches.webp", caption: "Campamento de Verano 2004 - Vilches" },
    { src: "/Campamento de Verano 2005 - Fundo Enco, Panguipulli.webp", caption: "Campamento de Verano 2005 - Fundo Enco, Panguipulli" },
    { src: "/Campamento de Verano 2008 - Bullileo.webp", caption: "Campamento de Verano 2008 - Bullileo" },
    { src: "/Jamboree 2002 - STL.webp", caption: "Jamboree 2002 - STL" }
  ];

  let currentIndex = 0;
  let interval: number;

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

<main class="relative">
  <!-- Decorative elements -->
  <div class="fixed inset-0 pointer-events-none">
    <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),rgba(255,255,255,0))]"></div>
    <div class="absolute top-0 left-0 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full mix-blend-multiply filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-red-800/5 rounded-full mix-blend-multiply filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  <div class="container mx-auto px-4 py-8 relative z-10">
    <!-- Botón Semana San Luisina -->
    <div class="text-center mb-6">
      <a href="/semana-sanluisina"
         class="inline-block px-12 py-8 text-5xl font-extrabold text-white bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-orange-400/60 hover:rotate-1 animate-pulse border-4 border-white drop-shadow-lg relative overflow-hidden group"
         style="letter-spacing: 0.05em; text-shadow: 0 4px 24px #0008;">
        <span class="relative z-10">Semana San Luisina</span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </a>
    </div>
    
    <!-- Botón Lucho cuentero -->
    <!-- <div class="text-center mb-12">
      <a href="/lucho-cuentero"
         class="inline-block px-8 py-5 text-3xl font-bold text-white bg-gradient-to-r from-orange-600 via-red-700 to-orange-600 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-red-400/60 hover:rotate-1 border-2 border-white drop-shadow-md relative overflow-hidden group"
         style="letter-spacing: 0.05em; text-shadow: 0 2px 12px #0008;">
        <span class="relative z-10">Lucho cuentero</span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </a>
    </div> -->

    <!-- Texto de bienvenida -->
    <div class="max-w-3xl mx-auto space-y-8 mb-16">
      <h1 class="text-5xl font-bold mb-6 text-center relative inline-block bg-gradient-to-r from-red-800 to-orange-600 bg-clip-text text-transparent">
        Bienvenidos a la Tropa San Luis 
        <span class="text-4xl ml-2">♥️</span>
        <div class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-orange-600 to-red-800 rounded-full"></div>
      </h1>
      <p class="text-xl text-gray-700 leading-relaxed text-center">
        Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos.
      </p>
    </div>

    <!-- Carrusel de fotos -->
    <div class="relative mx-auto max-w-4xl">
      <div class="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
        <img 
          src="{photos[currentIndex].src}" 
          alt="{photos[currentIndex].caption}" 
          class="w-full object-cover transition-opacity duration-500" 
          style="height: 600px;" 
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent py-6 px-6">
          <p class="text-white text-xl font-semibold drop-shadow-2xl">
            {photos[currentIndex].caption}
          </p>
        </div>
      </div>

      <!-- Botones de navegación -->
      <button 
        on:click={prev} 
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-800/90 text-white p-3 rounded-full hover:bg-red-900 focus:outline-none transition-all duration-300 hover:scale-110 shadow-lg"
      >
        &#8592;
      </button>
      <button 
        on:click={next} 
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-800/90 text-white p-3 rounded-full hover:bg-red-900 focus:outline-none transition-all duration-300 hover:scale-110 shadow-lg"
      >
        &#8594;
      </button>

      <!-- Indicadores -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {#each photos as _, i}
          <button 
            class="w-3 h-3 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}"
            on:click={() => currentIndex = i}
          />
        {/each}
      </div>
    </div>
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
    
