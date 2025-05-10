
<script lang="ts">
  import '../app.css';

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
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
  <!-- Header -->
  <header class="bg-red-600 text-white py-4 shadow-md">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <div class="flex items-center space-x-4">
        <div class="w-20 h-20 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm overflow-hidden">
          <img src="/logo-stl-2.png" alt="Logo" class="object-contain w-14" />
        </div>

        <h1 class="font-bold text-2xl md:text-3xl tracking-wide">Tropa San Luis</h1>
      </div>
      <nav class="mt-3 md:mt-0 space-x-4 flex flex-wrap justify-center">
        <a href="/" class="hover:underline hover:text-gray-200 transition">Inicio</a>
        <!-- <a href="/staff" class="hover:underline hover:text-gray-200 transition">Staff</a> -->
        <!-- <a href="/patrullas" class="hover:underline hover:text-gray-200 transition">Patrullas</a> -->
        <!-- <a href="/fotos" class="hover:underline hover:text-gray-200 transition">Fotos</a> -->
        <!-- <a href="/himnos" class="hover:underline hover:text-gray-200 transition">Himnos</a> -->
        <a href="/semana-sanluisina" class="hover:underline hover:text-gray-200 transition">Semana Sanluisina</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-grow container mx-auto px-6 py-10">
    <slot />
  </main>

  <!-- Fun Footer -->
  <footer class="bg-red-600 text-white text-center py-6 text-sm relative">
    <div class="container mx-auto">
      <p>Porque somos Sanluisinos y Scouts de verdad!</p>
      <p class="mt-2 italic">"{randomQuote.phrase}" — {randomQuote.song}</p>
    </div>
  </footer>
</div>
    