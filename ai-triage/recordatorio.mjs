// recordatorio.mjs — La "cara" de terminal del generador de recordatorios.
// La lógica y la voz viven en generadores.mjs; acá solo mostramos el antes/después.
//
// Correr:  node recordatorio.mjs          (llama a la API — necesita ANTHROPIC_API_KEY)
//          node recordatorio.mjs --test   (self-check offline, gratis)

import Anthropic from "@anthropic-ai/sdk";
import { sinSignosDeApertura } from "./voz.mjs";
import { generarRecordatorios, plantillaAntes } from "./generadores.mjs";

// Turnos de ejemplo (los tratamientos reales de una clienta). Cambialos si querés.
const TURNOS = [
  { tratamiento: "peeling facial", hora: "10:00" },
  { tratamiento: "tratamiento corporal", hora: "16:00" },
  { tratamiento: "depilación definitiva", hora: "18:30" },
];

async function main() {
  if (process.argv.includes("--test")) {
    if (sinSignosDeApertura("¿Venís? ¡Genial!") !== "Venís? Genial!") {
      throw new Error("El blindaje de ¿¡ no funciona.");
    }
    console.log("✓ Self-check OK.");
    return;
  }

  const client = new Anthropic();
  const recordatorios = await generarRecordatorios(client, TURNOS);

  console.log("\n=== RECORDATORIOS: antes vs. después (borradores) ===");
  console.log(`\nANTES (lo que llega hoy, sin decir el tratamiento):\n  "${plantillaAntes("10:00")}"`);
  console.log(`\nDESPUÉS (nombra el tratamiento + pre-cuidado):`);
  for (const r of recordatorios) {
    console.log(`\n  ▸ ${r.tratamiento}\n    ${r.mensaje}`);
  }
  console.log("");
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
