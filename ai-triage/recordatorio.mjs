// recordatorio.mjs — Demo #1 para el miércoles: el recordatorio que SÍ sirve.
// Genera el recordatorio "después" (nombra el tratamiento + un pre-cuidado simple),
// para contrastar con el "antes" genérico (el que le llegó hoy a Meli sin decir el tratamiento).
//
// Correr:  node recordatorio.mjs          (llama a la API — necesita ANTHROPIC_API_KEY)
//          node recordatorio.mjs --test   (self-check offline, gratis)

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { REGLAS_DE_VOZ, sinSignosDeApertura } from "./voz.mjs";

const MODEL = "claude-opus-5"; // knob: "claude-haiku-4-5" para abaratar

// Turnos de ejemplo (los tratamientos reales de una clienta). Cambialos si querés.
const TURNOS = [
  { tratamiento: "peeling facial", hora: "10:00" },
  { tratamiento: "tratamiento corporal", hora: "16:00" },
  { tratamiento: "depilación definitiva", hora: "18:30" },
];

const Recordatorios = z.object({
  recordatorios: z.array(
    z.object({
      tratamiento: z.string(),
      mensaje: z.string(), // el recordatorio que nombra el tratamiento + pre-cuidado
    }),
  ),
});

const SYSTEM = `${REGLAS_DE_VOZ}

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

// El recordatorio "de antes": la plantilla automática REAL de Okio (no dice el tratamiento) — para contrastar.
const antes = (hora) =>
  `¡Buenas tardes! 😊 Soy Ceci, de OKIO. Paso a recordarte el turno que tenés agendado para mañana a las ${hora}.`;

async function main() {
  if (process.argv.includes("--test")) {
    if (sinSignosDeApertura("¿Venís? ¡Genial!") !== "Venís? Genial!") {
      throw new Error("El blindaje de ¿¡ no funciona.");
    }
    console.log("✓ Self-check OK.");
    return;
  }

  const client = new Anthropic();
  const res = await client.messages.parse({
    model: MODEL,
    max_tokens: 1200,
    system: SYSTEM,
    output_config: { format: zodOutputFormat(Recordatorios) },
    messages: [
      {
        role: "user",
        content: `Turnos:\n${TURNOS.map((t) => `- ${t.tratamiento} a las ${t.hora}`).join("\n")}`,
      },
    ],
  });
  if (!res.parsed_output) throw new Error("La IA no devolvió el formato esperado.");

  console.log("\n=== RECORDATORIOS: antes vs. después (borradores) ===");
  console.log(`\nANTES (lo que llega hoy, sin decir el tratamiento):\n  "${antes("10:00")}"`);
  console.log(`\nDESPUÉS (nombra el tratamiento + pre-cuidado):`);
  for (const r of res.parsed_output.recordatorios) {
    console.log(`\n  ▸ ${r.tratamiento}\n    ${sinSignosDeApertura(r.mensaje)}`);
  }
  console.log("");
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
