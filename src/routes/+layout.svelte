<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  // Array de frases extraídas de los coros de cada canción
  const quotes = [
    { song: "Anticura (1998)", phrase: "Es la San Luis que empieza a trabajar" },
    { song: "Isla Huar (2000)", phrase: "es el tesoro que voy a buscar, por eso me voy para Huar." },
    { song: "Río Carihueico (2001)", phrase: "Se te mojará la ropa y tus zapatos y diez mil coliguachos serán lo peor." },
    { song: "Riñihue (2002)", phrase: "El que debe salir a enfrentar la noche" },
    { song: "Nahuelhuapi (2003)", phrase: "y en la lluvia se escucha mi cantar." },
    { song: "Vilches (2004)", phrase: "Me acompaña en la aventura la certeza de que mi patrulla empieza a enseñarme a ver y a oír." },
    { song: "Enco-Panguipulli (2005)", phrase: "No me iré, sin tener, otra vez una historia que recordar." },
    { song: "Rupanco CANASI (2006)", phrase: "Forjaremos una historia realmente digna de contar." },
    { song: "Puelo (2007)", phrase: "Ah, mañana no me atraparás" },
    { song: "Bullileo (2008)", phrase: "La noche tranquila es la magia del bosque." },
    { song: "Las Compuertas, Chiloé (2009)", phrase: "La tropa más allá de tierra firme, va a cruzar." },
    { song: "Ranco (2011)", phrase: "Esta historia se escribe con tus pasos, firmes al andar." },
    { song: "Malalcahuello (2012)", phrase: "Milenarias araucarias me cubren…" },
    { song: "Atacalco (2013)", phrase: "con una patrulla que conmigo estará." },
    { song: "Pedregoso (2014)", phrase: "Fuimos jóvenes alguna vez." },
    { song: "Rupanco (2015)", phrase: "El salto a lo lejos que cae y renueva sus aguas sin cesar es como mi tropa que fluye y nada la extinguirá." },
    { song: "Cholguán (2016)", phrase: "Vamos a encontrar los secretos de Cholguán." },
    { song: "Maihue (2019)", phrase: "El canto del lago debemos salvar." },
    { song: "Lircay (2020)", phrase: "Esta noche cantaré hasta perder mi voz." },
    { song: "Cachapoal (2023)", phrase: "Volver y considerar que solo me hace falta el firmamento." },
    { song: "Quillayes de Tomé (2024)", phrase: "Dejo huella más allá." },
    { song: "Chonchi, Chiloé", phrase: "Y me embarco, voy cantando, cara al viento, a la isla de los brujos." }
  ];

  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  let isHeaderVisible = true;
  let lastScrollPosition = 0;
  let scrollListener: () => void;
  
  /**
   * Controls the header visibility on scroll
   */
  const handleScroll = () => {
    if (!browser) return;
    
    const currentScrollPosition = window.scrollY;
    
    // If we're scrolling down more than 50px, hide the header
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
      isHeaderVisible = false;
    } 
    // If we're scrolling up, show the header
    else if (currentScrollPosition < lastScrollPosition) {
      isHeaderVisible = true;
    }
    
    lastScrollPosition = currentScrollPosition;
  };

  onMount(() => {
    if (!browser) return;
    
    // Add scroll event listener with throttling
    let ticking = false;
    scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener);
  });

  onDestroy(() => {
    if (browser && scrollListener) {
      window.removeEventListener('scroll', scrollListener);
    }
  });
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
  <!-- Header -->
  <header class="bg-[#C1272D] text-white py-4 shadow-md sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out" style="transform: {isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'}">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center ">
        <a href="/">
          <img src="/logo-stl.svg" alt="Logo" class="w-20 h-20" />
        </a>

        <a href="/" class="hover:text-gray-200 transition">
          <h1 class="font-bold text-2xl md:text-3xl tracking-wide pl-4">Tropa San Luis</h1>
        </a>
      </div>
      <nav class="mt-3 md:mt-0 space-x-4 flex flex-wrap justify-center gap-y-2">
        <a 
          href="/i-concurso-literario" 
          class="{$page.url.pathname === '/i-concurso-literario' 
            ? 'px-3 py-1 bg-[#A11F25] rounded-lg font-semibold hover:bg-[#8A1B20] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform' 
            : 'px-3 py-1 border border-white/20 rounded-lg hover:underline hover:text-gray-200 transition'}"
        >I Concurso Literario</a>
        <a 
          href="/historia" 
          class="{$page.url.pathname === '/historia' 
            ? 'px-3 py-1 bg-[#A11F25] rounded-lg font-semibold hover:bg-[#8A1B20] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform' 
            : 'px-3 py-1 border border-white/20 rounded-lg hover:underline hover:text-gray-200 transition'}"
        >Historia</a>
        <!-- <a href="/staff" class="hover:underline hover:text-gray-200 transition">Staff</a> -->
        <!-- <a href="/patrullas" class="hover:underline hover:text-gray-200 transition">Patrullas</a> -->
        <!-- <a href="/fotos" class="hover:underline hover:text-gray-200 transition">Fotos</a> -->
        <a 
          href="/himnos" 
          class="{$page.url.pathname === '/himnos' 
            ? 'px-3 py-1 bg-[#A11F25] rounded-lg font-semibold hover:bg-[#8A1B20] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform' 
            : 'px-3 py-1 border border-white/20 rounded-lg hover:underline hover:text-gray-200 transition'}"
        >Himnos</a>
        <a 
          href="https://map.tropasanluis.cl" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="px-3 py-1 border border-white/20 rounded-lg hover:underline hover:text-gray-200 transition"
        >Mapa</a>
        <a 
          href="/semana-sanluisina" 
          class="{$page.url.pathname === '/semana-sanluisina' 
            ? 'px-3 py-1 bg-[#A11F25] rounded-lg font-semibold hover:bg-[#8A1B20] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform' 
            : 'px-3 py-1 border border-white/20 rounded-lg hover:underline hover:text-gray-200 transition'}"
        >Semana Sanluisina</a>
      </nav>
    </div>
  </header>

  <!-- Show header button when hidden (mobile) -->
  {#if browser}
  <button 
    class="fixed z-50 top-2 right-2 bg-[#C1272D] text-white p-2 rounded-full md:hidden {isHeaderVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300"
    on:click={() => isHeaderVisible = true}
    aria-label="Show header"
    style="visibility: {isHeaderVisible ? 'hidden' : 'visible'}"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
  </button>
  {/if}

  <!-- Main Content -->
  <main class="flex-grow container mx-auto px-6 py-10">
    <slot />
  </main>

  <!-- Fun Footer -->
  <footer class="bg-[#C1272D] text-white text-center py-6 text-sm relative">
    <div class="container mx-auto">
      <p>Porque somos Sanluisinos y Scouts de verdad!</p>
      <p class="mt-2 italic">"{randomQuote.phrase}" — {randomQuote.song}</p>
      
      <!-- Social Media Links -->
      <div class="flex justify-center space-x-4 mt-4">
        <a 
          href="https://www.instagram.com/tropasanluis_stl/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        
        <a 
          href="https://web.facebook.com/ScoutTropaSanLuis" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </a>
        
        <a 
          href="https://www.youtube.com/@tropasanluis7517" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="YouTube"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </a>
        
        <a 
          href="https://open.spotify.com/artist/03fChLztihH4q9kkEzUw0n?si=IyJrNA8QRPKZaJ3t_TW_FQ" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="Spotify"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
        
        <a 
          href="https://x.com/TropaSanLuis" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="X (Twitter)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
          </svg>
        </a>
        
        <a 
          href="https://github.com/Xavier-LB/tropasanluis" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-gray-200 transition transform hover:-translate-y-1"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      
      <!-- Logo in footer -->
      <div class="mt-4">
        <img src="/logo-blanco.png" alt="Logo Tropa San Luis" class="h-16 mx-auto" />
      </div>
    </div>
  </footer>
</div>
    