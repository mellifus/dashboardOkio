# Okio design system

A component library pulled out of the **Okio** aesthetic-clinic management platform (formerly "Bella Vita"). The source is this project's own main screen, `Clinic Platform UX.dc.html`: a Spanish (Argentina) SaaS operating system for aesthetic clinics with six surfaces. Those are Agenda (calendar), Clientes, Centro de Solicitudes (the Request Center, an AI-assisted inbox), Catálogo, Seguimientos (follow-ups) and Analítica.

Nobody provided an external codebase, Figma file or brand guideline. The system was reverse-engineered from that one DC's inline styles, so it documents the visual vocabulary already in use there and doesn't invent anything past it.

## Content fundamentals
- **Language and voice:** Argentine Spanish with voseo ("vos", "querés", "reservá"). Direct and operational, with little ceremony. The copy should sound like something a receptionist or clinic manager would actually say, not like marketing.
- **Casing:** sentence case for labels and buttons ("Reprogramar turno", "Editar antes"). UPPERCASE only for tiny eyebrow labels such as section headers ("COPILOTO IA", "FLUJO SUGERIDO").
- **Numbers and money:** Argentine formatting with a dot for thousands ($18.420), and percent signs right after the number (81%, 96%).
- **How the AI is described:** as a co-worker, not a chatbot. It "detecta", "sugiere" and "recomienda", and a person always "aprueba" or "edita antes de enviar". It never claims to act on its own in medical or financial matters.
- **Emoji:** none. The only glyphs are ✦ (AI pulse indicator), ✓ (activity timeline) and ⚠ (risk/priority banner), used as small functional markers.

## Visual foundations
- **Color:** mostly neutral. A blue-tinted gray scale (oklch hue 260) covers 90% of the UI. There's one brand accent, a deep forest green (`--accent`, taken from `--okio-primary`; see `Docs/06_Brand_Identity.md`), for primary actions, the active nav state, links and anything AI-related. Semantic colors (warning/amber, danger/red, success/green, info/blue) are only for request categories and status, never for decoration.
- **Surfaces:** the only dark surface in the product is the forest-green sidebar (`--okio-primary`, Okio's institutional color) with a gold lotus and serif wordmark. Everything else is white cards on a very light, warm page background. The shared `NavItem` reads scoped `--nav-active-*` / `--ink-sidebar-*` tokens so its active and badge states work on the green. There are no gradients, glassmorphism or blur.
- **Type:** Fraunces (serif) for display text (page titles, day and section headings, stat values, avatar monograms) and Inter (sans) for body, labels and UI. Both load from Google Fonts in the UI kit's `index.html`. Display type has slightly negative letter-spacing, which keeps it dense and refined. Weights are 400/500/600/650/700, nothing at 800 or above.
- **Shadows:** one soft ambient card shadow (`--shadow-card`) everywhere, plus a slightly stronger colored shadow under the one primary CTA on each screen.
- **Radius:** small (6-7px) on buttons, pills and inputs, medium (12px) on cards and panels, fully round on avatars and dots. Nothing is sharp, and only true status pills are pill-shaped.
- **Borders:** 1px hairlines, not shadows, separate list rows and table cells. Cards get both a hairline border and the ambient shadow.
- **Motion:** the source has none. Treat the product as a static, information-dense operational tool rather than a marketing page, and don't add animation unless someone asks for it.
- **Density:** tight on purpose. Body text at 11-14px is the norm here, not a compromise, because this is a back-office tool people use all day.

## Iconography
The source has no icon set, icon font or SVG icons. For now the product gets by with tiny colored dots (`Dot`), badges and the ⚠/✦/✓ glyphs mentioned above. If icons become necessary, treat that as a gap to fill: pick a CDN set with a similarly minimal feel (a thin single-weight set, for example) and say you swapped it in, rather than hand-drawing icons.

## Intentional additions
None. Every component here (`Button`, `Badge`, `Dot`, `Avatar`, `Card`, `NavItem`, `Tabs`, `SearchInput`, `StatCard`, `ProgressBar`, `ListRow`) appears, more than once, in the source screen.

## Index
- `styles.css`: root stylesheet; imports everything under `tokens/`.
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`: the extracted design tokens.
- `components/core/`: Button, Badge, Dot, Avatar, Card.
- `components/navigation/`: NavItem, Tabs.
- `components/forms/`: SearchInput.
- `components/data/`: StatCard, ProgressBar, ListRow.
- `guidelines/`: specimen cards for the foundations (colors, type, spacing, radius/shadow, wordmark).
- `ui_kits/clinic-platform/`: a click-through recreation of all six screens (Agenda, Centro de Solicitudes, Clientes, Catálogo, Seguimientos, Analítica) built from the components above.
- `.claude/skills/okio-design/SKILL.md` (repo root): the Claude Code skill (`/okio-design`) that packages this brand system for generating on-brand pieces and code.

## Caveats and requests
- The source has no logo file. The sidebar mark is just the word "Okio" on an accent square. If a real logo exists, please share it.
- The source has no icon system (see Iconography). Say so if you want one added.
- The UI kit now covers all 6 product surfaces. Catálogo (a treatment grid with categories, duration and price) and Seguimientos (master-detail follow-ups with a treatment-plan ProgressBar and the shared "Copiloto IA" next-step card) were built from existing components, without any new component types. The sample treatments, prices and follow-up states are placeholders, not Okio's real catalog.
