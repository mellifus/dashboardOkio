---
name: okio-design
description: >-
  Generate well-branded interfaces, content and assets for Okio Estética (an
  aesthetic clinic in Córdoba, AR) — for production code or throwaway
  prototypes/mocks. Use whenever building anything that should look and sound
  like Okio: Instagram/social pieces, landing pages, the clinic management
  dashboard, emails, mockups. Loads Okio's brand system: the two-layer palette
  (institutional green + editorial rose/gold), Fraunces+Inter type, the lotus
  signature, and the voseo voice.
user-invocable: true
---

# Okio — brand design skill

Okio is an aesthetic clinic ("Estética y Bienestar") in Nueva Córdoba, Argentina.
The brand is **warm, feminine, professional** — spa/wellness, not clinical-corporate.
Everything below is verified from real Okio surfaces (site CSS, Tienda Nube, the
Instagram feed) — see the reference files at the end for full rationale.

## The core rule: one brand, two layers

Okio expresses itself in **two registers**. Pick the layer by *where the thing lives*,
never mix them 50/50 in one piece, and always carry the shared signature.

| Layer | Palette | Where | Character |
|---|---|---|---|
| **1 · Institutional** | forest green | web, Tienda Nube, the clinic dashboard/product, anything transactional | sober, trustworthy |
| **2 · Editorial** | rose / cream / gold | Instagram, campaigns, graphic pieces, events | sensitive, poetic, feminine |

**Shared signature (never changes):** the gold **lotus** isotype, the "Okio" serif
wordmark with "ESTÉTICA Y BIENESTAR", the **Fraunces + Inter** type pair, fully-rounded
**pill** buttons, and the **✦** glyph.

## Color

**Institutional (green) — product/web:**
- `#003F36` forest green — primary: headers, nav, buttons, full-bleed sections
- `#F5F1EC` cream — light section background
- `#B99269` gold — italic emphasis words, wordmark (**shared with editorial**)
- `#C9A583` gold-light — labels on green
- `#DED1CB` blush — hero / secondary surface
- `#3A3A3A` text (warm dark gray, never pure black) · `#888888` muted

**Editorial (rose) — social/campaigns:**
- `#A7726C` rose — primary: forms, highlighted text
- `#8E5A5F` deep rose/wine — pills, strong titles
- `#E5DDDA` warm cream — piece background
- `#B9846C` terracotta · `#CBB29D` taupe · `#5D3A33` brown text (never pure black)

**Hard rules:** No blue. No bright/saturated green — the only bright green allowed is
WhatsApp's own `#25D366` on its button, which is WhatsApp's, not Okio's. The gold is the
hinge: it appears in **both** layers.

## Typography

- **Fraunces** (serif) — all display/headings. Load from Google Fonts.
- **Inter** (sans) — body, UI, labels, buttons.
- **Signature rule 1 — gold italic emphasis:** one or two key words in a headline go in
  Fraunces *italic*, colored gold (`#B99269`). Never bold, never another color.
- **Signature rule 2 — tracked watermark:** "OKIO ESTÉTICA" in Inter uppercase, letter-spacing
  ~0.26em, in the corner of editorial pieces.
- Labels/eyebrows: Inter uppercase, tracked. Numbers/data: tabular-nums.

## Logo & signature

- Isotype: a **gold line-art lotus**. Wordmark: "Okio" in Fraunces gold + "ESTÉTICA Y BIENESTAR"
  tracked underneath. Works on cream, blush, or forest green.
- Pill buttons everywhere (`border-radius: 999px`), uppercase Inter.
- `✦` is a real brand glyph (separator/bullet), not decoration — keep it.
- **Two honest caveats:**
  - There is **no official lotus vector in this repo**. The lotus in the guide/UI kit is a
    redrawn SVG stand-in — replace it with Okio's official asset when available.
  - The **magenta→orange gradient ring** seen around the Instagram avatar is **Instagram's
    story-ring UI, NOT an Okio brand element**. Never use it in logos, pieces or web.

## Voice & tone (copy)

Argentine **voseo** ("vos", "tenés", "reservá"). Warm, direct, emotionally resonant — never
clinical or corporate. Name the emotion/pain *before* the service; close with a brand line.

- Sounds like Okio: *"¿Estás cansada de depilarte todo el tiempo?"* · *"El protector solar
  perfecto SÍ existe."* · *"Reservá tu lugar, los cupos son limitados."* · *"Sanamos tu piel
  ✦ todo el año ✦ toda la vida."*
- Does NOT sound like Okio: *"Agende su turno a la brevedad."* · *"Optimizamos su experiencia
  dermatológica."* · neutral tone, usted, clinical jargon.

## How to build

- **If it's a visual mock / prototype / social piece:** write a **self-contained static HTML**
  file for the user to view (the app renders it as an artifact). Use the editorial palette for
  social, the institutional palette for product screens. Load Fraunces + Inter from Google Fonts.
  Apply the signature rules. Don't invent a logo — use the lotus stand-in and flag it.
- **If it's production code:** use the CSS tokens directly. Import
  `Dashboard - Claude Design/styles.css` (it pulls in every token). Use `--okio-primary`,
  `--okio-accent-gold`, `--okio-ed-*`, `--font-serif`, `--font-sans`, `--radius-pill`. Build
  from the existing components in `Dashboard - Claude Design/components/`.
- If invoked with no guidance, ask what they want to build and 1–2 sharp questions, then act as
  an expert designer and produce HTML or code.

## Reference files (repo-root-relative)

- `Dashboard - Claude Design/tokens/colors.css` — institutional palette tokens
- `Dashboard - Claude Design/tokens/colors-editorial.css` — editorial (`--okio-ed-*`) tokens
- `Dashboard - Claude Design/tokens/typography.css`, `effects.css`, `spacing.css`
- `Dashboard - Claude Design/styles.css` — imports all tokens
- `Dashboard - Claude Design/components/` — React components (Button, Card, Badge, NavItem, …)
- `Dashboard - Claude Design/guidelines/` — specimen cards (palettes, type, wordmark)
- `Dashboard - Claude Design/ui_kits/clinic-platform/standalone.html` — full worked example
  (the brand applied to a 6-screen dashboard), openable directly
- `Dashboard - Claude Design/readme.md` — full system documentation
- `Docs/06_Identidad_de_Marca.md` — brand identity + the two-layer rationale and correction history
