// server.mjs — El mini-backend. Guarda la API key (que NO puede estar en el navegador)
// y expone un endpoint que la página usa. "El lugar donde vive el motor."
//
// Correr:  node server.mjs   (necesita ANTHROPIC_API_KEY en el entorno)
// Después abrí http://localhost:3000 en el navegador.

import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";
import path from "path";
import { generarRecordatorios, plantillaAntes } from "./generadores.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json()); // para leer el body JSON de los pedidos
app.use(express.static(path.join(here, "public"))); // sirve la página desde /public

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
        t.tratamiento.length > 100 || t.hora.length > 20
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

const PORT = 3000;
app.listen(PORT, () => console.log(`Okio andando en http://localhost:${PORT}`));
