// triage.mjs — Primer paso real de IA para la plataforma de Okio.
//
// Qué hace: toma un mensaje entrante (de mentira, del tenant sintético "Bella Vita")
// y usa Claude para clasificarlo + redactar una respuesta sugerida. NADA se envía:
// el script solo imprime el borrador para que un humano lo apruebe. Ese es el
// diferencial no-negociable frente a AgendaPro (sus agentes auto-responden).
//
// Correr:   node triage.mjs          (llama a la API — necesita ANTHROPIC_API_KEY)
//           node triage.mjs --test   (self-check determinístico, gratis, sin API)

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

// Modelo. Default: el más capaz. Si querés abaratar mientras aprendés y hacés
// muchas corridas, cambiá a "claude-haiku-4-5" — es ~5x más barato para esta tarea.
const MODEL = "claude-opus-5";

// La forma exacta que tiene que devolver la IA. Zod la valida por vos: si el modelo
// devuelve algo que no encaja, parsed_output viene null en vez de romper silencioso.
const TriageSchema = z.object({
  categoria: z.enum([
    "Reprogramación",
    "Consulta de precio",
    "Reserva nueva",
    "Consulta médica",
    "Otro",
  ]),
  sentimiento: z.enum(["positivo", "neutral", "negativo", "urgente"]),
  confianza: z.number().min(0).max(1), // qué tan segura está la IA de la categoría
  resumen: z.string(), // una línea para la tarjeta "Copiloto IA"
  borrador: z.string(), // la respuesta sugerida (que el humano aprueba o edita)
  escalar_a_profesional: z.boolean(),
});

const SYSTEM = `Sos el copiloto de una clínica estética en Argentina (español rioplatense, voseo).
Recibís mensajes de clientas por WhatsApp e Instagram y ayudás a la recepción a responder.

Reglas:
- Redactás un borrador; SIEMPRE lo aprueba un humano. Nunca hablás como si el mensaje ya se hubiera enviado.
- El borrador es un mensaje de WhatsApp/Instagram, no un email: máximo 2 oraciones cortas.
  Si necesitás un dato, pedí uno solo. Nada de párrafos, ni saludos o cierres largos.
- Escribí como se chatea: NO uses los signos de apertura ¿ ni ¡, solo cerrá con ? o !.
  Ejemplo: escribí "Me confirmás el horario?" y NO "¿Me confirmás el horario?".
- Si el mensaje describe un síntoma, complicación o reacción tras un tratamiento (hinchazón,
  dolor, fiebre, infección, alergia, sangrado, etc.), es una "Consulta médica": NO das consejo
  médico ni minimizás el síntoma. Escalás al profesional tratante y escalar_a_profesional = true.
- Tono cálido y directo, sin exagerar. Sin emojis salvo que la clienta los use.`;

// Red de seguridad determinística: aunque la IA clasifique mal, si el mensaje matchea
// esto lo forzamos a "Consulta médica". Solo síntomas INEQUÍVOCOS (algo que ya le está
// pasando al cuerpo). Sacamos a propósito las palabras ambiguas (dolor, duele, ardor):
// "miedo al dolor" antes de un tratamiento es un lead de venta, no un síntoma — y la IA
// distingue ese contexto mejor que un filtro de palabras. Para lo ambiguo confiamos en ella.
const MEDICAL_RED_FLAGS =
  /\b(hinchaz|hinchad|inflamad|fiebre|infecci|pus|sangr|alergi|reacci|ampolla|morat|quemadura)/i;

const SAFE_MEDICAL_DRAFT =
  "Hola, gracias por escribirnos. Vamos a derivar tu consulta a la profesional que te " +
  "atendió para que la revise a la brevedad. Si notás que el síntoma empeora, no dudes en " +
  "contactar a una guardia médica.";

// Red de seguridad: corre DESPUÉS de la IA y tiene la última palabra en lo médico.
// Determinística y testeable sin llamar a la API.
export function enforceMedicalSafety(mensaje, triage) {
  if (MEDICAL_RED_FLAGS.test(mensaje)) {
    return {
      ...triage,
      categoria: "Consulta médica",
      escalar_a_profesional: true,
      borrador: SAFE_MEDICAL_DRAFT,
    };
  }
  return triage;
}

// Blindaje de formato determinístico: saca los signos de apertura ¿ ¡ del borrador,
// pase lo que pase con el prompt. Igual que la red médica, no dependemos de que la IA obedezca.
export function sinSignosDeApertura(texto) {
  return texto.replace(/[¿¡]/g, "");
}

// Los mensajes de ejemplo (tenant sintético "Bella Vita" — cero datos reales).
const MENSAJES = [
  { canal: "Instagram", texto: "Hola! Cuánto sale el botox de frente? Estaría para reservar esta semana 😊" },
  { canal: "WhatsApp", texto: "Buenas, tengo turno mañana 10hs pero me surgió algo. Habrá otro horario esta semana?" },
  { canal: "WhatsApp", texto: "Me hice el relleno ayer y hoy tengo la zona muy hinchada y con bastante dolor, es normal??" },
];

async function triageMessage(client, mensaje) {
  const res = await client.messages.parse({
    model: MODEL,
    max_tokens: 1024,
    system: SYSTEM,
    output_config: {
      effort: "low", // clasificar + un borrador corto no necesita más; sale más barato y rápido
      format: zodOutputFormat(TriageSchema),
    },
    messages: [{ role: "user", content: mensaje.texto }],
  });

  if (!res.parsed_output) {
    throw new Error("La IA no devolvió un resultado con la forma esperada.");
  }
  const triage = enforceMedicalSafety(mensaje.texto, res.parsed_output);
  // El prompt pide no usar ¿ ¡; esto lo garantiza aunque a la IA se le escape.
  return { ...triage, borrador: sinSignosDeApertura(triage.borrador) };
}

function imprimir(mensaje, t) {
  const barra = (n) => "█".repeat(Math.round(n * 10)).padEnd(10, "·");
  console.log(`\n[${mensaje.canal}] "${mensaje.texto}"`);
  console.log(`  Categoría:   ${t.categoria}  (${t.sentimiento})`);
  console.log(`  Confianza:   ${barra(t.confianza)} ${Math.round(t.confianza * 100)}%`);
  console.log(`  Resumen:     ${t.resumen}`);
  if (t.escalar_a_profesional) console.log("  ⚠ Escalar a la profesional tratante");
  console.log(`  Borrador:    ${t.borrador}`);
  console.log("  → Nada se envía hasta que un humano apruebe.");
}

// --- Self-check: corre con `node triage.mjs --test`, sin API, gratis. ---
function runSelfCheck() {
  const assert = (cond, msg) => {
    if (!cond) throw new Error("FALLÓ: " + msg);
  };

  // Un mensaje benigno no debe tocarse.
  const benigno = { categoria: "Consulta de precio", sentimiento: "positivo", confianza: 0.9, resumen: "x", borrador: "hola", escalar_a_profesional: false };
  const r1 = enforceMedicalSafety("Cuánto sale el botox?", benigno);
  assert(r1.categoria === "Consulta de precio" && r1.borrador === "hola", "un mensaje sin síntomas no debería alterarse");

  // Un síntoma mal clasificado por la IA debe forzarse a médico + escalar + borrador seguro.
  const malClasificado = { categoria: "Consulta de precio", sentimiento: "neutral", confianza: 0.8, resumen: "x", borrador: "Te paso la lista de precios!", escalar_a_profesional: false };
  const r2 = enforceMedicalSafety("Tengo la zona hinchada y con dolor", malClasificado);
  assert(r2.categoria === "Consulta médica", "un síntoma debe forzarse a Consulta médica");
  assert(r2.escalar_a_profesional === true, "un síntoma debe escalar a la profesional");
  assert(r2.borrador === SAFE_MEDICAL_DRAFT, "un síntoma no debe llevar borrador con precios ni consejo médico");

  // Regresión (bug encontrado 2026-09-10): "miedo al dolor" es un lead, no un síntoma.
  // La red afinada NO debe forzarlo a médico solo porque aparece la palabra "dolor".
  const lead = { categoria: "Reserva nueva", sentimiento: "positivo", confianza: 0.7, resumen: "x", borrador: "Dale, coordinamos!", escalar_a_profesional: false };
  const r3 = enforceMedicalSafety("quiero botox pero tengo miedo al dolor", lead);
  assert(r3.categoria === "Reserva nueva", "'miedo al dolor' antes de un tratamiento no es un síntoma médico");
  assert(r3.escalar_a_profesional === false, "'miedo al dolor' no debe escalar a la profesional");

  // El blindaje de formato saca los signos de apertura del borrador.
  assert(sinSignosDeApertura("¿Me confirmás? ¡Gracias!") === "Me confirmás? Gracias!", "el blindaje debe sacar ¿ y ¡");

  console.log("✓ Self-check OK — la red de seguridad médica y el blindaje de formato funcionan.");
}

async function main() {
  if (process.argv.includes("--test")) {
    runSelfCheck();
    return;
  }
  const client = new Anthropic(); // lee ANTHROPIC_API_KEY del entorno

  // Si le pasás un mensaje entre comillas, triagea solo ese (ideal para jugar):
  //   node triage.mjs "hola, tengo turno mañana pero me surgió algo"
  // Sin argumentos, usa los 3 mensajes de ejemplo de arriba (la lista MENSAJES).
  const argsLibres = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const mensajes = argsLibres.length
    ? [{ canal: "Prueba", texto: argsLibres.join(" ") }]
    : MENSAJES;

  for (const m of mensajes) {
    imprimir(m, await triageMessage(client, m));
  }
}

main().catch((e) => {
  console.error("\nError:", e.message);
  process.exit(1);
});
