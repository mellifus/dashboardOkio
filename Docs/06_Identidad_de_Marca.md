# 06 · Identidad de marca de Okio

**Estado:** v1.0. Adoptamos el modelo de 2 capas (ver "Actualización 2026-09-14" abajo).
**Owner:** Meli
**Última actualización:** 2026-09-14

> **Resolución (2026-09-14):** el conflicto "¿verde o rosa?" que aparece más abajo quedó resuelto. **No era una contradicción: son dos capas de la misma marca.** El verde bosque es la capa institucional (web, tienda, producto/dashboard) y el rosa/crema/dorado es la capa editorial (redes, campañas). Las une el dorado `#B99269` y el isotipo del loto. El aro degradé de Instagram NO es de la marca; es la UI de "historia" de la app. El detalle está en la sección "Actualización 2026-09-14", al final. El sistema de diseño visual completo está publicado como Artifact, con los tokens en `Dashboard - Claude Design/tokens/colors-editorial.css`.

## Propósito

Dejar por escrito la identidad visual real de Okio, para que la plataforma (el form de discovery, y después la demo/app) se sienta parte de su marca y no le imponga una estética genérica de SaaS.

## Corrección importante 2026-08-02: paleta verificada contra el sitio web real

Con la extensión de Chrome pude entrar a `okiobeauty.com.ar` y leer los estilos reales (el CSS computado), en vez de estimarlos a ojo. **Eso cambia lo que había sacado de Instagram: el color primario de la marca es un verde bosque oscuro (`#003F36`), no el rosa apagado.** El rosa/terracota existe, pero como tono secundario y suave. Instagram (fotos de tratamientos, productos, eventos) no refleja bien el sistema de marca; la fuente de verdad es el sitio, no el feed.

**Paleta verificada (leída del CSS, no estimada):**

| Rol | Hex | Uso real observado |
|---|---|---|
| Verde bosque oscuro (primario) | `#003F36` | Encabezados, barra superior, botones principales, footer a pantalla completa |
| Crema (fondo claro) | `#F5F1EC` | Fondo de la sección superior |
| Dorado/tostado (acento) | `#B99269` | Palabras en cursiva dentro de títulos ("*y calidad*", "*WhatsApp.*"), subtítulos |
| Dorado claro (variante) | `#C9A583` | Texto sobre fondo verde en la barra superior |
| Rosa apagado/beige (secundario, suave) | `#DED1CB` | Superficies secundarias, tarjetas |
| Texto de cuerpo | `#3A3A3A` | Párrafos; un gris oscuro cálido, ni negro puro ni marrón |
| Texto muted | `#888888` | Texto secundario/caption |
| Texto sobre verde | `#EBE9E8` / `#FFFFFF` | Texto sobre fondo oscuro |

**Tipografías reales (sacadas del `font-family` computado):**
- Títulos: `Fraunces, "Cormorant Garamond", Georgia, serif`. Es una serif elegante con buen contraste de trazo. Ya lo sospechaba por Instagram, y ahora tengo el nombre exacto de la fuente.
- Cuerpo/UI: `Inter, system-ui, sans-serif`.
- Los botones son completamente redondeados (`border-radius: 999px`, forma de píldora), igual que en Instagram.

**Qué hacer con esto:** el form de Jotform y `06_Brand_Identity.md` (la versión en inglés) todavía usan la paleta vieja basada solo en Instagram (rosa como primario, sin verde). Hay que pasarlos a esta paleta.

## Paleta de color (versión anterior, basada solo en Instagram; ver la corrección de arriba)

La medí extrayendo el color dominante (median cut) de las dos capturas de Instagram, y filtré el chrome oscuro de la interfaz de Instagram, que no es parte de la marca. Los mismos tonos aparecen en las dos imágenes por separado.

| Rol | Hex | Uso observado |
|---|---|---|
| Fondo cálido / crema | `#E5DDDA` (rango `#DFD5D1`–`#E9E7E6`) | Fondos de tarjetas, espacios en blanco |
| Acento principal: rosa apagado | `#A7726C` (rango `#A87062`–`#AE7269`) | Formas circulares/orgánicas, texto destacado; el color de marca que más se repite |
| Acento secundario: terracota/tostado | `#B9846C` (rango `#9A6655`–`#C19B84`) | Detalles, productos, transiciones de color |
| Texto oscuro: marrón, no negro | `#5D3A33` (rango `#594238`–`#774E3E`) | Texto de cuerpo, nunca negro puro |
| Beige claro / taupe | `#CBB29D` (rango `#C0AD9E`–`#D0C0B3`) | Superficies secundarias, separadores |

**Nota de corrección:** una primera lectura a ojo (sin medir) había sugerido un verde bosque como color de marca. La extracción por píxeles de las dos imágenes lo descarta: no hay verde en la paleta real. Corregí el tema de color que ya tenía el form de Jotform.

**No usar:** azules, verdes ni colores saturados o brillantes, porque ninguno aparece en la marca. Evitar el azul por defecto de casi todos los form builders.

## Tipografía

- **Titulares:** una serif elegante, con buen contraste entre trazos gruesos y finos (se ve en "Rutina de Skincare AM", "Diagnóstico profesional", "Ningún síntoma llega para hacerte daño, sino para despertarte"). En web sirven Playfair Display, Georgia o algo parecido.
- **Etiquetas y watermark:** sans-serif en mayúsculas con tracking (espacio entre letras) amplio. Lo usan siempre para firmar "OKIO ESTÉTICA" en la esquina de casi todos los posteos, y para subtítulos cortos ("PARA TENER LA PIEL DIVINA").
- **Logo/wordmark:** "Okio" con un trazo más suelto y elegante, y el símbolo ® visible en al menos una pieza. Parece que tratan el nombre como marca registrada.

## Motivos visuales que se repiten

- **Formas orgánicas, círculos y arcos** de fondo detrás del texto, en varios posteos distintos (semicírculos, arcos concéntricos). Después de la paleta, es el elemento gráfico que más se repite.
- **Botones tipo píldora**, con bordes muy redondeados, como el botón "CONSULTA" sobre foto.
- **Fotos cálidas y de cerca**: tratamientos faciales, productos en mano, primeros planos de piel, luz suave. No hay fotos de stock; se nota que es producción propia.
- **Watermark "OKIO ESTÉTICA"** en la esquina de casi todas las piezas.

## Tono del copy

Cálido, directo y emocional, nada clínico ni corporativo. Ejemplos reales: "¿Estás cansada de depilarte todo el tiempo?", "El protector solar perfecto SÍ existe", "Ningún síntoma llega para hacerte daño, sino para despertarte". Mezcla preguntas directas a quien lee (el gancho problema-solución) con frases más poéticas, de bienestar. Estaría bueno que el copy de la plataforma (mensajes de la IA, textos del form) use este mismo registro en lugar de un tono neutro de SaaS.

## Qué implica para la plataforma

- El form de Jotform y cualquier demo o UI futura tienen que usar esta paleta medida, no colores genéricos ni la lectura equivocada anterior (verde).
- Si más adelante se diseña una UI propia, se pueden usar los arcos y círculos orgánicos como decoración. Ayudan a que se sienta "de Okio" y no un dashboard cualquiera.
- El copy de la IA (mensajes sugeridos, textos de la app) tendría que poder adaptarse a este tono cálido y directo. Esto importa para `07_AI_Architecture.md` cuando se escriba, en la parte de qué tono usa la IA al redactar respuestas.

## Actualización 2026-08-02: análisis de okiobeauty.com.ar

Meli encontró la página web real de Okio, que es la landing de un evento presencial ("Foliculitis y calidad de vida", $30.000, cupos limitados). Saqué el texto y la estructura de la página. Todavía no pude verificar colores ni tipografías reales porque la extensión de Chrome no conectó en esta sesión; queda pendiente (ver Próximos pasos).

**Cómo está armada la página** (es la landing de un evento, no un sitio institucional):
1. Header con el nombre, el tagline ("Estética · Bienestar") y una barra de anuncio con fecha y cupos.
2. Hero con título, copy emocional, CTA a WhatsApp, precio y datos rápidos (fecha, lugar, para quién).
3. Una cinta de texto en movimiento ("marquee") que repite "10 AÑOS DE OKIO" y frases de marca. Son las mismas frases de los posteos de Instagram ("Sanamos tu piel ✦ Todo el año ✦ Toda la vida"), así que son líneas de marca fijas y no ocurrencias sueltas.
4. Una sección de identificación emocional con una pregunta directa ("¿Te suena?").
5. Dos preguntas retóricas que nombran el dolor puntual (marcas, manchas, "ya probé todo").
6. La promesa de solución, con un gancho a contramano ("Y no es la que te vendieron").
7. Un temario numerado de 8 módulos. Le da un aire profesional y ordenado, nada improvisado.
8. Una sección sobre el espacio físico (Cabina Okio, dirección real: Obispo Oro 370 1°C, Nueva Córdoba).
9. Un repaso de la logística del evento.
10. El CTA final a WhatsApp, que explica que los cupos se asignan por orden de llegada del mensaje.
11. Footer con nombre, dirección y redes.

**Cómo escriben (lo que se ve, sin interpretar):**
- Voseo argentino en toda la página ("vos", "tenés", "sentís").
- Preguntas retóricas que nombran el dolor antes de ofrecer la solución, la estructura clásica del copy de venta de infoproductos.
- Frases cortas y directas mezcladas con explicaciones más largas.
- Más emoción y empoderamiento que discurso clínico: "la libertad de mostrarte como sos, sin esconderte", "sanamos tu piel", "toda la vida". Coincide con lo que se ve en Instagram.
- El símbolo "✦" aparece una y otra vez como separador o viñeta. Es un elemento gráfico-textual de la marca que no había anotado con las capturas de Instagram; hay que sumarlo a los motivos visuales.
- Palabras destacadas tipográficamente dentro de los títulos (por ejemplo "Foliculitis *y calidad* de vida", "verás *belleza* en todos lados"), con serif o cursiva, igual que en Instagram.

**Dato del modelo de negocio (nuevo, importa para el proyecto):** Okio no solo atiende clientas de a una. También vende eventos y masterclasses presenciales pagos ("10 AÑOS DE OKIO"), que se reservan solo por WhatsApp y por orden de llegada del mensaje. Eso confirma algo que ya suponíamos en `00_Product_Constraints.md` (WhatsApp es el canal central, no solo para consultas sueltas) y sugiere un tipo de "Solicitud" que el Vision doc todavía no tiene en cuenta: la reserva de cupo para un evento, con orden de llegada y cupos limitados. Cuando se revise `00_Project_Vision.md` o el modelo de dominio, conviene preguntarle a Okio si esto pasa seguido (eventos, además de turnos individuales).

**Pendiente:** verificar los colores y tipografías reales de la página (no pude porque la extensión de Chrome no conectó en esta sesión). Ver Próximos pasos abajo.

## Actualización 2026-09-14: modelo de 2 capas (decisión de Meli)

Meli volvió a traer las capturas de Instagram y el logo con el aro degradé, y compartió screenshots reales de su **Tienda Nube** (`okiobeauty.mitiendanube.com`). Con todo eso a la vista se resolvió la tensión que este doc venía arrastrando entre "el verde bosque (web) es la verdad" y "el rosa (Instagram) es la marca".

**Conclusión: las dos cosas son ciertas. La marca de Okio tiene dos registros, o capas, y ninguna está mal.**

| Capa | Paleta dominante | Dónde se usa | Carácter |
|---|---|---|---|
| **1 · Institucional** | Verde bosque `#003F36` + crema + dorado + blush | Web, Tienda Nube, dashboard/producto, footer, transaccional | Sobria, profesional, confiable |
| **2 · Editorial** | Rosa palo `#A7726C` + crema cálida + terracota + dorado | Instagram, campañas, piezas gráficas, eventos | Sensible, femenina, poética |

**Firma compartida (igual en las dos capas):** el isotipo del **loto** en línea dorada, el wordmark "Okio" en serif dorado con la bajada "ESTÉTICA Y BIENESTAR", la dupla tipográfica **Fraunces + Inter**, los botones **pill** (`radius:999px`) y el glifo **✦**. El dorado `#B99269` es el que las une, porque aparece en las dos paletas.

**Corrección importante sobre el "aro degradé":** el anillo magenta→naranja→dorado alrededor del avatar de Instagram es la **UI de "historia activa" de la app de Instagram**, NO un elemento de la marca de Okio. No aparece en ningún lugar que controle la marca (tienda, web, logo real). Es el mismo error del que este doc ya advertía (confundir el *chrome* de IG con la marca), y lo dejo anotado para no repetirlo. Ese degradé no va en logos, piezas ni web.

**Isotipo real:** en la Tienda Nube, el logo es una **flor de loto en línea dorada** + "Okio" en serif + "ESTÉTICA Y BIENESTAR". La guía y los tokens usan un loto **redibujado en SVG** para representarlo; hay que cambiarlo por el **vector oficial** cuando lo tengamos.

**Lo que salió de esta iteración:**
- Un sistema de diseño visual navegable (Artifact) con las dos capas, tipografía, logo, componentes y voz.
- `Dashboard - Claude Design/tokens/colors-editorial.css`: los tokens de la capa editorial, con prefijo `--okio-ed-*`, importados en `styles.css`. NO pisan la paleta institucional.
- `guidelines/colors-editorial.card.html`: el specimen de la paleta editorial.
- `guidelines/brand-wordmark.card.html`: actualizado con el loto y el wordmark real (antes decía "no logo provided").

**Pendiente:** conseguir el vector oficial del loto (SVG/PNG) para reemplazar la versión redibujada, y verificar los hex exactos de la capa editorial contra un archivo de marca si Okio tiene uno. Los actuales salen de medir píxeles del feed: están muy cerca, pero no son oficiales.

## Documentos relacionados

- `00_Project_Vision.md`: contexto general del proyecto.
- `06_Brand_Identity.md`: versión en inglés (referencia para el build).
- Sistema de diseño visual (Artifact): guía navegable de las 2 capas.
- Capturas de origen: grillas de Instagram de @okio.estetica y screenshots de la Tienda Nube que compartió Meli (2026-08-01 y 2026-09-14).
