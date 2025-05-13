<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  /**
   * @param {string} fechaStr - Fecha en formato string (ej: 'Lunes 2 de junio hasta las 18:00')
   */
  export let fechaStr: string;
  export let label = 'Tiempo:';
  export let customDate: string = ''; // Permite pasar una fecha específica en formato YYYY-MM-DDThh:mm:ss-TZ

  let tiempo = '';
  let intervalo: number;
  let fechaLimite: Date | null = null;
  let tiempoFinalizado = false;
  let segundosRestantes = 0;

  // Determina el color del temporizador basado en el tiempo restante
  let timerColor = 'normal';

  /**
   * Extrae la fecha límite de un string de texto
   */
  function obtenerFechaLimite(fechaStr: string): Date | null {
    if (customDate) {
      return new Date(customDate);
    }
    
    if (!fechaStr) return null;
    
    // Buscar fecha y hora en el string
    // Ejemplo: "Lunes 2 de junio hasta las 18:00"
    const match = fechaStr.match(/(\d{1,2}) de (junio|mayo).*?(\d{1,2}:\d{2})/i);
    if (!match) return null;
    
    const dia = match[1].padStart(2, '0');
    const mes = match[2].toLowerCase() === 'junio' ? '06' : '05';
    const hora = match[3];
    
    // Asumimos año 2025 y zona horaria -04:00
    return new Date(`2025-${mes}-${dia}T${hora}:00-04:00`);
  }

  /**
   * Calcula el tiempo restante hasta la fecha límite
   */
  function calcularTiempoRestante(fechaLimite: Date): string | null {
    const ahora = new Date();
    const diferencia = fechaLimite.getTime() - ahora.getTime();
    
    if (diferencia <= 0) {
      tiempoFinalizado = true;
      return null;
    }
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    
    // Calcular segundos totales para efectos visuales
    segundosRestantes = dias * 86400 + horas * 3600 + minutos * 60 + segundos;
    
    // Cambiar color basado en tiempo restante
    if (dias <= 1 && horas < 12) {
      timerColor = 'urgente';
    } else if (dias <= 3) {
      timerColor = 'cerca';
    } else {
      timerColor = 'normal';
    }
    
    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  onMount(() => {
    fechaLimite = obtenerFechaLimite(fechaStr);
    
    intervalo = setInterval(() => {
      if (!fechaLimite) {
        tiempo = '';
        return;
      }
      
      const t = calcularTiempoRestante(fechaLimite);
      tiempo = t ? t : '¡Finalizado!';
    }, 1000);
  });

  onDestroy(() => {
    if (intervalo) clearInterval(intervalo);
  });
</script>

{#if fechaLimite}
  <div class="timer-container {tiempoFinalizado ? 'finalizado' : timerColor}">
    <span class="timer-icon" aria-hidden="true">
      {#if tiempoFinalizado}
        🏁
      {:else}
        ⏱️
      {/if}
    </span>
    <span class="timer-label">{label}</span>
    {#if !tiempoFinalizado}
      <span class="timer-value">{tiempo}</span>
      <span class="pulse-dot"></span>
    {:else}
      <span class="timer-finalizado">¡Finalizado!</span>
    {/if}
  </div>
{/if}

<style>
  .timer-container {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #666;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 0.4rem 0.7rem;
    border-radius: 0.4rem;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
  }
  
  .timer-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Efecto de borde brillante */
  .timer-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    transform: skewX(-20deg);
    animation: shine 4s infinite;
  }
  
  @keyframes shine {
    0% { left: -150%; }
    70% { left: -150%; }
    100% { left: 100%; }
  }

  .timer-icon {
    margin-right: 0.1rem;
    font-size: 0.8rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-3px); }
    60% { transform: translateY(-2px); }
  }

  .timer-label {
    font-weight: 500;
  }

  .timer-value {
    font-family: 'Courier New', monospace;
    font-weight: 600;
    color: #b91c1c;
    transition: all 0.3s ease;
    animation: fadeInOut 0.5s ease;
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }

  .timer-finalizado {
    font-weight: 600;
    color: #b91c1c;
    animation: pulse 1.5s infinite;
  }
  
  .pulse-dot {
    width: 6px;
    height: 6px;
    background-color: #b91c1c;
    border-radius: 50%;
    margin-left: 4px;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.4; transform: scale(0.8); }
  }
  
  /* Colores basados en el tiempo restante */
  .normal {
    border-color: #e5e7eb;
    background-color: #f9fafb;
  }
  
  .cerca {
    border-color: #fcd34d;
    background-color: #fef9c3;
  }
  
  .urgente {
    border-color: #f87171;
    background-color: #fee2e2;
    animation: urgentPulse 2s infinite;
  }
  
  @keyframes urgentPulse {
    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.2); }
    70% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
  }
  
  .finalizado {
    border-color: #10b981;
    background-color: #d1fae5;
  }

  @media (max-width: 640px) {
    .timer-container {
      font-size: 0.75rem;
      padding: 0.3rem 0.5rem;
    }
  }
</style> 