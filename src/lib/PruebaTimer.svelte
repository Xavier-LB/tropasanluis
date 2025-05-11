<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  /**
   * @param {string} fechaStr - Fecha en formato string (ej: 'Lunes 2 de junio hasta las 18:00')
   */
  export let fechaStr: string;
  export let label = '⏳ Tiempo restante:';

  let tiempo = '';
  let intervalo: number;
  let fechaLimite: Date | null = null;
  let tiempoFinalizado = false;

  function obtenerFechaLimite(fechaStr: string): Date | null {
    if (!fechaStr) return null;
    // Buscar fecha y hora en el string
    // Ejemplo: "Lunes 2 de junio hasta las 18:00"
    const match = fechaStr.match(/(\d{1,2}) de junio.*?(\d{1,2}:\d{2})/i);
    if (!match) return null;
    const dia = match[1].padStart(2, '0');
    const hora = match[2];
    // Asumimos año 2025 y zona horaria -04:00
    return new Date(`2025-06-${dia}T${hora}:00-04:00`);
  }

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
      tiempo = t ? t : '¡Tiempo finalizado!';
    }, 1000);
  });

  onDestroy(() => {
    if (intervalo) clearInterval(intervalo);
  });
</script>

{#if fechaLimite}
  <div class="timer-container">
    <div class="text-lg font-bold text-red-500 mb-2 animate-pulse">
      {label}
    </div>
    {#if !tiempoFinalizado}
      <div class="timer-display">
        {#each tiempo.split(' ') as unit}
          <div class="timer-unit">
            <div class="timer-value">{unit}</div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="timer-finalizado">
        <span class="animate-bounce">⏰</span>
        <span class="text-red-600 font-bold">¡Tiempo finalizado!</span>
        <span class="animate-bounce">⏰</span>
      </div>
    {/if}
  </div>
{/if}

<style>
  .timer-container {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
    border: 2px solid #fecaca;
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }

  .timer-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06);
  }

  .timer-display {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .timer-unit {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    min-width: 3.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .timer-unit:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .timer-value {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 1rem;
  }

  .timer-finalizado {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    background: #fee2e2;
    border-radius: 0.5rem;
    animation: pulse 2s infinite;
    flex-wrap: wrap;
    text-align: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 640px) {
    .timer-container {
      padding: 0.75rem;
    }

    .timer-unit {
      min-width: 3rem;
      padding: 0.35rem;
    }

    .timer-value {
      font-size: 0.875rem;
    }

    .timer-finalizado {
      font-size: 0.875rem;
      padding: 0.35rem;
    }
  }
</style> 