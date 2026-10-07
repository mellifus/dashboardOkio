// server.mjs — El mini-backend. Guarda la API key (que NO puede estar en el navegador)
// y expone un endpoint que la página usa. "El lugar donde vive el motor."
//
// Correr:  node server.mjs   (necesita ANTHROPIC_API_KEY en el entorno)
// Variables de entorno:
//   ANTHROPIC_API_KEY  (obligatoria para generar)
//   APP_PASSWORD       (clave de acceso; ponela SIEMPRE al deployar)
//   APP_USER           (usuario, opcional; por defecto "okio")
//   PORT               (lo asigna el hosting; en local, 3000)

import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";
import path from "path";
import { generarRecordatorios, plantillaAntes } from "./generadores.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// --- Protección simple (Basic Auth del navegador) ---
// Con APP_PASSWORD definida, la página y el endpoint quedan detrás de usuario+clave.
// Sin APP_PASSWORD (ej. localhost) queda libre, pero avisamos. SIEMPRE ponela al deployar.
// ponytail: compara en texto plano; suficiente para una herramienta interna de 2 personas.
const APP_USER = process.env.APP_USER || "okio";
const APP_PASSWORD = process.env.APP_PASSWORD;
if (!APP_PASSWORD) {
  console.warn("⚠ Sin APP_PASSWORD: cualquiera con la URL puede usar (y gastar) esto. Ponela antes de deployar.");
}
app.use((req, res, next) => {
  if (!APP_PASSWORD) return next(); // sin clave configurada → libre (desarrollo)
  const [scheme, b64] = (req.headers.authorization || "").split(" ");
  if (scheme === "Basic" && b64) {
    const [u, p] = Buffer.from(b64, "base64").toString().split(":");
    if (u === APP_USER && p === APP_PASSWORD) return next();
  }
  res.set("WWW-Authenticate", 'Basic realm="Okio"');
  return res.status(401).send("Acceso restringido.");
});

app.use(express.json()); // para leer el body JSON de los pedidos
// La demo unificada: el dashboard rediseñado en "/", y la página suelta de recordatorios en /recordatorios.html.
const DASHBOARD = path.join(here, "..", "Dashboard - Claude Design", "propuestas", "dashboard-rediseno.html");
app.get("/", (req, res) => res.sendFile(DASHBOARD));
app.use(express.static(path.join(here, "public")));

// El cliente se crea la primera vez que hace falta (así el server arranca aunque falte la key).
let client;
function getClient() {
  if (!client) client = new Anthropic(); // lee ANTHROPIC_API_KEY del entorno
  return client;
}

// La página le pide acá los borradores de recordatorio.
app.post("/api/recordatorio", async (req, res) => {
  try {
    const turnos = req.body?.turnos;
    if (!Array.isArray(turnos) || turnos.length === 0) {
      return res.status(400).json({ error: "Mandá al menos un turno." });
    }
    // Tope de tamaño: sin esto, un pedido enorme = llamada paga desmesurada al deployar.
    if (turnos.length > 10) {
      return res.status(400).json({ error: "Demasiados turnos de una (máximo 10)." });
    }
    for (const t of turnos) {
      if (
        typeof t?.tratamiento !== "string" || typeof t?.hora !== "string" ||
        t.tratamiento.length > 100 || t.hora.length > 20 ||
        ["nombre", "dia"].some((k) => t[k] != null && (typeof t[k] !== "string" || t[k].length > 40))
      ) {
        return res.status(400).json({ error: "Cada turno necesita tratamiento y hora (texto corto)." });
      }
    }
    const recordatorios = await generarRecordatorios(getClient(), turnos);
    // Devolvemos también el "antes" (fuente única en generadores.mjs) así la página no lo hardcodea.
    const items = recordatorios.map((r, i) => ({ ...r, antes: plantillaAntes(turnos[i]?.hora ?? "") }));
    res.json({ items });
  } catch (e) {
    // Error legible para el que usa la página (ej: falta la API key).
    const msg = /api[_-]?key/i.test(e.message)
      ? "Falta configurar ANTHROPIC_API_KEY en el servidor."
      : e.message;
    res.status(500).json({ error: msg });
  }
});

// El hosting asigna el puerto por PORT; en local usamos 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Okio andando en el puerto ${PORT}`));
