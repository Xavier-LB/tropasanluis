<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte';

  // Array de frases extraídas de los coros de cada canción
  const quotes = [
    { song: "Anticura (1998)", phrase: "Es la San Luis que empieza a trabajar" },
    { song: "Isla Huar (2000)", phrase: "es el tesoro que voy a buscar, por eso me voy para Huar." },
    { song: "Río Carihueico (2001)", phrase: "Se te mojará la ropa y tus zapatos y diez mil coliguachos serán lo peor." },
    { song: "Riñihue (2002)", phrase: "El que debe salir a enfrentar la noche" },
    { song: "Nahuelhuapi (2003)", phrase: "y en la lluvia se escucha mi cantar." },
    { song: "Vilches (2004)", phrase: "Me acompaña en la aventura la certeza de que mi patrulla empieza a enseñarme a ver y a oír." },
    { song: "Enco-Panguipulli (2005)", phrase: "Y su voz se enciende y tiene nuevas fuerzas." },
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
  
  /**
   * Controls the header visibility on scroll
   */
  const handleScroll = () => {
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
    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  });

  onDestroy(() => {
    window.removeEventListener('scroll', handleScroll);
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
      <nav class="mt-3 md:mt-0 space-x-4 flex flex-wrap justify-center">
        <a href="/historia" class="hover:underline hover:text-gray-200 transition">Historia</a>
        <!-- <a href="/staff" class="hover:underline hover:text-gray-200 transition">Staff</a> -->
        <!-- <a href="/patrullas" class="hover:underline hover:text-gray-200 transition">Patrullas</a> -->
        <!-- <a href="/fotos" class="hover:underline hover:text-gray-200 transition">Fotos</a> -->
        <a href="/himnos" class="hover:underline hover:text-gray-200 transition">Himnos</a>
        <a href="https://map.tropasanluis.cl" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-gray-200 transition">Mapa</a>
        <a href="/semana-sanluisina" class="px-3 py-1 bg-[#A11F25] rounded-lg font-semibold hover:bg-[#8A1B20] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform">Semana Sanluisina</a>
      </nav>
    </div>
  </header>

  <!-- Show header button when hidden (mobile) -->
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
    </div>
  </footer>
</div>
    