# 15 · Rediseño visual del Dashboard

**Estado:** propuesta v1, 2026-10-03. Para que Meli la corrija.
**Owner:** Meli
**Base:** `Clinic Platform UX v2.dc.html` (el recorrido de recepción que se mostró en la demo del 16/09) es la pantalla principal. El kit de 6 pantallas (`ui_kits/clinic-platform/standalone.html`) se toma como referencia post-MVP.
**Fuera de alcance:** las vistas originales que quedaron ocultas en v2 (Analítica, Seguimientos completos y Catálogo) se revisan después.

> Lo marcado con **[confirmá]** es una propuesta mía y la decisión es tuya.

---

## Objetivo

Que recepción entienda la Agenda de un vistazo. Cada tarjeta responde una sola pregunta y muestra solo los datos que la responden. El resto se ve al abrir el detalle.

## Quién lo usa

| Rol | Tarea principal | Respaldo |
|---|---|---|
| **Recepción** | Saber quién viene, a qué, y si confirmó. Reacomodar turnos. | **Hecho observado** (doc 07): el turno sin tratamiento se repite, se les pasó un turno de su propia agenda y reprograman a mano. |
| Profesional | Ver su agenda del día | **Hipótesis.** Sin validar. |
| Dueña | Ver cómo va el día o la semana | **Hipótesis.** Sin validar. |

El rediseño se diseña para **recepción**. Los otros dos roles quedan para cuando haya evidencia.

---

## 1. Estilo del calendario

**Qué falla hoy**
- El color significa varias cosas a la vez: categoría de tratamiento, estado, VIP. Así no se lee nada de un vistazo.
- La vista Día es una lista de texto y no muestra los **huecos libres**. Con la agenda a full, los huecos son justamente lo que recepción necesita ver para reacomodar.
- La lista del día y el panel de detalle repiten los mismos datos: hora, clienta, tratamiento y estado.

**Propuesta**
- **El color dice una sola cosa: el estado del turno.**
  - Verde Okio = confirmado
  - Dorado = sin confirmar
  - Rosa profundo = requiere atención (por ejemplo, la clienta avisó que no puede venir)
  - El tratamiento va **escrito**, nunca como color.
- **Vista Día como tarjeta (2026-10-07, diseño V1 "Tarjeta" de `Dashboard - Claude Design/Redesign/`)**: arriba un resumen en verde (turnos de hoy, confirmados, cuántos requieren atención y el próximo turno); abajo, a todo el ancho, la tarjeta "Requiere atención" con el botón para resolver cada uno. Debajo, en dos columnas: la lista "Turnos del día" en orden cronológico, con el próximo marcado, y a la derecha el detalle del turno elegido. Antes: un calendario con una columna por profesional.
- **Nunca se nombra ni se cuenta a las profesionales (2026-10-07, pedido de Meli).** Importa qué se hace (tratamiento, horario, estado), no quién lo hace ni cuántas son. Vale para Agenda, Inicio, Clientes, Mensajes y los recordatorios.
- **Ícono de estado solo si no está confirmado** (! o ?, delante del nombre). Confirmado es lo normal: alcanza con el color.
- **Horario real:** lunes a viernes, 09–13 y 15–20. El corte de 13 a 15 es una franja rayada angosta, "Cerrado 13–15", no dos horas vacías. La línea "Ahora" separa los turnos que ya empezaron de los que vienen.
- **Vista por defecto:** Día. La demo abre en **Inicio** (diseño V3 "Editorial"): "Hoy" en grande, tres números, los turnos de hoy y "Para resolver ahora" (conversaciones que esperan respuesta y clientas sin turno para volver a contactar).
- **Dispositivo principal:** la notebook de recepción.

### Vista Semana

Pregunta que responde: **dónde hay lugar para agendar o reacomodar?**

- **Calendario de lunes a sábado, 08 a 20 h, una columna por día (2026-10-07, sección 2b del handoff en `Dashboard - Claude Design/Redesign/`).** Escala de 1,2 px por minuto. Los turnos a la misma hora van lado a lado, sin decir de quién es cada uno. Arriba de cada día, cuántos turnos tiene; la columna de hoy va resaltada, con la línea de "ahora".
- **Bloques:** confirmado en verde claro; sin confirmar en blanco con borde punteado dorado y un punto; ya atendido en gris. Si el bloque es bajo, va en una línea (hora y clienta); desde 58 px suma el tratamiento.
- **Arrastrar para mover**, de a 15 minutos, con mouse o con el dedo. Mientras se arrastra, un recuadro muestra adónde cae y a qué hora. No se puede mover un turno al pasado ni mover uno que ya pasó. Al soltar aparece "Turno movido" con **Deshacer** durante 5 segundos. El cambio se ve en todas las pantallas: Día, Inicio, Clientes y Mensajes.
- Tocar un turno de hoy abre la vista Día con ese turno. Tocar un espacio libre (de hoy en adelante) arma un turno nuevo con día y hora.
- **Toggle Día / Semana** en el encabezado de Agenda. La vista queda en la dirección (`?view=day` o `?view=week`): al recargar o compartir el link abre igual.
- **Horario cerrado marcado (2026-10-07, pedido de Meli):** el diseño pide sábado y 08–20 h, pero Okio atiende de lunes a viernes, 09–13 y 15–20. El sábado entero y las franjas de 08–09 y 13–15 se ven rayadas con "Cerrado": no se puede soltar un turno ahí ni agendar uno nuevo.
- Antes (2026-10-03): una tabla con horas libres, barra de ocupación y hueco más largo por celda. Se reemplazó porque no se parecía a una agenda.

### Nuevo turno

Pregunta que responde: **cómo agendo rápido sin pisar otro turno?** (sección 2e del handoff, 2026-10-07)

- Se abre desde cada "+ Nuevo turno" (Inicio, Agenda Día y Semana), desde "+ Turno para…" en una ficha (con la clienta ya elegida) y al tocar un espacio libre de la Semana (con el día y la hora ya elegidos). Panel a la derecha; en celular, hoja desde abajo.
- **Clienta:** se busca por nombre (sin importar acentos). Si no existe, se agrega como nueva con su WhatsApp, y queda con ficha en Clientes.
- **Tratamiento:** los de la demo, con su duración. **Sin precios**: Okio es real y un precio inventado se puede leer como verdadero.
- **Sin elegir profesional.** El diseño traía chips con el nombre de cada una; se sacaron por la regla de no nombrarlas ni contarlas. Un horario está libre mientras haya menos turnos a la vez que el cupo de la clínica. El cupo no se muestra en ninguna pantalla.
- **Día y horario:** desde hoy, cada 30 minutos, solo horarios abiertos y con lugar. Si es hoy, desde ahora + 20 minutos.
- **Confirmación por WhatsApp:** no sale sola. Queda como borrador en Mensajes con fecha, hora, tratamiento y las indicaciones de "días antes" (las sirve el servidor desde `ai-triage/generadores.mjs`), y recepción la aprueba. Mismo principio que el recordatorio: nada sale solo.
- **Notas internas** opcionales: se ven en el detalle del turno.
- **Cerrar con algo cargado pregunta antes:** "Descartar el turno?" con "Seguir editando" o "Descartar". Si el formulario está como se abrió, cierra directo. La pregunta va dentro del panel y no en una ventana del navegador, porque el visor de la maqueta publicada bloquea esas ventanas.
- Al agendar: el turno aparece sin confirmar en Agenda e Inicio, y un aviso "Turno agendado" con **Deshacer** por 5 segundos.

## 2. Distribución y formato

- **Arriba, a todo el ancho:** el resumen del día en verde y debajo "Requiere atención" (solo si hay algo pendiente).
- **Izquierda:** la lista de turnos del día.
- **Derecha:** el detalle del turno seleccionado.
- **Marca, con lo que hoy no cumple:**
  - Botones en **pill** (999px) con texto en mayúsculas, no los de 7px que hay ahora.
  - **Nada de azul.** El kit usa azul (oklch hue 230) para "info", la categoría Corporal y algunos hilos. La marca lo prohíbe. En v2 quedan restos de esos tokens, así que hay que revisarlos.
  - Títulos en Fraunces, datos en Inter con números tabulares.
  - **Contraste (resultado de la crítica de diseño del 2026-10-03):** el dorado de marca `#B99269` no se lee como texto (2.5–2.8:1). En el producto se usa así:
    - Dorado de marca: solo para bordes, el loto y los "+".
    - Texto chico en dorado: `#8A6A45` (4.9:1).
    - El número dorado en itálica del título: `#9A7550` (3.7:1, alcanza para texto grande).
    - Gris de texto: `#6B6B6B` en lugar de `#888`.
  - **Línea de "ahora"** en la vista Día y **selector Día/Semana separado** del botón "+ Turno", que es el único botón sólido.
- **Modo claro y oscuro (2026-10-03):**
  - El switch está al pie de la barra lateral. Recuerda la elección y, la primera vez, usa el modo del sistema.
  - **Claro:** fondo `#F8F6F3`, más tenue que el crema anterior. Barra lateral `#002A24`.
  - **Oscuro, "verde noche":** fondos verdosos (`#0E1614`, tarjetas `#15201D`), no negro neutro. El botón principal pasa a crema con texto verde, porque la marca no permite verdes brillantes y un verde oscuro se perdería sobre ese fondo. Estados y dorados en versiones más claras.
  - Todos los textos medidos pasan 4.5:1 en los dos temas.
- **Tamaño de letra (2026-10-07):** texto base 15 px, nada por debajo de 12 px (antes había textos de 10 a 12 px). Se prefiere letra grande con scroll a que entre todo el día: el calendario hace scroll por dentro y arranca en la hora actual.

---

## 3. Contenido de cada tarjeta

Regla: **una tarjeta, una pregunta.** Si un dato no ayuda a responderla, va al detalle.

| Tarjeta | Pregunta que responde | Mostrar | Va al detalle | Por qué |
|---|---|---|---|---|
| **Tarjeta de turno** (alto fijo) | Quién viene, con quién, a qué y confirmó? | **profesional**, horario, clienta, **tratamiento(s)**, estado (color + texto corto) | teléfono, recordatorio, historial | El tratamiento visible es el dolor #1 observado (H1). |
| **Fila "Requiere atención"** | Qué tengo que resolver ahora? | clienta, hora, motivo en 3–4 palabras, **una** acción (Recordatorio / Responder por WhatsApp) | todo lo demás | Se les pasan turnos. Esto tiene que gritar. |
| **Detalle del turno** (panel) | Qué hago con este turno? | tratamientos, estado del recordatorio, WhatsApp, acción principal (Preparar recordatorio / Registrar confirmación) | ficha completa de la clienta | Hoy repite la lista. Que muestre solo lo accionable. |
| **Ficha de clienta** | Quién es y cuándo vuelve? | nombre, teléfono, **próximo turno con tratamiento**, última visita | historial completo, notas | Conserva lo bueno de v2. |
| **Mensaje / confirmación** | Qué le mando y ya respondió? | turno vinculado en una línea, borrador, estado de respuesta | conversación completa | Hoy la tarjeta del turno vinculado repite 6 datos. Con una línea alcanza. |
| Catálogo (post-MVP) | Cuánto cuesta y cuánto dura? | nombre, duración, precio | descripción, editar | Hoy tiene dos botones (Editar + Ver). Que la tarjeta entera sea clickeable. |

**Clientes y Mensajes (maqueta, 2026-10-03):** misma estructura en las dos pantallas, con la lista a la izquierda y el detalle a la derecha.
- **Clientes:** cada fila de la lista muestra el nombre y el próximo turno, más el ícono ! o ? cuando hace falta. La ficha muestra el WhatsApp, el próximo turno (con tratamiento), la última visita y el historial clínico detrás de un acceso restringido.
- **Mensajes:** el turno vinculado va en una sola línea arriba del chat. El borrador del copiloto tiene **borde punteado dorado**, igual que los huecos libres de la Agenda. En toda la app, punteado significa "todavía no es real".
- El menú muestra un contador de mensajes sin leer.
- **Recordatorios (2026-10-07):** llevan solo fecha y horario, tratamiento e indicaciones para venir, en 280 caracteres como máximo. Las indicaciones se separan por momento: las de **días antes** (ej. no usar retinol) van en el mensaje de reserva; las del **mismo día** (ej. venir sin maquillaje) van en el recordatorio. No nombran a la profesional: a la clienta no le cambia nada. Las indicaciones salen de una lista fija por tratamiento (`ai-triage/generadores.mjs`, hoy de ejemplo ficticio); la IA las redacta pero no inventa otras.

**Privacidad:** ninguna tarjeta de la Agenda muestra datos clínicos (notas, fotos, historia). Eso queda en la ficha, con acceso restringido, como dice `05_Privacidad_y_Consentimiento.md`. Mientras no se resuelvan los pendientes de ese doc, solo se usan datos ficticios.

---

## Cómo sé que salió bien

- Recepción encuentra el próximo turno sin confirmar en menos de 3 segundos.
- Ningún bloque de turno tiene más de 4 datos visibles.
- El tratamiento de cada turno se lee sin hacer click.
- Los huecos libres del día se ven sin buscarlos.

## Decidido (2026-10-03)

1. Vista por defecto: **Día**. Dispositivo: **notebook de recepción**.
2. ~~Una columna por profesional.~~ Reemplazado el 2026-10-07: la pantalla no nombra ni cuenta a las profesionales.
3. **Estados: solo tres** (confirmado / sin confirmar / requiere atención). Hoy Okio no usa "llegó" ni "ausente". "Llegó" le agrega un click por clienta sin resolver un dolor observado. "Ausente" se agrega cuando quieran medir el ausentismo o mandar un mensaje después de una ausencia.

## Relacionados
- Maqueta: `Dashboard - Claude Design/propuestas/dashboard-rediseno.html`
- `07_Descubrimiento_de_Campo_Okio.md` (evidencia), `06_Identidad_de_Marca.md` (marca), `05_Privacidad_y_Consentimiento.md`.
