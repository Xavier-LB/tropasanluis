# Catálogo de sitios

La sección `/sitios` usa una carga revisada en `src/lib/catalog/seed.json` y actualizaciones persistentes en Netlify Blobs. Se puede buscar sin iniciar sesión. Los aportes entran a una bandeja privada y nunca cambian directamente las fichas públicas.

## Fuentes iniciales

30 lugares, procedentes de 33 filas de las listas 2024 y avanzada. Quilches, Lafken y Chitakelindo conservan varias referencias en una sola ficha. Lafken mantiene el conflicto 20/25 ha sin asignar una superficie arbitraria. 75 registros del historial de verano, incluyendo una suspensión; la localidad de un campamento no acredita un predio exacto. Los originales y el volcado antiguo de Facebook se conservan fuera de este repositorio público.

Las fechas de revisión indican cuándo ordenamos el dato, no una inspección del lugar. Las distancias parten de Plaza de Armas de Santiago: 12 coordenadas de referencias originales y 9 rutas estimadas de automóvil con OSRM/OSM. Los casos sin ruta mantienen solo línea recta, explícitamente separada. Ninguna estimación certifica acceso de bus. Fuentes pendientes: listas más antiguas, Word y publicaciones de Facebook.

## Actualización para responsables

Requiere Node 22, Yarn y Netlify CLI, con la sesión **existente** de un administrador. No hay una clave adicional de administración ni un endpoint público de edición. Enlazar solo a `tropasanluis` (`f79a89e9-a3d3-45a4-8214-dae956ba6ee7`). Los comandos comprueban ese identificador. Ejecutar desde la raíz del repositorio:

```sh
netlify link --id f79a89e9-a3d3-45a4-8214-dae956ba6ee7
yarn catalogo bandeja /ruta/privada/aportes.json
yarn catalogo exportar /ruta/privada/catalogo.json
```

Revisar una fuente a la vez. Buscar duplicados por nombre, comuna, mapa y referencias. Un mismo contacto no basta para fusionar predios. Editar el catálogo exportado conservando su `version`; el validador rechaza referencias rotas, IDs repetidos, enlaces inseguros y campos ajenos al esquema. No copiar correos de aportantes, dirigentes, texto completo de grupos privados ni notas internas. Publicar contactos comerciales solo con fuente pública o autorización documentada. Guardar cada fuente y relacionarla con sus campos en `fieldSources`. Preservar discrepancias en `observations` y dejar el campo normalizado en `null` cuando no se resuelvan.

Para publicar una visita, verificar que `shareVisit` sea verdadero y que su estado/fecha reflejen lo que efectivamente ocurrió. La cifra de asistentes nunca reemplaza la capacidad del sitio. Las visitas privadas permanecen en la bandeja. Las publicaciones pegadas no se extraen automáticamente: se revisa su contenido antes de generar una ficha.

```sh
yarn catalogo publicar /ruta/privada/catalogo.json
yarn catalogo versiones
```

La publicación valida, conserva instantáneas de antes/después, comprueba que la versión exportada siga vigente, escribe y vuelve a leer para confirmar. La web consulta cambios al abrir la sección; caché de hasta 30 segundos. Usar **un responsable publicando a la vez**: el CLI no ofrece una transacción de comparación y escritura; las comprobaciones detectan cambios comunes, pero no sustituyen un bloqueo transaccional. Las instantáneas permiten recuperar todas las versiones guardadas.

Registrar la decisión en un JSON privado, con `id` del aporte, `status` (`publicado` o `descartado`) y `note`. Marcar `publicado` solo después de verificar la ficha resultante:

```sh
yarn catalogo revisar /ruta/privada/decision.json
```

Se conserva el aporte original y el estado anterior de cada revisión. Consultar también el panel privado Netlify Blobs. No abrir esta bandeja a visitantes.

## Respaldos y restauración

Exportar antes de editar. `versiones/<version>/antes` y `.../despues` contienen catálogo y visitas completos. Para restaurar, exportar primero la versión actual y pasar su identificador. La restauración publica una versión nueva y respalda el estado que reemplaza:

```sh
yarn catalogo restaurar versiones/IDENTIFICADOR/antes VERSION_ACTUAL
```

Un redeploy conserva las actualizaciones de Blobs. Si no hay catálogo persistente, la función sirve la carga inicial de Git. Si falla el servicio, la web muestra la carga incluida y avisa; el formulario conserva su borrador y no anuncia recepción hasta que el servidor la confirme. El borrador local caduca a los siete días.

## Almacenamiento y pruebas

Producción: `sitios-catalogo-v1` (datos públicos y versiones), `sitios-aportes-v1` (datos privados). Previews usan nombres separados. No incluir exportaciones ni aportes en `static/` o en Git público. Las entradas públicas se validan con Zod y se renderizan como texto; no se interpreta HTML recibido.

```sh
yarn test:catalogo
yarn check:catalogo
yarn build
netlify dev --offline --no-open --command 'yarn dev --host 127.0.0.1 --port 4175' --target-port 4175 --port 8888
```

Netlify publica automáticamente desde `main`. El código no crea cuentas, credenciales, mensajes externos ni tareas recurrentes.
