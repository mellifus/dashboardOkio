# Handoff: Okio — Inicio + Agenda

## Overview
Okio es una plataforma de gestión para clínicas estéticas. Este paquete incluye **dos pantallas**:
- **Inicio**: resumen del día (turnos, pendientes, conversaciones, follow-ups).
- **Agenda**: vista **Día** (resumen + lista de turnos) y vista **Semana** (calendario con drag & drop), un drawer de detalle de turno y un toast con "Deshacer".

Idioma de la UI: español rioplatense (voseo: "Arrastrá", "Tocalo", "Confirmá").

## Alcance — checklist obligatorio
Implementá **todo** lo siguiente. No es opcional:
- [ ] Shell: Sidebar + TopBar
- [ ] **Inicio** (sección 1)
- [ ] **Agenda › Vista Día**: hero de resumen, "Requiere atención" y lista de turnos V1 (2a)
- [ ] **Agenda › Vista Semana**: calendario Lun–Sáb, 08–20 h, bloques con lanes, línea "ahora", **drag & drop con snap de 15 min** y click en un espacio libre para crear un turno (2b)
- [ ] **Toggle Día / Semana** dentro de Agenda, sincronizado con `?view=day|week`. **Es parte del producto**, aunque en el prototipo esté en la barra de revisión.
- [ ] Drawer de detalle de turno (2c)
- [ ] Toast "Deshacer" (2d)
- [ ] Formulario **Nuevo turno** (2e), **completamente funcional**. Todos los botones "+ Nuevo turno" (Inicio, Agenda Día, Agenda Semana) y el click en un espacio libre de la Semana tienen que abrir este panel. **Prohibido** dejar stubs, `alert()` o mensajes tipo "No disponible en la demo". Al guardar, el turno se agrega al store y aparece en Agenda.

## About the Design Files
Los archivos en `reference/` son **referencias de diseño hechas en HTML/React**. Son prototipos que muestran el aspecto y el comportamiento esperados. **No son código de producción para copiar tal cual.** La tarea es recrearlos en el entorno del codebase destino con sus patrones. Si todavía no hay codebase, usá el stack recomendado más abajo.

Para ver el prototipo: serví `reference/` con un servidor estático (`npx serve reference`) y abrí `index.html`. En la barra lateral elegí "Inicio" o "Agenda". En la barra superior de Agenda, el toggle **"Día / Semana" SÍ es del producto**: implementalo. Los demás selectores de esa barra ("Lista: V1 · V2 · V3", "Escritorio / 375 px") y los selectores de versión de Inicio son **herramientas de revisión** y no van al producto. Para ver la vista Semana en el prototipo, tocá "Semana" en esa barra.

## Stack recomendado (si no hay uno existente)
- **Next.js 14+ (App Router) + TypeScript**
- **Tailwind CSS**, con los tokens de abajo en `tailwind.config.ts` (`colors.okio.*`, `fontFamily.serif/sans`)
- **next/font** para Fraunces + Inter
- **@dnd-kit/core** para el drag & drop de la vista Semana. El prototipo usa HTML5 DnD nativo, que no funciona en touch. dnd-kit soporta puntero y touch.
- Estado: React state + un store liviano (**Zustand**) para `appointments`, compartido entre Inicio y Agenda. Datos: dejar listo para **TanStack Query** cuando haya API.

Estructura sugerida:
```
app/(app)/layout.tsx          Sidebar + TopBar
app/(app)/inicio/page.tsx
app/(app)/agenda/page.tsx     ?view=day|week
components/agenda/DayOverview.tsx, DayList.tsx, WeekView.tsx, ApptDrawer.tsx, UndoToast.tsx
components/inicio/HomeEditorial.tsx
components/ui/Button.tsx, Pill.tsx, LinkButton.tsx, SectionHeader.tsx
lib/appointments.ts           tipos, status, toMin/fmtMin, layoutDay
store/appointments.ts
```

## Fidelity
**High-fidelity.** Colores, tipografía, espaciados e interacciones son finales. Recrealos con precisión de píxel.

---

## Design Tokens

### Colores
| Token | Hex | Uso |
|---|---|---|
| green | `#003F36` | Marca, sidebar, botón primario, títulos serif, línea "ahora" |
| cream | `#F5F1EC` | Fondo de página, texto sobre verde |
| taupe | `#DED1CB` | Bordes y divisores |
| gold | `#B99269` | Acento de atención (puntos, borde de bloques urgentes) |
| goldInk | `#7A5A33` | Texto de advertencia/pendiente |
| ink | `#1D2B28` | Texto principal |
| muted | `#5B6763` | Texto secundario |
| white | `#FFFFFF` | Tarjetas |
| Fondo de fila destacada | `#FBF8F4` / `#F8F5F1` | Turno "próximo", "en curso", columna de hoy |
| Fondo de banner de atención | `#F4ECE2` | |
| Línea de hora (semana) | `#EEE6E1` | |
| Overlay del drawer | `rgba(29,43,40,0.32)` | |

**Pills de estado (fg / bg):**
- Atendido/Atendida: `#5B6763` / `#ECE7E2`
- Confirmado: `#003F36` / `#E3ECE9`
- Sin confirmar / Recordatorio enviado / Pide reprogramar: `#7A5A33` / `#F3EADF`
- En curso: `#F5F1EC` / `#003F36`

**Bloques en la vista Semana:**
- Confirmado: bg `#E3ECE9`, borde `1px solid #C9DAD5`
- Sin confirmar: bg `#FFF`, borde `1px dashed #B99269`, punto dorado de 6px
- Pasado/atendido: bg `#F1ECE8`, borde `1px solid #E6DED9`, texto muted

### Tipografía
- Serif: `'Fraunces', Georgia, serif`, pesos 400/500. Para títulos, horarios y números.
- Sans: `'Inter', system-ui, sans-serif`, pesos 400/500/600/700. Para la UI.
- Números siempre con `font-variant-numeric: tabular-nums`.
- Textos de párrafo con `text-wrap: pretty`.
- Overlines: 11.5–12px, 600, `letter-spacing: 0.06–0.08em`, uppercase, color muted (o gold sobre verde).

### Radios / sombras
- Botón 10px · Pill 999px · Bloque de semana 8px · Tarjeta 16px · Tarjeta destacada 18px · Toast 12px · Bottom-sheet mobile `20px 20px 0 0`.
- Sombra de tarjeta: `0 1px 2px rgba(0,63,54,0.05), 0 6px 20px rgba(0,63,54,0.05)`
- Tarjeta grande: `0 1px 2px rgba(0,63,54,0.05), 0 10px 30px rgba(0,63,54,0.06)`
- Drawer: `0 10px 40px rgba(0,63,54,0.18)` · Toast: `0 8px 24px rgba(0,63,54,0.25)`

### Botón (`OkBtn`)
Inter 13.5px/600, padding `10px 16px`, min-height 40px, radio 10, `white-space: nowrap`. En mobile, `full` = ancho 100%.
- primary: bg green, texto cream, borde green
- secondary: bg white, texto green, borde `1px solid taupe`
- ghost: transparente, texto muted

**LinkBtn**: 12.5px/600, color green, sin fondo, padding `6px 0`, texto con "→".

---

## Shell (compartido)
- **Sidebar**: ancho 210, bg green, padding `20px 12px`. Logo "Okio" en Fraunces 22/500, cream. Items: padding `9px 10px`, radio 8, 13.5px. Activo: bg `rgba(245,241,236,0.10)`, texto cream 600, punto de 5px gold. Inactivo: texto `rgba(245,241,236,0.72)`, punto `rgba(245,241,236,0.3)`. "Conversaciones" lleva un badge con contador.
- **TopBar**: bg cream, borde inferior taupe, padding `13px 26px`. Título 14.5/600. A la derecha: buscador ("Buscar clientes, turnos…", 280px) y avatar de 30px (green, iniciales "MR").
- El contenido scrollea dentro de `flex:1; overflow:auto`.

---

## Pantalla 1 — Inicio (`HomeEditorial` en App.jsx)
**Propósito:** que recepción vea de un vistazo los turnos de hoy y resuelva los pendientes.

**Layout:** bg cream, padding `44px 48px 56px` (mobile `28px 18px 36px`). Contenedor `max-width: 1120`, centrado, columna con gap 40 (mobile 28).

1. **Header**, en fila con alineación inferior (en mobile, en columna):
   - "Hoy": Fraunces 400, 112px (mobile 72), line-height 0.92, tracking -0.035em, green.
   - "jueves 17 de septiembre": Fraunces itálica 32px (mobile 24), green, margin-top 14.
   - Bajada: "Tus turnos y conversaciones, en un solo lugar." 16.5px muted, max-width 480.
   - Botón primary "+ Nuevo turno" a la derecha.
2. **Métricas**: grid de 3 columnas con bordes superior e inferior taupe y divisores verticales. Número en Fraunces 44px (mobile 34); etiqueta 13.5px muted. Métricas: "Turnos de hoy", "Pendientes" (sin confirmar + pide reprogramar + follow-ups vencidos), "Conversaciones nuevas".
3. **Dos columnas** `1.45fr / 1fr`, gap 40. Pasan a una columna por debajo de 960px de ancho del contenedor.
   - **Turnos** (sin tarjeta, editorial): título "Turnos" en Fraunces 24 + "N hoy" + LinkBtn "Ver agenda →" (va a Agenda), con borde inferior `1px solid green`. Filas en grid `64px | 1fr | auto` (mobile `52px | 1fr`, con el estado debajo), padding `14px 0`, borde inferior taupe.
     - Hora en Fraunces 20 green (muted si ya pasó).
     - "**Cliente** — Tratamiento" 15px. Debajo, "con {pro}" 12.5 muted.
     - Estado a la derecha, 12.5px. Si está sin confirmar o pide reprogramar: punto gold de 6px + texto ink 600. Si está en curso: green 600. El siguiente turno después de ahora muestra "Sigue".
   - **Para resolver ahora** (tarjeta blanca, radio 18): header con punto gold + Fraunces 22.
     - Subsección "CONVERSACIONES" + LinkBtn "Ver todas →". Cada item: pill de canal (bg `#ECE6DF`, texto green, radio 6), nombre 14.5/600, tiempo de espera a la derecha, mensaje entre comillas “…” 14px, botón secondary "Responder". Al tocarlo, el item se quita. Estado vacío: "No hay mensajes sin responder."
     - Subsección "FOLLOW-UPS": nombre, "motivo · cuándo" (ink 600 si está vencido), botón "Contactar" (primary si está vencido, si no secondary). Al tocarlo, el item se quita. Estado vacío: "Nadie para contactar por ahora."
     - Pie: LinkBtn "Ver seguimientos →".

---

## Pantalla 2 — Agenda
Toggle **Día / Semana** — **obligatorio**. Va en el header de la pantalla Agenda, alineado a la derecha del título (segmented: 12px/600, padding `6px 11px`, radio 8; activo con bg green y texto cream; inactivo con borde taupe y texto muted). Debe sincronizarse con la URL (`?view=`).

### 2a. Vista Día (`AgendaOverview` + `DayListV1`)
bg cream, padding `28px 32px 36px` (mobile `20px 16px 28px`), max-width 1080, gap 18.
1. **Hero** (bg green, radio 18, padding `26px 28px`):
   - Overline "RESUMEN DEL DÍA" en gold.
   - Título "Hoy, martes 30 de julio" en Fraunces 36/500 (mobile 28), cream.
   - Botón secondary "+ Nuevo turno".
   - Grid de stats, 4 columnas (mobile 2), celdas separadas por un gap de 1px sobre `rgba(245,241,236,0.16)`, radio 12:
     - "Turnos hoy" (sub: "N profesionales")
     - "Confirmados" ("de N")
     - "Requieren atención" (el número va en gold si es > 0)
     - "Próximo turno · en X min" (hora + cliente)
   - Números en Fraunces 30.
2. **Requiere atención** (solo si hay issues sin resolver): tarjeta blanca, borde `1px solid gold`, radio 16. Header con bg `#F4ECE2`, punto gold, Fraunces 18 y "N acciones antes del turno" en goldInk. Cada fila tiene "**Cliente** · hora · tratamiento", el texto del issue y un botón primary con el CTA del issue ("Enviar recordatorio" / "Enviar consentimiento"). Al resolverla, la fila desaparece. Si `kind === "confirm"`, el turno pasa a `reminded: true` (estado "Recordatorio enviado").
3. **Turnos del día** (tarjeta blanca, borde taupe, radio 16): header "Turnos del día" en Fraunces 18 + "Orden cronológico". Filas en grid `72px | 1fr | auto`, padding `14px 20px`:
   - Hora en Fraunces 20 + duración 11.5 muted.
   - Nombre 15/600. Si es el próximo, etiqueta "PRÓXIMO" green 700. Si tiene un issue, punto gold.
   - Tratamiento + "· con {pro}".
   - Pill de estado.
   - El próximo turno tiene bg `#FBF8F4` + `box-shadow: inset 3px 0 0 #003F36`.
   - Los atendidos van con `opacity: .62`.
   - Al hacer click se abre el Drawer.
   > `DayListV2` (compacta) y `DayListV3` (editorial) son alternativas que no se eligieron. **Implementá V1.**

### 2b. Vista Semana (`WeekView`)
- Header: "Semana del 29 de julio" en Fraunces 32. Bajada: "N turnos · Arrastrá un turno para moverlo · Tocalo para ver el detalle". Botón primary "+ Nuevo turno".
- Tarjeta blanca con `overflow-x: auto`. Ancho mínimo interno 860 (mobile 760).
- Grid `52px + 6 × 1fr` (Lun a Sáb). Header de días sticky: etiqueta 13.5/600 + contador a la derecha. La columna de hoy tiene bg `#F8F5F1` y la etiqueta "HOY".
- Rango horario 08:00–20:00, **1.2 px por minuto**. Las etiquetas de hora (11px muted) van en la columna izquierda. Las líneas de hora son `repeating-linear-gradient` cada 72px en `#EEE6E1`.
- **Línea "ahora"** en la columna de hoy: 2px green + punto de 8px a la izquierda.
- **Bloques**:
  - `top = (min - 480) * 1.2 + 1`, `height = dur * 1.2 - 3`, radio 8, padding `4px 7px`.
  - Turnos superpuestos: algoritmo de lanes (`layoutDay`). Cada bloque usa `left = lane/lanes`, `width = 1/lanes`, con 3px de margen.
  - Si mide menos de 44px de alto: una línea "hora · punto · cliente". Si no: hora, cliente y, a partir de 58px, también el tratamiento. Siempre con ellipsis.
  - `title` nativo con el detalle completo.
- **Drag & drop**: solo para turnos que no pasaron (`cursor: grab`).
  - Snap de **15 min**. Se respeta el offset de agarre y se limita al rango.
  - Mientras se arrastra: el bloque original queda con opacity .4. En el destino aparece un ghost con borde `2px solid green`, bg `rgba(0,63,54,0.06)` y un chip con la hora destino (green/cream).
  - Al soltar en otro día u hora se llama a `onMove`.
- Leyenda debajo: Confirmado / Sin confirmar / Atendido.

### 2c. Drawer de turno (`ApptDrawer`)
- Desktop: panel derecho de 400px con alto completo. Mobile (< 640): bottom sheet con `max-height: 86%`. bg cream y overlay que cierra al hacer click. Botón cerrar "×" de 36px.
- Contenido:
  - Overline "TURNO".
  - "09:30 – 10:00" en Fraunces 40, con la hora de fin en 22 muted.
  - "Hoy, martes 30 de julio · 30 min".
  - Tarjeta blanca con cliente (18/600), tratamiento, "con pro" y pill de estado.
  - Si tiene un issue: banner `#F4ECE2` con punto gold.
- Acciones (si no fue atendido):
  - "Confirmar turno" (primary, solo si no está confirmado).
  - "Reprogramar" (secondary). Despliega una grilla de 2 columnas con horarios libres ("Vie 2 · 09:30", min-height 44) y la nota "También podés arrastrarlo en la vista Semana."
  - "Abrir conversación" (ghost).

### 2d. Toast de deshacer
Fijo, abajo al centro (bottom 24), bg green, texto cream, radio 12. Texto: "Turno movido: {cliente} → {Día}, {hora}" + botón "Deshacer" (bg `rgba(245,241,236,0.14)`). Se cierra solo a los **5 s**. "Deshacer" restaura el día y la hora anteriores.

---

### 2e. Formulario "Nuevo turno" (`NewApptForm`)
Se abre desde **todos** los botones "+ Nuevo turno" (Inicio, Agenda Día, Agenda Semana) y al **tocar un espacio libre** en la vista Semana. En ese último caso llega con día y hora precargados (redondeados a 30 min). En el prototipo se dispara con `openNewAppt(prefill)`. En producción usá un store, contexto o ruta interceptada (`/agenda/nuevo`).

**Contenedor:** el mismo patrón que el drawer de turno, panel derecho de **460px** en desktop. En mobile (< 640) es un bottom sheet desde `top: 6%` con radio `20px 20px 0 0`. bg cream y overlay `rgba(29,43,40,0.32)`, que cierra al hacer click. Tres zonas:
- **Header** (con borde inferior taupe): overline "NUEVO TURNO", título "Agendar turno" en Fraunces 30/500 green (mobile 26) y botón cerrar "×" de 36px.
- **Cuerpo** scrolleable, padding `20px 24px 24px` (mobile 18 lateral), gap 24 entre secciones.
- **Footer** fijo, bg white, borde superior taupe.

**Secciones** (cada label va como overline 12/600 uppercase, tracking .06em, muted):
1. **Clienta**: input "`uscar por nombre…" con autofocus.
   - Al escribir aparece una lista debajo, pegada al input: hasta 5 coincidencias (sin distinguir acentos ni mayúsculas), filas de 44px.
   - Si no hay coincidencia exacta, la última fila es "+ Agregar “{texto}” como nueva clienta" (green 600, bg `#F`F8F4`).
   - Al elegir, se muestra una tarjeta blanca con avatar de iniciales de 36px (existente: `#E3ECE9`/green; nueva: `#F3EADF`/goldInk), el nombre y "N turnos esta semana", "Clienta existente" o "Nueva clienta". LinkBtn "Cambiar" en el label.
   - Si la clienta es nueva, la tarjeta suma un input "Teléfono (WhatsApp)".
2. **Tratamiento**: select nativo estilizado, con flecha SVG green. Debajo, "{dur} min · {precio}" en 13 muted.
3. **Profesional**: 2 chips. Si el profesional no hace ese tratamiento, el chip queda deshabilitado con el sub "No hace este tratamiento". Al cambiar de tratamiento se autoselecciona el primer profesional válido.
4. **Día y horario**:
   - Chips de día desde hoy (5 columnas, mobile 3). Cada chip lleva el sub "N libres" o "Completo".
   - Debajo, una grilla de horarios libres (5 columnas, mobile 4), en pasos de 30 min entre 08:00 y 20:00. Se excluyen los horarios que se superponen con turnos del mismo profesional y, si el día es hoy, los anteriores a ahora + 20 min.
   - El rango elegido "10:00 – 10:45" aparece a la derecha del label.
   - Estados vacíos: "Elegí un tratamiento para ver los horarios libres." / "{pro} no tiene horarios libres ese día. Probá otro día."
5. **Confirmación**: tarjeta-checkbox con "Enviar confirmación por WhatsApp" (activado por defecto) y la ayuda "Le llega el detalle del turno y un pedido para confirmar. El recordatorio sale 24 h antes."
6. **Notas internas**: textarea de 3 filas con el placeholder "Opcional. Solo lo ve el equipo." Las notas se muestran en el drawer del turno.

**Chip:** min-height 44, radio 10, 13/600 tabular. Off: bg white, borde taupe, texto green. On: bg green, texto cream. Deshabilitado: transparente, texto `#A9AFAC`.
**Input:** bg white, borde `1px solid #DED1C``, radio 10, padding `11px 12px`, 14px, min-height 44, foco green.

**Footer:**
- Línea de resumen 13px. Completo: "**Clienta** · Tratamiento · Vie 2 10:00–10:45 · con Ana Torres". Incompleto: "Completá clienta, tratamiento y horario." en muted.
- `otones "Cancelar" (ghost) y el primario a todo el ancho restante: "Agendar y enviar confirmación", o "Agendar turno" si el WhatsApp está desactivado. En mobile se apilan, con el primario arriba.

**Validación:** el primario siempre está habilitado. Al tocarlo con datos faltantes se muestran los errores inline debajo de cada sección (punto gold + texto goldInk 12.5/600):
- "Elegí una clienta o agregala como nueva."
- "Agregá un teléfono para mandarle la confirmación." (clienta nueva + WhatsApp activado + menos de 8 dígitos)
- "Elegí un tratamiento."
- "Elegí un horario libre."

**Al guardar:**
- Se crea un turno `{ confirmed: false, reminded: wa, notes }` y se cierra el panel.
- Aparece un toast "Turno agendado: {clienta} · {Día}, {hora}" con "Deshacer" (5 s), que elimina el turno.
- El turno nuevo aparece en Agenda Día/Semana: sin confirmar, o "Recordatorio enviado".

## State Management
```ts
type Appointment = {
  id: string; day: number /*0=Lun..5=Sáb*/; time: "HH:MM"; duration: string /*"45 min"*/;
  client: string; treatment: string; pro: string;
  confirmed: boolean; done?: boolean; reminded?: boolean;
  issue?: { kind: "confirm" | "consent"; text: string; cta: string };
};
```
- Store global `appointments` + `update(id, patch)` + `move(id, day, time)`. `move` devuelve el valor anterior para el undo.
- Estado derivado del status: `done` → Atendido · `confirmed` → Confirmado · `reminded` → Recordatorio enviado · si no, Sin confirmar.
- UI local: `openId` (drawer), `toast`, `drag` + `hover` (semana), `resolvedIssues`, `view` (en la URL).
- En el prototipo, `NOW` y `TODAY` son fijos ("10:12", martes). En producción, usá la fecha y hora reales y refrescá la línea "ahora" cada minuto.
- Los IDs tienen que ser únicos: el undo y el DnD dependen de eso.
- Inicio usa hoy datos propios (`DASH_APPTS`, `HOME_CONVOS`, `HOME_FU`). En producción debería leer del mismo store/API que Agenda.

Datos de ejemplo: ver `INITIAL_APPTS`, `WEEK_EXTRA`, `HOME_*`, `DASH_*` y `RESCHED_SLOTS` en `reference/App.jsx`.

## Responsive
- Inicio: mobile < 640, columnas apiladas < 960.
- Agenda Día: mobile < 640. Semana: scroll horizontal en mobile.
- Los breakpoints se miden por **ancho del contenedor** (ResizeObserver), no del viewport. Con Tailwind podés usar container queries (`@container`).
- Targets táctiles ≥ 40–44px.

## Assets
No hay imágenes ni íconos. Solo tipografía: Fraunces e Inter, de Google Fonts.

## Files
- `reference/App.jsx`. Lo relevante: `Sidebar`, `TopBar`, `OkBtn`, `LinkBtn`, `Pill`, `HomeEditorial` (Inicio), `NewApptForm` + `freeSlots` + `TREATMENTS` (Nuevo turno), `CalendarView` → `AgendaScreen` → `AgendaOverview` + `DayListV1` / `WeekView` + `layoutDay` / `ApptDrawer`, y los helpers `toMin`, `fmtMin`, `durMin` y `apptStatus`. **Ignorá** `DashboardV1`, `DashboardOverview`, `DayListV2/V3`, los selectores de versión/preview y las demás vistas (Conversaciones, Clientes, etc.). **No ignores `WeekView` ni `layoutDay`**: son la vista Semana. El toggle del prototipo está en `CalendarView` (`group([["day","Día"],["week","Semana"]]…)`).
- `reference/index.html`: el que carga el prototipo.
- `reference/styles.css` + `reference/tokens/*.css`: tokens base del design system. Inicio y Agenda usan sobre todo la paleta `OK` de arriba.
