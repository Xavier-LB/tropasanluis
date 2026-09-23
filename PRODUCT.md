# Tropa San Luis: catálogo de campamentos

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dirigentes de la Tropa San Luis y otros grupos scout que preparan campamentos.
Necesitan consultar datos también desde un celular.

## Product Purpose

Reunir información dispersa en una ficha por lugar, conservar la procedencia y
permitir comparar sitios y consultar antecedentes para preparar campamentos.

## Operating Context

El grupo suele buscar para 60 personas, y ocasionalmente para 300 o 400. Prioriza
agua potable, baños sencillos y sitios rústicos; electricidad no es requisito.
La web existente usa SvelteKit y Netlify; el catálogo vive en `/sitios`.

## Capabilities and Constraints

Filtros combinables de región, distancia desde Santiago, personas, hectáreas,
servicios y etiquetas. Las fuentes y sus fechas se conservan; desconocido no
significa no. El historial de asistencia no establece capacidad máxima.
Por decisión de Xavier del 2026-09-23, la web es solo de consulta: sin formularios
para agregar sitios, corregir datos o registrar visitas. El ingreso de nuevos
datos se implementará más adelante.
No reservas, cobros, mensajes automáticos ni rastreo periódico en esta versión.
Se conserva la marca y el marco de navegación existentes. La consulta debe ser
compacta, tipo planilla, con filas comparables y filtros accesibles. Las fichas
conservan el detalle; en celular la tabla permite desplazamiento horizontal.

## Open Decisions

Futuro sistema de ingreso de sitios, cuentas y revisión. No se crean
credenciales de producción nuevas: mantenimiento mediante acceso Netlify existente.
Origen de distancia elegido para la primera versión: Plaza de Armas de Santiago,
siempre visible y distinguido de la ubicación real de salida de cada grupo.
