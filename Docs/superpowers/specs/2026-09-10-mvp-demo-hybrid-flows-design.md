# MVP demo híbrida: cuatro flujos operativos

**Estado:** Aprobado para planificación

**Fecha:** 2026-09-10

**Propósito:** convertir el prototipo de Okio en una demo comercial navegable y guiada. La demo demuestra cuatro flujos operativos con datos ficticios; no procesa datos reales ni envía mensajes reales.

## Contexto y decisión de alcance

La demo se inspira en el caso de uso de Okio, pero todavía no es una implementación para la clínica ni una integración con sus herramientas actuales. Su objetivo es conseguir reuniones con Okio u otro centro estético y mostrar el valor de una capa de triage, aprobación y trazabilidad sobre los canales que la clínica ya use.

La pieza canónica a evolucionar es `Dashboard - Claude Design/Clinic Platform UX v2.dc.html`: ya contiene Agenda, Centro de Solicitudes, Seguimientos, Clientes e Historial, además de datos de ejemplo para reprogramaciones, consultas y consultas médicas. `ui_kits/clinic-platform/App.jsx` queda como muestra del sistema de diseño, no como segundo producto que haya que mantener.

## No negociables

- Toda clienta, profesional, horario, mensaje y dato clínico de la demo es ficticio y debe identificarse como tal.
- Ningún mensaje se envía automáticamente. Una persona de recepción debe aprobar explícitamente cada borrador que se muestre como enviable.
- Una consulta médica o posible complicación no recibe borrador de consejo médico. El envío queda bloqueado, se asigna un profesional y se registra el escalamiento.
- La demo no incluye autenticación, backend, base de datos, APIs de Meta, mensajería real, fotos, historia clínica real ni almacenamiento persistente.
- El estado vive en memoria del navegador y un botón de reinicio restablece los fixtures iniciales.

## Experiencia híbrida

La navegación libre sigue siendo el dashboard existente. Se agrega una entrada de demo con cuatro tarjetas de caso y un modo guiado no modal: al abrir un caso, una barra compacta muestra el paso actual, el resultado esperado y la siguiente acción. La persona puede abandonar el recorrido en cualquier momento y continuar explorando las vistas habituales.

Cada acción del recorrido agrega un evento a una bitácora del caso con: hora simulada, actor (`IA`, `Recepción` o `Profesional`), acción y resultado. La bitácora es visible dentro de la ficha del caso. No se construye un registro global ni analítica nueva para esta versión.

## Modelo de estado de la demo

Agregar estado local y fixtures, siguiendo el patrón actual del archivo:

```js
demo: {
  activeCaseId: null,
  step: 0,
  cases: {
    inquiry: { status: 'draft_ready', audit: [] },
    reschedule: { status: 'availability_ready', audit: [] },
    session: { status: 'session_ready', audit: [] },
    clinical: { status: 'blocked', audit: [] },
  },
}
```

Los textos de IA son fixtures revisados, no llamadas a un modelo. Cada transición se implementa como una actualización explícita de estado y una única función compartida para anexar eventos a `audit`. El reinicio restaura una copia nueva de los fixtures; no debe mutar el objeto semilla.

Estados permitidos por caso:

| Caso | Secuencia |
|---|---|
| Consulta | `new` → `classified` → `draft_ready` → `approved` o `edited_and_approved` → `recorded` |
| Turno | `request_received` → `availability_ready` → `slot_selected` → `confirmed` → `reminder_scheduled` |
| Sesión | `session_ready` → `completed` → `evolution_recorded` → `followup_ready` |
| Riesgo clínico | `flagged` → `blocked` → `assigned` → `escalated` |

Las transiciones fuera de orden no deben mostrar una acción exitosa: el control correspondiente queda deshabilitado hasta alcanzar el estado previo. Esto es clave en `clinical`: no existe transición que habilite “Aprobar y enviar”.

## Caso 1: consulta no clínica

**Punto de entrada:** tarjeta “Consulta por tratamiento” y solicitud de precio ya existente en Centro de Solicitudes.

1. La ficha muestra el mensaje ficticio, categoría, sentimiento, confianza y motivo breve de clasificación.
2. El Copiloto IA muestra un borrador comercial y los controles “Editar” y “Aprobar y enviar”.
3. Editar abre un campo local con el texto del borrador y un botón de confirmación. Aprobar sin editar, o guardar y aprobar, registra actor `Recepción`.
4. El resultado reemplaza las acciones por un estado enviado simulado y una bitácora con clasificación, aprobación y resultado.

No se inventa una respuesta médica, descuento, disponibilidad ni cobro para este caso.

## Caso 2: reserva o reprogramación

**Punto de entrada:** tarjeta “Reprogramar turno” y la solicitud de reprogramación ya existente.

1. La ficha presenta el turno actual y tres alternativas ficticias marcadas como disponibles.
2. Elegir una alternativa habilita “Confirmar nuevo turno”.
3. Confirmar actualiza visualmente la Agenda con el nuevo horario, marca la solicitud como confirmada y agrega el evento de recepción.
4. El siguiente control “Programar recordatorio” cambia a estado programado y deja el evento correspondiente. No envía un recordatorio real.

La disponibilidad es estática para la demo. No se simulan bloqueos concurrentes, zonas horarias ni reglas reales de duración; esas capacidades solo se diseñarán cuando se conozca la agenda de una clínica interesada.

## Caso 3: sesión y seguimiento

**Punto de entrada:** tarjeta “Cerrar sesión” y un turno confirmado de la Agenda.

1. “Marcar como completado” abre el formulario existente de cierre de sesión en el rail de Agenda.
2. El formulario registra evolución/reacción con datos ficticios y permite seleccionar un seguimiento sugerido.
3. Guardar agrega la sesión al Historial y el seguimiento a la vista Seguimientos, usando el vínculo `followUpId` definido en la especificación anterior de Historial.
4. La ficha guiada muestra que el seguimiento está preparado para revisión; no se envía automáticamente.

Una reacción adversa activa el banner de alerta ya definido en `2026-08-04-historial-tab-design.md`. El caso no diagnostica ni recomienda tratamiento.

## Caso 4: consulta médica o posible complicación

**Punto de entrada:** tarjeta “Posible complicación” y la solicitud de Consulta médica ya existente.

1. La clasificación se muestra como riesgo alto, con una razón breve y un aviso de que la respuesta automática está bloqueada.
2. No se renderizan controles de borrador, edición, aprobación ni envío.
3. “Asignar profesional” permite elegir un profesional ficticio y registra el evento.
4. “Escalar ahora” cambia el estado a escalado, muestra prioridad y agrega el evento de notificación simulada.

El flujo puede mostrar un acuse de recibo predefinido como texto de referencia, pero no debe hacerlo enviable ni decir que fue enviado. Su única función es demostrar que la clínica recibe una alerta y un profesional toma el caso.

## Componentes y archivos previstos

| Archivo | Responsabilidad |
|---|---|
| `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` | Fuente única de la demo: fixtures, estado, transiciones y vistas de los cuatro recorridos. |
| `Docs/superpowers/specs/2026-09-10-mvp-demo-hybrid-flows-design.md` | Fuente de verdad del alcance y reglas. |
| `Docs/superpowers/plans/2026-09-10-mvp-demo-hybrid-flows-plan.md` | Plan posterior, derivado de esta especificación. |

No se crean servicios, adaptadores, capas de IA, endpoints ni dependencias. Para esta demo, el archivo actual ya contiene el runtime y el sistema visual necesarios.

## Tratamiento de errores y límites visibles

- Los botones de una etapa futura permanecen deshabilitados, con texto que explica cuál es la acción previa requerida.
- “Salir del recorrido” conserva el estado actual para explorar; “Reiniciar demo” confirma que se perderán los cambios locales y restablece los fixtures.
- Si un caso no encuentra su fixture, debe mostrar una tarjeta de error de demo sin romper la navegación.
- El riesgo clínico usa un estado de bloqueo independiente de la confianza de clasificación: en la demo, `flagged` siempre gana sobre cualquier flujo de respuesta.

## Criterios de aceptación

1. La pantalla inicial identifica claramente que es una demo con datos simulados y permite abrir los cuatro casos guiados.
2. Cada caso muestra su progreso, registra acciones en una bitácora y puede abandonarse sin recargar la página.
3. La consulta común no termina en “enviada” sin una acción explícita de aprobación de recepción.
4. La reprogramación no habilita confirmación sin elegir uno de los horarios disponibles y, tras confirmar, muestra un recordatorio programado simulado.
5. El cierre de sesión agrega una entrada de Historial y un seguimiento visible cuando se eligió uno.
6. El caso clínico nunca muestra un borrador de consejo médico ni controles de envío, incluso después de asignar o escalar.
7. Reiniciar restablece todos los casos y la Agenda/Historial/Seguimientos a sus fixtures originales.
8. La navegación de Agenda, Centro de Solicitudes, Clientes, Seguimientos y Analítica existente sigue funcionando.

## Verificación

- Pruebas manuales de los cuatro recorridos, incluyendo abandonar y reiniciar.
- Prueba negativa: intentar llegar a un envío desde el caso clínico no debe ser posible desde ningún estado.
- Prueba negativa: intentar confirmar la reprogramación sin un horario seleccionado no debe ser posible.
- Comprobación visual en escritorio y móvil de las fichas guiadas, sin desbordes ni acciones ocultas.

## Fuera de alcance

- Conectar WhatsApp, Instagram, agenda externa, proveedor de recordatorios o IA real.
- Persistir cambios, crear cuentas, gestionar permisos o auditar actividad real.
- Introducir contenido clínico real, fotos, consentimientos o expedientes.
- Diagnosticar, recomendar tratamientos o automatizar comunicaciones de salud.
- Resolver la agenda, proveedores o herramientas que use una clínica real antes de una conversación de descubrimiento.

## Decisiones específicas de demo

- La demo se optimiza para una presentación de menos de diez minutos, no para operación diaria.
- La disponibilidad y las notificaciones son intencionalmente simuladas. Integraciones y concurrencia se evaluarán únicamente tras identificar la herramienta de agenda de una clínica interesada.
- Los cuatro flujos se presentan como una capa de coordinación; no como reemplazo declarado de todo el software clínico existente.
