# 00 — Visión del Proyecto

**Estado:** Draft v0.4 — pivote de alcance el 2026-07-31: de "SaaS para el mercado de clínicas estéticas" a "solución a medida para Okio, con opción de generalizar después." Corrige además un malentendido de nombres (ver nota abajo).
**Owner:** Meli
**Última actualización:** 2026-07-31

---

## Nota de corrección (2026-07-31)

Las versiones anteriores de este documento trataban "Okio" como el nombre del producto. Es un error: **Okio es el nombre real de la clínica** — la clienta concreta para la que se está construyendo esto. El software en sí todavía no tiene nombre propio, y por ahora no lo necesita: no se está armando una marca para vender a un mercado, se está armando una herramienta a medida para un cliente real. Este documento usa "la plataforma" para referirse al software de acá en adelante, y "Okio" exclusivamente para la clínica. Ponerle nombre al software queda como una decisión futura, relevante recién si se decide generalizar (ver Objetivo, abajo). La Decisión D3 del Decision Log se corrigió en consecuencia.

## Propósito

Este documento define por qué debería existir esta plataforma, qué NO es, y cuál es la pregunta estratégica de la que depende todo lo demás en `/docs`. Se escribe *después* de que ya existía un prototipo interactivo (`Clinic Platform UX.dc.html`, tenant name "Bella Vita") — lo cual es inusual y vale la pena nombrar de entrada en lugar de simular que este es un ejercicio desde cero.

## Objetivo (redefinido 2026-07-31)

**Objetivo confirmado: nail-one-then-scale.** La prioridad inmediata es construir algo que funcione de verdad para Okio — una clínica real, con su dueña, su flujo real de WhatsApp/Instagram, y sus clientas reales — y que además funcione como pieza de portfolio. La ambición más amplia de "Sistema Operativo de IA para Clínicas Estéticas" como producto vendible a muchas clínicas queda como una posibilidad futura, no como el objetivo que gobierna las decisiones de ahora. Esto tiene consecuencias concretas y deliberadas:

- Ya no hace falta validar con 5–10 clínicas qué usan hoy — alcanza con preguntárselo a Okio directamente, porque el producto se construye para ella, no para "el mercado."
- El modelo de datos, la arquitectura de integraciones y el alcance del MVP se diseñan alrededor del flujo *real* de Okio (sus herramientas actuales, su volumen real, su catálogo real), no alrededor de un caso genérico.
- Lo que hoy se construye de forma específica para Okio puede necesitar rediseño si en el futuro se decide generalizar a otras clínicas — esto es un trade-off aceptado a propósito, no un descuido. Ver Riesgos.
- La documentación se simplifica: se prioriza tener specs concretas y accionables para Okio por sobre documentos de estrategia de mercado, pricing para escalar, o roadmap multi-cliente. Ver Documentos Relacionados para cómo queda la estructura de `/docs`.

## Contexto

Antes de que existiera ningún documento de Visión, Glosario o Modelo de Dominio, ya se había construido un dashboard completo de seis vistas: Calendario, Clientes, Centro de Solicitudes, Catálogo, Seguimientos, Analytics. Ese prototipo tomó decenas de decisiones de producto reales — en código, no por escrito. Algunas son acertadas y vale la pena conservarlas. Algunas contradicen la misión declarada. Algunas nunca se decidieron en absoluto.

Este documento trata al prototipo como evidencia, no como verdad establecida. Cada decisión que encarna se marca como **ratificada**, **cuestionada**, o **marcada como conflicto**.

## Declaración de Visión (borrador)

> La plataforma triagea, redacta y actúa sobre cada interacción que tiene Okio con sus clientas — a través de WhatsApp, Instagram, agenda y seguimientos — para que nadie en la clínica tenga que leer un mensaje, recordar un protocolo, o perseguir un turno manualmente. Cada interacción se evalúa por oportunidad de ingreso y riesgo clínico antes de que la vea un humano.

Esta declaración sigue siendo deliberadamente más acotada que "Sistema Operativo de IA para Clínicas Estéticas." Esa frase describe una ambición de categoría posible a futuro, no el objetivo de la construcción actual.

## Decisiones ya incorporadas en el prototipo (ratificar o cuestionar)

Esto es lo que el prototipo ya decidió, haya sido o no una decisión intencional. Estas siguen aplicando bajo el nuevo alcance single-client — de hecho, importan más ahora, porque cada una debería contrastarse contra el flujo real de Okio, no contra un caso genérico.

**1. Cada mensaje entrante se convierte en una "Solicitud," no en una "conversación."** — *Ratificar.* Sigue siendo la idea más fuerte del prototipo, y ahora se puede validar directamente contra cómo Okio maneja sus mensajes hoy.

**2. La IA redacta, los humanos aprueban, nada se envía en automático.** — *Ratificar, no negociable.* Con datos reales de una clienta real en juego, este gate importa todavía más que en el escenario de mercado genérico.

**3. La IA muestra proactivamente oportunidades de ingreso.** — *Ratificar, con cautela.* Validar directamente con Okio si esto le suma o le resulta invasivo, en vez de suponerlo para "el mercado."

**4. Las consultas médicas tienen un camino distinto, con seguridad primero.** — *Ratificar la intención, tratar la implementación como incompleta.* Con datos reales de salud de clientas reales de Okio, esto deja de ser un riesgo teórico — ver Riesgos y el nuevo `05_Privacidad_y_Consentimiento.md`.

**5. El registro del cliente incluye fotos (antes/después), historia clínica y consentimientos firmados.** — *Ya no es hipotético: Okio confirmó que esto va a pasar con datos reales.* Ver la sección nueva abajo y `05_Privacidad_y_Consentimiento.md` — este es ahora el riesgo más urgente del proyecto, no uno especulativo.

**6. Control de stock/inventario de productos inyectables.** — *Cuestionar, pero ahora es fácil de resolver: preguntarle a Okio si lleva stock hoy y cómo.* Si no es un dolor real para ella, se corta sin más discusión.

**7. Utilización de personal y KPIs de la clínica.** — *Cuestionar, mismo criterio: validar con Okio si le importa esto o no.*

**8. Selector de multi-sede.** — *Resuelto: se saca.* Okio es una clínica de una sola sede; esto directamente no aplica.

## Datos Reales de Clientas: de Riesgo Teórico a Prioridad Inmediata (nuevo, 2026-07-31)

Okio confirmó que va a usar la plataforma en producción, con datos reales de sus clientas — incluyendo fotos y potencialmente historia clínica. Esto cambia el Riesgo 1 (más abajo) de una preocupación regulatoria a futuro a **el ítem que hay que resolver antes de cargar el primer dato real**, con una complicación concreta ya identificada:

Okio hace firmar hoy a sus clientas un documento de consentimiento para tomar y guardar fotos en su historial médico. Ese consentimiento fue redactado (razonablemente) pensando en el uso interno tradicional de la clínica — no en que un tercero (la plataforma, con Meli como quien la construye y potencialmente aloja los datos) almacene, procese o eventualmente aplique IA sobre esas fotos. **No corresponde asumir que ese consentimiento ya cubre este nuevo uso.** Un consentimiento para fotografía médica interna y un consentimiento para procesamiento por un proveedor de software externo — potencialmente con IA de por medio — son, en la mayoría de los marcos de protección de datos (incluida la Ley 25.326 argentina, que trata a los datos de salud como "datos sensibles"), dos autorizaciones distintas. Ver `05_Privacidad_y_Consentimiento.md` para el detalle de qué probablemente falta y qué llevarle a un abogado — este documento no reemplaza asesoría legal real, y no debería tratarse como si la resolviera.

Hay además una segunda dimensión, independiente de la anterior: si esto se va a mostrar públicamente como pieza de portfolio, usar el nombre real de la clínica y describir cómo maneja datos reales de salud de sus clientas requiere el permiso explícito de Okio para ser nombrada/mostrada públicamente — un consentimiento distinto del que firman sus clientas, y que hoy no está confirmado. Ver también `05_Privacidad_y_Consentimiento.md`.

## Assumptions

- **Objetivo:** nail-one-then-scale — construir para Okio, mantener la puerta abierta a generalizar (ratificado 2026-07-31).
- **Producción real, no demo:** la plataforma va a manejar datos reales de clientas de Okio desde el pilotaje (ratificado 2026-07-31). Esto activa de inmediato los riesgos de datos de salud — ver arriba.
- **Vertical:** clínica estética (Botox, relleno, láser, peelings) — confirmado por ser el rubro real de Okio, ya no una suposición de mercado.
- **Una única clínica, una única sede** — Okio es la unidad de despliegue completa; no hay "otras sedes" que considerar en este alcance.
- **WhatsApp e Instagram son los únicos canales** — a confirmar contra cómo Okio realmente recibe mensajes hoy.
- **Argentina, ARS, `+54`, Ley 25.326** — geografía y régimen regulatorio de Okio, ya confirmados.
- **Mecanismo de precios:** cotizar en USD, cobrar equivalente en ARS — ratificado como dirección general, con sub-decisiones aún abiertas (ver `00_Product_Constraints.md`).

## Preguntas Abiertas

- ~~¿Cuál es el nombre del producto?~~ **Corregido 2026-07-31: no aplica todavía.** Okio es la clínica, no el producto. Ponerle nombre a la plataforma se pospone hasta que (si) se decida generalizar.
- ~~¿Layer o platform?~~ **Efectivamente resuelto por el cambio de objetivo:** para Okio específicamente, la respuesta sale de preguntarle directamente qué usa hoy — no hace falta la validación de mercado de 5–10 clínicas mientras el alcance sea nail-one. Esa validación más amplia vuelve a ser relevante solo si se decide generalizar — ver Mejoras Futuras.
- **Nueva, urgente:** ¿el consentimiento de fotos que ya firman las clientas de Okio alcanza para este uso, o hace falta un documento nuevo? Ver `05_Privacidad_y_Consentimiento.md`. Bloquea cualquier carga de datos reales de clientas.
- **Nueva:** ¿Okio autoriza explícitamente ser nombrada y mostrada en un portfolio público? Independiente de la anterior.
- Mecánica de precios (tipo de cambio de referencia, momento, cadencia de recálculo) — sigue abierta, ver `00_Product_Constraints.md`.

## Riesgos

1. **Datos de salud reales sin consentimiento actualizado.** ~~Antes era un riesgo teórico de "si se llega a almacenar esto."~~ Ahora es concreto: Okio va a cargar fotos y posiblemente historia clínica real de clientas reales. Cargar estos datos antes de confirmar (idealmente con un abogado) que el consentimiento existente cubre este uso es el riesgo de mayor impacto de todo el proyecto en este momento — más que cualquier decisión de arquitectura. Ver `05_Privacidad_y_Consentimiento.md`.
2. **Sobreajustar la plataforma a las particularidades de Okio y perder generalizabilidad**, si en el futuro se decide escalar a otras clínicas. Aceptado como trade-off deliberado del objetivo nail-one-then-scale — no es un riesgo a evitar hoy, es uno a recordar cuando llegue el momento de generalizar.
3. **Clasificación errónea por IA de una complicación médica como rutinaria.** Sigue vigente, y ahora con una clienta real de por medio en lugar de un caso hipotético.
4. **Dependencia de plataforma de Meta (WhatsApp Business API, Instagram).** Sigue vigente.
5. **Exponer públicamente (en el portfolio) el nombre de una clínica real junto con detalles de cómo maneja datos sensibles de salud**, sin su permiso explícito para eso. Riesgo reputacional para Okio y potencial riesgo legal/de confianza para Meli si se hace sin ese consentimiento.

## Mejoras Futuras

- Generalizar la plataforma a otras clínicas (la ambición original de "Sistema Operativo de IA para Clínicas Estéticas"), si nail-one-then-scale valida que hay algo que vale la pena escalar. En ese momento, retomar: nombre de producto propio, validación de mercado con 5–10 clínicas, modelo de pricing pensado para escalar, soporte multi-sede.
- Canales adicionales, inventario, KPIs de personal — todo sujeto a validación directa con Okio, no a supuestos de mercado.

## Documentos Relacionados

- `00_Product_Constraints.md` — actualizado 2026-07-31 con el nuevo alcance.
- `05_Privacidad_y_Consentimiento.md` — **nuevo, creado 2026-07-31.** El documento más urgente del set ahora mismo.
- `14_Decision_Log.md` — actualizado 2026-07-31, incluye la corrección de D3.
- El resto de la estructura de `/docs` original (Glosario, MVP Scope orientado a mercado, Buyer List, Roadmap multi-cliente) queda en pausa mientras el alcance sea single-client — se retoma si se generaliza.
