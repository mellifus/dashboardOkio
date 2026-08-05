# Okio — Brand Identity Reference

**Source of truth: `okiobeauty.com.ar`, read via live computed CSS (`getComputedStyle` in Chrome), not estimated.** An earlier version of this document was based only on Instagram screenshots and got the primary color wrong — it concluded dusty rose was the primary brand color. It isn't. The real website's primary color is a deep forest green; rose/terracotta is a minor secondary tone at most. Instagram content style does not reliably represent the actual brand system — treat the live site as ground truth whenever the two disagree. Condensed for direct use as a build reference (e.g., by Claude Code) rather than narrative documentation. Spanish source with full rationale: `06_Identidad_de_Marca.md`.

## ⚠ Conflict with existing design system

`Dashboard - Claude Design/tokens/colors.css` and `typography.css` currently define a generic SaaS theme: indigo/blue accent (`--accent: oklch(56% 0.19 264)`) and sans-serif-only type. This does not match Okio's real brand. Before building any UI, repoint `--accent` and related tokens to the values below and add a `--font-serif` token. Replace tokens first, don't build against blue and restyle later.

## Color tokens (verified via live CSS, drop-in format matching existing `colors.css`)

```css
/* Okio brand palette — verified from okiobeauty.com.ar computed styles, replaces the indigo/blue theme */
--okio-primary: #003F36;          /* deep forest green — headings, nav/header bar, primary buttons, full-bleed footer section */
--okio-bg-cream: #F5F1EC;         /* light section background */
--okio-accent-gold: #B99269;      /* italic emphasis words in headlines, subtitles */
--okio-accent-gold-light: #C9A583;/* label text on dark green backgrounds */
--okio-secondary-blush: #DED1CB;  /* secondary/soft surface tone — minor use, NOT primary */
--okio-text: #3A3A3A;             /* body copy — warm dark gray, not pure black, not brown */
--okio-text-muted: #888888;       /* secondary/caption text */
--okio-text-on-dark: #EBE9E8;     /* text on green backgrounds; pure #FFFFFF also used */
```

Hard rule: no blue anywhere in the real brand. Green is primary, not an accent. The one bright green seen on-site (`#25D366`) is the WhatsApp button's own brand color, not an Okio brand color — don't reuse it elsewhere.

## Typography (verified via `font-family` computed styles)

```css
--font-serif: "Fraunces", "Cormorant Garamond", Georgia, serif; /* headings */
--font-sans: "Inter", system-ui, sans-serif;                    /* body/UI */
```

- Headings use `--font-serif`, normal weight/style, colored `--okio-primary`.
- Emphasis words within headings use `--font-serif` *italic*, colored `--okio-accent-gold` (e.g. "Foliculitis *y calidad* de vida").
- Body text: `--font-sans`, `--okio-text`.
- Buttons: `--font-sans`, uppercase, fully rounded (`border-radius: 999px` — pill shape, confirmed on real site), background `--okio-primary`, text `--okio-text-on-dark`.

## Recurring visual/structural motifs

- Full-bleed solid `--okio-primary` (green) section at page bottom — strong color-blocking, not just accent usage.
- Pill-shaped buttons, fully rounded.
- Uppercase, letter-spaced labels/eyebrow text above headings (e.g. "ENCUENTRO PRESENCIAL · AGOSTO 2026").
- "✦" glyph used as a decorative separator/bullet throughout copy — treat as a real brand glyph, not decoration to drop.
- Warm, close-up, real (non-stock) photography of treatment spaces and products.

## Voice and copy tone

Warm, direct, second-person (voseo), emotionally resonant — not clinical, not corporate SaaS copy. Structure often follows a direct-response pattern: name the pain via rhetorical questions ("¿Ya probaste todo y sentís que nada lo soluciona de verdad?"), contrarian promise ("Y no es la que te vendieron"), then a structured, numbered breakdown of what's delivered. AI-drafted messages and in-app copy should match this register.

## Business model note relevant to scope

The real site is a landing page for a paid in-person masterclass/event ($30.000 ARS, capacity-limited), booked entirely through WhatsApp on a first-message-served basis — not just 1:1 appointment messaging. This is a second, distinct request type beyond individual client messaging (event registration with capacity limits and queue order), started this year per Meli, and worth validating as a recurring pattern before finalizing the domain model — see `00_Project_Vision.md`.

## Do / Don't

| Do | Don't |
|---|---|
| Use `--okio-primary` (deep green) as the dominant brand color | Treat rose/blush as primary |
| Use serif for headlines, sans-serif for body/UI | Use sans-serif-only |
| Use gold/tan italic serif for emphasis words within headlines | Use bold or color-only emphasis |
| Keep body text in warm dark gray (`--okio-text`) | Use pure black or brown as body text |
| Use full-bleed green color-blocked sections | Keep green as a minor accent only |
| Use pill-shaped buttons | Use sharp-cornered buttons |

## Related

- `06_Identidad_de_Marca.md` — Spanish source, full rationale, page-structure and copywriting analysis, and the correction history (Instagram-only estimate → verified against live site).
- `00_Project_Vision.md`, `00_Product_Constraints.md` — project scope this brand applies to (Okio, single client).
