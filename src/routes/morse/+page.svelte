<script lang="ts">
  import { onDestroy } from 'svelte';

  // ── Morse Data ──────────────────────────────────────────────
  interface MorseEntry {
    letter: string;
    code: string;
    mnemonic: string;
    tip: string;
    visual: string;
    group?: string;
    opposite?: string;
    frequency?: number;
  }

  const MORSE_ALPHABET: MorseEntry[] = [
    { letter: 'A', code: '·—',     mnemonic: 'a-LÓ',            tip: 'Sin O = punto, con O = raya', visual: 'La A es una montana: subes rapido (·) y bajas lento (—)', group: '2 símbolos', opposite: 'N (—·)', frequency: 11.5 },
    { letter: 'B', code: '—···',   mnemonic: 'BO-na-par-te',    tip: 'BO tiene O → raya, luego 3 sin O → puntos', visual: 'Napoleon Bonaparte marchando: un paso largo y tres cortos', group: 'Empieza con raya', opposite: 'V (···—)', frequency: 2.2 },
    { letter: 'C', code: '—·—·',   mnemonic: 'CO-ca-CO-la',     tip: 'Alternancia perfecta: O, sin O, O, sin O', visual: 'Abrir una Coca-Cola: tschh-ti-tschh-ti, alterna largo y corto', group: 'Alternante', frequency: 4.0 },
    { letter: 'D', code: '—··',    mnemonic: 'DÓ-mi-nó',        tip: 'Como la ficha de domino: largo y dos cortos', visual: 'Un perro ladrando: GUAAU-fi-fi', group: '3 símbolos', opposite: 'U (··—)', frequency: 5.1 },
    { letter: 'E', code: '·',       mnemonic: 'é',               tip: 'Letra mas frecuente → codigo mas corto', visual: 'Un simple destello. La E es tan comun que merece ser la mas simple', group: '1 símbolo', opposite: 'T (—)', frequency: 12.7 },
    { letter: 'F', code: '··—·',   mnemonic: 'fe-de-RÓ-ni',     tip: 'Dos puntos, una raya, un punto', visual: 'Una rana: cri-cri-CROOO-cri', group: 'Alternante', opposite: 'L (·—··)', frequency: 2.2 },
    { letter: 'G', code: '——·',    mnemonic: 'GÓN-ZÓ-le',       tip: 'Dos rayas largas y un punto final', visual: 'Un cañon: BOOM-BOOM-tic (dos explosiones y el rebote)', group: '3 símbolos', opposite: 'W (·——)', frequency: 2.0 },
    { letter: 'H', code: '····',   mnemonic: 'hi-la-ri-dad',     tip: 'Cuatro puntos rapidos, ninguna O', visual: 'Risa: ja-ja-ja-ja. 4 golpes cortos e iguales', group: 'Todo puntos', frequency: 6.1 },
    { letter: 'I', code: '··',      mnemonic: 'i-rás',           tip: 'Dos puntos como los dos puntitos de la i', visual: 'Los dos puntitos sobre la i latina (ï)', group: '2 símbolos', opposite: 'M (——)', frequency: 7.0 },
    { letter: 'J', code: '·———',   mnemonic: 'ja-PÓN-GÓ-LÓ',   tip: 'Un punto y tres rayas. Opuesto a la B', visual: 'Un salto al agua: ¡ja! y tres olas largas', group: 'Empieza con punto', opposite: 'B (—···)', frequency: 0.2 },
    { letter: 'K', code: '—·—',    mnemonic: 'KÓ-da-KÓ',        tip: 'Raya-punto-raya, como un sandwich', visual: 'Un sandwich: pan(—) relleno(·) pan(—)', group: 'Alternante', frequency: 0.8 },
    { letter: 'L', code: '·—··',   mnemonic: 'li-MÓN-ci-to',    tip: 'Punto, raya, dos puntos. Espejo de la F', visual: 'Exprimir un limon: aprietas, sale el jugo laaargo, y dos gotas finales', group: 'Alternante', opposite: 'F (··—·)', frequency: 4.0 },
    { letter: 'M', code: '——',     mnemonic: 'MÓ-TÓR',          tip: 'Dos rayas: la M tiene dos patitas verticales', visual: 'Las dos patas de la M, dos trazos largos', group: '2 símbolos', opposite: 'I (··)', frequency: 2.4 },
    { letter: 'N', code: '—·',     mnemonic: 'NÓ-te',            tip: 'Raya y punto, exactamente opuesta a la A', visual: 'Decir NO: un golpe largo de negacion y un punto final', group: '2 símbolos', opposite: 'A (·—)', frequency: 6.7 },
    { letter: 'Ñ', code: '——·——',  mnemonic: 'ÑO-ÑO-ri-ÑO-ÑO',  tip: 'Exclusiva del español: patron simetrico', visual: 'La tilde de la Ñ en el centro: rayas-punto-rayas, como un puente', group: '5 símbolos', frequency: 0.3 },
    { letter: 'O', code: '———',    mnemonic: 'Ó-RO-SÓL',        tip: 'Tres rayas: la O es redonda y grande, todo largo', visual: 'La O es grande y circular: tres trazos laaargos para dibujarla', group: 'Todo rayas', frequency: 7.5 },
    { letter: 'P', code: '·——·',   mnemonic: 'pe-LÓ-TÓ-ne',     tip: 'Simetrica: punto-raya-raya-punto', visual: 'Una pelota que rebota: toc-rueda-rueda-toc', group: 'Simétrica', frequency: 1.9 },
    { letter: 'Q', code: '——·—',   mnemonic: 'QUÓ-QUÓ-ri-QUÓ',  tip: 'Como el gallo cantando: quiquiriqui', visual: 'El gallo al amanecer: QUIII-QUIII-ri-QUIII', group: 'Empieza con raya', frequency: 0.1 },
    { letter: 'R', code: '·—·',    mnemonic: 'ra-MÓ-ne',         tip: 'Punto, raya, punto: ritmo agil y simetrico', visual: 'Un latido: ti-TUMM-ti', group: 'Simétrica', frequency: 6.0 },
    { letter: 'S', code: '···',    mnemonic: 'sa-ra-sa',          tip: 'Tres puntos rapidos. Junto con O forman SOS', visual: 'Una serpiente: sss-sss-sss, tres silbidos cortos', group: 'Todo puntos', frequency: 6.3 },
    { letter: 'T', code: '—',      mnemonic: 'TÓN',              tip: 'Una sola raya: segunda letra mas frecuente', visual: 'La barra horizontal de la T: un solo trazo largo', group: '1 símbolo', opposite: 'E (·)', frequency: 9.1 },
    { letter: 'U', code: '··—',    mnemonic: 'u-ni-ÓN',          tip: 'Dos puntos y una raya final. Opuesta a la D', visual: 'La U: dos patas cortas y la curva larga del fondo', group: '3 símbolos', opposite: 'D (—··)', frequency: 2.8 },
    { letter: 'V', code: '···—',   mnemonic: 've-ne-ci-ÓN',      tip: 'Tres puntos y raya: ta-ta-ta-TAAA (5a de Beethoven)', visual: 'La 5a de Beethoven: da-da-da-DAAAM. Victoria!', group: 'Empieza con punto', opposite: 'B (—···)', frequency: 1.0 },
    { letter: 'W', code: '·——',    mnemonic: 'wa-GÓN-SÓL',       tip: 'Punto y dos rayas. Opuesta a la G', visual: 'La W tiene tres puntas: una corta arriba y dos valles largos', group: '3 símbolos', opposite: 'G (——·)', frequency: 2.4 },
    { letter: 'X', code: '—··—',   mnemonic: 'XÓ-fo-no-SÓN',     tip: 'Simetrica: raya-punto-punto-raya', visual: 'La X: dos brazos largos cruzandose con dos puntos al centro', group: 'Simétrica', opposite: 'P (·——·)', frequency: 0.2 },
    { letter: 'Y', code: '—·——',   mnemonic: 'YÓ-la-RÓ-BÓ',     tip: 'Raya, punto, dos rayas', visual: 'Un barco en el mar: olaaa-chapoteo-olaaa-olaaa', group: 'Empieza con raya', frequency: 2.0 },
    { letter: 'Z', code: '——··',   mnemonic: 'ZÓ-RRÓ-ma-ta',     tip: 'Dos rayas, dos puntos', visual: 'El Zorro marcando su Z con la espada: dos tajos largos y dos toques', group: 'Empieza con raya', frequency: 0.1 },
  ];

  const MORSE_NUMBERS: MorseEntry[] = [
    { letter: '0', code: '—————', mnemonic: '5 rayas',     tip: 'Todo largo, cero puntos' },
    { letter: '1', code: '·————', mnemonic: '1 punto + 4', tip: 'Un punto al inicio, como el número 1' },
    { letter: '2', code: '··———', mnemonic: '2 puntos + 3', tip: 'Dos puntos, como el número 2' },
    { letter: '3', code: '···——', mnemonic: '3 puntos + 2', tip: 'Tres puntos, como el número 3' },
    { letter: '4', code: '····—', mnemonic: '4 puntos + 1', tip: 'Cuatro puntos, como el número 4' },
    { letter: '5', code: '·····', mnemonic: '5 puntos',     tip: 'Todo corto, cinco puntos' },
    { letter: '6', code: '—····', mnemonic: '1 raya + 4',   tip: 'Espejo del 4: empieza con raya' },
    { letter: '7', code: '——···', mnemonic: '2 rayas + 3',  tip: 'Espejo del 3: empieza con rayas' },
    { letter: '8', code: '———··', mnemonic: '3 rayas + 2',  tip: 'Espejo del 2: empieza con rayas' },
    { letter: '9', code: '————·', mnemonic: '4 rayas + 1',  tip: 'Espejo del 1: empieza con rayas' },
  ];

  /** Build lookup map */
  const morseMap = new Map<string, string>();
  const reverseMorseMap = new Map<string, string>();
  [...MORSE_ALPHABET, ...MORSE_NUMBERS].forEach(e => {
    morseMap.set(e.letter, e.code);
    reverseMorseMap.set(e.code, e.letter);
  });
  morseMap.set(' ', '/');

  // ── Pairs of opposites ─────────────────────────────────────
  const OPPOSITES = [
    { a: 'E', b: 'T', codeA: '·', codeB: '—', desc: '1 símbolo: punto vs raya' },
    { a: 'A', b: 'N', codeA: '·—', codeB: '—·', desc: '2 símbolos invertidos' },
    { a: 'I', b: 'M', codeA: '··', codeB: '——', desc: '2 símbolos iguales' },
    { a: 'D', b: 'U', codeA: '—··', codeB: '··—', desc: '3 símbolos invertidos' },
    { a: 'G', b: 'W', codeA: '——·', codeB: '·——', desc: '3 símbolos invertidos' },
    { a: 'K', b: 'R', codeA: '—·—', codeB: '·—·', desc: '3 símbolos invertidos' },
    { a: 'B', b: 'V', codeA: '—···', codeB: '···—', desc: '4 símbolos invertidos' },
    { a: 'F', b: 'L', codeA: '··—·', codeB: '·—··', desc: '4 símbolos espejo' },
    { a: 'P', b: 'X', codeA: '·——·', codeB: '—··—', desc: '4 símbolos invertidos' },
  ];

  // ── Audio Engine (softer, slower) ──────────────────────────
  let audioCtx: AudioContext | null = null;
  const FREQ = 520;
  const DOT_DURATION = 0.15;
  const DASH_DURATION = DOT_DURATION * 3;
  const SYMBOL_GAP = DOT_DURATION * 1.2;
  const LETTER_GAP = DOT_DURATION * 4;

  function getAudioCtx(): AudioContext {
    if (!audioCtx) audioCtx = new AudioContext();
    return audioCtx;
  }

  /** Play a soft beep with fade-in/out to avoid clicks */
  function beep(duration: number, startTime: number): void {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = FREQ;
    osc.type = 'sine';

    // Smooth envelope: fade in → sustain → fade out
    const fadeTime = 0.015;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.25, startTime + fadeTime);
    gain.gain.setValueAtTime(0.25, startTime + duration - fadeTime);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  /** Play a full Morse code string and return total duration in ms */
  function playMorseCode(code: string): number {
    const ctx = getAudioCtx();
    let t = ctx.currentTime + 0.05;
    // Split by tokens, handle // (word gap) and / (letter gap)
    const parts = code.split(' ');
    for (let p = 0; p < parts.length; p++) {
      const part = parts[p];
      if (part === '//') {
        t += LETTER_GAP * 3;
      } else if (part === '/') {
        t += LETTER_GAP;
      } else {
        // Play each symbol in the part
        for (const symbol of part) {
          if (symbol === '·') {
            beep(DOT_DURATION, t);
            t += DOT_DURATION + SYMBOL_GAP;
          } else if (symbol === '—') {
            beep(DASH_DURATION, t);
            t += DASH_DURATION + SYMBOL_GAP;
          }
        }
        // Add letter gap after each code group
        if (p < parts.length - 1) {
          const next = parts[p + 1];
          if (next !== '/' && next !== '//') {
            t += LETTER_GAP * 0.5;
          }
        }
      }
    }
    return (t - (getAudioCtx().currentTime + 0.05)) * 1000;
  }

  // ── State ───────────────────────────────────────────────────
  type Tab = 'alfabeto' | 'practica' | 'traductor' | 'logica';
  let activeTab: Tab = 'alfabeto';
  let selectedEntry: MorseEntry | null = null;
  let animatingCode = '';
  let animatingIndex = -1;
  let animationTimer: ReturnType<typeof setTimeout> | null = null;

  // Practice mode
  let practiceMode: 'ver' | 'escuchar' = 'ver';
  let practicePool: MorseEntry[] = [];
  let currentQuestion: MorseEntry | null = null;
  let practiceInput = '';
  let practiceResult: 'correct' | 'wrong' | null = null;
  let practiceScore = 0;
  let practiceTotal = 0;
  let showPracticeAnswer = false;

  // Translator mode
  let translatorText = '';
  let translatorOutput = '';
  let isPlayingTranslation = false;

  // Beethoven V animation
  let beethovenStep = -1;
  let beethovenPlaying = false;
  let beethovenTimers: ReturnType<typeof setTimeout>[] = [];

  /** Play a musical note at a given frequency */
  function playNote(freq: number, duration: number, startTime: number): void {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'triangle';
    const fade = 0.02;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.35, startTime + fade);
    gain.gain.setValueAtTime(0.35, startTime + duration - fade * 2);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  /** Play Beethoven's 5th opening: G G G Eb (short short short LONG) then map to Morse V */
  function playBeethoven() {
    if (beethovenPlaying) return;
    beethovenPlaying = true;
    beethovenStep = -1;
    beethovenTimers.forEach(t => clearTimeout(t));
    beethovenTimers = [];

    const ctx = getAudioCtx();
    const now = ctx.currentTime + 0.05;

    // Beethoven notes: G4=392Hz (short), Eb4=311Hz (long hold)
    const G4 = 392;
    const Eb4 = 311.13;
    const short = 0.22;
    const gap = 0.08;
    const longNote = 0.9;

    // Note 1: G
    playNote(G4, short, now);
    // Note 2: G
    playNote(G4, short, now + short + gap);
    // Note 3: G
    playNote(G4, short, now + (short + gap) * 2);
    // Note 4: Eb (long, held)
    playNote(Eb4, longNote, now + (short + gap) * 3);

    // Animate steps in sync
    const stepDelay = (short + gap) * 1000;
    beethovenTimers.push(setTimeout(() => { beethovenStep = 0; }, 0));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 1; }, stepDelay));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 2; }, stepDelay * 2));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 3; }, stepDelay * 3));

    // After Beethoven finishes, pause, then play Morse V
    const beethovenEnd = (short + gap) * 3 + longNote;
    const morsePause = 1.2;

    beethovenTimers.push(setTimeout(() => {
      beethovenStep = 4; // transition state
    }, (beethovenEnd + 0.3) * 1000));

    beethovenTimers.push(setTimeout(() => {
      beethovenStep = 5; // morse playing
      playMorseCode('···—');
    }, (beethovenEnd + morsePause) * 1000));

    // Animate morse steps
    const morseStart = beethovenEnd + morsePause;
    const dotT = DOT_DURATION + SYMBOL_GAP;
    beethovenTimers.push(setTimeout(() => { beethovenStep = 10; }, morseStart * 1000));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 11; }, (morseStart + dotT) * 1000));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 12; }, (morseStart + dotT * 2) * 1000));
    beethovenTimers.push(setTimeout(() => { beethovenStep = 13; }, (morseStart + dotT * 3) * 1000));

    const totalDuration = morseStart + dotT * 3 + DASH_DURATION + 0.5;
    beethovenTimers.push(setTimeout(() => {
      beethovenStep = -1;
      beethovenPlaying = false;
    }, totalDuration * 1000));
  }

  // ── Animation ───────────────────────────────────────────────
  function animateAndPlay(entry: MorseEntry) {
    if (animationTimer) clearTimeout(animationTimer);
    selectedEntry = entry;
    animatingCode = entry.code;
    animatingIndex = -1;

    const ctx = getAudioCtx();
    let t = ctx.currentTime + 0.05;
    let delay = 0;

    for (let i = 0; i < entry.code.length; i++) {
      const symbol = entry.code[i];

      ((idx, delayMs) => {
        setTimeout(() => {
          animatingIndex = idx;
        }, delayMs);
      })(i, delay * 1000);

      if (symbol === '·') {
        beep(DOT_DURATION, t);
        t += DOT_DURATION + SYMBOL_GAP;
        delay += DOT_DURATION + SYMBOL_GAP;
      } else if (symbol === '—') {
        beep(DASH_DURATION, t);
        t += DASH_DURATION + SYMBOL_GAP;
        delay += DASH_DURATION + SYMBOL_GAP;
      }
    }

    animationTimer = setTimeout(() => {
      animatingIndex = -1;
    }, delay * 1000 + 400);
  }

  // ── Practice ────────────────────────────────────────────────
  function startPractice() {
    practicePool = [...MORSE_ALPHABET];
    practiceScore = 0;
    practiceTotal = 0;
    practiceResult = null;
    showPracticeAnswer = false;
    nextQuestion();
  }

  function nextQuestion() {
    practiceInput = '';
    practiceResult = null;
    showPracticeAnswer = false;
    const idx = Math.floor(Math.random() * practicePool.length);
    currentQuestion = practicePool[idx];
    if (practiceMode === 'escuchar' && currentQuestion) {
      setTimeout(() => {
        if (currentQuestion) playMorseCode(currentQuestion.code);
      }, 500);
    }
  }

  function checkPracticeAnswer() {
    if (!currentQuestion) return;
    practiceTotal++;
    const userAnswer = practiceInput.trim().toUpperCase();

    if (practiceMode === 'ver') {
      const normalized = userAnswer.replace(/\./g, '·').replace(/-/g, '—');
      if (normalized === currentQuestion.code) {
        practiceResult = 'correct';
        practiceScore++;
      } else {
        practiceResult = 'wrong';
        showPracticeAnswer = true;
      }
    } else {
      if (userAnswer === currentQuestion.letter) {
        practiceResult = 'correct';
        practiceScore++;
      } else {
        practiceResult = 'wrong';
        showPracticeAnswer = true;
      }
    }
  }

  // ── Translator ──────────────────────────────────────────────
  function translateText() {
    const input = translatorText.toUpperCase();
    const words = input.split(' ');
    const morseWords = words.map(word => {
      const letters: string[] = [];
      for (const char of word) {
        const code = morseMap.get(char);
        if (code) letters.push(code);
      }
      return letters.join(' / ');
    });
    translatorOutput = morseWords.filter(w => w).join(' // ');
  }

  function playTranslation() {
    if (!translatorOutput || isPlayingTranslation) return;
    isPlayingTranslation = true;
    const duration = playMorseCode(translatorOutput);
    setTimeout(() => { isPlayingTranslation = false; }, duration + 200);
  }

  // ── Lifecycle ───────────────────────────────────────────────
  onDestroy(() => {
    if (animationTimer) clearTimeout(animationTimer);
    beethovenTimers.forEach(t => clearTimeout(t));
    if (audioCtx) audioCtx.close();
  });

  // ── Mnemonic syllable color helper ─────────────────────────
  function colorMnemonic(mnemonic: string): { text: string; isDash: boolean }[] {
    const syllables = mnemonic.split('-');
    return syllables.map(s => ({
      text: s,
      isDash: /[oó]/i.test(s)
    }));
  }
</script>

<svelte:head>
  <title>Codigo Morse - Tropa San Luis</title>
  <meta name="description" content="Aprende codigo Morse de forma interactiva con sonido, animaciones y mnemotecnia." />
</svelte:head>

<!-- Hero -->
<section class="text-center mb-10">
  <h1 class="text-4xl md:text-5xl font-extrabold text-[#C1272D] mb-3 tracking-tight">
    Codigo Morse
  </h1>
  <p class="text-lg text-gray-600 max-w-2xl mx-auto">
    Aprende codigo Morse de forma interactiva. Escucha, practica y domina el lenguaje de puntos y rayas.
  </p>
  <div class="mt-4 flex justify-center gap-2 flex-wrap text-sm">
    <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">· = Punto (corto)</span>
    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">— = Raya (largo x3)</span>
    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Silaba con O = Raya</span>
  </div>
</section>

<!-- Tabs -->
<div class="flex justify-center gap-2 mb-8 flex-wrap">
  {#each [
    { id: 'alfabeto', label: 'Alfabeto y Numeros' },
    { id: 'logica',   label: 'Logica del Morse' },
    { id: 'practica', label: 'Practica' },
    { id: 'traductor',label: 'Traductor' },
  ] as tab}
    <button
      class="px-4 py-2 rounded-lg font-semibold transition-all duration-200 {activeTab === tab.id
        ? 'bg-[#C1272D] text-white shadow-lg scale-105'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      on:click={() => { activeTab = tab.id as Tab; selectedEntry = null; }}
    >
      {tab.label}
    </button>
  {/each}
</div>

<!-- ═══ ALPHABET & NUMBERS TAB ═══ -->
{#if activeTab === 'alfabeto'}

  <!-- Legend (arriba) -->
  <div class="mb-6 max-w-xl mx-auto bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
    <p class="font-semibold text-gray-800 mb-2">Como funcionan las mnemotecnias?</p>
    <p>Cada letra tiene una palabra clave dividida en silabas. Las silabas que contienen la letra <span class="text-blue-600 font-bold">"O"</span> representan una <span class="text-blue-600 font-bold">raya (—)</span>, y las que <span class="text-amber-600 font-semibold">no tienen "O"</span> representan un <span class="text-amber-600 font-semibold">punto (·)</span>.</p>
    <p class="mt-2">Ejemplo: <strong>C</strong> = <span class="text-blue-600 font-bold">CO</span><span class="text-gray-400">-</span><span class="text-amber-600">ca</span><span class="text-gray-400">-</span><span class="text-blue-600 font-bold">CO</span><span class="text-gray-400">-</span><span class="text-amber-600">la</span> = <span class="font-mono">—·—·</span></p>
    <p class="mt-2">Ejemplo: <strong>V</strong> = <span class="text-amber-600">ve</span><span class="text-gray-400">-</span><span class="text-amber-600">ne</span><span class="text-gray-400">-</span><span class="text-amber-600">ci</span><span class="text-gray-400">-</span><span class="text-blue-600 font-bold">ON</span> = <span class="font-mono">···—</span></p>
  </div>

  <!-- Alphabet heading -->
  <h2 class="text-lg font-bold text-gray-800 mb-3">Letras</h2>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
    {#each MORSE_ALPHABET as entry}
      <button
        class="morse-card group relative bg-white rounded-2xl border-2 p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
          {selectedEntry?.letter === entry.letter ? 'border-[#C1272D] shadow-lg ring-2 ring-[#C1272D]/20' : 'border-gray-200 hover:border-[#C1272D]/50'}"
        on:click={() => animateAndPlay(entry)}
      >
        <div class="text-3xl font-black text-[#C1272D] mb-1">{entry.letter}</div>
        <div class="flex justify-center items-center gap-1.5 h-8 mb-2">
          {#each entry.code.split('') as symbol, i}
            {#if symbol === '·'}
              <div class="w-3 h-3 rounded-full transition-all duration-200
                {animatingCode === entry.code && animatingIndex === i
                  ? 'bg-amber-400 scale-[1.8] shadow-[0_0_16px_rgba(251,191,36,0.9)]'
                  : 'bg-amber-500/70 group-hover:bg-amber-500'}"></div>
            {:else}
              <div class="w-8 h-3 rounded-full transition-all duration-200
                {animatingCode === entry.code && animatingIndex === i
                  ? 'bg-blue-400 scale-125 shadow-[0_0_16px_rgba(96,165,250,0.9)]'
                  : 'bg-blue-500/70 group-hover:bg-blue-500'}"></div>
            {/if}
          {/each}
        </div>
        <div class="text-xs font-medium leading-tight">
          {#each colorMnemonic(entry.mnemonic) as syl, i}
            <span class="{syl.isDash ? 'text-blue-600 font-bold' : 'text-amber-600'}">{syl.text}</span>{#if i < colorMnemonic(entry.mnemonic).length - 1}<span class="text-gray-300">-</span>{/if}
          {/each}
        </div>
      </button>
    {/each}
  </div>

  <!-- Numbers heading -->
  <h2 class="text-lg font-bold text-gray-800 mb-3">Numeros</h2>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
    {#each MORSE_NUMBERS as entry}
      <button
        class="morse-card group relative bg-white rounded-2xl border-2 p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
          {selectedEntry?.letter === entry.letter ? 'border-[#C1272D] shadow-lg ring-2 ring-[#C1272D]/20' : 'border-gray-200 hover:border-[#C1272D]/50'}"
        on:click={() => animateAndPlay(entry)}
      >
        <div class="text-3xl font-black text-[#C1272D] mb-1">{entry.letter}</div>
        <div class="flex justify-center items-center gap-1.5 h-8 mb-2">
          {#each entry.code.split('') as symbol, i}
            {#if symbol === '·'}
              <div class="w-3 h-3 rounded-full transition-all duration-200
                {animatingCode === entry.code && animatingIndex === i
                  ? 'bg-amber-400 scale-[1.8] shadow-[0_0_16px_rgba(251,191,36,0.9)]'
                  : 'bg-amber-500/70 group-hover:bg-amber-500'}"></div>
            {:else}
              <div class="w-8 h-3 rounded-full transition-all duration-200
                {animatingCode === entry.code && animatingIndex === i
                  ? 'bg-blue-400 scale-125 shadow-[0_0_16px_rgba(96,165,250,0.9)]'
                  : 'bg-blue-500/70 group-hover:bg-blue-500'}"></div>
            {/if}
          {/each}
        </div>
        <div class="text-xs text-gray-500">{entry.mnemonic}</div>
      </button>
    {/each}
  </div>

  <!-- Trucos para memorizar -->
  <div class="max-w-3xl mx-auto mb-8">
    <h2 class="text-lg font-bold text-gray-800 mb-3">Trucos para memorizar</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">Aprende en parejas opuestas</p>
        <p class="text-sm text-gray-600 mb-2">Muchas letras son el patron invertido de otra. Si sabes una, ya sabes la otra:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>A</strong> (·—) ↔ <strong>N</strong> (—·) — como subir y bajar</p>
          <p><strong>D</strong> (—··) ↔ <strong>U</strong> (··—) — empieza vs termina largo</p>
          <p><strong>B</strong> (—···) ↔ <strong>V</strong> (···—) — Bonaparte vs Victoria</p>
          <p><strong>F</strong> (··—·) ↔ <strong>L</strong> (·—··) — la raya cambia de lugar</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">Empieza por las mas faciles</p>
        <p class="text-sm text-gray-600 mb-2">Aprende primero las de 1 y 2 simbolos. Con solo 6 letras ya cubres mucho:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>E</strong> (·) y <strong>T</strong> (—) — las mas simples</p>
          <p><strong>A</strong> (·—) y <strong>N</strong> (—·) — la pareja basica</p>
          <p><strong>I</strong> (··) y <strong>M</strong> (——) — dos iguales</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">Grupo "todo igual"</p>
        <p class="text-sm text-gray-600 mb-2">Estas letras usan solo puntos o solo rayas, son las mas faciles de recordar:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>E</strong> (·) → <strong>I</strong> (··) → <strong>S</strong> (···) → <strong>H</strong> (····) — suma un punto cada vez</p>
          <p><strong>T</strong> (—) → <strong>M</strong> (——) → <strong>O</strong> (———) — suma una raya cada vez</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">Las simetricas (palindromos)</p>
        <p class="text-sm text-gray-600 mb-2">Se leen igual de izquierda a derecha que al reves:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>R</strong> (·—·) — latido: ti-TUM-ti</p>
          <p><strong>P</strong> (·——·) — pelota rebotando</p>
          <p><strong>X</strong> (—··—) — brazos cruzados</p>
          <p><strong>Ñ</strong> (——·——) — la tilde en el centro</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">Asocia con sonidos</p>
        <p class="text-sm text-gray-600 mb-2">Imagina el sonido de cada letra como algo de la vida real:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>S</strong> (···) — serpiente: sss-sss-sss</p>
          <p><strong>H</strong> (····) — risa: ja-ja-ja-ja</p>
          <p><strong>Q</strong> (——·—) — gallo: QUII-QUII-ri-QUII</p>
          <p><strong>V</strong> (···—) — Beethoven: da-da-da-DAAAM</p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <p class="font-semibold text-[#C1272D] mb-2">La letra se parece al codigo</p>
        <p class="text-sm text-gray-600 mb-2">Algunas letras tienen formas que recuerdan su patron:</p>
        <div class="text-sm space-y-1 text-gray-700">
          <p><strong>T</strong> (—) — la barra horizontal de la T</p>
          <p><strong>M</strong> (——) — las dos patas de la M</p>
          <p><strong>I</strong> (··) — los dos puntos de la ï</p>
          <p><strong>U</strong> (··—) — dos patas cortas + curva larga de la U</p>
          <p><strong>O</strong> (———) — grande y redonda, tres trazos largos</p>
        </div>
      </div>

    </div>
  </div>

  <!-- Selected entry modal -->
  {#if selectedEntry}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn"
      on:click|self={() => { selectedEntry = null; animatingCode = ''; animatingIndex = -1; }}
    >
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center relative animate-bounceIn">
        <!-- Close -->
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
          on:click={() => { selectedEntry = null; animatingCode = ''; animatingIndex = -1; }}
        >✕</button>

        <div class="text-5xl font-black text-[#C1272D] mb-2">{selectedEntry.letter}</div>

        <!-- Morse visual with animation -->
        <div class="flex justify-center items-center gap-2 mb-3">
          {#each selectedEntry.code.split('') as symbol, i}
            {#if symbol === '·'}
              <div class="w-4 h-4 rounded-full transition-all duration-200
                {animatingCode === selectedEntry.code && animatingIndex === i
                  ? 'bg-amber-400 scale-[1.8] shadow-[0_0_16px_rgba(251,191,36,0.9)]'
                  : 'bg-amber-500'}"></div>
            {:else}
              <div class="w-10 h-4 rounded-full transition-all duration-200
                {animatingCode === selectedEntry.code && animatingIndex === i
                  ? 'bg-blue-400 scale-125 shadow-[0_0_16px_rgba(96,165,250,0.9)]'
                  : 'bg-blue-500'}"></div>
            {/if}
          {/each}
        </div>

        <div class="text-lg font-mono tracking-[0.3em] mb-3 text-gray-700">{selectedEntry.code}</div>

        <!-- Mnemonic -->
        <div class="text-lg mb-3">
          {#each colorMnemonic(selectedEntry.mnemonic) as syl, i}
            <span class="text-xl {syl.isDash ? 'text-blue-600 font-bold' : 'text-amber-600 font-semibold'}">{syl.text}</span>{#if i < colorMnemonic(selectedEntry.mnemonic).length - 1}<span class="text-gray-400">-</span>{/if}
          {/each}
        </div>

        <p class="text-sm text-gray-600 italic mb-2">{selectedEntry.tip}</p>

        {#if selectedEntry.visual}
          <div class="bg-amber-50 rounded-lg px-3 py-2 text-sm text-amber-800 mb-3 text-left">
            <span class="font-semibold">Imagina:</span> {selectedEntry.visual}
          </div>
        {/if}

        <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
          {#if selectedEntry.opposite}
            <span>Opuesta: <span class="font-mono font-bold">{selectedEntry.opposite}</span></span>
          {/if}
          {#if selectedEntry.frequency}
            <span>Frecuencia: ~{selectedEntry.frequency}%</span>
          {/if}
        </div>

        <button
          class="bg-[#C1272D] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#A11F25] transition-colors shadow-md"
          on:click={() => selectedEntry && animateAndPlay(selectedEntry)}
        >
          Escuchar de nuevo
        </button>
      </div>
    </div>
  {/if}

{/if}

<!-- ═══ LOGIC TAB ═══ -->
{#if activeTab === 'logica'}
  <div class="max-w-3xl mx-auto space-y-8">

    <!-- History -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">Historia del codigo Morse</h2>

      <div class="space-y-4 text-gray-700">
        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1832</div>
          <p><strong>Samuel Morse</strong>, un pintor estadounidense, concibe la idea del telegrafo electrico durante un viaje en barco. Se entera de que la electricidad puede viajar instantaneamente por un cable y piensa: "si la electricidad va tan rapido, se podrian enviar mensajes a distancia".</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1838</div>
          <p>Morse y su asistente <strong>Alfred Vail</strong> desarrollan el primer codigo practico. Vail visita una imprenta local y cuenta cuantas letras de cada tipo tienen en las cajas de tipografia. Descubren que la <strong>E</strong> tiene mas copias que cualquier otra letra, asi que le asignan el codigo mas corto: un solo punto.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1844</div>
          <p>El <strong>24 de mayo</strong>, Morse envia el primer mensaje telegrafico oficial desde Washington D.C. hasta Baltimore (60 km): <em>"What hath God wrought"</em> (Lo que Dios ha creado). El mensaje tarda solo unos segundos en llegar, algo impensable para la epoca.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1851</div>
          <p>Se adopta el <strong>Codigo Morse Internacional</strong> en una conferencia en Europa. Se modifica el codigo original de Morse para hacerlo mas universal, eliminando los espacios internos que tenia el sistema americano y estandarizando los simbolos para todos los idiomas.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1865</div>
          <p>Se funda la <strong>Union Internacional de Telecomunicaciones</strong> (UIT) para coordinar el uso del telegrafo entre paises. El Morse se convierte en el estandar mundial de comunicacion a distancia.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1906</div>
          <p>Se establece <strong>SOS</strong> (··· ——— ···) como senal internacional de socorro. Se elige no por significar "Save Our Souls" (eso es un mito), sino porque es facil de transmitir y reconocer: tres cortos, tres largos, tres cortos.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1912</div>
          <p>El <strong>Titanic</strong> hunde y sus operadores de radio envian SOS y CQD por Morse. El barco Carpathia recibe la senal y rescata a 710 sobrevivientes. Este evento convence al mundo de la importancia vital de la comunicacion por radio y Morse.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1940s</div>
          <p>Durante la <strong>Segunda Guerra Mundial</strong>, el Morse es fundamental para las comunicaciones militares. Los operadores pueden transmitir mensajes cifrados donde la voz no llega. La BBC usa la letra <strong>V</strong> (···—) de "Victoria" como simbolo de resistencia, transmitiendo el ritmo del inicio de la 5a Sinfonia de Beethoven.</p>
        </div>

        <!-- Beethoven V interactive animation -->
        <div class="bg-gray-900 rounded-2xl p-6 text-white">
          <div class="text-center mb-4">
            <p class="text-sm text-gray-400 mb-1">La conexion entre Beethoven y el Morse</p>
            <p class="text-lg font-bold">5a Sinfonia = letra V = Victoria</p>
          </div>

          <!-- Musical staff visualization -->
          <div class="flex items-end justify-center gap-3 mb-6 h-28">
            <!-- Note 1: G (short) -->
            <div class="flex flex-col items-center gap-1">
              <div class="text-xs text-gray-500 mb-1">G</div>
              <div class="w-10 rounded-t-lg transition-all duration-150 {beethovenStep === 0 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : beethovenStep === 10 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : 'bg-amber-500/40'}"
                style="height: {beethovenStep === 0 || beethovenStep === 10 ? '60px' : '40px'}; transition: height 0.15s;"></div>
              <div class="text-xs {beethovenStep === 0 ? 'text-amber-400' : beethovenStep === 10 ? 'text-amber-400' : 'text-gray-600'}">·</div>
              <div class="text-[10px] text-gray-600">corto</div>
            </div>
            <!-- Note 2: G (short) -->
            <div class="flex flex-col items-center gap-1">
              <div class="text-xs text-gray-500 mb-1">G</div>
              <div class="w-10 rounded-t-lg transition-all duration-150 {beethovenStep === 1 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : beethovenStep === 11 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : 'bg-amber-500/40'}"
                style="height: {beethovenStep === 1 || beethovenStep === 11 ? '60px' : '40px'}; transition: height 0.15s;"></div>
              <div class="text-xs {beethovenStep === 1 ? 'text-amber-400' : beethovenStep === 11 ? 'text-amber-400' : 'text-gray-600'}">·</div>
              <div class="text-[10px] text-gray-600">corto</div>
            </div>
            <!-- Note 3: G (short) -->
            <div class="flex flex-col items-center gap-1">
              <div class="text-xs text-gray-500 mb-1">G</div>
              <div class="w-10 rounded-t-lg transition-all duration-150 {beethovenStep === 2 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : beethovenStep === 12 ? 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]' : 'bg-amber-500/40'}"
                style="height: {beethovenStep === 2 || beethovenStep === 12 ? '60px' : '40px'}; transition: height 0.15s;"></div>
              <div class="text-xs {beethovenStep === 2 ? 'text-amber-400' : beethovenStep === 12 ? 'text-amber-400' : 'text-gray-600'}">·</div>
              <div class="text-[10px] text-gray-600">corto</div>
            </div>
            <!-- Pause -->
            <div class="flex flex-col items-center justify-end">
              <div class="text-2xl text-gray-600 mb-6">{beethovenStep === 4 ? '=' : ''}</div>
            </div>
            <!-- Note 4: Eb (LONG) -->
            <div class="flex flex-col items-center gap-1">
              <div class="text-xs text-gray-500 mb-1">Eb</div>
              <div class="w-16 rounded-t-lg transition-all duration-150 {beethovenStep === 3 ? 'bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.7)]' : beethovenStep === 13 ? 'bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.7)]' : 'bg-blue-500/40'}"
                style="height: {beethovenStep === 3 || beethovenStep === 13 ? '100px' : '70px'}; transition: height 0.15s;"></div>
              <div class="text-xs {beethovenStep === 3 ? 'text-blue-400' : beethovenStep === 13 ? 'text-blue-400' : 'text-gray-600'}">—</div>
              <div class="text-[10px] text-gray-600">LARGO</div>
            </div>
          </div>

          <!-- Labels row -->
          <div class="flex justify-center items-center gap-4 mb-4 text-sm">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg {beethovenStep >= 0 && beethovenStep <= 3 ? 'bg-white/10 ring-1 ring-white/30' : 'opacity-50'}">
              <span>Beethoven:</span>
              <span class="font-mono tracking-wider">da da da <strong>DAAAA</strong></span>
            </div>
            <div class="text-xl text-gray-500">{beethovenStep === 4 ? '→' : beethovenStep >= 5 ? '=' : ''}</div>
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg {beethovenStep >= 5 ? 'bg-white/10 ring-1 ring-white/30' : 'opacity-50'}">
              <span>Morse V:</span>
              <div class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full {beethovenStep === 10 ? 'bg-amber-400' : 'bg-amber-500/60'}"></div>
                <div class="w-2 h-2 rounded-full {beethovenStep === 11 ? 'bg-amber-400' : 'bg-amber-500/60'}"></div>
                <div class="w-2 h-2 rounded-full {beethovenStep === 12 ? 'bg-amber-400' : 'bg-amber-500/60'}"></div>
                <div class="w-6 h-2 rounded-full {beethovenStep === 13 ? 'bg-blue-400' : 'bg-blue-500/60'}"></div>
              </div>
            </div>
          </div>

          <!-- Big V -->
          <div class="text-center mb-4">
            <span class="text-6xl font-black transition-all duration-300 {beethovenStep >= 4 ? 'text-[#C1272D] scale-110' : 'text-gray-700'}" style="display: inline-block; transform: {beethovenStep >= 4 ? 'scale(1.1)' : 'scale(1)'}; transition: transform 0.3s, color 0.3s;">V</span>
            {#if beethovenStep >= 4}
              <p class="text-sm text-[#C1272D] font-semibold mt-1 animate-fadeIn">Victoria</p>
            {/if}
          </div>

          <!-- Play button -->
          <div class="text-center">
            <button
              class="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full font-semibold transition border border-white/20 disabled:opacity-40"
              on:click={playBeethoven}
              disabled={beethovenPlaying}
            >
              {beethovenPlaying ? 'Escuchando...' : 'Escuchar Beethoven → Morse'}
            </button>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">1997</div>
          <p>La <strong>Marina de EE.UU.</strong> deja de usar Morse oficialmente. La comunicacion por satelite lo reemplaza en el ambito maritimo.</p>
        </div>

        <div class="flex gap-4 items-start">
          <div class="bg-[#C1272D] text-white text-xs font-bold rounded-full px-2 py-1 mt-0.5 shrink-0">Hoy</div>
          <p>El Morse sigue vivo en el <strong>Scoutismo</strong>, la aviacion (los radiofaros VOR transmiten su identificador en Morse), la radioaficion, y como herramienta de accesibilidad: personas con movilidad reducida pueden comunicarse con solo dos acciones (corto y largo). <strong>Google integro Morse en el teclado de Android</strong> en 2018 para personas con discapacidad.</p>
        </div>
      </div>
    </div>

    <!-- How it works technically -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">Como funciona</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-xl p-4">
          <p class="font-semibold text-gray-800 mb-2">Duraciones</p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-amber-500 shrink-0"></div>
              <span><strong>Punto:</strong> 1 unidad de tiempo</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-8 h-3 rounded-full bg-blue-500 shrink-0"></div>
              <span><strong>Raya:</strong> 3 unidades (3x el punto)</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-3 h-0.5 bg-gray-300 shrink-0"></div>
              <span><strong>Entre simbolos:</strong> 1 unidad de silencio</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-6 h-0.5 bg-gray-300 shrink-0"></div>
              <span><strong>Entre letras:</strong> 3 unidades de silencio</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="w-10 h-0.5 bg-gray-300 shrink-0"></div>
              <span><strong>Entre palabras:</strong> 7 unidades de silencio</span>
            </li>
          </ul>
        </div>
        <div class="bg-gray-50 rounded-xl p-4">
          <p class="font-semibold text-gray-800 mb-2">Formas de transmision</p>
          <ul class="space-y-2 text-sm text-gray-700">
            <li><strong>Sonido:</strong> pitidos cortos y largos (telegrafo, radio)</li>
            <li><strong>Luz:</strong> destellos de linterna o lampara</li>
            <li><strong>Tacto:</strong> toques en la mano o superficie</li>
            <li><strong>Visual:</strong> banderas, espejos con el sol</li>
            <li><strong>Escrito:</strong> puntos y rayas en papel</li>
          </ul>
          <p class="text-xs text-gray-500 mt-3">En el Scoutismo se usan especialmente la luz (linterna, espejo) y el sonido (silbato).</p>
        </div>
      </div>
    </div>

    <!-- Why E is a dot -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">Por que la E es un punto?</h2>
      <p class="text-gray-700 mb-4">
        <strong>No es al azar.</strong> Samuel Morse visito una imprenta y conto cuantas letras de cada tipo tenian en sus cajas de tipografia. Las letras mas usadas recibieron los codigos mas cortos para que los mensajes se transmitieran mas rapido.
      </p>
      <div class="bg-gray-50 rounded-xl p-4">
        <p class="font-semibold text-gray-800 mb-3">Frecuencia vs longitud del codigo:</p>
        <div class="space-y-2">
          {#each [
            { letter: 'E', code: '·', freq: 12.7, desc: 'Mas frecuente = 1 punto' },
            { letter: 'T', code: '—', freq: 9.1, desc: 'Segunda mas frecuente = 1 raya' },
            { letter: 'A', code: '·—', freq: 8.2, desc: '2 simbolos' },
            { letter: 'I', code: '··', freq: 7.0, desc: '2 simbolos' },
            { letter: 'S', code: '···', freq: 6.3, desc: '3 simbolos' },
            { letter: 'Z', code: '——··', freq: 0.1, desc: 'Muy rara = 4 simbolos' },
            { letter: 'Q', code: '——·—', freq: 0.1, desc: 'Muy rara = 4 simbolos' },
          ] as item}
            <div class="flex items-center gap-3">
              <span class="w-8 text-lg font-black text-[#C1272D]">{item.letter}</span>
              <div class="flex items-center gap-1">
                {#each item.code.split('') as s}
                  {#if s === '·'}
                    <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                  {:else}
                    <div class="w-8 h-3 rounded-full bg-blue-500"></div>
                  {/if}
                {/each}
              </div>
              <div class="flex-1 bg-gray-200 rounded-full h-3 ml-2">
                <div class="bg-[#C1272D] h-3 rounded-full transition-all" style="width: {item.freq * 7}%"></div>
              </div>
              <span class="text-xs text-gray-500 w-10 text-right">{item.freq}%</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Binary tree structure (full interactive SVG) -->
    <div>
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-4">
        <h2 class="text-xl font-bold text-[#C1272D] mb-2">El arbol binario del Morse</h2>
        <p class="text-gray-700">
          El codigo Morse forma un <strong>arbol binario</strong>: cada <span class="text-amber-600 font-bold">punto (·)</span> te lleva a la izquierda y cada <span class="text-blue-600 font-bold">raya (—)</span> te lleva a la derecha. Haz clic en cualquier letra para escucharla.
        </p>
      </div>

      <!-- Tree at full viewport width -->
      <div class="relative left-1/2 -translate-x-1/2 w-screen px-4 md:px-8">
        <svg viewBox="0 0 1200 500" class="w-full" xmlns="http://www.w3.org/2000/svg">
          <!-- Lines level 0→1 -->
          <line x1="600" y1="35" x2="300" y2="105" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,3" />
          <line x1="600" y1="35" x2="900" y2="105" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3" />
          <text x="430" y="65" fill="#f59e0b" font-size="14" font-weight="bold">· punto</text>
          <text x="730" y="65" fill="#3b82f6" font-size="14" font-weight="bold">— raya</text>

          <!-- Lines level 1→2 -->
          <line x1="300" y1="130" x2="150" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3" />
          <line x1="300" y1="130" x2="450" y2="200" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3" />
          <line x1="900" y1="130" x2="750" y2="200" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,3" />
          <line x1="900" y1="130" x2="1050" y2="200" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,3" />

          <!-- Lines level 2→3 -->
          {#each [
            [150, 225, 75, 295],  [150, 225, 225, 295],
            [450, 225, 375, 295], [450, 225, 525, 295],
            [750, 225, 675, 295], [750, 225, 825, 295],
            [1050, 225, 975, 295],[1050, 225, 1125, 295],
          ] as [x1, y1, x2, y2], idx}
            <line {x1} {y1} {x2} {y2} stroke="{idx % 2 === 0 ? '#f59e0b' : '#3b82f6'}" stroke-width="1.2" stroke-dasharray="3,3" />
          {/each}

          <!-- Lines level 3→4 -->
          {#each [
            [75, 320, 38, 390],   [75, 320, 112, 390],
            [225, 320, 188, 390], [225, 320, 262, 390],
            [375, 320, 338, 390], [375, 320, 412, 390],
            [525, 320, 488, 390], [525, 320, 562, 390],
            [675, 320, 638, 390], [675, 320, 712, 390],
            [825, 320, 788, 390], [825, 320, 862, 390],
            [975, 320, 938, 390], [975, 320, 1012, 390],
            [1125, 320, 1088, 390],[1125, 320, 1162, 390],
          ] as [x1, y1, x2, y2], idx}
            <line {x1} {y1} {x2} {y2} stroke="{idx % 2 === 0 ? '#f59e0b' : '#3b82f6'}" stroke-width="1" stroke-dasharray="2,3" opacity="0.7" />
          {/each}

          <!-- Level 0: START -->
          <circle cx="600" cy="25" r="22" fill="#C1272D" />
          <text x="600" y="30" text-anchor="middle" fill="white" font-size="11" font-weight="bold">inicio</text>

          <!-- Level 1: E, T -->
          {#each [
            { x: 300, letter: 'E', code: '·' },
            { x: 900, letter: 'T', code: '—' },
          ] as node}
            <g class="tree-node" on:click={() => { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }} role="button" tabindex="0" on:keydown={(ev) => { if (ev.key === 'Enter') { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }}}>
              <circle cx={node.x} cy="115" r="22" fill="{selectedEntry?.letter === node.letter ? '#C1272D' : '#1f2937'}" stroke="{selectedEntry?.letter === node.letter ? '#C1272D' : '#374151'}" stroke-width="2" />
              <text x={node.x} y="121" text-anchor="middle" fill="white" font-size="16" font-weight="bold">{node.letter}</text>
            </g>
          {/each}

          <!-- Level 2: I, A, N, M -->
          {#each [
            { x: 150, letter: 'I', code: '··' },
            { x: 450, letter: 'A', code: '·—' },
            { x: 750, letter: 'N', code: '—·' },
            { x: 1050, letter: 'M', code: '——' },
          ] as node}
            <g class="tree-node" on:click={() => { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }} role="button" tabindex="0" on:keydown={(ev) => { if (ev.key === 'Enter') { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }}}>
              <circle cx={node.x} cy="210" r="20" fill="{selectedEntry?.letter === node.letter ? '#C1272D' : '#1f2937'}" stroke="{selectedEntry?.letter === node.letter ? '#C1272D' : '#374151'}" stroke-width="2" />
              <text x={node.x} y="216" text-anchor="middle" fill="white" font-size="15" font-weight="bold">{node.letter}</text>
            </g>
          {/each}

          <!-- Level 3: S, U, R, W, D, K, G, O -->
          {#each [
            { x: 75,   letter: 'S', code: '···' },
            { x: 225,  letter: 'U', code: '··—' },
            { x: 375,  letter: 'R', code: '·—·' },
            { x: 525,  letter: 'W', code: '·——' },
            { x: 675,  letter: 'D', code: '—··' },
            { x: 825,  letter: 'K', code: '—·—' },
            { x: 975,  letter: 'G', code: '——·' },
            { x: 1125, letter: 'O', code: '———' },
          ] as node}
            <g class="tree-node" on:click={() => { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }} role="button" tabindex="0" on:keydown={(ev) => { if (ev.key === 'Enter') { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }}}>
              <circle cx={node.x} cy="305" r="18" fill="{selectedEntry?.letter === node.letter ? '#C1272D' : '#1f2937'}" stroke="{selectedEntry?.letter === node.letter ? '#C1272D' : '#374151'}" stroke-width="1.5" />
              <text x={node.x} y="311" text-anchor="middle" fill="white" font-size="14" font-weight="bold">{node.letter}</text>
            </g>
          {/each}

          <!-- Level 4: H,V,F,Ü,L,Ä,P,J,B,X,C,Y,Z,Q,Ö,CH -->
          {#each [
            { x: 38,   letter: 'H' },
            { x: 112,  letter: 'V' },
            { x: 188,  letter: 'F' },
            { x: 262,  letter: null, label: '··——' },
            { x: 338,  letter: 'L' },
            { x: 412,  letter: null, label: '·—·—' },
            { x: 488,  letter: 'P' },
            { x: 562,  letter: 'J' },
            { x: 638,  letter: 'B' },
            { x: 712,  letter: 'X' },
            { x: 788,  letter: 'C' },
            { x: 862,  letter: 'Y' },
            { x: 938,  letter: 'Z' },
            { x: 1012, letter: 'Q' },
            { x: 1088, letter: null, label: '———·' },
            { x: 1162, letter: null, label: '————' },
          ] as node}
            {#if node.letter}
              <g class="tree-node" on:click={() => { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }} role="button" tabindex="0" on:keydown={(ev) => { if (ev.key === 'Enter') { const e = MORSE_ALPHABET.find(a => a.letter === node.letter); if (e) animateAndPlay(e); }}}>
                <circle cx={node.x} cy="400" r="16" fill="{selectedEntry?.letter === node.letter ? '#C1272D' : '#1f2937'}" stroke="{selectedEntry?.letter === node.letter ? '#C1272D' : '#374151'}" stroke-width="1.5" />
                <text x={node.x} y="405" text-anchor="middle" fill="white" font-size="13" font-weight="bold">{node.letter}</text>
              </g>
            {:else}
              <circle cx={node.x} cy="400" r="16" fill="none" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,3" />
            {/if}
          {/each}

          <!-- Level labels on the right -->
          <text x="1195" y="121" text-anchor="end" fill="#9ca3af" font-size="10">Nivel 1</text>
          <text x="1195" y="216" text-anchor="end" fill="#9ca3af" font-size="10">Nivel 2</text>
          <text x="1195" y="311" text-anchor="end" fill="#9ca3af" font-size="10">Nivel 3</text>
          <text x="1195" y="405" text-anchor="end" fill="#9ca3af" font-size="10">Nivel 4</text>

          <!-- Morse code labels under level 4 nodes -->
          {#each [
            { x: 38,  code: '····' },
            { x: 112, code: '···—' },
            { x: 188, code: '··—·' },
            { x: 338, code: '·—··' },
            { x: 488, code: '·——·' },
            { x: 562, code: '·———' },
            { x: 638, code: '—···' },
            { x: 712, code: '—··—' },
            { x: 788, code: '—·—·' },
            { x: 862, code: '—·——' },
            { x: 938, code: '——··' },
            { x: 1012,code: '——·—' },
          ] as label}
            <text x={label.x} y="432" text-anchor="middle" fill="#6b7280" font-size="8" font-family="monospace">{label.code}</text>
          {/each}

          <!-- Legend inside SVG -->
          <rect x="20" y="460" width="12" height="12" rx="6" fill="#f59e0b" />
          <text x="38" y="471" fill="#6b7280" font-size="11">= · punto (izquierda)</text>
          <rect x="200" y="460" width="30" height="12" rx="6" fill="#3b82f6" />
          <text x="236" y="471" fill="#6b7280" font-size="11">= — raya (derecha)</text>
          <circle cx="440" cy="466" r="8" fill="none" stroke="#4b5563" stroke-width="1" stroke-dasharray="3,3" />
          <text x="454" y="471" fill="#6b7280" font-size="11">= no usado en espanol</text>
        </svg>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 mt-4 text-sm text-gray-600">
        <p>Para encontrar una letra, sigue el camino desde <strong>inicio</strong>: cada punto (·) baja a la izquierda y cada raya (—) baja a la derecha. Por ejemplo, para la <strong>R</strong> (·—·): izquierda, derecha, izquierda.</p>
        <p class="text-xs text-gray-500 mt-1">Los circulos punteados vacios representan combinaciones que no se usan en el alfabeto estandar.</p>
      </div>
    </div>

    <!-- Opposites -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">Parejas opuestas</h2>
      <p class="text-gray-700 mb-4">
        Muchas letras son el <strong>patron invertido</strong> de otra. Si aprendes una, ya sabes la otra!
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {#each OPPOSITES as pair}
          <button
            class="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition cursor-pointer"
            on:click={() => {
              const entry = MORSE_ALPHABET.find(e => e.letter === pair.a);
              if (entry) animateAndPlay(entry);
            }}
          >
            <div class="flex items-center gap-2">
              <span class="text-xl font-black text-[#C1272D]">{pair.a}</span>
              <div class="flex gap-0.5">
                {#each pair.codeA.split('') as s}
                  {#if s === '·'}
                    <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  {:else}
                    <div class="w-6 h-2.5 rounded-full bg-blue-500"></div>
                  {/if}
                {/each}
              </div>
            </div>
            <span class="text-gray-400 text-lg">=</span>
            <div class="flex items-center gap-2">
              <div class="flex gap-0.5">
                {#each pair.codeB.split('') as s}
                  {#if s === '·'}
                    <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                  {:else}
                    <div class="w-6 h-2.5 rounded-full bg-blue-500"></div>
                  {/if}
                {/each}
              </div>
              <span class="text-xl font-black text-[#C1272D]">{pair.b}</span>
            </div>
            <span class="text-xs text-gray-400 ml-auto hidden sm:block">{pair.desc}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Numbers pattern -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">El patron de los numeros</h2>
      <p class="text-gray-700 mb-4">
        Los numeros tienen la logica mas simple de todas: <strong>todos tienen exactamente 5 simbolos.</strong> Del 1 al 5 van sumando puntos. Del 6 al 0 es el espejo.
      </p>
      <div class="space-y-2">
        {#each MORSE_NUMBERS as num}
          <button
            class="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 transition cursor-pointer"
            on:click={() => animateAndPlay(num)}
          >
            <span class="text-lg font-black text-[#C1272D] w-6">{num.letter}</span>
            <div class="flex gap-1">
              {#each num.code.split('') as s}
                {#if s === '·'}
                  <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                {:else}
                  <div class="w-8 h-3 rounded-full bg-blue-500"></div>
                {/if}
              {/each}
            </div>
            <span class="text-xs text-gray-500 ml-auto">{num.tip}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Symmetry patterns -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 class="text-xl font-bold text-[#C1272D] mb-3">Patrones simetricos</h2>
      <p class="text-gray-700 mb-4">
        Algunas letras son <strong>palindromos</strong>: se leen igual de izquierda a derecha que al reves.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        {#each MORSE_ALPHABET.filter(e => e.group === 'Simétrica') as entry}
          <button
            class="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center hover:bg-purple-100 transition cursor-pointer"
            on:click={() => animateAndPlay(entry)}
          >
            <div class="text-2xl font-black text-[#C1272D]">{entry.letter}</div>
            <div class="flex gap-1 justify-center mt-1">
              {#each entry.code.split('') as s}
                {#if s === '·'}
                  <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                {:else}
                  <div class="w-6 h-2.5 rounded-full bg-blue-500"></div>
                {/if}
              {/each}
            </div>
            <div class="text-xs text-purple-600 mt-1 font-mono">{entry.code}</div>
          </button>
        {/each}
      </div>
    </div>

  </div>
{/if}

<!-- ═══ PRACTICE TAB ═══ -->
{#if activeTab === 'practica'}
  <div class="max-w-md mx-auto">
    <!-- Mode selector -->
    <div class="flex gap-3 mb-6 justify-center flex-wrap">
      <button
        class="px-4 py-2 rounded-lg font-semibold transition {practiceMode === 'ver' ? 'bg-[#C1272D] text-white' : 'bg-gray-100 text-gray-700'}"
        on:click={() => { practiceMode = 'ver'; startPractice(); }}
      >
        Ver letra - Escribir Morse
      </button>
      <button
        class="px-4 py-2 rounded-lg font-semibold transition {practiceMode === 'escuchar' ? 'bg-[#C1272D] text-white' : 'bg-gray-100 text-gray-700'}"
        on:click={() => { practiceMode = 'escuchar'; startPractice(); }}
      >
        Escuchar - Adivinar letra
      </button>
    </div>

    {#if !currentQuestion}
      <div class="text-center">
        <button class="bg-[#C1272D] text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-[#A11F25] transition shadow-lg" on:click={startPractice}>
          Comenzar practica
        </button>
      </div>
    {:else}
      <!-- Score -->
      <div class="text-center mb-4 text-sm text-gray-500">
        Puntaje: <span class="font-bold text-[#C1272D]">{practiceScore}</span> / {practiceTotal}
        {#if practiceTotal > 0}
          <span class="ml-2">({Math.round(practiceScore / practiceTotal * 100)}%)</span>
        {/if}
      </div>

      <!-- Question -->
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
        {#if practiceMode === 'ver'}
          <p class="text-sm text-gray-500 mb-2">Cual es el codigo Morse de esta letra?</p>
          <div class="text-7xl font-black text-[#C1272D] mb-4 animate-bounceIn">{currentQuestion.letter}</div>
          <p class="text-xs text-gray-400 mb-1">Mnemotecnia: <span class="font-semibold">{currentQuestion.mnemonic}</span></p>
          <p class="text-xs text-gray-400 mb-4">Usa <kbd class="bg-gray-100 px-1 rounded">.</kbd> para punto y <kbd class="bg-gray-100 px-1 rounded">-</kbd> para raya</p>
        {:else}
          <p class="text-sm text-gray-500 mb-2">Que letra escuchaste?</p>
          <button
            class="text-5xl mb-6 bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto hover:bg-gray-200 transition"
            on:click={() => currentQuestion && playMorseCode(currentQuestion.code)}
          >
            Escuchar
          </button>
          <p class="text-xs text-gray-400 mb-4">Haz clic para escuchar de nuevo</p>
        {/if}

        <form on:submit|preventDefault={checkPracticeAnswer} class="flex gap-2">
          <input
            type="text"
            bind:value={practiceInput}
            placeholder={practiceMode === 'ver' ? '.- o .-' : 'Letra'}
            class="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-center text-xl font-mono focus:outline-none focus:border-[#C1272D] transition"
            maxlength={practiceMode === 'ver' ? 10 : 2}
            autocomplete="off"
          />
          <button type="submit" class="bg-[#C1272D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#A11F25] transition">
            OK
          </button>
        </form>

        <!-- Result -->
        {#if practiceResult === 'correct'}
          <div class="mt-4 bg-green-50 text-green-700 p-3 rounded-lg font-semibold animate-fadeIn">
            Correcto!
          </div>
        {:else if practiceResult === 'wrong'}
          <div class="mt-4 bg-red-50 text-red-700 p-3 rounded-lg animate-fadeIn">
            <p class="font-semibold">Incorrecto</p>
            {#if showPracticeAnswer}
              <p class="mt-1 text-sm">
                La respuesta era: <span class="font-mono font-bold">{practiceMode === 'ver' ? currentQuestion.code : currentQuestion.letter}</span>
              </p>
              <p class="mt-1 text-sm">
                Mnemotecnia: <span class="font-semibold">{currentQuestion.mnemonic}</span>
              </p>
              {#if currentQuestion.opposite}
                <p class="mt-1 text-xs text-gray-500">Opuesta: {currentQuestion.opposite}</p>
              {/if}
            {/if}
          </div>
        {/if}

        {#if practiceResult !== null}
          <button
            class="mt-4 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            on:click={nextQuestion}
          >
            Siguiente
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<!-- ═══ TRANSLATOR TAB ═══ -->
{#if activeTab === 'traductor'}
  <div class="max-w-xl mx-auto">
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <label for="translator-input" class="block text-sm font-semibold text-gray-700 mb-1">Escribe tu mensaje:</label>
      <p class="text-xs text-gray-500 mb-2">Las letras se separan con <span class="font-mono font-bold">/</span> y las palabras con <span class="font-mono font-bold">//</span></p>
      <textarea
        id="translator-input"
        bind:value={translatorText}
        on:input={translateText}
        placeholder="Hola mundo..."
        class="w-full border-2 border-gray-200 rounded-lg p-4 text-lg focus:outline-none focus:border-[#C1272D] transition resize-none"
        rows="3"
      ></textarea>

      {#if translatorOutput}
        <div class="mt-4 bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-lg tracking-wider break-all animate-fadeIn">
          {translatorOutput}
        </div>

        <!-- Visual representation -->
        <div class="mt-4 flex flex-wrap gap-1 items-center justify-center">
          {#each translatorOutput.split(' ') as part}
            {#if part === '//'}
              <div class="w-8"></div>
            {:else if part === '/'}
              <div class="w-3"></div>
            {:else}
              {#each part.split('') as symbol}
                {#if symbol === '·'}
                  <div class="w-3 h-3 rounded-full bg-amber-500"></div>
                {:else if symbol === '—'}
                  <div class="w-8 h-3 rounded-full bg-blue-500"></div>
                {/if}
              {/each}
              <div class="w-1"></div>
            {/if}
          {/each}
        </div>

        <div class="mt-4 text-center">
          <button
            class="bg-[#C1272D] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#A11F25] transition shadow-md disabled:opacity-50"
            on:click={playTranslation}
            disabled={isPlayingTranslation}
          >
            {isPlayingTranslation ? 'Reproduciendo...' : 'Escuchar'}
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.95); }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-bounceIn {
    animation: bounceIn 0.5s ease-out;
  }
  .morse-card:active {
    transform: scale(0.97);
  }
  .tree-node {
    cursor: pointer;
  }
  .tree-node:hover circle {
    fill: #C1272D !important;
    transition: fill 0.2s;
  }
  kbd {
    font-size: 0.75rem;
    border: 1px solid #d1d5db;
    padding: 0.1rem 0.3rem;
  }
</style>
