# Revisión: catálogo compacto

Solicitud: lista tipo Excel, técnica y práctica. La tabla sustituye las fichas
extensas del índice; las páginas de detalle conservan su contenido.

Validado en navegador a 1440 × 1000, 820 × 1000, 390 × 844 y 320 × 812.
Capturas de viewport: desktop.png y mobile.png. No hay desbordamiento del
cuerpo; la tabla se desplaza por dentro. Nombre y encabezados fijos, enlaces
con objetivo de 44 px, filtros visibles en escritorio y desplegables en móvil.
Se probó ordenar por personas, filtrar por 60/agua/baños, excluir pendientes,
abrir ficha y volver conservando el query. Consola sin errores.

31 pruebas de catálogo pasan, tipos de catálogo y build pasan. El chequeo global
sigue informando errores ajenos a este cambio: diez datos Morse sin `visual` y
una inferencia de `components` en el fixture Router. Cero avisos de accesibilidad.
El escaneo de diseño solo produjo recomendaciones de tamaños/colores; los nuevos
valores compactos están documentados en DESIGN.md. La región de tabla conserva
un tabindex intencional para permitir desplazamiento con teclado.
