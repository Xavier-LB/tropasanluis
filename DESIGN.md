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

El rojo Tropa (`primary`) conserva la marca en cabecera, acciones, vínculos y foco.
Su variante oscura (`primary-dark`) corresponde al pie existente y al hover del
botón principal. Navegación y filtros seleccionados usan rojos suaves con texto
oscuro. No se incorpora una paleta secundaria decorativa.

Los neutros cálidos separan fondo (`page`, Stone 50 en su OKLCH original), campos
blancos (`surface`), texto (`ink`, `muted`), líneas y paneles. Los estados usan las
familias `error` y `success`, siempre acompañadas de texto. `pending-ink` señala
datos pendientes. Los valores normativos están en el frontmatter. Las rampas del
sidecar son muestras derivadas para el panel, no colores adicionales implementados.

## Typography

**Display Font:** Inter, con la pila de respaldo del frontmatter.
**Body Font:** la misma familia; no se añade otra familia ni una mono.

La jerarquía usa tamaño y peso: `display` para títulos de página, `headline` para
secciones, `title` para subtítulos, `body` para lectura, `label` para campos y
`metadata` para datos breves. Los títulos principales bajan a (2rem) hasta (900px)
y a (1.8rem) hasta (500px). Los nombres enlazados de resultados usan (1.22rem).
Las introducciones miden hasta (65ch), las descripciones de resultados hasta
(70ch) y la lectura explicativa hasta (72ch).

Los pesos (750) y (650) se registran tal como están en CSS; la carga actual de
Inter solicita (400), (500), (600), (700) y (800), sin asumir otra fuente variable.

## Layout

El marco compartido tiene máximo de (80rem), márgenes automáticos y laterales de
(16px), ampliados a (32px) desde (1024px). La cabecera fija conserva su espacio
reservado. La navegación global pasa a escritorio desde (1024px).

El catálogo presenta búsqueda a todo el ancho, filtros de (260px) y resultados
flexibles, separados por el espacio `workspace`. El detalle combina contenido
flexible y lateral de (290px), con separación de (38px). El formulario tiene un
máximo de (760px) y dos columnas separadas por (19px).

Hasta (900px), catálogo y detalle usan una columna; los filtros se despliegan y
sus campos ocupan dos columnas. Hasta (500px), filtros y formulario pasan a una
columna, y los cuatro datos resumidos pasan a dos. Navegación local y acciones
pueden envolver. Las filas de detalle reservan (160px) al rótulo, o (115px) hasta
(500px). Los contactos y enlaces largos pueden partirse sin desbordar.

La composición específica se conserva en `.impeccable/surfaces/sitios.md`.

## Elevation & Depth

El catálogo es plano: usa fondos, bordes y separación, sin sombras en sus
resultados, campos o paneles. El marco existente sí proyecta una sombra bajo la
cabecera, reforzada al desplazar la página; el sidecar conserva esa excepción.

Los botones del catálogo transicionan fondo y borde en (150ms).
`prefers-reduced-motion` elimina sus transiciones. La cabecera mantiene su
comportamiento previo de ocultarse al bajar y aparecer al subir; no se aplica
esa animación al contenido.

## Shapes

Campos y navegación usan `field`; botones, `button`; paneles, `panel`; y etiquetas
compactas, `tag`. Los bordes son de (1px). Los resultados son filas abiertas, sin
fondo individual ni radio. El estado vacío usa borde discontinuo y radio de (9px).

## Components

### Buttons

La acción principal usa rojo y texto blanco, la secundaria blanco y borde, y la
discreta texto rojo. La altura mínima es (44px), incluidos “Limpiar”, los
preajustes y los filtros seleccionados. El foco tiene contorno rojo de (2px) y
separación de (3px). Los botones deshabilitados usan opacidad (0.6).

### Chips

Los filtros activos son botones de rojo suave con cruz y nombre accesible.
Las etiquetas descriptivas son texto neutro compacto sin acción.

### Cards / Containers

Filtros: panel neutro con borde. Contactos: blanco con borde y espaciado interno
que baja a (18px) en móvil estrecho. Avisos: fondo neutro sin sombra, con variantes
semánticas de error y recepción. Resultados: filas con título, ubicación,
descripción, datos, etiquetas y procedencia.

### Inputs / Fields

Campos blancos con etiqueta persistente, borde y altura mínima de (44px).
La búsqueda mide al menos (52px), con lupa. El textarea parte de (130px) y permite
ajustar su altura. Los checkboxes de (19px) viven en etiquetas interactivas de
al menos (44px) de alto. Todos comparten el foco visible de los botones.

### Navigation

Se conserva la cabecera roja global. La navegación local usa texto secundario,
selección roja suave, altura mínima de (44px) y línea inferior. Los enlaces a
fichas transportan los filtros en la URL; “Volver al catálogo” los conserva.

### Data rows and status

Rótulo y valor se alinean en columnas, con procedencia secundaria cuando existe.
“Por confirmar” y “Sin información” se escriben explícitamente. El formulario
solo confirma recepción después de una respuesta real de guardado.

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
