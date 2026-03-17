<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-svelte';

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

  const featureCards = [
    { href: '/historia', label: 'Historia', description: 'Conoce nuestra historia desde 1933' },
    { href: '/himnos', label: 'Himnos', description: 'Las canciones de cada campamento' },
    { href: '/morse', label: 'Morse', description: 'Aprende código Morse con mnemónicos' },
  ];

  const archiveCards = [
    { href: '/semana-sanluisina', label: 'Semana Sanluisina 2025', description: 'Resultados y puntajes' },
    { href: '/i-concurso-literario', label: 'I Concurso Literario', description: 'Primer concurso literario STL' },
  ];

  let currentIndex = 0;
  let interval: number;
  let isPlaying = true;

  const next = () => {
    currentIndex = (currentIndex + 1) % photos.length;
    if (isPlaying) restartInterval();
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    if (isPlaying) restartInterval();
  };

  const restartInterval = () => {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      clearInterval(interval);
      isPlaying = false;
    } else {
      isPlaying = true;
      restartInterval();
    }
  };

  onMount(() => {
    interval = setInterval(next, 5000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Tropa San Luis</title>
  <meta name="description" content="Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos." />
  <meta property="og:title" content="Tropa San Luis" />
  <meta property="og:description" content="Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos." />
  <meta property="og:image" content="/portada.webp" />
  <meta property="og:url" content="https://tropasanluis.cl/" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- Hero Section -->
<section class="text-center py-12 md:py-20">
  <div class="max-w-2xl mx-auto">
    <img src="/logo-stl.svg" alt="Logo Tropa San Luis" class="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6" />
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-tropa tracking-tight leading-tight">
      Tropa San Luissssss
    </h1>
    <div class="w-16 h-1 bg-tropa rounded-full mx-auto mt-4"></div>
    <p class="mt-5 text-lg md:text-xl text-stone-500 leading-relaxed max-w-lg mx-auto">
      Explora nuestra página para conocer al Staff, las Patrullas, ver Fotos y descubrir nuestros Himnos.
    </p>
  </div>
</section>

<!-- Feature Cards -->
<section class="pb-16">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each featureCards as card}
      <a
        href={card.href}
        class="group relative overflow-hidden rounded-2xl bg-white border-l-4 border-l-tropa border border-stone-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-tropa/10 hover:-translate-y-1"
      >
        <h3 class="font-bold text-tropa text-lg group-hover:text-tropa-dark transition-colors duration-200">
          {card.label}
        </h3>
        <p class="text-sm text-stone-500 mt-1.5 leading-relaxed">{card.description}</p>
      </a>
    {/each}

    <!-- Map card (external) -->
    <a
      href="https://map.tropasanluis.cl"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative overflow-hidden rounded-2xl bg-white border-l-4 border-l-tropa border border-stone-200/80 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-tropa/10 hover:-translate-y-1"
    >
      <h3 class="font-bold text-tropa text-lg group-hover:text-tropa-dark transition-colors duration-200">
        Mapa de Campamentos
      </h3>
      <p class="text-sm text-stone-500 mt-1.5 leading-relaxed">Descubre nuestros campamentos en el mapa</p>
    </a>
  </div>

  <!-- Archive / past activities -->
  <div class="mt-6 pt-6 border-t border-stone-200/60">
    <p class="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Actividades pasadas</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {#each archiveCards as card}
        <a
          href={card.href}
          class="group flex items-center gap-3 rounded-xl bg-stone-100/60 border border-stone-200/50 px-4 py-3 transition-all duration-200 hover:bg-stone-100 hover:border-tropa/30"
        >
          <div class="w-1.5 h-8 bg-tropa/30 rounded-full group-hover:bg-tropa transition-colors flex-shrink-0"></div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-stone-600 group-hover:text-tropa transition-colors">{card.label}</p>
            <p class="text-xs text-stone-400 truncate">{card.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Photo Carousel -->
<section class="pb-16">
  <div class="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm">
    <!-- Image container -->
    <div class="relative aspect-[16/9] bg-stone-100">
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

      <!-- Nav arrows -->
      <button
        on:click={prev}
        class="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full bg-tropa/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-tropa/80 transition-all duration-200"
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        on:click={next}
        class="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full bg-tropa/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-tropa/80 transition-all duration-200"
        aria-label="Imagen siguiente"
      >
        <ChevronRight size={20} />
      </button>
    </div>

    <!-- Controls bar -->
    <div class="px-5 py-4 flex items-center justify-between gap-4">
      <p class="text-stone-800 text-sm md:text-base font-medium truncate flex-1">
        {photos[currentIndex].caption}
      </p>
      <div class="flex items-center gap-3 flex-shrink-0">
        <span class="text-stone-400 text-xs font-medium tabular-nums">
          {currentIndex + 1}/{photos.length}
        </span>
        <button
          on:click={togglePlayback}
          class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200
            {isPlaying ? 'bg-tropa text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {#if isPlaying}
            <Pause size={14} />
          {:else}
            <Play size={14} />
          {/if}
        </button>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="h-1 bg-stone-100">
      <div
        class="h-full bg-tropa transition-all duration-500 ease-out"
        style="width: {((currentIndex + 1) / photos.length) * 100}%"
      ></div>
    </div>

    <!-- Thumbnails -->
    <div class="p-3 overflow-x-auto hide-scrollbar">
      <div class="flex gap-1.5">
        {#each photos as photo, i}
          <button
            class="flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden transition-all duration-200
              {i === currentIndex ? 'ring-2 ring-tropa ring-offset-1 opacity-100' : 'opacity-50 hover:opacity-80'}"
            on:click={() => { currentIndex = i; if (isPlaying) restartInterval(); }}
          >
            <img
              src="{photo.src}"
              alt="Miniatura"
              class="w-full h-full object-cover"
            />
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- Map CTA -->
<section class="pb-8">
  <div class="bg-tropa rounded-2xl overflow-hidden shadow-lg shadow-tropa/20">
    <div class="flex flex-col md:flex-row gap-8 p-6 md:p-8 items-center">
      <div class="flex-1 space-y-4">
        <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Mapa de Campamentos</h2>
        <p class="text-white/80 leading-relaxed">
          Descubre todos nuestros campamentos de verano a través de un mapa interactivo con sus geolocalizaciones.
          Próximamente incluiremos fotos de cada campamento para revivir nuestras mejores aventuras.
        </p>
        <p class="text-sm text-white/60 italic">
          Agradecimientos especiales a Alonso Valdés "Oso" por la creación de este increíble mapa interactivo.
        </p>
        <div class="flex items-center gap-2 text-sm text-white/70 bg-white/10 rounded-xl px-4 py-3">
          <span>Para visualizar correctamente el mapa, debe ser abierto desde un computador.</span>
        </div>
        <div class="pt-2">
          <a
            href="https://map.tropasanluis.cl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 bg-white text-tropa font-bold rounded-xl shadow-lg hover:bg-stone-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Ver Mapa de Campamentos
          </a>
        </div>
      </div>
      <div class="flex-shrink-0 hidden md:block">
        <img src="/logo-blanco.png" alt="Logo Tropa San Luis" class="w-36 h-36 opacity-30" />
      </div>
    </div>
  </div>
</section>

<style>
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
