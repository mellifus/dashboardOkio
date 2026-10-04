# 00 · Visión del proyecto

**Estado:** Draft v0.4. El 2026-07-31 cambió el alcance: pasó de "SaaS para el mercado de clínicas estéticas" a "solución a medida para Okio, con opción de generalizar después". Esta versión también corrige una confusión de nombres (ver la nota de abajo).
**Owner:** Meli
**Última actualización:** 2026-07-31

---

## Nota de corrección (2026-07-31)

Las versiones anteriores de este documento usaban "Okio" como nombre del producto. Estaba mal: **Okio es el nombre real de la clínica**, la clienta concreta para la que se construye esto. El software todavía no tiene nombre y por ahora no le hace falta, porque no estamos armando una marca para venderle a un mercado sino una herramienta a medida para un cliente real. De acá en adelante, "la plataforma" es el software y "Okio" es solo la clínica. Ponerle nombre al software queda para más adelante, y solo importa si se decide generalizar (ver Objetivo). La Decisión D3 del Decision Log se corrigió en el mismo sentido.

## Propósito

Este documento explica por qué debería existir la plataforma, qué NO es, y cuál es la pregunta estratégica de la que depende todo lo demás en `/docs`. Se escribió *después* de que ya existía un prototipo interactivo (`Clinic Platform UX.dc.html`, tenant name "Bella Vita"). Es un orden raro, y conviene decirlo de entrada en vez de hacer como que se arranca de cero.

## Objetivo (redefinido 2026-07-31)

**Objetivo confirmado: nail-one-then-scale.** Lo primero es construir algo que le funcione de verdad a Okio (una clínica real, con su dueña, su flujo real de WhatsApp/Instagram y sus clientas reales) y que además sirva como pieza de portfolio. La idea más grande, un "Sistema Operativo de IA para Clínicas Estéticas" que se venda a muchas clínicas, queda como posibilidad futura. No es lo que decide las cosas hoy. Eso tiene consecuencias concretas, y son a propósito:

- Ya no hace falta hacer la ronda de 5 a 10 clínicas para preguntarles qué usan hoy. Alcanza con preguntarle a Okio, porque el producto es para ella y no para "el mercado".
- El modelo de datos, la arquitectura de integraciones y el alcance del MVP se diseñan alrededor del flujo *real* de Okio: sus herramientas actuales, su volumen, su catálogo. Nada de casos genéricos.
- Lo que hoy se hace a medida para Okio quizás haya que rediseñarlo si más adelante se generaliza a otras clínicas. Es un trade-off aceptado a propósito (ver Riesgos).
- La documentación se achica: se priorizan specs concretas para Okio antes que estrategia de mercado, pricing para escalar o roadmap multi-cliente. En Documentos relacionados está cómo queda `/docs`.

## Contexto

Antes de escribir cualquier Visión, Glosario o Modelo de Dominio, ya había un dashboard completo de seis vistas: Calendario, Clientes, Centro de Solicitudes, Catálogo, Seguimientos y Analytics. Ese prototipo tomó decenas de decisiones de producto reales, pero en código y no por escrito. Algunas están bien y conviene conservarlas. Otras contradicen la misión que declaramos. Y otras nunca se decidieron.

Este documento trata al prototipo como evidencia, no como verdad. Cada decisión que contiene queda marcada como **ratificada**, **cuestionada** o **marcada como conflicto**.

## Declaración de visión (borrador)

> La plataforma triagea, redacta y actúa sobre cada interacción que tiene Okio con sus clientas (WhatsApp, Instagram, agenda y seguimientos) para que nadie en la clínica tenga que leer un mensaje, acordarse de un protocolo o perseguir un turno a mano. Antes de que la vea un humano, cada interacción se evalúa por oportunidad de ingreso y por riesgo clínico.

La declaración es a propósito más acotada que "Sistema Operativo de IA para Clínicas Estéticas". Esa frase es una ambición de categoría para el futuro, no el objetivo de lo que se construye ahora.

## Decisiones que ya trae el prototipo (ratificar o cuestionar)

Esto es lo que el prototipo ya decidió, a propósito o no. Todo sigue valiendo con el alcance single-client, y hasta importa más, porque ahora cada punto se puede contrastar con el flujo real de Okio en vez de con un caso genérico.

**1. Cada mensaje entrante se convierte en una "Solicitud", no en una "conversación".** *Ratificar.* Sigue siendo la mejor idea del prototipo, y ahora se puede validar contra cómo maneja Okio sus mensajes hoy.

**2. La IA redacta, los humanos aprueban, nada se envía solo.** *Ratificar, no se negocia.* Con datos reales de una clienta real, este control importa todavía más que en el escenario de mercado genérico.

**3. La IA muestra por su cuenta oportunidades de ingreso.** *Ratificar, con cuidado.* Hay que preguntarle a Okio si esto le suma o le resulta invasivo, en vez de suponerlo para "el mercado".

**4. Las consultas médicas van por otro camino, con la seguridad primero.** *Ratificar la intención; la implementación está incompleta.* Con datos de salud reales de clientas de Okio, esto deja de ser un riesgo teórico. Ver Riesgos y el nuevo `05_Privacidad_y_Consentimiento.md`.

**5. La ficha de cada cliente incluye fotos (antes/después), historia clínica y consentimientos firmados.** *Ya no es hipotético: Okio confirmó que va a pasar con datos reales.* Ver la sección de abajo y `05_Privacidad_y_Consentimiento.md`. Hoy es el riesgo más urgente del proyecto.

**6. Control de stock de inyectables.** *Cuestionar, aunque ahora es fácil de resolver: preguntarle a Okio si lleva stock y cómo.* Si no le duele, se corta y listo.

**7. Utilización del personal y KPIs de la clínica.** *Cuestionar con el mismo criterio: preguntarle a Okio si le importa.*

**8. Selector de multi-sede.** *Resuelto: se saca.* Okio tiene una sola sede, así que no aplica.

## Datos reales de clientas: de riesgo teórico a prioridad inmediata (nuevo, 2026-07-31)

Okio confirmó que va a usar la plataforma en producción con datos reales de sus clientas, fotos incluidas y posiblemente historia clínica. Con eso, el Riesgo 1 (más abajo) deja de ser una preocupación regulatoria a futuro y pasa a ser **lo que hay que resolver antes de cargar el primer dato real**. Y ya hay una complicación concreta:

Hoy Okio les hace firmar a sus clientas un consentimiento para sacar y guardar fotos en su historial médico. Es razonable que se haya redactado pensando en el uso interno de siempre, y no en que un tercero (la plataforma, con Meli como quien la construye y quizás aloja los datos) guarde, procese o algún día le aplique IA a esas fotos. **No hay que dar por hecho que ese consentimiento cubre el uso nuevo.** En la mayoría de los marcos de protección de datos, incluida la Ley 25.326 argentina (que trata los datos de salud como "datos sensibles"), consentir fotografía médica interna y consentir que un proveedor de software externo procese esos datos, quizás con IA, son dos autorizaciones distintas. El detalle de qué probablemente falta y qué llevarle a un abogado está en `05_Privacidad_y_Consentimiento.md`. Este documento no reemplaza asesoría legal y no hay que leerlo como si la resolviera.

Aparte de eso hay otra cuestión: si esto se va a mostrar públicamente en un portfolio, usar el nombre real de la clínica y contar cómo maneja datos de salud de sus clientas requiere que Okio dé permiso explícito para aparecer. Es un consentimiento distinto del que firman sus clientas, y todavía no está confirmado. Ver también `05_Privacidad_y_Consentimiento.md`.

## Assumptions

- **Objetivo:** nail-one-then-scale. Construir para Okio y dejar la puerta abierta a generalizar (ratificado 2026-07-31).
- **Producción real, no demo:** la plataforma va a manejar datos reales de clientas de Okio desde el piloto (ratificado 2026-07-31). Eso activa ya los riesgos de datos de salud (ver arriba).
- **Vertical:** clínica estética (Botox, relleno, láser, peelings). Está confirmado porque es el rubro de Okio; ya no es una suposición de mercado.
- **Una sola clínica, una sola sede.** Okio es toda la unidad de despliegue; no hay "otras sedes" en este alcance.
- **WhatsApp e Instagram son los únicos canales.** Falta confirmar cómo recibe mensajes Okio hoy.
- **Argentina, ARS, `+54`, Ley 25.326.** La geografía y el régimen regulatorio de Okio, ya confirmados.
- **Precios:** cotizar en USD y cobrar el equivalente en ARS. Está ratificado como dirección general, pero quedan sub-decisiones abiertas (ver `00_Product_Constraints.md`).

## Preguntas abiertas

- ~~¿Cuál es el nombre del producto?~~ **Corregido 2026-07-31: todavía no aplica.** Okio es la clínica, no el producto. El nombre de la plataforma espera hasta que se decida generalizar, si es que se decide.
- ~~¿Layer o platform?~~ **En la práctica lo resolvió el cambio de objetivo.** Para Okio, la respuesta sale de preguntarle qué usa hoy. Mientras el alcance sea nail-one no hace falta validar con 5 a 10 clínicas; eso vuelve a importar solo si se generaliza (ver Mejoras futuras).
- **Nueva, urgente:** ¿alcanza el consentimiento de fotos que ya firman las clientas de Okio, o hace falta un documento nuevo? Ver `05_Privacidad_y_Consentimiento.md`. Hasta resolverlo no se carga ningún dato real de clientas.
- **Nueva:** ¿Okio autoriza de forma explícita que la nombre y la muestre en un portfolio público? Es independiente de la anterior.
- La mecánica de precios (tipo de cambio de referencia, cuándo se toma, cada cuánto se recalcula) sigue abierta; ver `00_Product_Constraints.md`.

## Riesgos

1. **Datos de salud reales sin un consentimiento actualizado.** ~~Antes era un riesgo teórico de "si se llega a almacenar esto."~~ Ahora es concreto: Okio va a cargar fotos, y quizás historia clínica, de clientas reales. Cargar esos datos sin confirmar antes (idealmente con un abogado) que el consentimiento actual cubre este uso es hoy el riesgo más grave del proyecto, más que cualquier decisión de arquitectura. Ver `05_Privacidad_y_Consentimiento.md`.
2. **Ajustar demasiado la plataforma a Okio y que después cueste generalizarla**, si algún día se decide escalar a otras clínicas. Es un trade-off aceptado del objetivo nail-one-then-scale. No es algo a evitar hoy; es algo para tener presente cuando toque generalizar.
3. **Que la IA clasifique una complicación médica como algo de rutina.** Sigue vigente, y ahora con una clienta real en lugar de un caso hipotético.
4. **Depender de Meta (WhatsApp Business API, Instagram).** Sigue vigente.
5. **Mostrar en el portfolio el nombre de una clínica real junto con detalles de cómo maneja datos sensibles de salud**, sin su permiso explícito. Sería un riesgo de reputación para Okio y un posible problema legal o de confianza para Meli.

## Mejoras futuras

- Generalizar la plataforma a otras clínicas (la ambición original del "Sistema Operativo de IA para Clínicas Estéticas"), si nail-one-then-scale muestra que hay algo que valga la pena escalar. En ese momento se retoman: nombre de producto propio, validación de mercado con 5 a 10 clínicas, pricing pensado para escalar y soporte multi-sede.
- Más canales, inventario y KPIs de personal, siempre validados con Okio y no con supuestos de mercado.

## Documentos relacionados

- `00_Product_Constraints.md`: actualizado 2026-07-31 con el alcance nuevo.
- `05_Privacidad_y_Consentimiento.md`: **nuevo, creado 2026-07-31.** Hoy es el documento más urgente del set.
- `14_Decision_Log.md`: actualizado 2026-07-31, con la corrección de D3.
- El resto de la estructura original de `/docs` (Glosario, MVP Scope orientado a mercado, Buyer List, Roadmap multi-cliente) queda en pausa mientras el alcance sea single-client. Se retoma si se generaliza.
