<script>
  import { onMount } from 'svelte';
  /**
   * @param {string} fechaStr - Fecha en formato string (ej: 'Lunes 2 de junio hasta las 18:00')
   */
  export let fechaStr;
  export let label = '⏳ Tiempo restante:';

  let tiempo = '';
  let intervalo;

  function obtenerFechaLimite(fechaStr) {
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

  function calcularTiempoRestante(fechaLimite) {
    const ahora = new Date();
    const diferencia = fechaLimite - ahora;
    if (diferencia <= 0) return null;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  let fechaLimite;

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
</script>

{#if fechaLimite}
  <div class="text-lg font-bold text-red-500">{label} <span>{tiempo}</span></div>
{/if} 