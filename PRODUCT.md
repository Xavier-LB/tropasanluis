# Tropa San Luis: catálogo de campamentos

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dirigentes de la Tropa San Luis y otros grupos scout que preparan campamentos.
Necesitan consultar y aportar datos también desde un celular.

## Product Purpose

Reunir información dispersa en una ficha por lugar, conservar la procedencia y
permitir buscar, corregir y registrar experiencias sin volver a empezar una lista.

## Operating Context

El grupo suele buscar para 60 personas, y ocasionalmente para 300 o 400. Prioriza
agua potable, baños sencillos y sitios rústicos; electricidad no es requisito.
La web existente usa SvelteKit y Netlify; el catálogo vive en `/sitios`.

## Capabilities and Constraints

Filtros combinables de región, distancia desde Santiago, personas, hectáreas,
servicios y etiquetas. Ingreso por formulario o texto de publicación. Las fuentes
y sus fechas se conservan; desconocido no significa no. Aportes pendientes pasan
por revisión. El historial de asistencia no establece capacidad máxima.
No reservas, cobros, mensajes automáticos ni rastreo periódico en esta versión.
Se conserva la marca y el marco de navegación existentes.

## Open Decisions

Política detallada de cuentas de otros grupos y futuros moderadores. No se crean
credenciales de producción nuevas: mantenimiento mediante acceso Netlify existente.
Origen de distancia elegido para la primera versión: Plaza de Armas de Santiago,
siempre visible y distinguido de la ubicación real de salida de cada grupo.
