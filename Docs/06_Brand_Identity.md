# Okio brand identity reference

**Source of truth: `okiobeauty.com.ar`, read from live computed CSS (`getComputedStyle` in Chrome), not estimated.** An earlier version of this document relied only on Instagram screenshots and got the primary color wrong: it said dusty rose was the primary brand color. The real website's primary color is a deep forest green, and rose/terracotta is at most a minor secondary tone. Instagram content doesn't reliably reflect the brand system, so when the two disagree, go with the live site. This version is condensed to be used directly as a build reference (for example, by Claude Code). The Spanish source, with the full reasoning, is `06_Identidad_de_Marca.md`.

## ⚠ Conflict with the existing design system

`Dashboard - Claude Design/tokens/colors.css` and `typography.css` currently define a generic SaaS theme with an indigo/blue accent (`--accent: oklch(56% 0.19 264)`) and sans-serif type only. That doesn't match Okio's brand. Before building any UI, point `--accent` and the related tokens at the values below and add a `--font-serif` token. Swap the tokens first; don't build against blue and restyle later.

## Color tokens (verified from live CSS, same format as the existing `colors.css`)

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

Hard rule: the real brand has no blue anywhere. Green is the primary color, not an accent. The one bright green on the site (`#25D366`) belongs to the WhatsApp button, not to Okio, so don't reuse it elsewhere.

## Typography (verified from computed `font-family` styles)

```css
--font-serif: "Fraunces", "Cormorant Garamond", Georgia, serif; /* headings */
--font-sans: "Inter", system-ui, sans-serif;                    /* body/UI */
```

- Headings use `--font-serif` at normal weight and style, colored `--okio-primary`.
- Emphasized words inside headings use `--font-serif` *italic* in `--okio-accent-gold` (e.g. "Foliculitis *y calidad* de vida").
- Body text is `--font-sans` in `--okio-text`.
- Buttons are `--font-sans`, uppercase and fully rounded (`border-radius: 999px`, the pill shape seen on the real site), with an `--okio-primary` background and `--okio-text-on-dark` text.

## Recurring visual and structural motifs

- A full-bleed solid `--okio-primary` (green) section at the bottom of the page. The green is used for strong color blocking, not only as an accent.
- Fully rounded pill buttons.
- Uppercase, letter-spaced eyebrow labels above headings (e.g. "ENCUENTRO PRESENCIAL · AGOSTO 2026").
- The "✦" glyph as a separator or bullet throughout the copy. It's a real brand glyph; keep it.
- Warm, close-up photography of the actual treatment rooms and products, never stock.

## Voice and copy tone

Warm and direct, in the second person with voseo, and emotional rather than clinical or corporate. The copy often follows a direct-response pattern. It names the pain with rhetorical questions ("¿Ya probaste todo y sentís que nada lo soluciona de verdad?"), makes a contrarian promise ("Y no es la que te vendieron"), and then lays out what's included as a numbered list. AI-drafted messages and in-app copy should use the same register.

## Business model note relevant to scope

The real site is a landing page for a paid in-person masterclass/event ($30.000 ARS, limited capacity). People book it entirely through WhatsApp, and seats go in the order messages arrive. So besides 1:1 appointment messaging there's a second kind of request: event registration with a capacity limit and a queue. Meli says it started this year. It's worth checking whether it recurs before the domain model is finalized (see `00_Project_Vision.md`).

## Do / Don't

| Do | Don't |
|---|---|
| Use `--okio-primary` (deep green) as the dominant brand color | Treat rose/blush as primary |
| Use serif for headlines, sans-serif for body/UI | Use sans-serif only |
| Use gold/tan italic serif for emphasis words within headlines | Use bold or color-only emphasis |
| Keep body text in warm dark gray (`--okio-text`) | Use pure black or brown as body text |
| Use full-bleed green color-blocked sections | Keep green as a minor accent only |
| Use pill-shaped buttons | Use sharp-cornered buttons |

## Related

- `06_Identidad_de_Marca.md`: the Spanish source, with the full reasoning, the page-structure and copywriting analysis, and the correction history (from the Instagram-only estimate to the version checked against the live site).
- `00_Project_Vision.md`, `00_Product_Constraints.md`: the project scope this brand applies to (Okio, single client).
