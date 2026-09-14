// generadores.mjs — El "cerebro": funciones que generan texto con IA en la voz de Okio.
// NO corre nada solo; lo llaman las "caras": la terminal (recordatorio.mjs) y la web (server.mjs).
// Tener la lógica y la voz acá = un solo lugar para tunear, y todas las caras se benefician.

import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { REGLAS_DE_VOZ, sinSignosDeApertura } from "./voz.mjs";

export const MODEL = "claude-opus-5"; // knob: "claude-haiku-4-5" para abaratar

// La plantilla automática REAL de Okio (no dice el tratamiento). Fuente única:
// la usan el CLI (recordatorio.mjs) y la web (server → página) para mostrar el "antes".
export function plantillaAntes(hora) {
  return `¡Buenas tardes! 😊 Soy Ceci, de OKIO. Paso a recordarte el turno que tenés agendado para mañana a las ${hora}.`;
}

const Recordatorios = z.object({
  recordatorios: z.array(
    z.object({
      tratamiento: z.string(),
      mensaje: z.string(),
    }),
  ),
});

const SYSTEM_RECORDATORIO = `${REGLAS_DE_VOZ}

Voz real de la recepción de Okio por WhatsApp (así escriben ellas). ESTE es el registro, no el de marketing:
- Cálida, cercana y breve. Saludan por el nombre y suelen abrir con "Hola Meli, cómo estás?".
  Cierran con "saludos!", "te esperamos!" o "un saludo grande!".
- Ejemplos reales de su chat: "nos vemos mañana a las 16 hs para facial. saludos!" ·
  "recorda venir rasurada y asistir con toalla hoy!" · "así ya te queda, Meli."
- Emoji 😊 ocasional, sin abusar. Nada de lenguaje poético de feed acá: es la recepción.

Tarea: para cada turno, escribí UN recordatorio de WhatsApp con esa voz que:
- Salude por el nombre (usá "Meli") y NOMBRE el tratamiento (el dato que hoy el recordatorio automático no trae).
- Incluya UN tip de pre-cuidado simple para ese tratamiento (como "recordá venir rasurada y con toalla"
  para depilación) — sentido común, no consejo médico; la profesional lo aprueba.
- Sea corto y cálido: 2 oraciones + un cierre tipo "te esperamos!".`;

// Genera un recordatorio por turno, en la voz de recepción de Okio.
// Recibe el cliente de Anthropic ya creado y una lista [{tratamiento, hora}].
// Devuelve [{tratamiento, mensaje}] con el blindaje de ¿¡ ya aplicado.
export async function generarRecordatorios(client, turnos) {
  const res = await client.messages.parse({
    model: MODEL,
    max_tokens: 1200,
    system: SYSTEM_RECORDATORIO,
    output_config: { format: zodOutputFormat(Recordatorios) },
    messages: [
      {
        role: "user",
        content: `Turnos:\n${turnos.map((t) => `- ${t.tratamiento} a las ${t.hora}`).join("\n")}`,
      },
    ],
  });
  if (!res.parsed_output) throw new Error("La IA no devolvió el formato esperado.");
  return res.parsed_output.recordatorios.map((r) => ({
    ...r,
    mensaje: sinSignosDeApertura(r.mensaje),
  }));
}
