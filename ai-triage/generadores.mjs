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
  return `Buenas tardes! 😊 Soy Ceci, de OKIO. Paso a recordarte el turno que tenés agendado para mañana a las ${hora}.`;
}

// Indicaciones previas por tratamiento. EJEMPLO FICTICIO: reemplazar por las que escriban
// las profesionales de Okio. La IA solo las redacta con su voz; no inventa otras.
export const INDICACIONES = {
  "peeling facial": "venir con la cara limpia y sin maquillaje; no usar ácidos ni retinol los 3 días previos",
  "depilación definitiva": "venir con la zona rasurada (no con cera ni pinza) y sin cremas",
  "limpieza facial profunda": "venir sin maquillaje",
  "peeling corporal": "traer una toalla y no tomar sol en la zona el día anterior",
};

// Junta las indicaciones de cada tratamiento que nombre el turno ("peeling facial y depilación definitiva" → las dos).
export function indicacionesPara(tratamiento) {
  const t = tratamiento.toLowerCase();
  return Object.keys(INDICACIONES).filter((k) => t.includes(k)).map((k) => INDICACIONES[k]);
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
- Salude a la clienta por su nombre de pila (viene en cada turno) y NOMBRE el tratamiento (el dato que hoy el recordatorio automático no trae).
- Diga el día y el horario. NO nombre a la profesional: a la clienta le importa cuándo, qué tratamiento y cómo venir.
- Incluya las indicaciones que vienen con el turno, dichas con tus palabras, sin agregar otras.
  Si un turno no trae indicaciones, no inventes ninguna: no es consejo médico.
- Pida que confirme si viene (ej. "nos confirmás si venís?"), porque el turno todavía no está confirmado.
- Sea corto y cálido: 2 oraciones + la pregunta de confirmación + un cierre tipo "te esperamos!".`;

// Genera un recordatorio por turno, en la voz de recepción de Okio.
// Recibe el cliente de Anthropic ya creado y una lista [{tratamiento, hora, nombre?, dia?}].
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
        content: `Turnos:\n${turnos
          .map((t) => {
            const ind = indicacionesPara(t.tratamiento);
            return `- Clienta: ${t.nombre || "Meli"} · ${t.tratamiento} · ${t.dia || "mañana"} a las ${t.hora}` +
              ` · Indicaciones: ${ind.length ? ind.join("; ") : "ninguna"}`;
          })
          .join("\n")}`,
      },
    ],
  });
  if (!res.parsed_output) throw new Error("La IA no devolvió el formato esperado.");
  return res.parsed_output.recordatorios.map((r) => ({
    ...r,
    mensaje: sinSignosDeApertura(r.mensaje),
  }));
}
