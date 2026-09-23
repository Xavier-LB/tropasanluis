---
name: "Tropa San Luis"
description: "Identidad existente de Tropa San Luis y patrones implementados del catálogo de campamentos."
colors:
  primary: "#C1272D"
  primary-dark: "#A11F25"
  page: "oklch(0.985 0.001 106.423)"
  surface: "#fff"
  ink: "#292524"
  muted: "#57534e"
  line: "#dedad5"
  field-border: "#a8a29e"
  placeholder: "#78716c"
  panel: "#f0eeeb"
  notice: "#f1efec"
  hover: "#f5f5f4"
  nav-selected: "#f4e4e4"
  nav-selected-ink: "#981e23"
  chip-selected: "#f5e4e5"
  chip-selected-ink: "#912027"
  chip-selected-border: "#e9c3c6"
  tag: "#f4f3f1"
  pending-ink: "#865321"
  error: "#fff0f0"
  error-ink: "#9a2025"
  error-border: "#e3b2b5"
  success: "#edf4ee"
  success-ink: "#285536"
  success-border: "#aecab5"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 750
    lineHeight: 1.3
  title:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
  body:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
  button:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.925rem"
    fontWeight: 650
  metadata:
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
rounded:
  tag: "5px"
  field: "7px"
  button: "8px"
  panel: "10px"
spacing:
  inline: "8px"
  compact: "12px"
  standard: "16px"
  panel: "18px"
  section: "24px"
  workspace: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "9px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "9px 16px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "9px 7px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "9px 11px"
  subnav-item:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.field}"
    padding: "8px 12px"
  subnav-item-current:
    backgroundColor: "{colors.nav-selected}"
    textColor: "{colors.nav-selected-ink}"
  chip-selected:
    backgroundColor: "{colors.chip-selected}"
    textColor: "{colors.chip-selected-ink}"
    rounded: "{rounded.button}"
    padding: "5px 9px"
  tag:
    backgroundColor: "{colors.tag}"
    textColor: "{colors.muted}"
    typography: "{typography.metadata}"
    rounded: "{rounded.tag}"
    padding: "3px 8px"
  contact-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "22px"
  notice:
    backgroundColor: "{colors.notice}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
---

# Design System: Tropa San Luis

## Overview

**Creative North Star: "La identidad existente de Tropa San Luis"**

La marca se sostiene en el escudo existente, el rojo Tropa y la familia Inter. El catálogo mantiene ese marco y presenta datos con texto oscuro, superficies claras, bordes discretos y acciones reconocibles. No establece una identidad visual nueva.

Este documento describe el marco compartido y los patrones implementados en `/sitios`. Los tamaños y componentes de catálogo se aplican dentro de esa sección; no constituyen una auditoría ni una normalización del resto de las páginas.

**Key Characteristics:**
- Rojo de marca para navegación, vínculos y acciones principales.
- Inter en títulos, texto y controles.
- Superficies claras, separación por líneas y esquinas suavemente redondeadas.
- Información legible y estados expresados también con texto.

Extracción basada en `src/app.css`, `src/routes/+layout.svelte`,
`src/lib/catalog/catalog.css` y las rutas de `/sitios`. Las capturas de
`.impeccable/review/` documentan el primer encuadre de escritorio, móvil, ficha,
formulario y filtros abiertos. Las zonas fuera de esas capturas se describen por
su código; no se consideran verificadas visualmente.

## Colors

La paleta combina el rojo de la marca con neutros cálidos y claros. Los valores
normativos están en el frontmatter; no se incorpora una paleta secundaria decorativa.

### Primary

- **Rojo Tropa** (`primary`): cabecera existente, vínculos, botón principal, foco y selección de controles.
- **Rojo Tropa oscuro** (`primary-dark`): pie del sitio y hover de la acción principal.
- **Rojos suaves de selección** (`nav-selected`, `chip-selected`): separan navegación activa y filtros seleccionados. Sus textos y bordes tienen tokens propios.

### Neutral

- **Fondo del sitio** (`page`): conserva el color Stone 50 de Tailwind en su formato OKLCH original.
- **Superficie blanca** (`surface`): campos, botones secundarios y panel de contacto.
- **Tinta y texto secundario** (`ink`, `muted`): distinguen contenido principal de contexto, rótulos y procedencia.
- **Líneas y bordes de campo** (`line`, `field-border`): separan filas y hacen visibles los controles.
- **Paneles y avisos** (`panel`, `notice`): fondo suave para filtros y explicaciones.
- **Etiquetas** (`tag`): datos breves que acompañan un lugar.

El texto pendiente usa `pending-ink`; los avisos de error y recepción usan las
familias `error` y `success`. El mensaje escrito lleva el significado del estado.
Las rampas del sidecar son muestras tonales derivadas para el panel de diseño;
no añaden colores aprobados a la implementación.

## Typography

**Display Font:** Inter, con la pila de respaldo indicada en el frontmatter.
**Body Font:** la misma familia. No se incorpora una segunda familia ni una mono.

La jerarquía procede del peso y el tamaño. El catálogo usa títulos compactos y
texto con interlineado amplio; no utiliza texto en mayúsculas como recurso general.

- **Display:** título de página del catálogo. Baja a (2rem) hasta (900px), y a (1.8rem) hasta (500px).
- **Headline:** secciones de la ficha y del formulario.
- **Title:** subtítulos. Los nombres enlazados de resultados tienen una variante de (1.22rem).
- **Body:** descripción y lectura general. Las introducciones miden hasta (65ch), las descripciones de resultados hasta (70ch) y los textos explicativos hasta (72ch).
- **Label / Button:** etiquetas y acciones, con pesos diferenciados.
- **Metadata:** rótulos breves de datos, etiquetas y procedencia. No reemplaza al tamaño de lectura general.

Los pesos intermedios del CSS, incluido (750) y (650), se documentan tal como están
implementados. La carga actual de Inter solicita pesos (400), (500), (600), (700)
y (800); no se asume una fuente variable adicional.

## Layout

El marco compartido usa un contenedor máximo de (80rem), márgenes automáticos,
laterales de (16px) que pasan a (32px) desde (1024px), y espacio vertical principal
de (32px). La cabecera fija conserva el escudo y el nombre; el contenido reserva
su altura. El menú de escritorio aparece desde (1024px); bajo ese ancho se usa
el menú móvil existente.

En el catálogo, la búsqueda ocupa todo el ancho. La zona de trabajo usa una
columna de filtros de (260px) y una columna de resultados flexible. Los resultados
son filas separadas por líneas. Las fichas de detalle usan contenido flexible y
una columna lateral de (290px), separadas por (38px). El formulario tiene un máximo
de (760px) y dos columnas con separación de (19px).

Hasta (900px), búsqueda y detalle pasan a una columna, con separación de (24px),
y los filtros se abren mediante un control desplegable. El contenido de filtros
usa dos columnas; hasta (500px) pasa a una. En ese último ancho los cuatro datos
resumidos de cada lugar pasan a dos columnas y el formulario queda en una columna.
La navegación local y las acciones pueden envolver en varias líneas.

Las filas de datos del detalle mantienen rótulo y valor: la columna de rótulo es
(160px), o (115px) hasta (500px). Los textos largos y enlaces de contacto pueden
partirse sin desbordar. La composición específica y su comportamiento se mantienen
en `.impeccable/surfaces/sitios.md`.

## Elevation & Depth

El catálogo es plano: no aplica sombras a resultados, filtros, controles ni paneles.
La profundidad se expresa con fondo, borde y separación. El marco existente sí
usa sombra bajo la cabecera, reforzada al desplazar la página. Esa excepción no
convierte las filas del catálogo en tarjetas elevadas. El sidecar conserva la
sombra y las transiciones del marco por separado de los componentes del catálogo.

Las transiciones de botones del catálogo duran (150ms) y afectan fondo y borde.
`prefers-reduced-motion` elimina transiciones dentro del catálogo. La cabecera
mantiene su comportamiento previo de ocultarse al bajar y aparecer al subir;
no se extiende esa animación al contenido.

## Shapes

Campos y navegación usan la curva pequeña `field`; botones usan `button` y
paneles `panel`. Las etiquetas compactas usan `tag`. Se conservan bordes finos de
(1px), sin contornos decorativos. Los resultados son filas abiertas, sin radio ni
fondo individual. El estado vacío usa un borde discontinuo y radio de (9px).

## Components

### Buttons

La acción principal tiene rojo de marca, texto blanco y hover oscuro. El botón
secundario tiene fondo blanco y borde visible. La variante discreta usa texto rojo
y fondo transparente. Todas conservan altura mínima de (44px), incluido
“Limpiar”, los preajustes de personas y los filtros seleccionados.

El foco visible es un contorno rojo de (2px), separado (3px). Durante el envío,
los botones deshabilitados tienen opacidad (0.6) y cursor de espera. No se define
una animación adicional de pulsación.

### Chips

Los filtros activos son botones con fondo rojo suave, borde y una cruz acompañada
por nombre accesible. Las etiquetas descriptivas son texto compacto sin acción,
con fondo neutro. No se debe confundir su tamaño visual con un área táctil.

### Cards / Containers

El panel de filtros agrupa campos con fondo neutro y borde. El panel de contacto
usa blanco y borde, con espaciado interno que baja a (18px) en móvil estrecho.
Los avisos informativos usan fondo neutro sin sombra; los estados de error y éxito
agregan borde y color semántico. Los resultados mantienen título, ubicación,
descripción, datos, etiquetas y procedencia en una fila de lectura vertical.

### Inputs / Fields

Campos blancos con borde visible, altura mínima de (44px), etiqueta encima y
ayuda debajo cuando corresponde. La búsqueda tiene altura mínima de (52px) y un
icono de lupa; el textarea parte de (130px) y permite ajustar su altura.
Los checkboxes miden (19px), dentro de etiquetas interactivas de al menos (44px)
de alto. Se conserva el mismo contorno de foco que los botones.

### Navigation

La navegación global mantiene la cabecera roja y los elementos del sitio.
La navegación local usa texto secundario, fondo rojo suave para la sección activa,
altura mínima de (44px), y una línea inferior. En la ficha, el vínculo de retorno
conserva los filtros transportados en la URL. Los títulos y “Ver ficha” llevan la
misma consulta de búsqueda al detalle.

### Data rows and status

Las parejas de rótulo y valor se alinean en columnas, con la procedencia en texto
secundario bajo el dato cuando está disponible. Los estados “Por confirmar” y
“Sin información” se escriben explícitamente. El aviso de recepción del formulario
solo aparece después de la respuesta real de guardado.

## Do's and Don'ts

### Do:
- Do conservar el escudo, el rojo y la tipografía del sitio existente.
- Do mantener rótulos visibles, foco de teclado y controles de catálogo de al menos 44 px de alto.
- Do usar textos explícitos para distinguir un dato informado, uno desconocido y un aporte pendiente.
- Do mantener la separación por líneas y los anchos de lectura del catálogo.

### Don't:
- Don't sustituir la identidad existente por otra paleta, tipografía o logotipo sin una decisión explícita.
- Don't agregar sombras o animaciones de entrada a los resultados del catálogo.
- Don't convertir etiquetas informativas pequeñas en controles sin ampliar su área interactiva.
- Don't ilustrar sitios del catálogo con fotografías inventadas.
