# Demo de recepción · Miércoles 16 de septiembre de 2026

Alcance aprobado: clienta → turno → tratamientos → recordatorio revisado → respuesta → confirmación del turno.
Reemplaza para esta presentación el plan de cuatro recorridos del 10 de septiembre. Ese plan queda post-MVP.

## Abrir y preparar

Abrir `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` en el navegador. Mantener `support.js` en su carpeta.
El prototipo carga React y Babel desde internet: abrirlo y comprobarlo en la computadora de presentación antes de la reunión.
También se puede servir la carpeta con `python -m http.server 8765 --bind 127.0.0.1` y abrir:
`http://localhost:8765/Dashboard%20-%20Claude%20Design/Clinic%20Platform%20UX%20v2.dc.html`.

Pulsar **Reiniciar demo** para empezar. Los cambios viven solamente en memoria y se pierden al recargar o reiniciar.
Agenda permite alternar **Día / Semana**. Semana muestra del 14 al 20 de septiembre; al seleccionar un turno se abre su mismo detalle en Día y conserva el estado de confirmación. Día lista los turnos de la fecha del turno seleccionado. La vista semanal usa los mismos tres turnos ficticios, sin inventar disponibilidad en los días vacíos.
Datos, redacción asistida, envío, respuesta y derivación están simulados; no se contacta ningún teléfono ni servicio de IA.
La combinación peeling + depilación es un supuesto de este ejemplo, no una recomendación clínica ni una regla validada de Okio.

## Guion de cinco minutos

| Tiempo | Pantalla y acción | Qué decir |
|---|---|---|
| 0:00–0:25 | Clientes, Luciana Ferreyra | «Quiero mostrarte una situación y después escuchar cómo la resuelven ustedes. Son datos ficticios; WhatsApp y la asistencia de IA están simulados.» |
| 0:25–0:55 | Ficha → Ver turno en Agenda | «Luciana tiene un turno con dos tratamientos. Recepción puede verlos juntos.» |
| 0:55–1:35 | Agenda → Preparar recordatorio | «El jueves 17, a las 16, tiene peeling facial y depilación definitiva. Todavía no confirmó. Estos datos pasan al mensaje.» |
| 1:35–2:35 | Cambiar «Gracias!» por «Te esperamos!» → Aprobar y enviar — simulación | «El copiloto prepara el texto. Recepción revisa y puede editar antes de aprobar.» El mensaje dice día, fecha, horario y tratamientos, sin repetir el año. |
| 2:35–3:00 | Mostrar mensaje enviado y turno sin confirmar | «Mandar el recordatorio no significa que la clienta haya confirmado.» |
| 3:00–3:40 | Simular respuesta → Registrar confirmación | «Luciana responde. Recepción revisa y registra la confirmación.» |
| 3:40–4:10 | Ver turno en Agenda | «El mismo turno ahora figura confirmado, con ambos tratamientos. No hubo que volver a cargar la cita.» |
| 4:10–5:00 | Dejar de navegar | «Las consultas clínicas se derivan a una persona. Pensando en este recorrido: ¿cómo lo hacen hoy y en qué paso se les complica más?» |

Si interesa mostrar el límite clínico: reiniciar, preparar y aprobar el recordatorio, desplegar **Probar una consulta sensible**, pulsar **Simular consulta sensible** y **Derivar a una persona**. No se ofrece respuesta médica ni se confirma el turno. Es un ejemplo fijo, no detección de texto libre.

## Discovery después del recorrido

Variantes opcionales, fuera del guion principal:
- **Sin respuesta:** después de aprobar el recordatorio, no simular ninguna respuesta. Se muestra «Sin respuesta» y el turno sigue sin confirmar. No hay reenvíos automáticos.
- **No puedo ir:** pulsar **Simular «No puedo ir»**. La conversación, la ficha y Agenda (Día/Semana) indican «Requiere atención de recepción». La cita conserva su fecha, horario y estado sin confirmar. Recepción deberá conversar con la clienta; esta demo no cancela ni reprograma.
- Reiniciar la demo antes de probar otra respuesta.

- ¿Podés contarme la última vez que pasó algo parecido?
- ¿Dónde anotan los tratamientos cuando una clienta tiene más de uno? ¿Son citas separadas?
- ¿Esto les ahorraría una tarea o les agregaría otra pantalla?
- ¿Quién manda los recordatorios y quién registra las confirmaciones?

No prometer minutos ahorrados ni una integración funcionando. Anotar el problema que ellas priorizan, un ejemplo reciente y qué paso probarían primero.

## Comprobación

`node "Dashboard - Claude Design/demo-check.cjs"`

Comprueba datos obligatorios del recordatorio, texto editado, aprobación, confirmación del turno vinculado, bloqueo del caso sensible y reinicio.
Antes de presentar, repetir el guion en el navegador y comprobar que ambos tratamientos y la acción principal sean legibles.

Verificado el 14 de septiembre en navegador: recorrido completo, edición conservada en el mensaje enviado, bloqueo al omitir la depilación, actualización visible en Agenda, derivación del ejemplo sensible y reinicio. Sin errores de consola durante el recorrido principal. La comprobación automatizada también pasó.

## Post-MVP

Analítica, upsells, presupuestos, historia clínica, seguimiento, captura de nuevos turnos, IA real, clasificación de respuestas libres, integraciones y persistencia.
Vista mensual, arrastrar turnos y reprogramación quedan post-MVP.
También quedan post-MVP los reintentos automáticos ante falta de respuesta, ofrecer horarios alternativos y completar la cancelación o reprogramación. Validar primero con Okio los plazos, quién se ocupa y cómo deciden liberar un horario. Pregunta de discovery: «Cuando una clienta no responde o avisa que no viene, ¿qué hacen ustedes y quién lo resuelve?».
Los módulos anteriores permanecen en el archivo, pero no se muestran en el recorrido aprobado. No requieren ampliaciones para esta demo.
