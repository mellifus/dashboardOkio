# 08 — Competencia y Costos de Mensajería

**Estado:** v1 — 2026-10-04
**Owner:** Meli
**Origen:** una publicidad de OptinexIA que le apareció a Meli en Instagram, cruzada con su preocupación por los costos de WhatsApp para Okio.

---

## Competidor: OptinexIA (optinexia.com)

Empresa **argentina de "transformación operativa con IA"**. Es, básicamente, **la tesis de este proyecto productizada**, en el mismo país y tocando el mismo vertical.

- **Productos:** *OptiConnecta* (WhatsApp + CRM + agentes de IA), *OptiOpera* (ERP a medida con IA), *OptiStock* (inventario con visión por computadora). Mapean casi 1:1 con los dolores de Okio (mensajería, operaciones, stock).
- **A quién apuntan:** clínicas de salud, retail, B2B, veterinarias, inmobiliarias, servicios profesionales en LatAm.
- **Diferenciador:** *"IA + humano"* — un "centro de comando" donde su equipo monitorea e interviene. Se posicionan como *"una contadora, pero para operaciones"*.
- **Precios (según su web, a verificar):** Starter ~$606.050 ARS/mes · Enterprise desde US$3.500 setup + US$3.500/mes.

**Implicación para Meli:**
- Su diferenciador "IA + humano" es **el mismo human-in-the-loop** sobre el que Meli armó su identidad → no es único; hay que apoyarse en otra cosa (ser accesible, híper-custom, estar embebida).
- **La grieta: el precio.** US$3.500/mes es enterprise. Una clínica chica como Okio (que maneja señas de $10.000 y opera lean) queda **afuera por precio**. Ese es el segmento de Meli: el que OptinexIA no sirve.
- **Valida el mercado:** alguien construyó una empresa sobre esto. Bueno para la tesis, y razón de más para clavar UNO (Okio) antes de soñar escala.

## Costos de mensajería de WhatsApp (la preocupación de Meli)

**Lo más importante: el diseño actual de `ai-triage` NO usa la API de WhatsApp Business.** La recepción copia el borrador y lo manda desde la **app normal** de WhatsApp (como ya lo hacen hoy). Por lo tanto:
- **Etapa 1 (lo construido): $0 en costos de mensaje de WhatsApp.** Único costo = la API de Claude (centavos por borrador).
- Los costos por mensaje **solo aplican si se envía por la WhatsApp Business Platform (API)** — o sea, en una Etapa 2 de auto-envío, que hoy no existe.

**Cómo cobra WhatsApp hoy (por si alguna vez se va a API):** desde julio 2025, Meta cobra **por mensaje de plantilla entregado**, según categoría y país del destinatario. Categorías: Marketing, Utility, Authentication, Service.
- Los mensajes que la **clienta te manda son gratis.**
- Las respuestas de texto libre dentro de la ventana de 24h (**Service**) eran gratis; **desde el 1/10/2026 cuestan**: las primeras **1.000/mes por número gratis**, después tarifa utility.
- **Argentina (aprox., verificar en Meta):** Marketing ~US$0,06–0,07 · Utility/Auth/Service ~US$0,026–0,03 por mensaje.
- Ejemplo: 100 recordatorios/mes por API (Utility) ≈ US$2,6–3. No es enorme, pero se suma; marketing masivo pesa más.

**Implicación estratégica:** el modelo copiar/pegar de Meli es **además una ventaja de costo** frente a sistemas de auto-envío por API (como OptinexIA). Pitch: *"no te sumo costos de WhatsApp — la persona manda desde la app de siempre."*

**Fuente autoritativa:** la [página oficial de precios de Meta](https://developers.facebook.com/docs/whatsapp/pricing). Las cifras de arriba vienen de resúmenes de terceros (oct 2026) y conviene verificarlas antes de citarlas a Okio.

## Brief competitivo (2026-10-04): es una categoría, no una empresa

La competencia real no es un jugador, es una **categoría en ebullición**: "automatización con IA para clínicas/estética por WhatsApp", con varios jugadores en LatAm y España.

**El set competitivo para Okio:**
- **OptinexIA** (Rosario, AR; liderado por Marcos Ardiles) — el del reel. OptiConnecta atiende/vende/agenda **24/7 (auto-responde)**. Declaran para una clínica privada "−60% de tiempo administrativo" (dato de ellos, sin verificar). Precio enterprise.
- **LIDIA** (**Córdoba**, AR — la ciudad de Okio; por Walo Jalil) — asistente por WhatsApp que automatiza turnos para clínicas/estética. **El competidor más cercano geográfica y verticalmente** → monitorear.
- **AgendaPro** — booking SaaS con agentes IA "Julia/Sofía" (ver análisis previo).
- **El verdadero incumbente de Okio: su Calendar + Excel + WhatsApp a mano** (la "no-consumición"). Contra eso competís primero.

**Comparación de enfoques (lo que le importa a Okio):**

| Qué importa para Okio | Meli (ai-triage) | OptinexIA / LIDIA | AgendaPro | Okio hoy |
|---|---|---|---|---|
| Redacta/ayuda con mensajes | Fuerte (voz real) | Fuerte (auto) | Adecuado | Ausente |
| **Humano aprueba (no auto-envía)** | **Fuerte** | Débil | Débil | Fuerte |
| Costo para la clínica | **Muy bajo** | Alto | Medio | $0 pero cuesta tiempo |
| Orden operativo (turnos/stock) | Ausente aún | Fuerte | Fuerte | Débil |
| Hecho a medida de Okio | **Fuerte** (embebida) | Débil | Débil | — |
| Madurez / soporte | Débil (MVP solo) | Fuerte | Fuerte | — |

**Grieta de posicionamiento:** casi todos claman lo mismo ("IA que atiende 24/7") y hasta "IA + humano" (el diferenciador de OptinexIA = el mismo human-in-the-loop de Meli → **no es único**). Posiciones libres que a Okio le importan: (a) barato y a medida para una sede; (b) "tu persona, no una suscripción genérica"; (c) "nada se envía sin tu OK" como **seguridad médica**, no como feature.

**Amenazas (sin vueltas):** la categoría está llena y mejor financiada; si alguien saca un plan barato para clínicas chicas, el nicho se cierra; LIDIA está en Córdoba; los diferenciales de Meli (embebida, a medida) **no escalan** — son fuertes con 1 clienta, no como empresa.

**Implicaciones estratégicas:**
1. **No ser empresa de producto acá** — categoría saturada. Reencuadrar a portfolio + aprendizaje + servicio chico para una/pocas clínicas.
2. **Clavar UNA (Okio) de punta a punta** — la ventaja (embebida, a medida, barata) solo existe a escala chica.
3. **Pitch para Okio por contraste:** su marca es cuidado personalizado; un bot genérico 24/7 choca con eso. Meli ofrece lo opuesto: ayuda a medida, persona en control, barata, sin sumar costos.
4. **Monitorear LIDIA** (Córdoba) como termómetro.

Caveat: casos y precios son declaraciones de ellos / terceros, sin verificar. La categoría se mueve rápido; este brief caduca. Carilla accionable: `09_Carilla_Como_Gano_Okio.md`.

## Documentos relacionados
- `07_Descubrimiento_de_Campo_Okio.md` — el dolor operativo de Okio.
- `09_Carilla_Como_Gano_Okio.md` — resumen de una carilla: cómo gana Meli vs cada uno.
- `00_Project_Vision.md` — el reframe del proyecto.
