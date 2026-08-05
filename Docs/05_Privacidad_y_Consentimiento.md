# 05 — Privacidad y Consentimiento

**Estado:** Draft v0.1 — documento nuevo, no previsto en la estructura original de `/docs`. Se agrega el 2026-07-31 porque el riesgo que cubre pasó de teórico a inmediato en cuanto se confirmó que la plataforma va a manejar datos reales de clientas de Okio.
**Owner:** Meli
**Última actualización:** 2026-07-31

## Aviso importante

**Este documento no es asesoría legal.** Organiza la pregunta y señala qué es probable que falte, para que se pueda llevar a un profesional (idealmente un abogado con experiencia en protección de datos y datos de salud en Argentina) antes de tomar una decisión. No usar el contenido de este documento como si fuera un dictamen legal, y no redactar ni firmar ningún consentimiento nuevo basándose únicamente en esto.

## Propósito

Definir qué falta resolver, desde el punto de vista de privacidad y consentimiento, antes de que la plataforma procese el primer dato real de una clienta de Okio (fotos, historia clínica, o cualquier dato de salud).

## Contexto

Okio ya hace firmar a sus clientas un documento de consentimiento que autoriza tomar y guardar fotos en su historial médico. Ese documento fue pensado, razonablemente, para el uso tradicional e interno de la clínica: la clínica toma la foto, la clínica la guarda, la clínica (y su personal tratante) la usa para el seguimiento del tratamiento.

Lo que cambia ahora: esas mismas fotos (y potencialmente historia clínica) van a ser almacenadas y procesadas por un tercero — la plataforma que se está construyendo, potencialmente alojada en infraestructura en la nube, con Meli como quien la desarrolla y probablemente administra el acceso técnico, y con la posibilidad de que un sistema de IA procese esas imágenes o datos (por ejemplo, para clasificar solicitudes o sugerir respuestas).

## Por qué esto probablemente no está cubierto por el consentimiento actual

Sin haber leído el texto exacto del documento que firma Okio con sus clientas (paso obligatorio antes de cualquier conclusión firme — ver Próximos Pasos), hay tres razones estructurales por las que un consentimiento de fotografía médica interna típicamente **no** cubre este escenario:

1. **Cambio de finalidad.** La Ley 25.326 argentina (como la mayoría de los marcos de protección de datos) exige que los datos personales, y en especial los datos sensibles como los de salud, se usen solo para la finalidad para la que se recolectaron y se consintieron. "Guardar en tu historial médico" y "ser procesada por un proveedor de software externo, posiblemente con IA" son finalidades distintas, aunque estén relacionadas.

2. **Cambio de responsable/tercero interviniente.** Un consentimiento firmado con la clínica generalmente no contempla que un tercero (la plataforma, y quien la desarrolla) tenga acceso técnico a esos datos. Esto suele requerir tanto informar a la clienta de la clínica (actualizar su consentimiento) como formalizar la relación entre la clínica y ese tercero.

3. **Datos sensibles bajo un régimen más estricto.** Los datos de salud son "datos sensibles" bajo la Ley 25.326, lo cual generalmente implica estándares más altos de consentimiento informado y de seguridad que los datos personales comunes.

## Aclaración 2026-07-31: la IA no procesa las fotos

Meli aclaró un punto importante: las fotos van a servir únicamente para reemplazar el sistema actual de registro de historial médico — la IA no interviene sobre ellas en absoluto. La IA solo asiste a la recepcionista con tareas y sugerencias (triage de mensajes, redacción de respuestas), sin tocar las imágenes.

Esto reduce genuinamente uno de los riesgos — el de que un sistema de IA procese o "analice" imágenes médicas sensibles sin supervisión — pero no resuelve el problema de fondo, porque ese nunca fue realmente un problema de IA. El problema es de **almacenamiento y acceso**: las fotos se mudan de donde estén guardadas hoy a un sistema nuevo, construido y (probablemente) administrado por un tercero (Meli), sin importar si un algoritmo las mira o no. Que la IA no las toque saca una preocupación de la lista, pero deja dos preguntas intactas:

1. **¿Quién tiene acceso técnico al nuevo sistema?** Aunque la IA no procese las fotos, quien desarrolla y administra la plataforma (Meli) probablemente sí tiene, o puede llegar a tener, acceso técnico a la base de datos donde viven — para mantenimiento, debugging, backups, etc. Ese acceso es exactamente lo que un acuerdo de tratamiento de datos entre Okio y Meli tiene que cubrir (ver más abajo), independientemente de la IA.
2. **¿Dónde y cómo se guardan hoy, y eso cambia con la migración?** Si hoy las fotos están en papel o en un archivo físico, pasar a un sistema digital — con o sin IA — es un cambio real de perfil de riesgo (un archivo físico no se puede filtrar por una brecha de seguridad remota; una base de datos, en principio, sí). Si ya están en algún sistema digital (una carpeta, un software existente), el cambio es más lateral, pero sigue habiendo un nuevo proveedor con acceso. Y si el nuevo sistema se aloja en un servidor en la nube fuera de Argentina (AWS, Google Cloud, etc., según la región), eso puede constituir una transferencia internacional de datos sensibles, que la Ley 25.326 regula aparte — otro punto para confirmar con el abogado, no para resolver acá.

En resumen: la aclaración achica el problema, no lo cierra. Sigue siendo cierto que probablemente hace falta actualizar el consentimiento y formalizar un acuerdo entre Okio y Meli — simplemente ya no hace falta que esos documentos hablen de procesamiento por IA sobre las imágenes, porque no aplica.

## Dos consentimientos distintos, no uno solo

Vale la pena separar esto en dos problemas independientes, porque cada uno tiene una solución distinta:

**1. Consentimiento de la clienta de Okio (paciente) → uso de sus datos por la plataforma.**
Esto probablemente requiere actualizar o complementar el documento que ya firman las clientas de Okio, agregando algo como: que sus fotos/datos van a ser almacenados y procesados por un proveedor de software externo, si hay procesamiento por IA involucrado, cuánto tiempo se retienen los datos, y cómo puede la clienta pedir acceso o eliminación. Esto lo tiene que redactar (o al menos revisar) un abogado — no es algo para resolver con una plantilla genérica de internet, justamente porque son datos de salud.

**2. Acuerdo entre Okio (la clínica) y Meli/la plataforma → tratamiento de esos datos en nombre de la clínica.**
Independientemente de lo anterior, la clínica (como responsable de los datos de sus clientas) y quien desarrolla/aloja la plataforma (como quien los trata en su nombre) necesitan su propio acuerdo — típicamente un acuerdo de confidencialidad y tratamiento de datos. Cubre cosas como: qué medidas de seguridad existen, qué pasa con los datos si el desarrollo se discontinúa, cómo se notifica una eventual brecha de seguridad, y quién es responsable ante qué escenario. Esto protege tanto a Okio como a Meli — no es solo un trámite para la clínica.

## Portfolio Público: un tercer consentimiento, independiente de los dos anteriores

Mostrar este proyecto como caso de estudio en un portfolio público — usando el nombre real de Okio y describiendo cómo maneja datos de salud de sus clientas — requiere el permiso explícito de Okio para ser nombrada y mostrada públicamente de esa forma. Esto es distinto del consentimiento de sus clientas: es un acuerdo entre Meli y Okio sobre qué se puede mostrar públicamente y con qué nivel de detalle (por ejemplo: ¿se puede nombrar a la clínica? ¿se pueden mostrar capturas de pantalla con datos reales, aunque sea de una sola clienta de ejemplo con su consentimiento? ¿o todo el material público tiene que anonimizarse igual, incluso si Okio da permiso para ser nombrada?).

## Próximos Pasos Recomendados

1. **Conseguir y leer el texto exacto del consentimiento que Okio hace firmar hoy.** No se puede evaluar esto en abstracto — hace falta ver qué dice literalmente, y en particular si menciona (o no) el medio/lugar de almacenamiento y la posibilidad de terceros con acceso. **Estado (2026-07-31): en curso.** Meli va a averiguarlo hoy o en los próximos días, después de presentarle el brief a Okio y confirmar interés — el plan es primero validar interés con un brief general y recién después mandar por WhatsApp preguntas más detalladas junto con una vista previa de la demo. Secuencia razonable: no tiene sentido pedir el texto del consentimiento antes de saber si Okio quiere seguir adelante.
2. **Confirmar cómo se guardan las fotos e historia clínica hoy** (papel, carpeta digital, algún software existente) — determina qué tan grande es el salto de perfil de riesgo al migrar a la plataforma nueva. **Estado: pendiente, misma secuencia que el punto 1.**
3. **Definir dónde se va a alojar la plataforma** (servidor local, nube, y en qué país/región). **Estado: todavía sin definir.** Recomendación preliminar mientras se decide: para un proyecto de este tamaño (un solo cliente, presupuesto de desarrollo individual), lo más práctico suele ser un proveedor cloud mainstream (AWS, GCP, Supabase, etc.) eligiendo la región más cercana disponible — San Pablo (`sa-east-1` en AWS, `southamerica-east1` en GCP) en lugar del datacenter default en EE.UU. Esto no elimina la cuestión de transferencia internacional bajo la Ley 25.326 (Brasil sigue siendo otro país), pero la acerca geográficamente y suele ser más fácil de justificar ante un abogado que un datacenter en EE.UU. o Europa. Un hosting 100% dentro de Argentina existe pero es una opción más nicho y probablemente innecesaria en esta etapa — vale la pena preguntarle directamente al abogado si el acuerdo estándar de tratamiento de datos de un proveedor como AWS/GCP/Supabase alcanza, en lugar de asumir que hace falta hosting local.
4. **Llevar el consentimiento actual, este análisis, y las respuestas a los puntos 2 y 3, a un abogado** con experiencia en protección de datos/salud en Argentina, antes de cargar cualquier dato real en la plataforma.
5. **Definir con Okio el acuerdo de tratamiento de datos** entre la clínica y quien desarrolla la plataforma, cubriendo específicamente quién tiene acceso técnico (aunque la IA no procese las fotos).
6. **Conversar explícitamente con Okio sobre el uso en portfolio** — no asumir que porque accedió a ser el caso piloto también accedió a ser mostrada públicamente.
7. **Mientras estos puntos no estén resueltos:** usar datos ficticios o anonimizados para cualquier demo, desarrollo o prueba, y no cargar fotos ni historia clínica real de clientas de Okio.

## Riesgos

- Cargar datos reales antes de resolver el punto 1–3 es el riesgo de mayor impacto del proyecto en este momento.
- Publicar el caso en un portfolio sin el consentimiento explícito de Okio (punto 4) es un riesgo reputacional y de confianza con la clínica, incluso si no llega a ser un problema legal.
- Tratar este documento como si fuera la solución final (en lugar de una guía para llevarle a un abogado) sería exactamente el tipo de falsa sensación de seguridad que este proyecto ya identificó como un riesgo en otros ítems (ver `00_Product_Constraints.md`).

## Documentos Relacionados

- `00_Project_Vision.md` — sección "Datos Reales de Clientas."
- `00_Product_Constraints.md` — Ítems Abiertos #1 y #2.
- `14_Decision_Log.md` — O2 y O3.
