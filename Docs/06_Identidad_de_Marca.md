# 06 — Identidad de Marca de Okio

**Estado:** Draft v0.1 — extraído directamente del Instagram real de Okio Estética (dos capturas de grilla de posteos), con paleta de color medida por muestreo de píxeles, no a ojo.
**Owner:** Meli
**Última actualización:** 2026-08-01

## Propósito

Documentar la identidad visual real de Okio para que la plataforma (el form de discovery, y después la demo/app) se sienta coherente con su marca en vez de imponerle una estética genérica de SaaS.

## Corrección importante 2026-08-02: paleta verificada contra el sitio web real

Con la extensión de Chrome pude entrar directo a `okiobeauty.com.ar` y leer los estilos reales (CSS computado), no una estimación visual. **La conclusión cambia respecto a lo que había sacado solo de Instagram: el color primario de marca es un verde bosque oscuro (`#003F36`), no el rosa apagado.** El rosa/terracota sí existe, pero es un tono secundario/suave, no el color dominante. Instagram (contenido de fotos de tratamientos, productos, eventos) no representa bien el sistema de marca real — la fuente de verdad es el sitio web, no el feed.

**Paleta verificada (leída directamente del CSS, no estimada):**

| Rol | Hex | Uso real observado |
|---|---|---|
| Verde bosque oscuro (primario) | `#003F36` | Encabezados, barra superior, botones principales, sección de footer a pantalla completa |
| Crema (fondo claro) | `#F5F1EC` | Fondo de la sección superior |
| Dorado/tostado (acento) | `#B99269` | Palabras en cursiva dentro de títulos ("*y calidad*", "*WhatsApp.*"), subtítulos |
| Dorado claro (variante) | `#C9A583` | Texto sobre fondo verde en la barra superior |
| Rosa apagado/beige (secundario, suave) | `#DED1CB` | Superficies secundarias, tarjetas |
| Texto de cuerpo | `#3A3A3A` | Párrafos — gris oscuro cálido, ni negro puro ni marrón |
| Texto muted | `#888888` | Texto secundario/caption |
| Texto sobre verde | `#EBE9E8` / `#FFFFFF` | Texto sobre fondo oscuro |

**Tipografías reales (de `font-family` computado, no adivinadas):**
- Títulos: `Fraunces, "Cormorant Garamond", Georgia, serif` — serif elegante con buen contraste de trazo, confirma lo que ya se sospechaba de Instagram pero ahora con el nombre exacto de la fuente.
- Cuerpo/UI: `Inter, system-ui, sans-serif`.
- Los botones son 100% redondeados (`border-radius: 999px`, forma píldora) — confirma el motivo visual ya visto en Instagram.

**Qué hacer con esto:** el form de Jotform y `06_Brand_Identity.md` (versión en inglés) todavía tienen la paleta vieja basada solo en Instagram (rosa como primario, sin verde). Hay que corregirlos con esta paleta real.

## Paleta de Color (versión anterior, basada solo en Instagram — ver corrección arriba)

Medida por extracción de color dominante (median cut) sobre las dos capturas de Instagram, filtrando el chrome oscuro de la interfaz de Instagram (que no es parte de la marca). Confirmada por consistencia entre ambas imágenes — los mismos tonos aparecen en las dos por separado.

| Rol | Hex | Uso observado |
|---|---|---|
| Fondo cálido / crema | `#E5DDDA` (rango `#DFD5D1`–`#E9E7E6`) | Fondos de tarjetas, espacios en blanco |
| Acento principal — rosa apagado | `#A7726C` (rango `#A87062`–`#AE7269`) | Formas circulares/orgánicas, texto destacado, el color de marca más repetido |
| Acento secundario — terracota/tostado | `#B9846C` (rango `#9A6655`–`#C19B84`) | Detalles, productos, transiciones de color |
| Texto oscuro — marrón, no negro | `#5D3A33` (rango `#594238`–`#774E3E`) | Texto de cuerpo, nunca negro puro |
| Beige claro / taupe | `#CBB29D` (rango `#C0AD9E`–`#D0C0B3`) | Superficies secundarias, separadores |

**Nota de corrección:** una primera lectura visual (no medida) había sugerido un verde bosque como color de marca. La extracción por píxeles sobre ambas imágenes lo descarta — no hay verde en la paleta real. Se corrigió el tema de color ya aplicado al form de Jotform.

**No usar:** azules, verdes, o colores saturados/brillantes — ninguno aparece en la marca real. Evitar el azul default de la mayoría de los form builders.

## Tipografía

- **Titulares:** fuente serif elegante, con buen contraste entre trazos gruesos y finos (visible en "Rutina de Skincare AM", "Diagnóstico profesional", "Ningún síntoma llega para hacerte daño, sino para despertarte"). Buenas alternativas web: Playfair Display, Georgia, o similar.
- **Etiquetas y watermark:** sans-serif en mayúsculas con tracking (espaciado entre letras) amplio — se usa consistentemente para "OKIO ESTÉTICA" como firma en la esquina de casi todos los posteos, y para subtítulos cortos ("PARA TENER LA PIEL DIVINA").
- **Logo/wordmark:** "Okio" en un tratamiento más suelto/elegante, con símbolo ® visible en al menos una pieza — sugiere que están tratando el nombre como marca registrada.

## Motivos Visuales Recurrentes

- **Formas orgánicas circulares/arcos** como fondo detrás de texto — aparece en múltiples posteos distintos (semicírculos, arcos concéntricos). Es el elemento gráfico de marca más repetido después de la paleta de color.
- **Botones tipo "pill" (píldora, bordes muy redondeados)** — visible en el botón "CONSULTA" sobre foto.
- **Fotografía cálida y de cerca** — tratamientos faciales, productos en mano, primeros planos de piel, luz suave. Nada de fotografía de stock genérica; se ve producción propia.
- **Watermark "OKIO ESTÉTICA"** presente de forma consistente en la esquina de casi todas las piezas.

## Tono de Copy

Cálido, directo, con apelación emocional — no clínico ni corporativo. Ejemplos reales observados: "¿Estás cansada de depilarte todo el tiempo?", "El protector solar perfecto SÍ existe", "Ningún síntoma llega para hacerte daño, sino para despertarte". Mezcla preguntas directas al lector (hook problema-solución) con frases más poéticas/de bienestar. Vale la pena que el copy de la plataforma (mensajes de la IA, textos del form) tome este mismo registro en vez de un tono neutro de SaaS.

## Implicancias para la Plataforma

- El form de Jotform y cualquier demo/UI futura deberían usar esta paleta medida, no colores genéricos ni la lectura visual incorrecta anterior (verde).
- Considerar el motivo de arcos/círculos orgánicos como elemento decorativo si se diseña una UI propia más adelante — ayuda a que se sienta "de Okio" y no como un dashboard genérico.
- El copy de la IA (mensajes sugeridos, textos de la app) debería poder adaptarse a este tono cálido y directo — relevante para `07_AI_Architecture.md` cuando se escriba, en la sección de qué tono usa la IA al redactar respuestas.

## Actualización 2026-08-02: análisis de okiobeauty.com.ar

Meli encontró la página web real de Okio (landing page de un evento presencial: "Foliculitis y calidad de vida", $30.000, cupos limitados). Extraje el contenido de texto y estructura de la página (no pude verificar colores/tipografías reales todavía — la extensión de Chrome no conectó en esta sesión; falta ese paso, ver Próximos Pasos).

**Cómo está organizada la página** (landing page de evento, no un sitio institucional genérico):
1. Header con nombre + tagline ("Estética · Bienestar") y barra de anuncio con fecha/cupos.
2. Hero con título, copy emocional, CTA a WhatsApp, precio y datos rápidos (fecha, lugar, para quién).
3. Cinta de texto en movimiento ("marquee") repitiendo "10 AÑOS DE OKIO" y frases de marca — las mismas frases que ya aparecían en los posteos de Instagram ("Sanamos tu piel ✦ Todo el año ✦ Toda la vida"), confirma que son líneas de marca fijas, no ocurrencias sueltas.
4. Sección de identificación emocional con pregunta directa ("¿Te suena?").
5. Dos preguntas retóricas que nombran el dolor específico (marcas, manchas, "ya probé todo").
6. Promesa de solución con gancho contrarian ("Y no es la que te vendieron").
7. Currícula numerada de 8 módulos del evento — da un aire profesional/estructurado, no improvisado.
8. Sección del espacio físico (Cabina Okio, dirección real: Obispo Oro 370 1°C, Nueva Córdoba).
9. Recap de detalles logísticos del evento.
10. CTA final a WhatsApp, explicando que los cupos se asignan por orden de mensaje recibido.
11. Footer con nombre, dirección, redes.

**Estilo de redacción (evidencia directa, no interpretación):**
- Voseo argentino consistente ("vos", "tenés", "sentís") en toda la página.
- Preguntas retóricas para nombrar el dolor antes de ofrecer la solución (estructura clásica de copy de venta/infoproducto).
- Frases cortas y contundentes mezcladas con explicaciones más largas.
- Marco emocional/de empoderamiento por encima de lo clínico: "la libertad de mostrarte como sos, sin esconderte", "sanamos tu piel", "toda la vida" — coincide con lo observado en Instagram.
- Símbolo "✦" usado repetidamente como separador/viñeta decorativa — es un elemento gráfico-textual de marca que no había registrado antes con las capturas de Instagram; sumarlo a los motivos visuales.
- Énfasis tipográfico en palabras clave dentro de los títulos (ej. "Foliculitis *y calidad* de vida", "verás *belleza* en todos lados") — consistente con el uso de una fuente/estilo serif o cursiva para destacar, como ya se había visto en Instagram.

**Insight de modelo de negocio (nuevo, relevante para el proyecto):** Okio no solo atiende clientas 1:1 — también vende eventos/masterclasses presenciales pagos ("10 AÑOS DE OKIO"), con WhatsApp como único canal de reserva, por orden de llegada del mensaje. Esto refuerza dos cosas ya asumidas en `00_Product_Constraints.md` (WhatsApp como canal central, no solo para consultas sueltas) y sugiere una posible categoría de "Solicitud" que el Vision doc todavía no contempla explícitamente: reserva de cupo para evento, con lógica de orden de llegada y cupos limitados — vale la pena preguntarle a Okio si esto pasa seguido (eventos, no solo turnos individuales) cuando se revise `00_Project_Vision.md` / el modelo de dominio.

**Pendiente:** verificar colores y tipografías reales de la página (no pude por falta de conexión con la extensión de Chrome en esta sesión). Ver Próximos Pasos abajo.

## Documentos Relacionados

- `00_Project_Vision.md` — contexto general del proyecto.
- Capturas fuente: dos grillas de Instagram de @okio.estetica compartidas por Meli el 2026-08-01.
