# 07 — Descubrimiento de Campo: Okio

**Estado:** v1 — 2026-09-11
**Owner:** Meli
**Fuente:** observación directa de Meli **siendo clienta** de Okio, durante su propio turno (peeling facial) el 2026-09-11. No es una encuesta ni una entrevista formal — es lo que vio y escuchó en el lugar.

---

## Hechos observados (solo lo que pasó, sin interpretar)

1. **El recordatorio de turno no decía qué tratamiento era.** Okio le mandó un recordatorio por WhatsApp de que tenía turno hoy, pero sin especificar cuál. Meli se hace peeling facial, corporal y depilación definitiva en días distintos, así que no sabía a qué iba y se preparó para las dos cosas por las dudas.
2. **La dueña reconoció el problema en el momento** y le pidió a la recepcionista que para la próxima deje asentado "el concepto" del turno (qué tratamiento es) para que no vuelva a pasar.
3. **Herramientas que Meli vio/confirmó que usan:** Google Calendar (para los turnos) y Excel (para —se estima— tratamientos y stock). Vio la pantalla de la recepcionista mientras miraba turnos y un Excel.
4. **NO se observó AgendaPro.** No estaban usando AgendaPro. (Lo único previo era que Okio los sigue en Instagram — eso es seguir, no usar.)
5. **La dueña ya había dicho, en una charla previa, que tienen "todo disperso".** Consistente con lo de hoy: turnos en un lado (Calendar), tratamientos/stock en otro (Excel).
6. **Tienen sobre-stock de protectores solares** y están organizando (a mano) una campaña de publicidad para moverlos.
7. **Canal de contacto:** la dueña dijo que sí le interesaba la idea de Meli — **dos veces, en persona**. Pero derivó a un mail que **no fue contestado** (dos intentos por canal formal, cero respuesta).

## Qué responde esto

Esto **cierra el Ítem Abierto #4 de `00_Product_Constraints.md`** ("Validar contra el flujo real de Okio: qué usa hoy para turnos/fichas, si lleva stock/inventario"), que venía cargándose como bloqueante de validación. Respuesta, ya no supuesta:
- Turnos → Google Calendar. Tratamientos/stock → Excel. Dispersos, sin fuente única.
- Sí llevan stock (y les pesa: tienen sobrantes que quieren liquidar).

## Interpretación (esto es lectura de Meli/Claude, NO hecho observado)

1. **Corrección importante: lo que dije en la sesión anterior estaba MAL.** Yo había dicho "Okio sigue a AgendaPro → probablemente lo está shoppeando → el incumbente puede tener ya a tu clienta". **Falso.** Okio NO usa AgendaPro; está en estado pre-digitalización (Calendar + Excel a mano). No hay lock-in de ningún competidor. Seguir en Instagram era aspiracional, no adopción.

2. **Los dolores de Okio son operativos/internos, NO conversacionales.** Los tres problemas reales que aparecieron hoy —el turno sin tratamiento asentado, las herramientas dispersas, el sobre-stock— son de **organización interna y modelo de datos**, no de "responder mensajes entrantes".

3. **GAP a nombrar sin vueltas (esto es lo más importante del documento):** lo que Meli construyó ayer (`ai-triage`: triagear mensajes ENTRANTES de WhatsApp/IG → borrador → aprobación) **no resuelve ninguno de los dolores que se vieron hoy.** Cero overlap. El recordatorio-sin-tratamiento es un problema de *modelo de datos* (a la ficha de turno le falta un campo "tratamiento"), no de IA. → No dar por sentado que el próximo paso es "enchufar el triage al dashboard" sin antes chequear si el dolor de Okio vive ahí.

4. **La mitad incómoda, para ser honestos:** todos los dolores de hoy —turno con tipo de tratamiento, recordatorio que nombra el servicio, control de stock, envío de campaña— son **exactamente el core de AgendaPro**, que ya lo vende hecho a $19-59/mes. No es razón para frenar, pero sí la restricción que tiene que dar forma a lo que Meli ofrezca: el dolor más agudo que observó es el que el incumbente resuelve mejor y más barato.

5. **Lección de canal (guardar):** la dueña dijo "sí" en persona, dos veces. El mail formal produjo nada, dos veces. El canal presencial / ser-clienta funciona; el formal no. Sirve para Okio y probablemente para clínicas parecidas.

## La pregunta que decide el próximo paso

El dolor de Okio, ¿vive en el **flujo de mensajes entrantes** (muchos WhatsApp/IG por día, respuestas lentas, leads que se pierden) o en la **organización interna** (fichas, stock, coordinación)?

La evidencia de hoy apunta a **organización interna**. Si eso se confirma, el motor de triage —lo que Meli construyó y está buena— resuelve un problema que *esta clienta en particular* quizás no siente como urgente.

**Próxima acción (NO es una tarea de código):** en el próximo turno, Meli le pregunta a la dueña, en 10 segundos:
> "¿Cuántos mensajes por WhatsApp e Instagram te llegan por día? ¿Se te pierden?"

Esa respuesta decide si la próxima sesión es "enchufar el triage al dashboard" (el plan como está hoy) o pivotear hacia el dolor operativo. Vale más que otra sesión de build.

## Posibles roles de Meli a validar (si el dolor es organización interna)

Hipótesis de dónde encaja Meli, **a validar con la pregunta de seguimiento**, no a construir todavía. Descartado de entrada: rebuildear lo que AgendaPro ya vende a $30/mes (mucho trabajo, compite de frente, activa el pantano de datos de salud). La ventaja de Meli no es técnica — es **estar adentro** (es clienta, le entra a la dueña en persona, conoce el flujo real).

1. **Implementación (servicio) — la más realista a corto plazo.** Ponerlas en un tool que ya existe: migrar Excel + Calendar a algo ordenado, configurar recordatorios que digan el tratamiento, entrenar a la recepcionista. Es "implementar soluciones" + portfolio ("digitalicé una clínica") + construye relación, sin tener que ganarle a nadie. *Letra chica:* es servicio, no producto que escala; pero es el pie en la puerta más sólido.
2. **La capa de IA encima — el puente con lo que ya construyó.** El sobre-stock → campaña es el patrón "IA redacta, humano aprueba" apuntado hacia AFUERA (borradores de promo / captions para liquidar stock), en vez de hacia adentro (triage). Misma skill que `ai-triage`, otra dirección → el motor no se tira. *Letra chica:* se escuchó UNA campaña (protectores); es un dato, no prueba de dolor de marketing recurrente. Validar antes de construir.
3. **El pegamento — automatizaciones puntuales.** Lo que ningún tool genérico hace: conectar dos piezas, avisos de stock bajo, recordatorios inteligentes. Fase 2 — no se pone pegamento de IA arriba de un Excel caótico.

**Lectura:** el combo probable = **#1 como entrada** (te hace cercana e imprescindible) + **#2 como diferencial** (donde tu IA agrega lo que el tool de $30 no da). Cuál aplica depende de la pregunta de seguimiento: *"De todo lo disperso, ¿qué es lo que más te hace perder tiempo o plata?"* — "organización interna" es un paraguas con varios dolores abajo, y solo uno vale la pena.

## Documentos relacionados
- `00_Product_Constraints.md` — Ítem Abierto #4 (queda respondido por este documento).
- `00_Project_Vision.md` — el reframe nail-one-then-scale.
- Plan de trabajo: `C:\Users\melin\.claude\plans\zippy-inventing-hollerith.md`.
