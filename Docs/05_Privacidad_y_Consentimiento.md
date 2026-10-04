# 05 · Privacidad y consentimiento

**Estado:** Draft v0.1. Es un documento nuevo que no estaba en la estructura original de `/docs`. Se agregó el 2026-07-31, porque el riesgo que cubre dejó de ser teórico apenas se confirmó que la plataforma va a manejar datos reales de clientas de Okio.
**Owner:** Meli
**Última actualización:** 2026-07-31

## Aviso importante

**Este documento no es asesoría legal.** Ordena la pregunta y marca lo que probablemente falta, para llevárselo a un profesional (idealmente un abogado que sepa de protección de datos y datos de salud en Argentina) antes de decidir nada. No lo uses como si fuera un dictamen legal, y no redactes ni firmes ningún consentimiento nuevo basándote solo en esto.

## Propósito

Dejar claro qué falta resolver en privacidad y consentimiento antes de que la plataforma procese el primer dato real de una clienta de Okio (fotos, historia clínica o cualquier dato de salud).

## Contexto

Okio ya les hace firmar a sus clientas un consentimiento que autoriza sacar y guardar fotos en su historial médico. Es razonable que ese documento se haya pensado para el uso interno de siempre: la clínica saca la foto, la guarda, y la usa (ella y su personal tratante) para seguir el tratamiento.

Lo que cambia: esas mismas fotos, y quizás la historia clínica, las va a guardar y procesar un tercero. Ese tercero es la plataforma que estamos construyendo, probablemente alojada en la nube, con Meli como quien la desarrolla y seguramente administra el acceso técnico. Además existe la posibilidad de que un sistema de IA procese esas imágenes o datos (por ejemplo, para clasificar solicitudes o sugerir respuestas).

## Por qué el consentimiento actual probablemente no cubre esto

Todavía no se leyó el texto exacto que firman las clientas de Okio, y hay que leerlo antes de sacar cualquier conclusión firme (ver Próximos pasos). Aun así, hay tres razones de fondo por las que un consentimiento de fotografía médica interna en general **no** cubre este escenario:

1. **Cambia la finalidad.** La Ley 25.326, como la mayoría de las leyes de protección de datos, exige que los datos personales (y sobre todo los sensibles, como los de salud) se usen solo para la finalidad con la que se recolectaron y consintieron. "Guardarla en tu historial médico" y "que la procese un proveedor de software externo, quizás con IA" son finalidades distintas, aunque estén emparentadas.

2. **Aparece un tercero.** Un consentimiento firmado con la clínica en general no prevé que un tercero (la plataforma y quien la desarrolla) tenga acceso técnico a esos datos. Lo habitual es que haga falta avisarle a la clienta (actualizar su consentimiento) y también formalizar la relación entre la clínica y ese tercero.

3. **Los datos sensibles tienen reglas más estrictas.** La Ley 25.326 considera los datos de salud "datos sensibles", y eso en general exige más en consentimiento informado y en seguridad que los datos personales comunes.

## Aclaración 2026-07-31: la IA no procesa las fotos

Meli aclaró algo importante: las fotos solo van a reemplazar el sistema actual de registro del historial médico, y la IA no las toca para nada. La IA solo ayuda a la recepcionista con tareas y sugerencias (triage de mensajes, redacción de respuestas).

Eso saca de la lista un riesgo real, el de que un sistema de IA procese o "analice" imágenes médicas sensibles sin supervisión. Pero no resuelve el problema de fondo, porque el problema nunca fue la IA. Es un problema de **almacenamiento y acceso**: las fotos se mudan de donde estén hoy a un sistema nuevo que construye y probablemente administra un tercero (Meli), las mire un algoritmo o no. Quedan dos preguntas en pie:

1. **¿Quién tiene acceso técnico al sistema nuevo?** Aunque la IA no procese las fotos, quien desarrolla y administra la plataforma (Meli) probablemente tiene, o puede llegar a tener, acceso a la base de datos donde se guardan, para mantenimiento, debugging, backups, etc. Ese acceso es justamente lo que tiene que cubrir un acuerdo de tratamiento de datos entre Okio y Meli (ver más abajo), haya IA o no.
2. **¿Dónde y cómo se guardan hoy, y eso cambia con la migración?** Si hoy están en papel o en un archivo físico, pasar a un sistema digital cambia de verdad el perfil de riesgo, con IA o sin ella: un archivo físico no se filtra por una brecha de seguridad remota, y una base de datos en principio sí. Si ya están en algo digital (una carpeta, algún software), el cambio es más lateral, pero igual entra un proveedor nuevo con acceso. Y si el sistema nuevo vive en un servidor en la nube fuera de Argentina (AWS, Google Cloud, etc., según la región), eso puede ser una transferencia internacional de datos sensibles, que la Ley 25.326 regula por separado. Es otro punto para confirmar con el abogado, no para resolver acá.

En resumen, la aclaración achica el problema pero no lo cierra. Sigue haciendo falta, probablemente, actualizar el consentimiento y formalizar un acuerdo entre Okio y Meli. Lo único que cambia es que esos documentos ya no necesitan hablar de IA procesando imágenes, porque no pasa.

## Son dos consentimientos, no uno

Conviene separarlo en dos problemas, porque cada uno se resuelve distinto:

**1. Consentimiento de la clienta de Okio (paciente) para que la plataforma use sus datos.**
Probablemente haya que actualizar o complementar el documento que ya firman, agregando cosas como: que sus fotos y datos los va a guardar y procesar un proveedor de software externo, si interviene la IA, cuánto tiempo se guardan los datos y cómo puede pedir verlos o borrarlos. Esto lo tiene que redactar, o por lo menos revisar, un abogado. Al ser datos de salud, no alcanza con una plantilla genérica sacada de internet.

**2. Acuerdo entre Okio (la clínica) y Meli/la plataforma para tratar esos datos en nombre de la clínica.**
Más allá de lo anterior, la clínica (responsable de los datos de sus clientas) y quien desarrolla y aloja la plataforma (que los trata en su nombre) necesitan su propio acuerdo, en general uno de confidencialidad y tratamiento de datos. Cubre qué medidas de seguridad hay, qué pasa con los datos si se deja de desarrollar la plataforma, cómo se avisa si hay una brecha de seguridad y quién responde en cada caso. Protege a Okio y también a Meli; no es un trámite solo para la clínica.

## Portfolio público: un tercer consentimiento, aparte de los otros dos

Mostrar el proyecto como caso de estudio en un portfolio público, con el nombre real de Okio y contando cómo maneja datos de salud de sus clientas, requiere que Okio autorice explícitamente que la nombren y la muestren así. Es distinto del consentimiento de sus clientas: es un acuerdo entre Meli y Okio sobre qué se puede mostrar y con cuánto detalle. Por ejemplo: ¿se puede nombrar a la clínica? ¿Se pueden mostrar capturas con datos reales, aunque sea de una sola clienta de ejemplo que dé su consentimiento? ¿O todo lo público se anonimiza igual, aunque Okio acepte que la nombren?

## Próximos pasos recomendados

1. **Conseguir y leer el texto exacto del consentimiento que Okio hace firmar hoy.** Esto no se puede evaluar en abstracto. Hay que ver qué dice literalmente y, sobre todo, si menciona o no dónde y cómo se guarda todo y si puede haber terceros con acceso. **Estado (2026-07-31): en curso.** Meli lo va a averiguar hoy o en los próximos días, después de presentarle el brief a Okio y confirmar que le interesa. El plan es validar primero el interés con un brief general, y recién después mandar por WhatsApp preguntas más detalladas con una vista previa de la demo. Tiene sentido ese orden: no vale la pena pedir el texto del consentimiento antes de saber si Okio quiere seguir.
2. **Confirmar cómo se guardan hoy las fotos y la historia clínica** (papel, carpeta digital, algún software). De eso depende qué tanto cambia el riesgo al pasar a la plataforma nueva. **Estado: pendiente, mismo orden que el punto 1.**
3. **Definir dónde se va a alojar la plataforma** (servidor local o nube, y en qué país o región). **Estado: sin definir.** Recomendación provisoria: para un proyecto de este tamaño (un solo cliente, una sola persona desarrollando), lo más práctico suele ser un proveedor cloud conocido (AWS, GCP, Supabase, etc.) en la región más cercana disponible, que es San Pablo (`sa-east-1` en AWS, `southamerica-east1` en GCP) y no el datacenter por defecto en EE.UU. Eso no elimina la cuestión de la transferencia internacional bajo la Ley 25.326 (Brasil sigue siendo otro país), pero la acerca y suele ser más fácil de justificar ante un abogado que un datacenter en EE.UU. o Europa. Hay hosting 100% en Argentina, pero es más de nicho y probablemente no haga falta en esta etapa. Conviene preguntarle al abogado si alcanza con el acuerdo estándar de tratamiento de datos de AWS/GCP/Supabase, en vez de dar por hecho que hace falta hosting local.
4. **Llevarle a un abogado** que sepa de protección de datos y salud en Argentina el consentimiento actual, este análisis y las respuestas a los puntos 2 y 3, antes de cargar cualquier dato real en la plataforma.
5. **Armar con Okio el acuerdo de tratamiento de datos** entre la clínica y quien desarrolla la plataforma, que diga específicamente quién tiene acceso técnico (aunque la IA no procese las fotos).
6. **Hablar con Okio, sin rodeos, sobre el uso en el portfolio.** Que haya aceptado ser el caso piloto no significa que haya aceptado que la muestren en público.
7. **Mientras todo esto no esté resuelto:** usar datos ficticios o anonimizados para demos, desarrollo y pruebas, y no cargar fotos ni historia clínica real de clientas de Okio.

## Riesgos

- Cargar datos reales antes de resolver los puntos 1 a 3 es hoy el riesgo más grave del proyecto.
- Publicar el caso en un portfolio sin el consentimiento explícito de Okio (punto 4) pone en juego la reputación y la confianza con la clínica, aunque no llegue a ser un problema legal.
- Tomar este documento como la solución final, y no como una guía para llevarle a un abogado, daría justo la falsa sensación de seguridad que el proyecto ya marcó como riesgo en otros puntos (ver `00_Product_Constraints.md`).

## Documentos relacionados

- `00_Project_Vision.md`: sección "Datos reales de clientas".
- `00_Product_Constraints.md`: Ítems abiertos #1 y #2.
- `14_Decision_Log.md`: O2 y O3.
