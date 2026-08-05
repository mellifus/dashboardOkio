# 14 — Registro de Decisiones

**Estado:** Activo
**Owner:** Meli
**Última actualización:** 2026-07-31

## Propósito

Registro cronológico de cada decisión arquitectónica o de producto, con el razonamiento y las alternativas consideradas — no solo el resultado.

## Decisiones

### D1 — Solicitudes, no Conversaciones, son la abstracción central
**Fecha:** 2026-07-31 (retroactiva)
**Decisión:** Cada mensaje entrante se convierte en una "Solicitud" con categoría, estado de workflow y responsable (IA o humano).
**Estado:** Ratificada.

### D2 — La IA redacta, los humanos aprueban; nada se envía en automático (MVP)
**Fecha:** 2026-07-31 (retroactiva)
**Decisión:** Toda solicitud manejada por IA muestra confianza, sentimiento, categoría y respuesta sugerida, con gate de aprobación humana. Sin envío autónomo.
**Estado:** Ratificada, no negociable.

### D3 — Nombre del producto: Okio ~~CORREGIDO~~
**Fecha original:** 2026-07-31. **Corregido:** 2026-07-31 (mismo día, tras aclaración directa).
**Decisión original (incorrecta):** Se había registrado "el producto se llama Okio."
**Corrección:** Okio es el nombre real de la clínica cliente, no el nombre del producto. El error se originó en una inferencia temprana a partir del nombre de la carpeta de trabajo ("Dashboard Okio"), que nunca se verificó directamente hasta ahora. El software en sí no tiene nombre propio todavía y no lo necesita mientras el alcance sea "una solución a medida para Okio" (ver D7).
**Lección para el proceso:** esto es exactamente el tipo de supuesto que debería nombrarse explícitamente como supuesto en lugar de tratarse como confirmado — ya había pasado algo similar con la geografía (se asumió España a partir de señales del prototipo, y era Argentina). Vale la pena, de acá en adelante, marcar más agresivamente como "supuesto sin confirmar" cualquier dato inferido en lugar de preguntado.
**Estado:** Corregida. Ver `00_Project_Vision.md`, nota de corrección.

### D4 — Comprador y unidad de despliegue: Okio, sede única
**Fecha:** 2026-07-31
**Decisión:** La clínica Okio, de una sola sede, es la unidad completa de despliegue. No hay multi-sede en este alcance.
**Estado:** Ratificada.

### D5 — Geografía objetivo: Argentina
**Fecha:** 2026-07-31
**Decisión:** ARS, `+54`, español argentino, Ley 25.326.
**Estado:** Ratificada.

### D6 — Mecanismo de precios: cotizar en USD, cobrar equivalente en ARS
**Fecha:** 2026-07-31
**Decisión:** Cotizar en USD y cobrar el equivalente en pesos, en lugar de un precio fijo en ARS.
**Estado:** Dirección ratificada. Sub-decisiones (tipo de cambio de referencia, momento de la cotización, cadencia de recálculo, mecanismo de facturación AFIP) siguen abiertas — ver `00_Product_Constraints.md`.

### D7 — Objetivo del proyecto: nail-one-then-scale
**Fecha:** 2026-07-31
**Decisión:** El objetivo inmediato es construir una solución que funcione de verdad para Okio específicamente — no validar ni diseñar para un mercado de múltiples clínicas. La ambición de generalizar a un SaaS más amplio ("Sistema Operativo de IA para Clínicas Estéticas") queda como una opción futura, condicionada a que esta primera implementación funcione y valga la pena escalar.
**Razonamiento:** Priorizar tener algo funcionando y real (útil para Okio, mostrable en un portfolio) por sobre meses de discovery de mercado para una ambición todavía no validada. Es una secuenciación razonable — nail-one-then-scale es un patrón común y probado en desarrollo de producto temprano.
**Alternativas consideradas:** Seguir con el discovery orientado a mercado (personas, journeys, roadmap multi-cliente) antes de construir nada — rechazado por ahora; se puede retomar si nail-one-then-scale valida que hay algo que generalizar.
**Trade-off aceptado explícitamente:** decisiones de modelo de datos y arquitectura optimizadas para el caso específico de Okio pueden requerir rediseño si se generaliza después. Ver Riesgo 2 en `00_Product_Constraints.md`.
**Estado:** Ratificada.

### D8 — Uso de datos reales de clientas en producción
**Fecha:** 2026-07-31
**Decisión:** La plataforma va a manejar datos reales de clientas de Okio (incluyendo fotos y potencialmente historia clínica) desde el pilotaje, no datos de demo/ejemplo.
**Razonamiento:** Sirve tanto a Okio (herramienta real y útil) como al objetivo de portfolio de Meli (caso de estudio real, no simulado).
**Riesgo activado por esta decisión:** el consentimiento de fotos que Okio ya hace firmar a sus clientas probablemente no cubre el almacenamiento/procesamiento por un proveedor de software externo. Ver O2 abajo y `05_Privacidad_y_Consentimiento.md`.
**Estado:** Ratificada, condicionada a resolver O2 antes de cargar el primer dato real.

### D9 — Simplificar la estructura de `/docs` al alcance single-client
**Fecha:** 2026-07-31
**Decisión:** Se pausa la documentación orientada a mercado (Glosario de mercado amplio, MVP Scope multi-clínica, Buyer List, Roadmap de escalamiento) en favor de specs concretas para Okio. Se agrega `05_Privacidad_y_Consentimiento.md` como documento nuevo, no previsto en la estructura original, dado lo urgente del tema.
**Razonamiento:** Coherente con D7 — documentación de estrategia de mercado no aporta valor mientras el alcance sea un solo cliente real.
**Estado:** Ratificada.

## Abiertas (Explícitamente Sin Decidir)

### O1 — Layer vs. Platform
**Estado:** Efectivamente resuelta por D7 para el alcance actual — se valida directamente con Okio qué usa hoy, en lugar de con una muestra de mercado. Vuelve a ser relevante como pregunta de mercado solo si se decide generalizar (ver Mejoras Futuras en `00_Project_Vision.md`).

### O2 — Consentimiento de datos de salud: ¿alcanza el documento existente?
**Planteada:** 2026-07-31.
**Pregunta:** El consentimiento de fotos que Okio ya hace firmar a sus clientas, ¿cubre el almacenamiento y procesamiento de esos datos por parte de un proveedor de software externo (la plataforma), incluyendo eventual procesamiento por IA? ¿O hace falta un documento nuevo/adicional?
**Por qué importa:** Es el ítem de mayor riesgo del proyecto en este momento — más que cualquier decisión de arquitectura. Cargar datos reales sin resolver esto expone a Okio (y a Meli) a un problema de protección de datos de salud bajo la Ley 25.326.
**Próximo paso recomendado:** Consulta con un abogado (idealmente con experiencia en protección de datos/salud en Argentina) antes de cargar cualquier dato real. Ver `05_Privacidad_y_Consentimiento.md` para el detalle de qué probablemente falta cubrir.
**Bloquea:** Carga de cualquier foto o historia clínica real de clientas.

### O3 — Permiso de Okio para portfolio público
**Planteada:** 2026-07-31.
**Pregunta:** ¿Okio autoriza explícitamente ser nombrada y mostrada (como caso de estudio, con su nombre real) en un portfolio público de Meli?
**Por qué importa:** Es un consentimiento distinto del de sus clientas — cubre el uso público del nombre y la historia de la clínica, no el tratamiento de datos de sus clientas.
**Bloquea:** Publicación pública del caso de estudio usando el nombre real de Okio.

## Documentos Relacionados

- `00_Project_Vision.md` — análisis fuente.
- `00_Product_Constraints.md` — reglas vinculantes.
- `05_Privacidad_y_Consentimiento.md` — detalle de O2 y O3.
