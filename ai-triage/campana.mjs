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

Voz real de Okio (sacada de su Instagram). Imitá ESTE estilo:
- Cálida, aspiracional y un poco poética, con base científica: mezclá emoción y conocimiento.
  Ejemplos reales de su cuenta, en dos registros:
  · liviano/producto: "Textura increíble!" · "Finito, súper flat, para llevarlo con vos! 💋"
  · elevado/emocional: "La ternura de este stick supera todo lo conocido!" ·
    "Se siente como hogar, cuida hasta las pieles más sensibles ❤️"
- Educativa: explicá para qué sirve, el beneficio y algún ingrediente clave (como hacen ellas:
  "reduce manchas e iguala el tono", "con Vitamina C, E y Ácido Ferúlico"). NADA de rematar con
  descuentos: mové el stock desde lo aspiracional, no desde la oferta.
- Emojis con moderación, como ellas: el 🤍 (su firma) para cerrar cálido, un 💧 como viñeta de beneficios.
- Usá su lenguaje de marca cuando pegue ("el toque Okio", "Okio lovers"). Cerrá con un CTA cálido
  (reservá / escribinos / envíos a todo el país) y etiquetá la marca del producto (ej. @mesoestetic.argentina).

Tarea: generar contenido para mover un producto con sobre-stock, en la voz de arriba.
- 3 opciones de caption para Instagram, cada una con un ángulo DISTINTO (ej: el beneficio principal;
  para qué tipo de piel o necesidad; la practicidad del formato). Corto: 2 a 4 líneas, con viñetas 💧
  si listás beneficios, y un CTA suave al final (escribinos / reservá / pasá a buscarlo).
- 1 mensaje de difusión de WhatsApp para clientas: 2 oraciones, cálido, presentando el producto y el CTA.`;

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
