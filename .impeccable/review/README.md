# Revisión del catálogo, 2026-09-22

Capturas válidas del viewport inicial: `desktop.png` (1440×1000), `mobile.png`, `detail-mobile.png`, `form-mobile.png` y `mobile-filters.png` (390×844). Las capturas de página completa produjeron duplicaciones y espacios vacíos por un fallo de captura; se descartaron. Estos archivos no acreditan una inspección visual de toda la página.

Extensión de la identidad existente Tropa San Luis. Sin comp aprobada, assets generados ni cambio de marca. El detector estático de los archivos nuevos se ejecutó una vez y no encontró incidencias (`detector.json`).

El revisor independiente pidió dos ajustes: conservar filtros al abrir una ficha y volver explícitamente al catálogo; y ampliar el botón Limpiar a 44 px. Ambos resueltos en una pasada. Veredicto final: **ship**, limitado a esos dos ajustes y sus recapturas. El revisor no usó navegador; el resto de contenido fuera del viewport se examinó en código.

Pruebas de navegador del constructor: filtros de 60 personas/agua/baños y datos desconocidos excluidos, región desde celular, discrepancia 20/25 ha de Lafken, corrección con sitio preseleccionado, borrador recuperado, aporte recibido y almacenamiento local privado. Ida/vuelta desde Puquio conserva query completo y resultado. Botón Limpiar medido a 44 px en escritorio y celular. No se observó desbordamiento horizontal. 30 pruebas automatizadas del catálogo y su TypeScript pasan; build de producción pasa. Los diez errores previos de Morse siguen fuera del alcance.
