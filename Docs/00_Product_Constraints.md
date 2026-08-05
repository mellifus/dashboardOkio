# 00 — Restricciones del Producto

**Estado:** Draft v0.3
**Owner:** Meli
**Última actualización:** 2026-07-31

## Propósito

Reglas que limitan o definen la plataforma que se está construyendo para Okio — decisiones asentadas que no deberían re-discutirse en silencio. Nota de corrección: versiones anteriores de este documento usaban "Okio" como nombre del producto; es un error — **Okio es la clínica cliente real**, no el producto. Ver `00_Project_Vision.md` para el detalle de la corrección.

## Contexto

Escrito tras el pivote de alcance del 2026-07-31: de "SaaS para el mercado de clínicas estéticas" a "solución a medida para Okio, con opción de generalizar después" (nail-one-then-scale). Ver `14_Decision_Log.md`.

## Restricciones Ratificadas

1. **El objetivo actual es nail-one-then-scale: construir para Okio, no para un mercado.** Las decisiones de producto se validan directamente con Okio, no contra un caso genérico de clínica estética.

2. **La plataforma va a manejar datos reales de clientas de Okio en producción, no datos de demo.** Esto activa de inmediato las restricciones de privacidad de datos de salud — ver Ítem Abierto #1 y `05_Privacidad_y_Consentimiento.md`. No cargar fotos o historia clínica real de clientas hasta resolver ese ítem.

3. **La IA redacta, los humanos aprueban — nada se envía en automático.** Cada solicitud manejada por IA debe mostrar nivel de confianza, sentimiento, categoría y una respuesta sugerida, con gate humano explícito. No negociable.

4. **Las solicitudes de Consulta Médica siguen un camino distinto, con seguridad primero.** La IA nunca ofrece consejo médico directamente; escala al profesional tratante.

5. **Las clientas de Okio se comunican únicamente por WhatsApp o Instagram** (a confirmar contra el flujo real de Okio — ver preguntas pendientes de validación).

6. **Una única clínica (Okio), una única sede es la unidad de despliegue.** No hay selector de multi-sede ni lógica multi-tenant en este alcance.

7. **Geografía: Argentina.** Moneda ARS, formato telefónico `+54`, español argentino, régimen de protección de datos Ley 25.326.

8. **Mecanismo comercial de precios: cotizar en USD, cobrar equivalente en ARS.** Ratificado como dirección; ver Ítem Abierto #2 para lo que falta definir.

## Ítems Abiertos (por orden de urgencia)

1. **Consentimiento y tratamiento de datos de salud — bloqueante para cargar datos reales.** Okio ya hace firmar a sus clientas un consentimiento para fotos con fines de historial médico interno. No está confirmado que ese consentimiento cubra el almacenamiento y procesamiento de esos datos por parte de un proveedor de software externo (la plataforma), potencialmente con IA de por medio. Ver `05_Privacidad_y_Consentimiento.md` para el detalle y los próximos pasos recomendados (incluyendo consulta con un abogado). **No cargar datos reales de clientas hasta resolver esto.**

2. **Permiso de Okio para aparecer en un portfolio público.** Independiente del ítem anterior: mostrar el nombre real de la clínica y describir su uso de la plataforma en un portfolio público requiere el consentimiento explícito de Okio para eso, más allá del consentimiento de sus clientas. Ver `05_Privacidad_y_Consentimiento.md`.

3. **Mecánica de precios: tipo de cambio de referencia, momento de la cotización, cadencia de recálculo.** Ver `00_Project_Vision.md`, sección Riesgo de Moneda y Precios, para el detalle completo. También falta confirmar el mecanismo de facturación ante AFIP.

4. **Validar contra el flujo real de Okio (no contra supuestos de mercado):** qué usa hoy para turnos/fichas, volumen real de mensajes por WhatsApp/Instagram, si lleva stock/inventario, si le importan los KPIs de personal. Reemplaza la necesidad de validar con 5–10 clínicas — con una sola conversación directa con Okio alcanza, porque el producto se construye para ella específicamente.

## Riesgos

- Cargar datos reales de clientas (fotos, historia clínica) antes de resolver el Ítem Abierto #1 es el riesgo de mayor impacto del proyecto ahora mismo — por encima de cualquier decisión de arquitectura o pricing.
- Sobreajustar el modelo de datos y la arquitectura a las particularidades exactas de Okio, sin dejar ninguna nota de qué fue una decisión específica de este cliente versus qué sería necesario generalizar — dificultaría escalar después si nail-one-then-scale tiene éxito. Recomendación: señalar explícitamente en `06_Database_Model.md` (cuando se escriba) qué decisiones son "específicas de Okio" vs. "genéricas."

## Mejoras Futuras

- Si se decide generalizar: nombre de producto propio, validación con 5–10 clínicas, modelo de pricing para escalar, soporte multi-sede — todo lo que este documento pausó al reducir el alcance a un solo cliente.

## Documentos Relacionados

- `00_Project_Vision.md` — análisis completo del pivote de alcance.
- `05_Privacidad_y_Consentimiento.md` — nuevo, contiene el detalle del Ítem Abierto #1 y #2.
- `14_Decision_Log.md` — razonamiento de cada decisión.
