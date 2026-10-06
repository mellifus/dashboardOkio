# 14 · Registro de decisiones

**Estado:** Activo
**Owner:** Meli
**Última actualización:** 2026-07-31

## Propósito

Registro cronológico de cada decisión de arquitectura o de producto. Anota el razonamiento y las alternativas que se consideraron, además del resultado.

## Decisiones

### D1 · La abstracción central son las Solicitudes, no las Conversaciones
**Fecha:** 2026-07-31 (retroactiva)
**Decisión:** Cada mensaje entrante se convierte en una "Solicitud" con categoría, estado de workflow y responsable (IA o humano).
**Estado:** Ratificada.

### D2 · La IA redacta, los humanos aprueban; nada se envía solo (MVP)
**Fecha:** 2026-07-31 (retroactiva)
**Decisión:** Toda solicitud que maneja la IA muestra confianza, sentimiento, categoría y respuesta sugerida, y necesita aprobación humana. No hay envío autónomo.
**Estado:** Ratificada, no se negocia.

### D3 · Nombre del producto: Okio ~~CORREGIDO~~
**Fecha original:** 2026-07-31. **Corregido:** 2026-07-31 (el mismo día, después de que se aclarara directamente).
**Decisión original (incorrecta):** se había anotado "el producto se llama Okio."
**Corrección:** Okio es el nombre real de la clínica cliente, no del producto. El error vino de una inferencia temprana a partir del nombre de la carpeta de trabajo ("Dashboard Okio"), que nadie verificó hasta ahora. El software todavía no tiene nombre y no le hace falta mientras el alcance sea "una solución a medida para Okio" (ver D7).
**Lección para el proceso:** este es justo el tipo de dato que tendría que marcarse como supuesto en vez de tratarse como confirmado. Ya había pasado algo parecido con la geografía: por señales del prototipo se asumió España, y era Argentina. De acá en adelante conviene marcar con más insistencia como "supuesto sin confirmar" todo lo que se infirió en lugar de preguntarse.
**Estado:** Corregida. Ver la nota de corrección en `00_Project_Vision.md`.

### D4 · Comprador y unidad de despliegue: Okio, una sola sede
**Fecha:** 2026-07-31
**Decisión:** La clínica Okio, que tiene una sola sede, es toda la unidad de despliegue. No hay multi-sede en este alcance.
**Estado:** Ratificada.

### D5 · Geografía: Argentina
**Fecha:** 2026-07-31
**Decisión:** ARS, `+54`, español argentino, Ley 25.326.
**Estado:** Ratificada.

### D6 · Precios: cotizar en USD y cobrar el equivalente en ARS
**Fecha:** 2026-07-31
**Decisión:** Cotizar en USD y cobrar el equivalente en pesos, en lugar de fijar un precio en ARS.
**Estado:** Dirección ratificada. Siguen abiertas las sub-decisiones (tipo de cambio de referencia, cuándo se cotiza, cada cuánto se recalcula, cómo se factura ante AFIP); ver `00_Product_Constraints.md`.

### D7 · Objetivo del proyecto: nail-one-then-scale
**Fecha:** 2026-07-31
**Decisión:** Lo inmediato es construir algo que le funcione de verdad a Okio, no validar ni diseñar para un mercado de muchas clínicas. La idea de generalizar a un SaaS más amplio ("Sistema Operativo de IA para Clínicas Estéticas") queda como opción futura, si esta primera implementación funciona y vale la pena escalarla.
**Razonamiento:** priorizar tener algo real funcionando (útil para Okio y mostrable en un portfolio) antes que pasar meses haciendo discovery de mercado para una ambición que todavía nadie validó. Es un orden razonable; nail-one-then-scale es un patrón común en productos que recién arrancan.
**Alternativas consideradas:** seguir con el discovery orientado a mercado (personas, journeys, roadmap multi-cliente) antes de construir nada. Rechazada por ahora; se puede retomar si nail-one-then-scale muestra que hay algo para generalizar.
**Trade-off aceptado:** las decisiones de modelo de datos y arquitectura pensadas para Okio quizás haya que rediseñarlas si después se generaliza. Ver el Riesgo 2 en `00_Product_Constraints.md`.
**Estado:** Ratificada.

### D8 · Datos reales de clientas en producción
**Fecha:** 2026-07-31
**Decisión:** Desde el piloto, la plataforma va a manejar datos reales de clientas de Okio (fotos incluidas, y quizás historia clínica), no datos de demo.
**Razonamiento:** le sirve a Okio (una herramienta real y útil) y al portfolio de Meli (un caso de estudio real, no simulado).
**Riesgo que abre:** el consentimiento de fotos que Okio ya hace firmar probablemente no cubre que un proveedor de software externo guarde o procese esos datos. Ver O2 abajo y `05_Privacidad_y_Consentimiento.md`.
**Estado:** Ratificada, con la condición de resolver O2 antes de cargar el primer dato real.

### D9 · Achicar la estructura de `/docs` al alcance single-client
**Fecha:** 2026-07-31
**Decisión:** Se pausa la documentación orientada a mercado (Glosario amplio, MVP Scope multi-clínica, Buyer List, Roadmap de escalamiento) y se priorizan specs concretas para Okio. Por lo urgente del tema, se suma `05_Privacidad_y_Consentimiento.md`, que no estaba en la estructura original.
**Razonamiento:** sigue a D7. Mientras el alcance sea un solo cliente real, la estrategia de mercado no aporta nada.
**Estado:** Ratificada.

### D10 · Primero WhatsApp; Instagram queda fuera del MVP
**Fecha:** 2026-09-16
**Decisión:** El MVP y la próxima conversación con Okio se concentran en WhatsApp. La integración con Instagram queda fuera del alcance actual.
**Razonamiento:** integrar Instagram pide permisos específicos de Meta y puede exponer mensajes personales o sensibles. Antes de sumar ese canal hay que ver si de verdad le sirve a recepción, definir cómo se tratan los datos y pedir solo los permisos indispensables.
**Alcance que queda:** la demo puede mostrar mensajes de WhatsApp, pero no conecta ningún canal real. La integración real de WhatsApp también espera: hay que validarla con Okio y resolver privacidad, consentimiento, autenticación y protección de tokens.
**Estado:** Ratificada para el MVP actual; revisar después de hablar con Okio.

## Abiertas (sin decidir, a propósito)

### O1 · Layer vs. Platform
**Estado:** en la práctica la resolvió D7 para el alcance actual. Qué usa Okio hoy se le pregunta a Okio, no a una muestra de mercado. Solo vuelve a importar como pregunta de mercado si se decide generalizar (ver Mejoras futuras en `00_Project_Vision.md`).

### O2 · Consentimiento de datos de salud: alcanza el documento que ya existe?
**Planteada:** 2026-07-31.
**Pregunta:** el consentimiento de fotos que Okio ya hace firmar, cubre que un proveedor de software externo (la plataforma) guarde y procese esos datos, incluso con IA? O hace falta un documento nuevo o adicional?
**Por qué importa:** hoy es el mayor riesgo del proyecto, más que cualquier decisión de arquitectura. Cargar datos reales sin resolverlo expone a Okio (y a Meli) a un problema de protección de datos de salud bajo la Ley 25.326.
**Próximo paso recomendado:** consultar con un abogado (idealmente uno que sepa de protección de datos y salud en Argentina) antes de cargar cualquier dato real. En `05_Privacidad_y_Consentimiento.md` está el detalle de lo que probablemente falta cubrir.
**Bloquea:** la carga de cualquier foto o historia clínica real de clientas.

### O3 · Permiso de Okio para el portfolio público
**Planteada:** 2026-07-31.
**Pregunta:** Okio autoriza de forma explícita que Meli la nombre y la muestre, con su nombre real, como caso de estudio en un portfolio público?
**Por qué importa:** es un consentimiento distinto del de sus clientas. Cubre el uso público del nombre y la historia de la clínica, no el tratamiento de los datos de las clientas.
**Bloquea:** publicar el caso de estudio con el nombre real de Okio.

## Documentos relacionados

- `00_Project_Vision.md`: el análisis de origen.
- `00_Product_Constraints.md`: las reglas que hay que respetar.
- `05_Privacidad_y_Consentimiento.md`: el detalle de O2 y O3.
