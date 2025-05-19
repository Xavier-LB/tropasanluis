<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Lista de fotos para el carrusel
  const photos = [
    { src: "/campamento-otono-2025-penaflor-corte-de-honor.webp", caption: "Campamento de Otoño 2025 - Peñaflor - Corte de Honor" },
    { src: "/2013.webp", caption: "Inicio de año - 2013" },
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
  let isPlaying = true;

  /**
   * Moves to the next image and restarts interval
   */
  const next = () => {
    currentIndex = (currentIndex + 1) % photos.length;
    if (isPlaying) {
      restartInterval();
    }
  };

  /**
   * Moves to the previous image and restarts interval
   */
  const prev = () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    if (isPlaying) {
      restartInterval();
    }
  };

  /**
   * Restarts the carousel interval
   */
  const restartInterval = () => {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  };

  /**
   * Pauses the carousel auto-rotation
   */
  const pauseCarousel = () => {
    clearInterval(interval);
    isPlaying = false;
  };

  /**
   * Starts the carousel auto-rotation
   */
  const playCarousel = () => {
    isPlaying = true;
    restartInterval();
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
      
      <!-- Social Media Links -->
      <div class="flex justify-center space-x-6">
        <a 
          href="https://www.instagram.com/tropasanluis_stl/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-[#C1272D] hover:text-[#A11F25] transition transform hover:-translate-y-1 hover:scale-110"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        
        <a 
          href="https://web.facebook.com/ScoutTropaSanLuis" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-[#C1272D] hover:text-[#A11F25] transition transform hover:-translate-y-1 hover:scale-110"
          aria-label="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </a>
        
        <a 
          href="https://x.com/TropaSanLuis" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-[#C1272D] hover:text-[#A11F25] transition transform hover:-translate-y-1 hover:scale-110"
          aria-label="X (Twitter)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
          </svg>
        </a>
        
        <a 
          href="https://www.youtube.com/@tropasanluis7517" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-[#C1272D] hover:text-[#A11F25] transition transform hover:-translate-y-1 hover:scale-110"
          aria-label="YouTube"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </a>
        
        <a 
          href="https://open.spotify.com/user/YOUR_SPOTIFY_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-[#C1272D] hover:text-[#A11F25] transition transform hover:-translate-y-1 hover:scale-110"
          aria-label="Spotify"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Carrusel de fotos -->
    <div class="relative mx-auto max-w-4xl mb-16 overflow-hidden">
      <div class="bg-white p-2 rounded-3xl flex flex-col">
        <!-- Image container -->
        <div class="relative overflow-hidden rounded-2xl aspect-[16/9]">
          <!-- Main image with transition -->
          <div class="relative h-full">
            {#each photos as photo, i}
              <div 
                class="absolute inset-0 transition-all duration-700 ease-in-out"
                style="opacity: {i === currentIndex ? '1' : '0'}; transform: {i === currentIndex ? 'scale(1)' : 'scale(1.05)'}"
              >
                <img 
                  src="{photo.src}" 
                  alt="{photo.caption}" 
                  class="w-full h-full object-cover" 
                />
              </div>
            {/each}
          </div>

          <!-- Botones de navegación más discretos -->
          <button 
            on:click={prev} 
            class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/30 text-white/90 p-2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
            aria-label="Imagen anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            on:click={next} 
            class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/30 text-white/90 p-2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
            aria-label="Imagen siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Caption text moved outside the photo -->
        <div class="mt-2 text-center px-1">
          <p class="text-gray-800 text-sm md:text-base font-medium">
            {photos[currentIndex].caption}
          </p>
        </div>

        <!-- Progress bar + indicators - improved to fix gray corners -->
        <div class="px-2 mt-2">
          <div class="flex justify-between items-center">
            <!-- Progress number -->
            <div class="text-gray-500 text-xs md:text-sm font-medium">
              {currentIndex + 1} / {photos.length}
            </div>
            
            <!-- Custom controls with active state indication -->
            <div class="flex space-x-2">
              <button 
                on:click={pauseCarousel}
                class="text-xs px-2 py-1 rounded-full transition {!isPlaying ? 'bg-[#C1272D] text-white shadow-md' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'}"
                aria-label="Pausar carrusel"
                aria-pressed={!isPlaying}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button 
                on:click={playCarousel}
                class="text-xs px-2 py-1 rounded-full transition {isPlaying ? 'bg-[#C1272D] text-white shadow-md' : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'}"
                aria-label="Reanudar carrusel"
                aria-pressed={isPlaying}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Progress bar -->
          <div class="w-full bg-gray-100 rounded-full h-1 mt-1 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-[#C1272D] to-[#D25B5D] h-1 rounded-full transition-all duration-300 ease-out"
              style="width: {(currentIndex / (photos.length - 1)) * 100}%"
            ></div>
          </div>
        </div>
        
        <!-- Thumbnails slider - modified to be more compact -->
        <div class="mt-2 overflow-x-auto hide-scrollbar pb-1 rounded-b-2xl">
          <div class="flex space-x-1 px-2 py-1">
            {#each photos as photo, i}
              <button 
                class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 {i === currentIndex ? 'ring-2 ring-[#C1272D] ring-offset-1' : 'opacity-60 hover:opacity-100'}"
                on:click={() => {
                  currentIndex = i;
                  restartInterval();
                }}
              >
                <img 
                  src="{photo.src}" 
                  alt="Miniatura de {photo.caption}" 
                  class="w-full h-full object-cover"
                />
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Poster del Concurso Literario -->
    <div class="max-w-4xl mx-auto mb-16">
      <a href="/i-concurso-literario" class="block transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <img 
          src="/afiche-concurso-literario.jpeg" 
          alt="I Concurso Literario Tropa San Luis" 
          class="w-full h-auto rounded-2xl shadow-xl"
        />
      </a>
    </div>

    <!-- Botón Semana San Luisina -->
    <div class="text-center mb-6">
      <a href="/semana-sanluisina"
         class="inline-block px-12 py-8 text-5xl font-extrabold text-white bg-gradient-to-r from-[#C1272D] via-orange-600 to-[#C1272D] rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-orange-400/60 hover:rotate-1 animate-pulse border-4 border-white drop-shadow-lg relative overflow-hidden group"
         style="letter-spacing: 0.05em; text-shadow: 0 4px 24px #0008;">
        <span class="relative z-10">Semana San Luisina</span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </a>
    </div>
    
    <!-- Botón Mapa de Campamentos -->
    <div class="max-w-4xl mx-auto mb-10 p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/40 shadow-xl backdrop-blur-sm border border-white/50">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <div class="flex-1 space-y-4">
          <h2 class="text-3xl font-bold text-[#C1272D]">Mapa de Campamentos</h2>
          <p class="text-lg text-gray-700">
            Descubre todos nuestros campamentos de verano a través de un mapa interactivo con sus geolocalizaciones. 
            Próximamente incluiremos fotos de cada campamento para revivir nuestras mejores aventuras.
          </p>
          <p class="text-sm text-gray-600 italic">
            Agradecimientos especiales a Alonso Valdes "Oso" por la creación de este increíble mapa interactivo.
          </p>
          <p class="text-sm font-medium text-[#C1272D]/80 bg-white/50 p-2 rounded-lg border border-[#C1272D]/20 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Para visualizar correctamente el mapa, debe ser abierto desde un computador.
          </p>
          <div class="mt-4">
            <a href="https://map.tropasanluis.cl" target="_blank" rel="noopener noreferrer"
              class="inline-block px-6 py-3 text-xl font-bold text-white bg-gradient-to-r from-[#C1272D] to-[#D25B5D] rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#C1272D]/40 hover:rotate-1 border-2 border-white/80 relative overflow-hidden group">
              <span class="relative z-10">Ver Mapa de Campamentos</span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>
        </div>
        <div class="flex-shrink-0">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#C1272D] to-[#D25B5D] p-1 shadow-lg overflow-hidden">
            <div class="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-[#C1272D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>
        </div>
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

  /* Hide scrollbar but keep functionality */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;             /* Chrome, Safari and Opera */
  }

  /* Custom animation for the literary contest button */
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.9;
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
    
