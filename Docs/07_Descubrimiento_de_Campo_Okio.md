# 07 · Descubrimiento de campo: Okio

**Estado:** v3, 2026-10-06
**Owner:** Meli
**Fuentes:** (1) lo que vio Meli **como clienta** durante su turno del 2026-09-11; (2) el historial de WhatsApp entre Meli y la recepción de Okio (~jul–sep 2026), sumado el 2026-09-12; (3) el mismo chat entre el 28/09 y el 05/10, sumado el 2026-10-06 (ver las dos "Actualización" al final). Ninguna es una encuesta ni una entrevista formal. Es evidencia de campo.

---

## Hechos observados (solo lo que pasó, sin interpretar)

1. **El recordatorio del turno no decía qué tratamiento era.** Okio le mandó por WhatsApp un recordatorio de que tenía turno ese día, sin decir de qué. Meli se hace peeling facial, corporal y depilación definitiva en días distintos, así que no sabía a qué iba y fue preparada para las dos cosas por las dudas.
2. **La dueña reconoció el problema en el momento** y le pidió a la recepcionista que la próxima vez deje anotado "el concepto" del turno (qué tratamiento es) para que no vuelva a pasar.
3. **Herramientas que Meli vio o confirmó que usan:** Google Calendar para los turnos y Excel para (creemos) tratamientos y stock. Vio la pantalla de la recepcionista mientras revisaba turnos y un Excel.
4. **NO se vio AgendaPro.** No lo estaban usando. Lo único que teníamos antes era que Okio sigue a AgendaPro en Instagram, y seguir no es usar.
5. **La dueña ya había dicho, en una charla anterior, que tienen "todo disperso".** Encaja con lo de hoy: los turnos en un lado (Calendar) y los tratamientos y el stock en otro (Excel).
6. **Tienen protectores solares de más** y están armando a mano una campaña de publicidad para venderlos.
7. **Canal de contacto:** la dueña dijo que le interesaba la idea de Meli **dos veces, en persona**. Pero la derivó a un mail que **nunca contestaron** (dos intentos por el canal formal, ninguna respuesta).

## Qué responde esto

Esto **cierra el Ítem abierto #4 de `00_Product_Constraints.md`** ("Validar contra el flujo real de Okio: qué usa hoy para turnos/fichas, si lleva stock/inventario"), que venía figurando como bloqueante de validación. La respuesta, ya sin suponer:
- Turnos en Google Calendar; tratamientos y stock en Excel. Todo disperso, sin una fuente única.
- Sí llevan stock, y les pesa: tienen sobrantes que quieren liquidar.

## Interpretación (esto es lectura de Meli/Claude, NO un hecho observado)

1. **Corrección importante: lo que dije en la sesión anterior estaba MAL.** Había dicho "Okio sigue a AgendaPro, así que probablemente lo está evaluando, así que el incumbente quizás ya tiene a tu clienta". **Es falso.** Okio NO usa AgendaPro; todavía no se digitalizó (Calendar + Excel a mano). Ningún competidor la tiene atada. Seguirlos en Instagram era aspiracional, no una adopción.

2. **Los dolores de Okio son operativos e internos, NO de conversación.** Los tres problemas reales de hoy (el turno sin tratamiento anotado, las herramientas dispersas, el stock de más) son de **organización interna y de modelo de datos**. No tienen que ver con "responder mensajes entrantes".

3. **La brecha, dicha sin vueltas (es lo más importante del documento):** lo que Meli construyó ayer (`ai-triage`: triagear mensajes ENTRANTES de WhatsApp/IG, redactar un borrador, pedir aprobación) **no resuelve ninguno de los dolores que se vieron hoy.** No se tocan en nada. El recordatorio sin tratamiento es un problema de *modelo de datos* (a la ficha del turno le falta un campo "tratamiento"), no de IA. Entonces no hay que dar por hecho que el próximo paso es "enchufar el triage al dashboard" sin antes ver si el dolor de Okio está ahí.

4. **La parte incómoda, siendo honestas:** todos los dolores de hoy (turno con tipo de tratamiento, recordatorio que nombra el servicio, control de stock, envío de campañas) son **justo lo central de AgendaPro**, que ya lo vende resuelto a $19-59/mes. No es motivo para frenar, pero sí es el límite que tiene que darle forma a lo que Meli ofrezca: el dolor más fuerte que vio es el que el incumbente resuelve mejor y más barato.

5. **Lección de canal (para guardar):** la dueña dijo que sí en persona, dos veces. El mail formal no dio nada, dos veces. Lo presencial, el ser clienta, funciona; lo formal no. Vale para Okio y probablemente para clínicas parecidas.

## La pregunta que decide el próximo paso

El dolor de Okio está en el **flujo de mensajes entrantes** (muchos WhatsApp/IG por día, respuestas lentas, leads que se pierden) o en la **organización interna** (fichas, stock, coordinación)?

Lo de hoy apunta a **organización interna**. Si se confirma, el motor de triage, que Meli construyó y está bueno, resuelve un problema que *esta clienta en particular* quizás no siente urgente.

**Próxima acción (NO es una tarea de código):** en el próximo turno, Meli le pregunta a la dueña, en 10 segundos:
> "Cuántos mensajes por WhatsApp e Instagram te llegan por día? Se te pierden?"

Esa respuesta define si la próxima sesión es "enchufar el triage al dashboard" (el plan tal como está) o si hay que girar hacia el dolor operativo. Vale más que otra sesión de build.

## Posibles roles de Meli a validar (si el dolor es de organización interna)

Hipótesis de dónde encaja Meli, **para validar con la pregunta de seguimiento** y no para construir todavía. Descartado de entrada: rehacer lo que AgendaPro ya vende a $30/mes, que es mucho trabajo, compite de frente y mete de lleno el tema de datos de salud. La ventaja de Meli no es técnica. Es **estar adentro**: es clienta, habla con la dueña en persona y conoce el flujo real.

1. **Implementación (servicio). La más realista a corto plazo.** Pasarlas a una herramienta que ya existe: migrar Excel + Calendar a algo ordenado, configurar recordatorios que digan el tratamiento y capacitar a la recepcionista. Es "implementar soluciones", suma al portfolio ("digitalicé una clínica") y arma relación sin tener que ganarle a nadie. *Letra chica:* es un servicio y no un producto que escala, pero es la mejor forma de meter un pie en la puerta.
2. **La capa de IA arriba. El puente con lo que ya construyó.** Lo del stock de más y la campaña es el mismo patrón "la IA redacta, un humano aprueba", pero apuntado HACIA AFUERA (borradores de promo o captions para liquidar stock) en vez de hacia adentro (triage). Es la misma habilidad que `ai-triage` en otra dirección, así que el motor no se tira. *Letra chica:* solo se escuchó UNA campaña (protectores). Es un dato, no prueba de que el marketing les duela seguido. Validar antes de construir.
3. **El pegamento: automatizaciones puntuales.** Lo que ninguna herramienta genérica hace: conectar dos piezas, avisar cuando queda poco stock, recordatorios inteligentes. Es para una fase 2, porque no tiene sentido poner pegamento de IA arriba de un Excel caótico.

**Lectura:** lo más probable es combinar **#1 como entrada** (te vuelve cercana e imprescindible) con **#2 como diferencial** (ahí tu IA suma lo que la herramienta de $30 no da). Cuál aplica depende de la pregunta de seguimiento: *"De todo lo que está disperso, qué es lo que más tiempo o plata te hace perder?"*. "Organización interna" es un paraguas con varios dolores abajo, y solo uno vale la pena.

## Actualización 2026-09-12: lo que muestra el chat de WhatsApp (segunda fuente)

**Fuente nueva:** el historial completo de WhatsApp entre Meli y la recepción de Okio (~jul–sep 2026). Pesa mucho más que la observación única del 11/09, porque son semanas de interacción real. (Acá solo se anotan patrones operativos. Los datos personales o médicos y el número quedan fuera del repo.)

**Varios hallazgos pasan de confianza media a alta:**
- **Turno sin tratamiento (H1): se repite, no fue una anécdota.** Meli preguntó "de qué es el turno?" varias veces a lo largo de semanas. El detalle importante: los recordatorios AUTOMÁTICOS (la plantilla "Buenas tardes, soy Ceci…") no dicen el tratamiento, y cuando la recepción escribe a mano a veces sí lo agrega. O sea, **tapan la falla del sistema con trabajo manual.**
- **Herramientas dispersas, sin fuente única (H2): confirmado en vivo.** Mandan la lista de turnos por WhatsApp "así no se te hace lío", o sea que le llevan la agenda a la clienta a mano. Y se les pasó un turno de su propia agenda ("ayer no advertimos en la agenda…").
- **Falta de tiempo y de capacidad: confirmado, y se repite.** "Estamos con la agenda a full y estamos optimizando los horarios", y reprograman a mano todo el tiempo.

**Por qué no contestaron (aclara la lección de canal):** la recepción mandó la encuesta de Meli a un mail de "el área de mkt de Okio". Era el área equivocada (el tema es operativo, no de marketing) y ahí murió. No fue falta de interés sino un mal ruteo del canal formal.

**Empieza a responder la pregunta que decide el próximo paso:** este chat NO muestra un aluvión de mensajes entrantes. Es una relación operativa: recordatorios, reprogramaciones, pagos, precios de productos. La balanza se inclina hacia **organización interna** más que hacia **inbox flood**, aunque el volumen de mensajes de TODA la clínica (no solo el chat de una clienta) sigue siendo algo para preguntarle a la dueña.

**Qué implica:** refuerza mucho el **rol #1 (columna operativa)**. El pitch, afinado con esto:
> "No te doy una herramienta nueva: automatizo lo que ya hacés a mano cada día (avisar el tratamiento, reacomodar turnos) y te devuelvo ese tiempo."

**Voz:** el chat mostró cómo habla **la recepción por WhatsApp** (cálida, corta, por el nombre, "saludos!"), que no es la misma voz de marketing del feed. Se usó para afinar `ai-triage/recordatorio.mjs`: el "antes" ahora es su plantilla real de recordatorio.

## Actualización 2026-10-06: el chat entre el 28/09 y el 05/10 (tercera fuente)

**Fuente:** el mismo chat de WhatsApp, una semana más. Igual que antes, acá van solo patrones operativos. El número, los motivos de salud y cualquier dato personal quedan fuera del repo.

**H1 (turno sin tratamiento) sigue igual.** El recordatorio automático del 28/09 y el del 02/10 dicen "Paso a recordarte el turno que tenés agendado para [día] [fecha] a las [hora]", sin el tratamiento. Ahora lo firma otra persona de recepción (Pia en vez de Ceci), pero la plantilla no cambió. El dato que falta lo sigue poniendo la recepción a mano, en mensajes aparte.

**H2 (agenda llevada a mano) aparece con más detalle:**
- El 29 y el 30/09 la recepción le mandó a Meli los próximos turnos **de a uno, en mensajes separados** ("Próximo turno depilación 05/10…", "proximo turno peeling Corporal…"). Es la agenda de la clienta reconstruida a mano en el chat.
- En esos dos días, el mismo turno de peeling corporal apareció primero el 13/10 y después el 08/10. La reprogramación existe solo en el chat; nada indica que haya un registro único detrás.
- El 28/09, antes del recordatorio automático, la recepción escribió a mano para confirmar asistencia. Ese día llegaron dos mensajes por el mismo turno: el manual y la plantilla.

**Nuevo: cuando una clienta cancela, la recepción hace la coordinación con la cabeza.** El 05/10 Meli avisó a la mañana que no podía ir. La recepción:
1. Propuso una alternativa para no perder el turno (hacer parte de las zonas ese día y dejar el resto para después).
2. Cruzó sola los otros turnos de Meli ("tengamos en cuenta que el 8 tenes el peeling corporal") y un viaje que Meli tenía, y explicó por qué convenía no solapar la depilación con el peeling.
3. Como Meli no respondió, a la tarde volvió a escribir otra persona de recepción para preguntar qué le había parecido la propuesta de Eli.
4. Cerró dejando la depilación "para cuando vuelvas", sin fecha nueva: "cuando vengas Meli, cordinamos el turnito para depi."

Ese conocimiento (qué tratamientos tiene la clienta, cuáles no conviene juntar, cuándo está de viaje) lo tiene la recepción en la cabeza, no en una herramienta. Y el turno de depilación quedó pendiente sin fecha, que es justo el tipo de cosa que se pierde.

**Voz de la recepción, más precisa:** varios mensajes cortos seguidos en lugar de uno largo, muchos arrancan en minúscula ("perfecto Meli, te esperamos…", "dale Meli!"), sin signos de apertura, diminutivos ("turnito"), y cierres como "un saludo grande!" o "te esperamos!". La plantilla automática, en cambio, sí abre con "Buenas tardes! 😊". Los borradores de la IA tienen que sonar como la recepción, no como la plantilla.

**Qué implica:**
- Refuerza otra vez el **rol #1**: el recordatorio que nombre el tratamiento sigue siendo el dolor más claro, y ahora se suma un segundo candidato concreto, **los turnos que quedan pendientes sin fecha** después de una cancelación.
- La parte de "no juntar tratamientos que se pisan" es criterio de la clínica. Si alguna vez se automatiza, tiene que ser una regla que defina Okio y que la recepción apruebe, igual que la regla ilustrativa de espaciado que ya tiene el prototipo.
- Pregunta para la dueña: *"Cuando una clienta cancela y queda un turno sin fecha, cómo se acuerdan de volver a llamarla?"*

## Documentos relacionados
- `00_Product_Constraints.md`: Ítem abierto #4 (este documento lo responde).
- `00_Project_Vision.md`: el cambio a nail-one-then-scale.
- Plan de trabajo: `C:\Users\melin\.claude\plans\zippy-inventing-hollerith.md`.
