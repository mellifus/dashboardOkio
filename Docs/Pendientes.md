# Pendientes (backlog)

Ideas y mejoras anotadas para retomar, no urgentes. La más nueva arriba.

---

## IA redacta la respuesta de reprogramación (humano elige hueco → IA redacta)

**Estado:** pendiente, a decidir. Anotado 2026-10-08.

**Contexto:** hoy, cuando una clienta cancela o reprograma (el caso de Sofía en la vista "Mensajes" de `Dashboard - Claude Design/propuestas/dashboard-rediseno.html`), la respuesta la escribe recepción a mano, sin borrador del copiloto. Es una decisión de diseño **deliberada**: en el código, el cierre `humano` tiene un comentario explícito ("no es un borrador del copiloto"), y la razón está en `Demo_octubre_unificada.md` — una cancelación necesita ofrecer un hueco **real**, que la IA no conoce.

**La mejora propuesta (respeta el diseño):** recepción aprieta "Ver huecos" → elige un hueco real → y ahí la IA redacta el mensaje cálido alrededor de ese horario ("No pasa nada Sofía! Te puedo ofrecer el viernes a las 18, te sirve?"). El humano pone la disponibilidad, la IA solo redacta. Mantiene las dos reglas: *nada se envía solo* + *la IA no inventa huecos*.

**Paso 0 — decisión de producto (no código): vale cambiarlo?**
- **Para el pitch a Okio:** conviene **dejarlo como está**. "La cancelación la resuelve la persona, no la IA" es un punto a favor para mostrar control humano. No tocar una demo que funciona antes de mostrarla.
- **Para aprender / portfolio:** hacerlo, en la versión "humano elige hueco → IA redacta".

**Plan técnico (si se hace):**
1. `ai-triage/generadores.mjs`: función nueva `generarReprogramacion(nombre, tratamiento, nuevoDia, nuevaHora)` — reusa `voz.mjs`, mismo patrón que `generarRecordatorios`.
2. `ai-triage/server.mjs`: endpoint chico `/api/reprogramacion`.
3. `Dashboard - Claude Design/propuestas/dashboard-rediseno.html` (~L671, panel de Sofía, cierre `humano`): después de elegir un hueco, mostrar un borrador del copiloto en vez de la caja en blanco.

**Caveat:** ese HTML lo construyeron otras sesiones y hay trabajo en paralelo (PRs mergeándose). Leer la sección entera antes de tocar, y cuidar de no pisarse con otra sesión.

**Relacionado:** `Demo_octubre_unificada.md`, `14_Decision_Log.md` (D2: la IA redacta, los humanos aprueban).
