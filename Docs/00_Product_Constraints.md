# 00 · Restricciones del producto

**Estado:** Draft v0.3
**Owner:** Meli
**Última actualización:** 2026-07-31

## Propósito

Las reglas que limitan o definen la plataforma que se construye para Okio. Son decisiones tomadas, y no deberían volver a discutirse por la puerta de atrás. Una corrección: versiones anteriores de este documento usaban "Okio" como nombre del producto, y estaba mal. **Okio es la clínica, el cliente real**, no el producto. El detalle está en `00_Project_Vision.md`.

## Contexto

Se escribió después del cambio de alcance del 2026-07-31, que pasó de "SaaS para el mercado de clínicas estéticas" a "solución a medida para Okio, con opción de generalizar después" (nail-one-then-scale). Ver `14_Decision_Log.md`.

## Restricciones ratificadas

1. **Hoy el objetivo es nail-one-then-scale: construir para Okio, no para un mercado.** Las decisiones de producto se validan con Okio, no contra una clínica estética genérica.

2. **La plataforma va a manejar datos reales de clientas de Okio en producción, no datos de demo.** Eso activa ya las restricciones de privacidad de datos de salud (ver Ítem abierto #1 y `05_Privacidad_y_Consentimiento.md`). No se cargan fotos ni historia clínica real de clientas hasta resolver ese ítem.

3. **La IA redacta y los humanos aprueban. Nada se envía solo.** Cada solicitud que maneja la IA tiene que mostrar nivel de confianza, sentimiento, categoría y una respuesta sugerida, y alguien tiene que aprobarla de forma explícita. No se negocia.

4. **Las solicitudes de Consulta Médica van por otro camino, con la seguridad primero.** La IA nunca da consejo médico; deriva al profesional tratante.

5. **Las clientas de Okio escriben solo por WhatsApp o Instagram.** Falta confirmarlo contra el flujo real de Okio (ver preguntas pendientes de validación).

6. **La unidad de despliegue es una sola clínica (Okio) con una sola sede.** En este alcance no hay selector de multi-sede ni lógica multi-tenant.

7. **Geografía: Argentina.** Moneda ARS, teléfonos `+54`, español argentino y la Ley 25.326 de protección de datos.

8. **Precios: cotizar en USD y cobrar el equivalente en ARS.** Está ratificado como dirección; lo que falta definir está en el Ítem abierto #2.

## Ítems abiertos (por urgencia)

1. **Consentimiento y tratamiento de datos de salud. Bloquea la carga de datos reales.** Okio ya les hace firmar a sus clientas un consentimiento de fotos para su historial médico interno. No está confirmado que ese consentimiento cubra que un proveedor de software externo (la plataforma) guarde y procese esos datos, quizás con IA. El detalle y los próximos pasos (incluida la consulta con un abogado) están en `05_Privacidad_y_Consentimiento.md`. **No se cargan datos reales de clientas hasta resolver esto.**

2. **Permiso de Okio para aparecer en un portfolio público.** Es aparte del ítem anterior. Mostrar el nombre real de la clínica y contar cómo usa la plataforma en un portfolio público necesita que Okio lo autorice explícitamente, además del consentimiento de sus clientas. Ver `05_Privacidad_y_Consentimiento.md`.

3. **Mecánica de precios: qué tipo de cambio se usa, en qué momento se cotiza y cada cuánto se recalcula.** El detalle está en `00_Project_Vision.md`, sección Riesgo de Moneda y Precios. También falta confirmar cómo se factura ante AFIP.

4. **Validar contra el flujo real de Okio, no contra supuestos de mercado:** qué usa hoy para turnos y fichas, cuántos mensajes recibe por WhatsApp e Instagram, si lleva stock y si le importan los KPIs de personal. Esto reemplaza la validación con 5 a 10 clínicas. Alcanza con una conversación con Okio, porque el producto es para ella.

## Riesgos

- Cargar datos reales de clientas (fotos, historia clínica) antes de resolver el Ítem abierto #1 es hoy el riesgo más grave del proyecto, por encima de cualquier decisión de arquitectura o de pricing.
- Ajustar el modelo de datos y la arquitectura a cada detalle de Okio sin anotar qué se decidió por este cliente y qué habría que generalizar. Si nail-one-then-scale funciona, eso complicaría escalar. Recomendación: cuando se escriba `06_Database_Model.md`, marcar ahí qué decisiones son "específicas de Okio" y cuáles son "genéricas".

## Mejoras futuras

- Si se decide generalizar: nombre de producto propio, validación con 5 a 10 clínicas, pricing pensado para escalar y soporte multi-sede. Es todo lo que este documento dejó en pausa al achicar el alcance a un solo cliente.

## Documentos relacionados

- `00_Project_Vision.md`: el análisis completo del cambio de alcance.
- `05_Privacidad_y_Consentimiento.md`: nuevo, con el detalle de los Ítems abiertos #1 y #2.
- `14_Decision_Log.md`: por qué se tomó cada decisión.
