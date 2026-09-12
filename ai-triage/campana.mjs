// campana.mjs — Demo #2 para el miércoles: contenido para mover stock.
// Genera 3 posts de Instagram + 1 mensaje de WhatsApp para liquidar un producto
// con sobre-stock, en la voz de Okio. Todo borrador: la dueña aprueba antes de publicar.
//
// Correr:  node campana.mjs          (llama a la API — necesita ANTHROPIC_API_KEY)
//          node campana.mjs --test   (self-check offline, gratis)

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { REGLAS_DE_VOZ, sinSignosDeApertura } from "./voz.mjs";

const MODEL = "claude-opus-5"; // knob: "claude-haiku-4-5" para abaratar

// Qué promocionar. Cambiá esto por cualquier producto/servicio y volvé a correr.
const PRODUCTO =
  "protector solar (tenemos sobre-stock y queremos moverlo antes de que termine la temporada)";

const Campana = z.object({
  posts: z.array(z.string()).length(3), // 3 opciones de caption de Instagram
  whatsapp: z.string(), // 1 mensaje de difusión para clientas
});

const SYSTEM = `${REGLAS_DE_VOZ}

Tarea: generar contenido para mover un producto con sobre-stock, sin rematar la imagen de la clínica.
- 3 opciones de caption para Instagram, cada una con un ángulo DISTINTO (ej: educativo sobre el cuidado
  de la piel; beneficio u oferta; cierre de temporada). Cada caption corto: 2 a 4 líneas, con un CTA
  suave (escribinos / reservá / pasá a buscarlo).
- 1 mensaje de difusión de WhatsApp para clientas: 2 oraciones, cálido, con la oferta y el CTA.`;

async function main() {
  if (process.argv.includes("--test")) {
    if (sinSignosDeApertura("¿Te reservo? ¡Dale!") !== "Te reservo? Dale!") {
      throw new Error("El blindaje de ¿¡ no funciona.");
    }
    console.log("✓ Self-check OK.");
    return;
  }

  const client = new Anthropic();
  const res = await client.messages.parse({
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM,
    output_config: { format: zodOutputFormat(Campana) },
    messages: [{ role: "user", content: `Producto a promocionar: ${PRODUCTO}.` }],
  });
  if (!res.parsed_output) throw new Error("La IA no devolvió el formato esperado.");

  const limpio = sinSignosDeApertura;
  console.log("\n=== CAMPAÑA — borradores (la dueña aprueba antes de publicar) ===");
  res.parsed_output.posts.forEach((p, i) =>
    console.log(`\n— Opción de post ${i + 1} —\n${limpio(p)}`),
  );
  console.log(`\n— Mensaje de WhatsApp para clientas —\n${limpio(res.parsed_output.whatsapp)}\n`);
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
