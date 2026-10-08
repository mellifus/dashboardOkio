---
name: okio-design
description: >-
  Generate well-branded interfaces, content and assets for Okio Estética (an
  aesthetic clinic in Córdoba, AR) — for production code or throwaway
  prototypes/mocks. Use whenever building anything that should look and sound
  like Okio: Instagram/social pieces, landing pages, the clinic management
  dashboard, emails, mockups. Loads Okio's brand system: the palettes (institutional
  green for web/Tienda Nube, editorial rose/gold for social, and the clinic-space
  palette of ivory/terracotta/plum for the dashboard), Fraunces+Inter type, the lotus
  signature, and the voseo voice.
user-invocable: true
---

# Okio brand design skill

Okio is an aesthetic clinic ("Estética y Bienestar") in Nueva Córdoba, Argentina.
The brand is **warm, feminine and professional**. Think spa and wellness, not a clinic or a corporation.
Everything below was checked against real Okio surfaces (site CSS, Tienda Nube, the
Instagram feed). The reference files at the end have the full reasoning.

## The core rule: one brand, two layers

Okio speaks in **two registers**. Pick the layer by *where the piece will live*,
don't mix them 50/50 in one piece, and always include the shared signature.

| Layer | Palette | Where | Character |
|---|---|---|---|
| **1 · Institutional** | forest green | web, Tienda Nube, anything transactional (not the dashboard, see below) | sober, trustworthy |
| **2 · Editorial** | rose / cream / gold | Instagram, campaigns, graphic pieces, events | sensitive, poetic, feminine |

**Shared signature (never changes):** the gold **lotus** isotype, the "Okio" serif
wordmark with "ESTÉTICA Y BIENESTAR", the **Fraunces + Inter** type pair, fully rounded
**pill** buttons and the **✦** glyph.

## Color

**Clinic dashboard (since 2026-10-08): the palette of the clinic's space and social feed.** Meli chose it because the
team uses the dashboard inside the clinic, and these are the colors they recognize as Okio. Source of truth:
`Dashboard - Claude Design/propuestas/dashboard-rediseno.html` (`:root` tokens) and `Docs/15_Rediseno_Dashboard.md`.
- `#F5F2EE` warm ivory: background · `#352B30` charcoal plum: text and sidebar (12.2:1)
- `#793F35` deep terracotta: buttons, titles, the day summary (7.3:1 with light text)
- `#AD7772` clay rose: the brand mark (borders, attention dots, active nav). Never text on it (3.3:1)
- `#E4DAD5` linen rose: card headers and rules · `#B99268` golden sand: logo and details only (2.5:1)
- States: confirmed = muted sage, unconfirmed = gold, needs attention = brick red (not rose, rose is the brand).
- Dark mode is "plum night" (`#1A1517` / `#241D20`), never neutral black.

**Institutional (green), for web and Tienda Nube:**
- `#003F36` forest green: primary (headers, nav, buttons, full-bleed sections)
- `#F5F1EC` cream: light section background
- `#B99269` gold: italic emphasis words, wordmark (**shared with editorial**)
- `#C9A583` gold-light: labels on green
- `#DED1CB` blush: hero / secondary surface
- `#3A3A3A` text (warm dark gray, never pure black) · `#888888` muted

**Editorial (rose), for social and campaigns:**
- `#A7726C` rose: primary (forms, highlighted text)
- `#8E5A5F` deep rose/wine: pills, strong titles
- `#E5DDDA` warm cream: piece background
- `#B9846C` terracotta · `#CBB29D` taupe · `#5D3A33` brown text (never pure black)

**Hard rules:** no blue, and no bright or saturated green. The one bright green allowed is
`#25D366` on the WhatsApp button, and that color belongs to WhatsApp, not Okio. The gold
ties the two layers together because it appears in **both**.

## Typography

- **Fraunces** (serif) for all display text and headings. Load it from Google Fonts.
- **Inter** (sans) for body, UI, labels and buttons.
- **Signature rule 1, gold italic emphasis:** one or two important words in a headline go in
  Fraunces *italic*, colored gold (`#B99269`). Never bold, never another color.
- **Signature rule 2, tracked watermark:** "OKIO ESTÉTICA" in Inter uppercase, letter-spacing
  ~0.26em, in the corner of editorial pieces.
- Labels/eyebrows: Inter uppercase, tracked. Numbers/data: tabular-nums.

## Logo & signature

- Isotype: a **gold line-art lotus**. Wordmark: "Okio" in Fraunces gold + "ESTÉTICA Y BIENESTAR"
  tracked underneath. It works on cream, blush or forest green.
- Pill buttons everywhere (`border-radius: 999px`), uppercase Inter.
- `✦` is a real brand glyph (separator/bullet). Keep it.
- **Two caveats:**
  - There is **no official lotus vector in this repo**. The lotus in the guide and UI kit is a
    redrawn SVG stand-in; swap in Okio's official asset once it's available.
  - The **magenta→orange gradient ring** around the Instagram avatar is **Instagram's
    story-ring UI, NOT part of the Okio brand**. Never use it in logos, pieces or web.

## Voice & tone (copy)

Argentine **voseo** ("vos", "tenés", "reservá"). Warm, direct and emotional, never
clinical or corporate. Name the feeling or the pain *before* the service, and close with a brand line.

- Sounds like Okio: *"Estás cansada de depilarte todo el tiempo?"* · *"El protector solar
  perfecto SÍ existe."* · *"Reservá tu lugar, los cupos son limitados."* · *"Sanamos tu piel
  ✦ todo el año ✦ toda la vida."*
- Does NOT sound like Okio: *"Agende su turno a la brevedad."* · *"Optimizamos su experiencia
  dermatológica."* · neutral tone, usted, clinical jargon.
- No opening (inverted) exclamation or question marks, the way people actually type in chat. Only
  close with ! or ?: "Buenas noches! Te esperamos." and "Te reservo el turno?". This applies to
  everything, including quotes of Okio's own copy.

## How to build

- **If it's a visual mock / prototype / social piece:** write a **self-contained static HTML**
  file for the user to view (the app renders it as an artifact). Use the editorial palette for
  social and the institutional palette for product screens. Load Fraunces + Inter from Google Fonts
  and apply the signature rules. Don't invent a logo: use the lotus stand-in and say it's a stand-in.
- **If it's production code:** use the CSS tokens directly. Import
  `Dashboard - Claude Design/styles.css` (it pulls in every token). Use `--okio-primary`,
  `--okio-accent-gold`, `--okio-ed-*`, `--font-serif`, `--font-sans`, `--radius-pill`. Build
  from the existing components in `Dashboard - Claude Design/components/`.
- If invoked with no guidance, ask what they want to build plus one or two pointed questions, then work
  as an expert designer and produce HTML or code.

## Reference files (repo-root-relative)

- `Dashboard - Claude Design/tokens/colors.css`: institutional palette tokens
- `Dashboard - Claude Design/tokens/colors-editorial.css`: editorial (`--okio-ed-*`) tokens
- `Dashboard - Claude Design/tokens/typography.css`, `effects.css`, `spacing.css`
- `Dashboard - Claude Design/styles.css`: imports all tokens
- `Dashboard - Claude Design/components/`: React components (Button, Card, Badge, NavItem, …)
- `Dashboard - Claude Design/guidelines/`: specimen cards (palettes, type, wordmark)
- `Dashboard - Claude Design/ui_kits/clinic-platform/standalone.html`: a full worked example
  (the brand applied to a 6-screen dashboard) that opens directly in a browser
- `Dashboard - Claude Design/readme.md`: full system documentation
- `Docs/06_Identidad_de_Marca.md`: brand identity, the reasoning behind the two layers, and the correction history
