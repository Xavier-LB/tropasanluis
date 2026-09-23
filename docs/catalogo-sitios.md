# Catálogo de sitios

La sección `/sitios` usa una carga revisada en `src/lib/catalog/seed.json` y actualizaciones persistentes en Netlify Blobs. Se puede buscar sin iniciar sesión. Por decisión de Xavier del 2026-09-23, la sección es solo de consulta. Se retiraron el formulario y las acciones de agregar, corregir y registrar visitas. El ingreso de datos se implementará más adelante.

## Investigación pública del 23 de septiembre de 2026

La carga actual contiene **74 sitios y 84 antecedentes**. Se añadieron 37 sitios:
17 de la [guía de camping de Sernatur RM](https://disfrutasantiago.cl/wp-content/uploads/2025/01/Campings-RM_v12.pdf),
18 del [directorio de Panguipulli](https://sietelagos.cl/wp-content/uploads/2024/01/CAMPING-Y-PICNIC-2024.pdf),
El Refugio de Tuniche y Playa Cau Cau. Se enriquecieron siete fichas existentes.
Hay 49 lugares con teléfono o correo respaldado públicamente, 15 con enlaces
a fotos, 33 con mapa y 26 con ruta estimada desde Plaza de Armas.

El índice muestra **todos los resultados**, sin límite inicial de veinte filas.
Usa el ancho disponible, encabezado y nombre fijos, desplazamiento en celular,
contactos y enlaces directos. `Excel / CSV` descarga los resultados filtrados y
ordenados con todos sus campos, notas, fuentes y fechas. Usa UTF-8 con BOM,
punto y coma y protección de celdas que podrían interpretarse como fórmulas.

La fecha efectiva del listado de Panguipulli es **12-2023**, impresa en su pie,
aunque el archivo esté en una carpeta 2024. Sus aforos son antecedentes, no
disponibilidad confirmada en 2026. Para rangos se usa el extremo inferior en
el filtro y se conserva el rango completo en la nota. Arena y Sol y Refugio
del Guerrero mantienen capacidad nula por discrepancias entre el PDF y las
fichas web municipales. Somolafquén informa agua **no potable**.

Las 17 nuevas rutas usan exclusivamente mapas enlazados por la guía pública
Sernatur y OSRM/OpenStreetMap. No acreditan acceso de bus ni estado del camino.
No se normalizan como hectáreas de camping las 11 ha de laguna de Esmeralda,
ni como capacidad de carpas los visitantes diarios de Picarquín, las parcelas
de Lafken o las camas de Los Tamarugos. Los 84 antecedentes históricos se
mantienen exactamente iguales. Las fuentes privadas y la lista de candidatos
sin identificar permanecen fuera de este repositorio.

## Fuentes iniciales

30 lugares, procedentes de 33 filas de las listas 2024 y avanzada. Quilches, Lafken y Chitakelindo conservan varias referencias en una sola ficha. Lafken mantiene el conflicto 20/25 ha sin asignar una superficie arbitraria. 75 registros del historial de verano, incluyendo una suspensión; la localidad de un campamento no acredita un predio exacto. Los originales y el volcado antiguo de Facebook se conservan fuera de este repositorio público.

Las fechas de revisión indican cuándo ordenamos el dato, no una inspección del lugar. Las distancias parten de Plaza de Armas de Santiago: 14 coordenadas de referencias originales y 9 rutas estimadas de automóvil con OSRM/OSM. Los casos sin ruta mantienen solo línea recta, explícitamente separada. Ninguna estimación certifica acceso de bus. Fuentes pendientes: listas más antiguas, Word y publicaciones de Facebook.

### Presentaciones incorporadas el 23 de septiembre de 2026

El catálogo contiene ahora **37 sitios y 84 antecedentes de campamentos**. Se agregaron Callejones, Mallinco, Los Quillayes de Tomé, Las Nalcas de Rupanco, El Trauco, El Molino de Puerto Octay y Club de Pesca y Caza de Centinela. Se enriquecieron Ketrawe, COSVAC El Tabito, Picarquín y Airsoft Ranger Camp sin crear fichas duplicadas.

Las presentaciones aportan nueve planes con realización **por confirmar**. El verano 2024 de Los Quillayes se asoció al historial existente; no se duplicó ni se inventaron asistentes. Se conservan 74 campamentos realizados y una suspensión del historial original. La tarifa para grupos de más de 60 personas no acredita capacidad máxima. Las áreas de croquis sin confirmar no se incorporan como superficies medidas.

Cada dato conserva su documento y página o diapositiva de procedencia. Los contactos comerciales nuevos se contrastaron con páginas públicas; las tarjetas personales, conversaciones y originales con datos de participantes permanecen fuera de este repositorio.

## Actualización para responsables

Requiere Node 22, Yarn y Netlify CLI, con la sesión **existente** de un administrador. No hay una clave adicional de administración ni un endpoint público de edición. Enlazar solo a `tropasanluis` (`f79a89e9-a3d3-45a4-8214-dae956ba6ee7`). Los comandos comprueban ese identificador. Ejecutar desde la raíz del repositorio:

```sh
netlify link --id f79a89e9-a3d3-45a4-8214-dae956ba6ee7
yarn catalogo exportar /ruta/privada/catalogo.json
```

Revisar una fuente a la vez. Buscar duplicados por nombre, comuna, mapa y referencias. Un mismo contacto no basta para fusionar predios. Editar el catálogo exportado conservando su `version`; el validador rechaza referencias rotas, IDs repetidos, enlaces inseguros y campos ajenos al esquema. No copiar correos de aportantes, dirigentes, texto completo de grupos privados ni notas internas. Publicar contactos comerciales solo con fuente pública o autorización documentada. Guardar cada fuente y relacionarla con sus campos en `fieldSources`. Preservar discrepancias en `observations` y dejar el campo normalizado en `null` cuando no se resuelvan.

Las visitas publicadas deben tener autorización para compartir y reflejar lo que efectivamente ocurrió. La cifra de asistentes nunca reemplaza la capacidad del sitio.

```sh
yarn catalogo publicar /ruta/privada/catalogo.json
yarn catalogo versiones
```

La publicación valida, conserva instantáneas de antes/después, comprueba que la versión exportada siga vigente, escribe y vuelve a leer para confirmar. La web consulta cambios al abrir la sección; caché de hasta 30 segundos. Usar **un responsable publicando a la vez**: el CLI no ofrece una transacción de comparación y escritura; las comprobaciones detectan cambios comunes, pero no sustituyen un bloqueo transaccional. Las instantáneas permiten recuperar todas las versiones guardadas.

### Archivo de aportes anteriores

La función pública acepta únicamente `GET`; los nuevos envíos reciben `405`.
La antigua ruta `/sitios/aportar` redirige a `/sitios`. No hay formulario ni
almacenamiento de nuevos borradores en el navegador.

No se eliminaron los datos existentes en Netlify Blobs. Las herramientas internas
`bandeja` y `revisar` se conservan solo para recuperar o gestionar registros
anteriores con la cuenta administradora. No son un sistema público de ingreso:

```sh
yarn catalogo bandeja /ruta/privada/aportes-anteriores.json
yarn catalogo revisar /ruta/privada/decision.json
```

## Respaldos y restauración

Exportar antes de editar. `versiones/<version>/antes` y `.../despues` contienen catálogo y visitas completos. Para restaurar, exportar primero la versión actual y pasar su identificador. La restauración publica una versión nueva y respalda el estado que reemplaza:

```sh
yarn catalogo restaurar versiones/IDENTIFICADOR/antes VERSION_ACTUAL
```

Un redeploy conserva las actualizaciones de Blobs. Si no hay catálogo persistente, la función sirve la carga inicial de Git. Si falla el servicio, el catálogo muestra la carga incluida y avisa.

## Almacenamiento y pruebas

Producción: `sitios-catalogo-v1` (datos públicos y versiones), `sitios-aportes-v1` (archivo privado de aportes anteriores, sin nuevos envíos). Previews usan nombres separados. No incluir exportaciones ni aportes en `static/` o en Git público. Los datos del catálogo se validan con Zod y se renderizan como texto; no se interpreta HTML recibido.

```sh
yarn test:catalogo
yarn check:catalogo
yarn build
netlify dev --offline --no-open --command 'yarn dev --host 127.0.0.1 --port 4175' --target-port 4175 --port 8888
```

Netlify publica automáticamente desde `main`. El código no crea cuentas, credenciales, mensajes externos ni tareas recurrentes.
