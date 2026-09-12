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

Tarea: para cada turno, escribí UN recordatorio de WhatsApp que:
- Nombre el tratamiento, para que la clienta sepa a qué viene (el problema que hoy no resuelven).
- Incluya UN tip de pre-cuidado simple y de sentido común para ese tratamiento (no consejo médico:
  cosas como venir sin maquillaje, evitar el sol, hidratarse, ropa cómoda). La profesional lo aprueba.
- Sea corto: 2 oraciones, cálido.`;

// El recordatorio "de antes" (genérico, como el que llegó hoy) — para contrastar.
const antes = (hora) => `Hola! Te recordamos que tenés turno mañana a las ${hora}.`;

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
