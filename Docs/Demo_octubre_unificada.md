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
| 0:00–0:30 | Agenda · Día | "Esto es un día de recepción: los turnos de Ingrid y Eliana en una sola lista. El color dice una sola cosa, si el turno está confirmado. Son datos inventados." |
| 0:30–1:00 | Mirar "Requiere atención hoy" | "Arriba está lo que necesita una persona: Sofía avisó que no viene y Luciana no confirmó." |
| 1:00–2:00 | Turno de Luciana → **Preparar recordatorio** | "Hoy el recordatorio automático dice el día y la hora, pero no el tratamiento. Acá el turno ya sabe que es peeling facial y depilación, con Ingrid, y la IA arma el mensaje con eso." |
| 2:00–2:45 | Leer el borrador. Editar una palabra. | "Lo escribe en el tono de ustedes por WhatsApp, y suma el cuidado previo. Pero es un borrador: recepción lo lee, lo cambia si quiere y recién ahí lo aprueba. Nada sale solo." |
| 2:45–3:15 | **Aprobar y enviar** → volver a Agenda | "El turno ahora dice que el recordatorio se mandó, y sigue sin confirmar hasta que Luciana conteste." |
| 3:15–4:00 | Mensajes → Sofía → **Ver huecos en la semana** | "Cuando alguien cancela, esto no lo resuelve la IA: lo resuelve recepción, y la semana le muestra dónde hay lugar para reacomodar." |
| 4:00–5:00 | Dejar de navegar | Las dos preguntas de abajo. |

## Las dos preguntas (pesan tanto como la pantalla)

1. "Cuando una clienta cancela y queda un turno sin fecha, cómo se acuerdan de volver a llamarla?"
2. "Cuántos mensajes de WhatsApp les llegan por día, más o menos? Y de todo lo que hoy está disperso, qué es lo que más tiempo les hace perder?"

Anotá las respuestas tal cual las dicen.

## Qué es real y qué es simulado

- **Real:** el borrador del recordatorio lo escribe Claude en el momento (`ai-triage/server.mjs` → `/api/recordatorio`).
- **Simulado:** los turnos, las clientas, las conversaciones, el envío y las respuestas.
