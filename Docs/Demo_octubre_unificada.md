# Demo unificada · Octubre 2026

Una sola pantalla y un solo comando. El dashboard rediseñado (Agenda, Clientes, Mensajes) y el recordatorio que **redacta la IA de verdad** ahora viven en el mismo lugar.
Reemplaza la demo del 16/09 (`Clinic Platform UX v2.dc.html`), que queda como referencia.

## Abrir y preparar (hacelo la noche anterior y de nuevo antes de entrar)

1. En la carpeta `ai-triage`: `npm run serve`
2. Abrí `http://localhost:3000` en el navegador.
3. Probá el recorrido una vez completo. Si el borrador dice "Borrador redactado por la IA", la IA está andando.

- Necesita `ANTHROPIC_API_KEY` configurada (ya la tenés en Windows) e internet.
- **Plan B automático:** si no hay internet, falta la key o la IA tarda más de 15 s, aparece un borrador de ejemplo ("Borrador de ejemplo") y la demo sigue igual. No hace falta hacer nada.
- **La terminal donde corriste `npm run serve` tiene que quedar abierta** durante toda la demo. Si la cerrás, la página deja de andar.
- Para volver al inicio, recargá la página.
- La IA tarda unos 4 segundos. Mientras dice "Redactando con IA…", aprovechá para hablar.
- Datos ficticios. No se manda nada a ningún teléfono.

## Guion de cinco minutos

| Tiempo | Pantalla y acción | Qué decir |
|---|---|---|
| 0:00–0:30 | Inicio (abre ahí). Mirar los turnos de hoy y "Para resolver ahora". | "Esto es lo primero que ve recepción: los turnos de hoy, qué falta resolver y los mensajes que esperan respuesta. Son datos inventados." |
| 0:30–1:00 | **Ver agenda →**. Mirar el resumen verde y "Requiere atención". Bajá al calendario de hoy y tocá el turno de Sofía (15:00). | "Arriba, el día en números. Después, lo que necesita una persona: Sofía avisó que no viene y Luciana no confirmó. Abajo, el día como agenda: cada turno ocupa lo que dura y los huecos libres se ven solos. Tocás un turno y a la derecha ves todo: tratamiento, teléfono y si ya se le mandó el recordatorio." |
| 1:00–2:00 | Turno de Luciana → **Preparar recordatorio** | "Hoy el recordatorio automático dice el día y la hora, pero no el tratamiento. Acá el turno ya sabe que es peeling facial y depilación, y la IA arma un mensaje corto con eso y con cómo tiene que venir ese día. No nombra a la profesional: a la clienta le importa cuándo, qué y cómo venir. Las indicaciones son de ejemplo: las reales las escriben ustedes." |
| 2:00–2:45 | Leer el borrador. Editar una palabra. | "Lo escribe en el tono de ustedes por WhatsApp, cortito para leer de un vistazo. Lo que hay que hacer los días previos, como no usar retinol, va antes, en la confirmación de la reserva. Y es un borrador: recepción lo lee, lo cambia si quiere y recién ahí lo aprueba. Nada sale solo." |
| 2:45–3:15 | **Aprobar y enviar** → volver a Agenda | "El turno ahora dice que el recordatorio se mandó, y sigue sin confirmar hasta que Luciana conteste." |
| 3:15–3:45 | Mensajes → Sofía → **Ver huecos en la semana** | "Cuando alguien cancela, esto no lo resuelve la IA: lo resuelve recepción, y la semana le muestra dónde hay lugar para reacomodar." |
| 3:45–4:15 | Tocá un hueco del viernes. Se abre **Nuevo turno** con el día y la hora. Elegí a Sofía y un tratamiento. | "Tocás un hueco y el turno ya viene con día y hora. Solo ofrece horarios en que hay lugar. La confirmación por WhatsApp queda como borrador, igual que el recordatorio, y ya trae lo que tiene que hacer los días previos. Nada sale solo." Después, **Cancelar** y **Descartar**: la pregunta 3 importa más que agendarlo. |
| 4:15–5:00 | Dejar de navegar | Las preguntas de abajo. |

## Si la dueña quiere tocar por su cuenta

Dejala explorar: todos los turnos y botones responden. Esto es lo que va a encontrar:

| Si toca… | Qué pasa | Qué decir, si hace falta |
|---|---|---|
| Cualquier turno de la Agenda | A la derecha aparecen sus datos: horario, duración, tratamientos, teléfono y cómo va el recordatorio. | "Cada turno sabe qué tratamiento es. Ese es el dato que hoy falta en el recordatorio." |
| Agenda · **Semana** | Un calendario de lunes a sábado, una columna por día. Se puede **arrastrar un turno** a otro día u horario, y abajo aparece "Deshacer" por 5 segundos. El cambio se ve también en Día, Inicio y Clientes. Tocar un horario libre abre **Nuevo turno** con ese día y hora. Lo cerrado (sábado, 08–09 y 13–15) no acepta turnos. | "Reacomodar es arrastrar. Si te equivocás, Deshacer." |
| **Ver conversación** (turnos con chat) | Abre los mensajes de WhatsApp de esa clienta. | |
| **Ver ficha** | Abre la ficha de la clienta en Clientes: próximo turno y última visita. | "Agenda, clienta y mensajes están conectados: no hay que buscar en tres lugares." |
| **Ver en Agenda** (desde una ficha o un chat) | Vuelve a la Agenda con el turno de esa clienta elegido. | |
| El buscador de Clientes | Filtra por nombre o teléfono. | |
| **Responder** (aviso de Sofía) | Abre su chat con una caja para escribirle y ofrecerle otro horario. Al enviar, queda en el hilo (simulación). | "Cuando alguien cancela, le contestan ustedes por WhatsApp, no la IA." |
| **+ Nuevo turno** (Inicio, Agenda), **+ Turno para…** (en una ficha) | Abre el formulario: clienta (o una nueva, con teléfono), tratamiento, día y horario libre, confirmación por WhatsApp y notas. Al agendar, el turno aparece en la Agenda y la confirmación queda en Mensajes para aprobarla. "Deshacer" por 5 segundos. | "Así cargan hoy un turno? Qué le falta?" |
| **+ Clienta** | Aviso: "todavía no está en la demo". Una clienta nueva se puede agregar desde Nuevo turno. | |
| **Ver historial** | Aviso: el historial clínico queda fuera porque son datos de salud y solo lo ven las profesionales. | "Lo clínico va con acceso restringido. Es un tema que cuido especialmente." |

Si algo queda raro después de tocar mucho, recargá la página y vuelve todo al inicio.

## Las tres preguntas (pesan tanto como la pantalla)

1. "Cuando una clienta cancela y queda un turno sin fecha, cómo se acuerdan de volver a escribirle?"
2. "Cuántos mensajes de WhatsApp les llegan por día, más o menos? Y de todo lo que hoy está disperso, qué es lo que más tiempo les hace perder?"
3. "Así cargan hoy un turno? Qué le falta o qué le sobra?" (después de mostrar Nuevo turno)

Anotá las respuestas tal cual las dicen.

## Qué es real y qué es simulado

- **Real:** el borrador del recordatorio lo escribe Claude en el momento (`ai-triage/server.mjs` → `/api/recordatorio`).
- **De ejemplo:** las indicaciones de cada tratamiento (`ai-triage/generadores.mjs`). Las de días antes van en la confirmación de la reserva y las del mismo día en el recordatorio. Sin el servidor, la confirmación sale sin indicaciones.
- **Simulado:** los turnos, las clientas, las conversaciones, el envío y las respuestas.
