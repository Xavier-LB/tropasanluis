<script lang="ts">
  let activeSection: string | null = null;

  const toggleSection = (id: string) => {
    activeSection = activeSection === id ? null : id;
  };

  const estructura = [
    { carpeta: 'src/routes/', descripcion: 'Cada carpeta aquí dentro es una página del sitio. Por ejemplo, src/routes/historia/ es la página de Historia.' },
    { carpeta: 'src/routes/+page.svelte', descripcion: 'El archivo principal de cada página. Aquí está el contenido que se ve.' },
    { carpeta: 'src/routes/+layout.svelte', descripcion: 'El "marco" del sitio: el header rojo, la navegación y el footer. Se aplica a todas las páginas.' },
    { carpeta: 'static/', descripcion: 'Aquí van las imágenes, logos, videos y otros archivos estáticos.' },
    { carpeta: 'src/app.css', descripcion: 'Los estilos globales del sitio (colores, fuentes, etc.).' },
  ];

  const paginas = [
    { ruta: '/', nombre: 'Inicio', archivo: 'src/routes/+page.svelte' },
    { ruta: '/historia', nombre: 'Historia', archivo: 'src/routes/historia/+page.svelte' },
    { ruta: '/himnos', nombre: 'Himnos', archivo: 'src/routes/himnos/+page.svelte' },
    { ruta: '/morse', nombre: 'Morse', archivo: 'src/routes/morse/+page.svelte' },
    { ruta: '/staff', nombre: 'Staff', archivo: 'src/routes/staff/+page.svelte' },
    { ruta: '/semana-sanluisina', nombre: 'Semana Sanluisina', archivo: 'src/routes/semana-sanluisina/+page.svelte' },
    { ruta: '/fotos', nombre: 'Fotos', archivo: 'src/routes/fotos/+page.svelte' },
    { ruta: '/patrullas', nombre: 'Patrullas', archivo: 'src/routes/patrullas/+page.svelte' },
  ];

  const pasosGit = [
    { paso: 1, titulo: 'Abrir la terminal', detalle: 'En VS Code, abre la terminal con Ctrl + ` (la tilde al lado del 1) o desde el menú Terminal > New Terminal.' },
    { paso: 2, titulo: 'Ver qué cambió', detalle: 'Escribe: git status. Esto te muestra qué archivos modificaste. En rojo aparecen los cambios que aún no has preparado.' },
    { paso: 3, titulo: 'Preparar los cambios', detalle: 'Escribe: git add . (con el punto). Esto le dice a Git "quiero guardar todos mis cambios".' },
    { paso: 4, titulo: 'Guardar (hacer commit)', detalle: 'Escribe: git commit -m "descripción corta del cambio". Por ejemplo: git commit -m "Actualizar foto de staff".' },
    { paso: 5, titulo: 'Subir a internet', detalle: 'Escribe: git push. Esto sube tus cambios a GitHub. Netlify detecta el cambio y actualiza el sitio automáticamente en 1-2 minutos.' },
  ];
</script>

<svelte:head>
  <title>Guía de Mantención | Tropa San Luis</title>
  <meta name="description" content="Guía para mantener y actualizar el sitio web de la Tropa San Luis" />
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-12">
    <p class="text-sm font-semibold text-tropa uppercase tracking-widest mb-2">Documentación</p>
    <h1 class="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
      Guía de mantención del sitio
    </h1>
    <p class="text-lg text-stone-500 leading-relaxed">
      Todo lo que necesitan saber para mantener y actualizar tropasanluis.cl,
      explicado para quienes no son desarrolladores.
    </p>
  </div>

  <!-- Resumen rápido -->
  <div class="bg-tropa/5 border-l-4 border-tropa rounded-r-xl p-5 mb-10">
    <p class="font-semibold text-stone-800 mb-1">En resumen</p>
    <p class="text-stone-600 text-sm leading-relaxed">
      El sitio está hecho con <strong>SvelteKit</strong> (un framework web),
      el código vive en <strong>GitHub</strong>,
      y se publica automáticamente en <strong>Netlify</strong>.
      Para hacer cambios, van a usar <strong>VS Code</strong> con <strong>GPT Codex</strong>
      &mdash; básicamente le piden a la IA que haga los cambios por ustedes.
    </p>
  </div>

  <!-- Sección 1: Qué es esto -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">1. ¿Qué tecnologías usa el sitio?</h2>

    <div class="space-y-4">
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <h3 class="font-semibold text-stone-800 mb-2">SvelteKit</h3>
        <p class="text-stone-600 text-sm leading-relaxed">
          Es el "motor" del sitio. SvelteKit es un framework que permite crear páginas web modernas.
          Cada página del sitio es un archivo <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">.svelte</code>
          que combina tres cosas: el <strong>contenido</strong> (HTML), la <strong>apariencia</strong> (CSS/Tailwind)
          y la <strong>lógica</strong> (JavaScript). No necesitan entender todo esto en detalle &mdash;
          la IA les va a ayudar a escribir el código.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <h3 class="font-semibold text-stone-800 mb-2">TailwindCSS</h3>
        <p class="text-stone-600 text-sm leading-relaxed">
          Es el sistema de estilos. En vez de escribir CSS aparte, se usan clases directamente en el HTML.
          Por ejemplo, <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">text-red-500</code> hace el texto rojo,
          <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">mb-4</code> agrega margen abajo.
          No se preocupen por memorizarlo, la IA sabe usarlo perfectamente.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <h3 class="font-semibold text-stone-800 mb-2">GitHub</h3>
        <p class="text-stone-600 text-sm leading-relaxed">
          Es donde vive el código del sitio en internet. Piénsenlo como un Google Drive para código.
          El repositorio es público y se encuentra en
          <a href="https://github.com/Xavier-LB/tropasanluis" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline font-medium">github.com/Xavier-LB/tropasanluis</a>.
          Cada vez que suben un cambio a GitHub, el sitio se actualiza automáticamente.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <h3 class="font-semibold text-stone-800 mb-2">Netlify y nic.cl</h3>
        <p class="text-stone-600 text-sm leading-relaxed">
          <strong>Netlify</strong> es el servicio que publica el sitio en internet (el hosting).
          Está conectado a GitHub y cada vez que el código cambia, Netlify re-construye y publica el sitio automáticamente.
          El dominio <strong>tropasanluis.cl</strong> se compró en <strong>nic.cl</strong>.
          Ambos servicios están en la cuenta de Xavier y él se encarga de mantenerlos.
        </p>
      </div>
    </div>
  </section>

  <!-- Sección 2: Estructura del proyecto -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">2. Estructura del proyecto</h2>
    <p class="text-stone-600 mb-5">
      El proyecto tiene muchas carpetas, pero solo necesitan conocer estas:
    </p>

    <div class="bg-white rounded-xl border border-stone-200 overflow-hidden">
      {#each estructura as item, i}
        <div class="px-5 py-3.5 {i < estructura.length - 1 ? 'border-b border-stone-100' : ''}">
          <code class="text-sm font-mono text-tropa font-semibold">{item.carpeta}</code>
          <p class="text-stone-500 text-sm mt-1">{item.descripcion}</p>
        </div>
      {/each}
    </div>

    <h3 class="font-semibold text-stone-800 mt-8 mb-3">Páginas del sitio</h3>
    <p class="text-stone-600 text-sm mb-4">
      Cada página es una carpeta dentro de <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">src/routes/</code>
      con un archivo <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">+page.svelte</code> adentro:
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {#each paginas as pagina}
        <div class="flex items-center gap-3 bg-white rounded-lg border border-stone-200 px-4 py-2.5">
          <span class="text-sm font-medium text-stone-800">{pagina.nombre}</span>
          <span class="text-xs font-mono text-stone-400 ml-auto">{pagina.archivo}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Sección 3: Configuración inicial -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">3. Configuración inicial (una sola vez)</h2>
    <p class="text-stone-600 mb-5">
      Antes de poder hacer cambios, necesitan instalar algunas cosas en su computador.
      Esto se hace solo una vez:
    </p>

    <div class="space-y-4">
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">1</span>
          <h3 class="font-semibold text-stone-800">Instalar VS Code</h3>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed ml-11">
          Visual Studio Code es el editor donde van a trabajar.
          Descárguenlo gratis desde <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline font-medium">code.visualstudio.com</a>.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">2</span>
          <h3 class="font-semibold text-stone-800">Instalar Node.js</h3>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed ml-11">
          Node.js es lo que permite correr el sitio en su computador para probarlo.
          Descárguenlo desde <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline font-medium">nodejs.org</a>
          (elijan la versión LTS, que es la más estable).
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">3</span>
          <h3 class="font-semibold text-stone-800">Instalar Git</h3>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed ml-11">
          Git es el sistema que controla las versiones del código.
          Descárguenlo desde <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline font-medium">git-scm.com</a>.
          En la instalación, dejen todas las opciones por defecto.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">4</span>
          <h3 class="font-semibold text-stone-800">Crear cuenta en GitHub</h3>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed ml-11">
          Si no tienen cuenta, créenla en <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline font-medium">github.com</a>.
          Luego pídanle a Xavier que les dé acceso como colaborador al repositorio.
        </p>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">5</span>
          <h3 class="font-semibold text-stone-800">Descargar el proyecto</h3>
        </div>
        <div class="text-stone-600 text-sm leading-relaxed ml-11">
          <p class="mb-2">Abran la terminal de VS Code y escriban:</p>
          <div class="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs mb-2 overflow-x-auto">
            git clone https://github.com/Xavier-LB/tropasanluis.git
          </div>
          <p>Esto descarga todo el proyecto a su computador. Solo se hace una vez.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">6</span>
          <h3 class="font-semibold text-stone-800">Instalar dependencias</h3>
        </div>
        <div class="text-stone-600 text-sm leading-relaxed ml-11">
          <p class="mb-2">Entren a la carpeta del proyecto y ejecuten:</p>
          <div class="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs mb-2 overflow-x-auto">
            <span class="text-stone-500">cd tropasanluis</span><br/>
            yarn install
          </div>
          <p>Esto instala todas las librerías que necesita el proyecto. Si aparecen warnings amarillos, ignórenlos.</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-8 h-8 rounded-full bg-tropa text-white text-sm font-bold flex items-center justify-center shrink-0">7</span>
          <h3 class="font-semibold text-stone-800">Instalar GPT Codex en VS Code</h3>
        </div>
        <div class="text-stone-600 text-sm leading-relaxed ml-11">
          <p class="mb-2">
            Esta es la herramienta clave. GPT Codex es una extensión de IA que les permite hacer cambios en el código
            usando lenguaje natural &mdash; le dicen qué quieren cambiar y la IA lo hace por ustedes.
          </p>
          <ol class="list-decimal list-inside space-y-1.5 text-sm">
            <li>En VS Code, vayan a la pestaña de Extensiones (icono de cuadrados en el menú izquierdo)</li>
            <li>Busquen <strong>"GPT Codex"</strong></li>
            <li>Instálenla y sigan las instrucciones para conectar su cuenta de OpenAI</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <!-- Sección 4: Flujo de trabajo -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">4. Cómo hacer cambios (día a día)</h2>
    <p class="text-stone-600 mb-5">
      Este es el flujo que van a seguir cada vez que quieran actualizar algo en el sitio:
    </p>

    <!-- Paso A: Abrir proyecto -->
    <div class="bg-white rounded-xl border border-stone-200 p-5 mb-4">
      <h3 class="font-semibold text-stone-800 mb-3">A. Abrir el proyecto y actualizar</h3>
      <div class="text-stone-600 text-sm leading-relaxed">
        <p class="mb-2">Abran VS Code, vayan a <strong>File > Open Folder</strong> y seleccionen la carpeta <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">tropasanluis</code>.</p>
        <p class="mb-2">Antes de hacer cualquier cambio, actualicen el código por si alguien más hizo cambios:</p>
        <div class="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs overflow-x-auto">
          git pull
        </div>
      </div>
    </div>

    <!-- Paso B: Probar localmente -->
    <div class="bg-white rounded-xl border border-stone-200 p-5 mb-4">
      <h3 class="font-semibold text-stone-800 mb-3">B. Ver el sitio en su computador</h3>
      <div class="text-stone-600 text-sm leading-relaxed">
        <p class="mb-2">Para ver los cambios en tiempo real mientras trabajan:</p>
        <div class="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs mb-2 overflow-x-auto">
          yarn dev
        </div>
        <p>Esto abre un servidor local. Vayan a <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">http://localhost:5173</code> en su navegador
        para ver el sitio. Cada vez que guarden un archivo, la página se actualiza sola.</p>
      </div>
    </div>

    <!-- Paso C: Usar GPT Codex -->
    <div class="bg-tropa/5 border border-tropa/20 rounded-xl p-5 mb-4">
      <h3 class="font-semibold text-stone-800 mb-3">C. Hacer cambios con GPT Codex</h3>
      <div class="text-stone-600 text-sm leading-relaxed">
        <p class="mb-3">
          Esta es la parte más importante. <strong>No necesitan saber programar.</strong>
          Abran GPT Codex en VS Code y descríbanle lo que quieren hacer en español. Ejemplos:
        </p>
        <div class="space-y-2 mb-4">
          <div class="bg-white rounded-lg px-4 py-2.5 border border-stone-200">
            <p class="text-xs text-stone-400 mb-0.5">Para cambiar contenido:</p>
            <p class="text-sm italic text-stone-700">"En la página de historia, agrega un nuevo evento en el año 2026 que diga: Se realiza el campamento de verano en Pucón."</p>
          </div>
          <div class="bg-white rounded-lg px-4 py-2.5 border border-stone-200">
            <p class="text-xs text-stone-400 mb-0.5">Para agregar fotos:</p>
            <p class="text-sm italic text-stone-700">"Agrega la foto campamento-2026.webp al carrusel de la página principal. La foto ya está en la carpeta static/."</p>
          </div>
          <div class="bg-white rounded-lg px-4 py-2.5 border border-stone-200">
            <p class="text-xs text-stone-400 mb-0.5">Para modificar estilos:</p>
            <p class="text-sm italic text-stone-700">"Cambia el título de la página de Historia para que sea más grande y esté centrado."</p>
          </div>
          <div class="bg-white rounded-lg px-4 py-2.5 border border-stone-200">
            <p class="text-xs text-stone-400 mb-0.5">Para agregar un nuevo miembro al staff:</p>
            <p class="text-sm italic text-stone-700">"En la página de staff, agrega a Juan Pérez con apodo 'Juanito', años de servicio 2024-presente, y su frase típica es 'siempre listo'."</p>
          </div>
          <div class="bg-white rounded-lg px-4 py-2.5 border border-stone-200">
            <p class="text-xs text-stone-400 mb-0.5">Para crear una página nueva:</p>
            <p class="text-sm italic text-stone-700">"Crea una nueva página en /actividades que muestre una lista de actividades del año con fecha, nombre y descripción. Usa el mismo estilo del resto del sitio."</p>
          </div>
        </div>
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p class="text-sm text-amber-800">
            <strong>Tip:</strong> Mientras más específicos sean con lo que quieren, mejor resultado van a obtener.
            Si algo no queda bien, díganle a la IA qué corregir. Es una conversación iterativa.
          </p>
        </div>
      </div>
    </div>

    <!-- Paso D: Subir cambios -->
    <div class="bg-white rounded-xl border border-stone-200 p-5 mb-4">
      <h3 class="font-semibold text-stone-800 mb-3">D. Subir los cambios al sitio</h3>
      <div class="text-stone-600 text-sm leading-relaxed">
        <p class="mb-3">
          Una vez que estén contentos con los cambios y se vean bien en su computador,
          hay que subirlos a GitHub para que el sitio se actualice:
        </p>

        <div class="space-y-3">
          {#each pasosGit as { paso, titulo, detalle }}
            <div class="flex gap-3">
              <span class="w-6 h-6 rounded-full bg-stone-200 text-stone-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{paso}</span>
              <div>
                <p class="font-medium text-stone-700 text-sm">{titulo}</p>
                <p class="text-stone-500 text-xs mt-0.5">{detalle}</p>
              </div>
            </div>
          {/each}
        </div>

        <div class="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs mt-4 overflow-x-auto">
          <span class="text-stone-500"># Resumen de comandos:</span><br/>
          git add .<br/>
          git commit -m "Descripción del cambio"<br/>
          git push
        </div>

        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-3">
          <p class="text-sm text-emerald-800">
            <strong>Dato:</strong> También pueden pedirle a GPT Codex que haga los comandos de Git por ustedes.
            Díganle: "sube estos cambios a GitHub con el mensaje: actualicé la página de staff".
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Sección 5: Git explicado simple -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">5. ¿Qué es Git? (versión simple)</h2>

    <div class="bg-white rounded-xl border border-stone-200 p-5 mb-4">
      <p class="text-stone-600 text-sm leading-relaxed mb-4">
        Git es como un <strong>historial de cambios</strong> para el código. Imaginen que es como el historial de versiones
        de un Google Doc, pero para todo el proyecto. Cada "commit" es como un punto de guardado al que pueden volver si algo sale mal.
      </p>

      <div class="space-y-3">
        <div class="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
          <code class="text-xs font-mono text-tropa font-semibold whitespace-nowrap mt-0.5">git pull</code>
          <p class="text-stone-600 text-xs">Descarga los últimos cambios desde GitHub (como sincronizar Google Drive).</p>
        </div>
        <div class="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
          <code class="text-xs font-mono text-tropa font-semibold whitespace-nowrap mt-0.5">git status</code>
          <p class="text-stone-600 text-xs">Muestra qué archivos cambiaron desde el último guardado.</p>
        </div>
        <div class="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
          <code class="text-xs font-mono text-tropa font-semibold whitespace-nowrap mt-0.5">git add .</code>
          <p class="text-stone-600 text-xs">Selecciona todos los archivos modificados para guardarlos.</p>
        </div>
        <div class="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
          <code class="text-xs font-mono text-tropa font-semibold whitespace-nowrap mt-0.5">git commit -m "..."</code>
          <p class="text-stone-600 text-xs">Crea un punto de guardado con una descripción de lo que cambió.</p>
        </div>
        <div class="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
          <code class="text-xs font-mono text-tropa font-semibold whitespace-nowrap mt-0.5">git push</code>
          <p class="text-stone-600 text-xs">Sube los cambios guardados a GitHub (y el sitio se actualiza solo).</p>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <p class="text-sm text-amber-800 font-medium mb-1">Si algo sale mal con Git</p>
      <p class="text-xs text-amber-700 leading-relaxed">
        Si Git les tira un error o algo se pone raro, no se asusten. Lo más probable es que se arregle con
        <code class="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">git pull</code> primero y después intentar de nuevo.
        Si no funciona, pídale ayuda a GPT Codex describiendo el error.
        Y si nada funciona, pueden escribirle a Xavier.
      </p>
    </div>
  </section>

  <!-- Sección 6: Tareas comunes -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">6. Tareas comunes</h2>

    <div class="space-y-3">
      <!-- Agregar fotos -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('fotos')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Agregar fotos al sitio</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'fotos' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'fotos'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <ol class="list-decimal list-inside space-y-2">
              <li>Conviertan la foto a formato <strong>.webp</strong> para que pese menos (pueden usar un convertidor online como squoosh.app).</li>
              <li>Copien la foto a la carpeta <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">static/</code> del proyecto.</li>
              <li>Pídale a GPT Codex que la agregue donde quieran, por ejemplo: "Agrega la foto nueva-foto.webp al carrusel de la página principal".</li>
            </ol>
          </div>
        {/if}
      </button>

      <!-- Agregar himno -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('himno')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Agregar un himno de campamento</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'himno' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'himno'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <p class="mb-2">Pídale a GPT Codex algo como:</p>
            <p class="italic text-stone-500 bg-stone-50 rounded-lg p-3">
              "En la página de himnos, agrega una nueva canción del campamento 2027 en Villarrica.
              El compositor es Juan Pérez. La letra es: [pegar la letra aquí]. Los acordes son: [pegar acordes si los tienen]."
            </p>
          </div>
        {/if}
      </button>

      <!-- Actualizar staff -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('staff')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Actualizar el staff</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'staff' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'staff'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <p class="mb-2">Para agregar o quitar miembros del staff, abran el archivo
              <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">src/routes/staff/+page.svelte</code>
              y pídale a GPT Codex que haga los cambios. También pueden pedirle que actualice las fotos del staff.
            </p>
          </div>
        {/if}
      </button>

      <!-- Agregar evento a la historia -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('historia')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Agregar evento a la historia</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'historia' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'historia'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <p>
              La línea de tiempo está en <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">src/routes/historia/+page.svelte</code>.
              Pídale a GPT Codex: "Agrega un nuevo evento en la línea de tiempo del año 2027 que diga: [descripción del evento]".
            </p>
          </div>
        {/if}
      </button>

      <!-- Crear página nueva -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('nueva-pagina')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Crear una página nueva</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'nueva-pagina' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'nueva-pagina'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <ol class="list-decimal list-inside space-y-2">
              <li>Pídale a GPT Codex: "Crea una nueva página en la ruta /nombre-pagina con [descripción del contenido]. Usa el mismo estilo visual del resto del sitio."</li>
              <li>Si quieren que aparezca en la navegación, díganle también: "Y agrégala al menú de navegación en el layout".</li>
              <li>La IA va a crear la carpeta y el archivo automáticamente.</li>
            </ol>
          </div>
        {/if}
      </button>

      <!-- Actualizar resultados semana sanluisina -->
      <button
        class="w-full text-left bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 transition-colors"
        on:click={() => toggleSection('semana')}
      >
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-stone-800">Actualizar puntajes de la Semana Sanluisina</h3>
          <span class="text-stone-400 text-lg">{activeSection === 'semana' ? '−' : '+'}</span>
        </div>
        {#if activeSection === 'semana'}
          <div class="mt-3 text-stone-600 text-sm leading-relaxed">
            <p>
              Los puntajes están en <code class="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">src/routes/semana-sanluisina/+page.svelte</code>.
              Pueden pedirle a GPT Codex: "Actualiza los puntajes de la prueba de [nombre] con estos resultados: Halcones X puntos, Castores Y puntos..." etc.
            </p>
          </div>
        {/if}
      </button>
    </div>
  </section>

  <!-- Sección 7: Consejos -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold text-stone-900 mb-4">7. Consejos finales</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Siempre hagan git pull primero</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          Antes de empezar a trabajar, ejecuten <code class="bg-stone-100 px-1 py-0.5 rounded font-mono">git pull</code>
          para asegurarse de tener la última versión.
        </p>
      </div>
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Prueben antes de subir</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          Siempre revisen los cambios en su navegador (<code class="bg-stone-100 px-1 py-0.5 rounded font-mono">yarn dev</code>)
          antes de hacer push.
        </p>
      </div>
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Las fotos en .webp</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          Conviertan las fotos a .webp antes de subirlas. Esto hace que el sitio cargue mucho más rápido.
        </p>
      </div>
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Commits descriptivos</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          Al hacer commit, escriban qué cambiaron. "Actualizar staff 2026" es mejor que "cambios".
        </p>
      </div>
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Confíen en la IA</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          GPT Codex conoce SvelteKit y Tailwind. Si no saben cómo hacer algo, simplemente descríbanlo y la IA encuentra la solución.
        </p>
      </div>
      <div class="bg-white rounded-xl border border-stone-200 p-5">
        <p class="font-semibold text-stone-800 text-sm mb-2">Si rompen algo, no pasa nada</p>
        <p class="text-stone-500 text-xs leading-relaxed">
          Git guarda todo el historial. Si algo sale muy mal, siempre se puede volver a una versión anterior.
          Pregúntenle a la IA cómo hacerlo.
        </p>
      </div>
    </div>
  </section>

  <!-- Contacto -->
  <div class="bg-stone-100 rounded-xl p-6 text-center mb-4">
    <p class="text-stone-600 text-sm">
      ¿Tienen dudas? Escríbanle a <strong>Xavier</strong> o pregunten directamente a GPT Codex.
    </p>
    <p class="text-stone-400 text-xs mt-2">
      El repositorio está en
      <a href="https://github.com/Xavier-LB/tropasanluis" target="_blank" rel="noopener noreferrer" class="text-tropa hover:underline">
        github.com/Xavier-LB/tropasanluis
      </a>
    </p>
  </div>
</div>
