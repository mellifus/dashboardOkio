# Okio — Design System

Component library extracted from the **Okio** aesthetic-clinic management platform (formerly "Bella Vita"). Source: this project's own flagship screen, `Clinic Platform UX.dc.html` — a Spanish (Argentina) SaaS operating system for aesthetic clinics with six surfaces: Agenda (calendar), Clientes, Centro de Solicitudes (Request Center — AI-assisted inbox), Catálogo, Seguimientos (follow-ups) and Analítica.

No external codebase, Figma file, or brand guideline was provided — this system is reverse-engineered from that single DC's inline styles, so it documents exactly the visual vocabulary already in production there, nothing invented beyond it.

## Content fundamentals
- **Language & voice:** Argentine Spanish (voseo — "vos", "querés", "reservá"). Direct, operational, low-ceremony. Copy reads like something a receptionist or clinic manager would actually say, not marketing copy.
- **Casing:** Sentence case for labels and buttons ("Reprogramar turno", "Editar antes"); UPPERCASE only for tiny structural eyebrow labels (section headers like "COPILOTO IA", "FLUJO SUGERIDO").
- **Numbers & money:** Argentine thousands-dot formatting ($18.420), percentages tight to the number (81%, 96%).
- **Tone toward AI:** the AI is a co-worker, not a chatbot — it "detecta", "sugiere", "recomienda"; the human always "aprueba" or "edita antes de enviar". Never claims to act autonomously on medical or financial matters.
- **Emoji:** none, except a single ✦ (AI pulse indicator), ✓ (activity timeline), ⚠ (risk/priority banner) — used as small functional glyphs, not decoration.

## Visual foundations
- **Color:** neutral-first. A blue-tinted gray scale (oklch hue 260) for 90% of the UI; one brand accent (deep forest green `--accent`, sourced from `--okio-primary` — see `Docs/06_Brand_Identity.md`) for primary actions, active nav state, links, and anything AI-related. Semantic colors (warning/amber, danger/red, success/green, info/blue) are reserved for request categories and status, never decorative.
- **Surfaces:** a near-black sidebar (`--surface-sidebar`) is the only dark surface in the product; everything else is white cards on a very light gray page background. No gradients, no glassmorphism, no blur.
- **Type:** system sans stack (-apple-system/Segoe UI/system-ui). Slightly negative letter-spacing throughout (-0.005 to -0.02em) for a dense, technical feel. Weights are 500/600/650/700 — no light or 800+ weights.
- **Shadows:** one soft ambient card shadow (`--shadow-card`) everywhere; a slightly stronger colored shadow only under the single primary CTA per screen.
- **Radius:** small (6-7px) on buttons/pills/inputs, medium (12px) on cards/panels, fully round on avatars/dots. Nothing sharp, nothing pill-shaped except true status pills.
- **Borders:** hairline 1px borders (not shadows) separate list rows and table cells; cards get both a hairline border and the ambient shadow.
- **Motion:** none observed in the source — treat as a static, information-dense operational tool rather than a marketing surface. Don't add animation unless asked.
- **Density:** deliberately tight — 11-14px body text is standard, not a compromise. This is a professional back-office tool used all day, not a consumer app.

## Iconography
No icon set, icon font, or SVG icons were found in the source — the product currently relies on tiny colored dots (`Dot`), badges, and the ⚠/✦/✓ glyphs above instead of a real icon system. If icons are needed going forward, treat this as a gap: pick a CDN set with a similarly minimal, non-decorative feel (e.g. a thin single-weight set) and flag the substitution rather than hand-drawing icons.

## Intentional additions
None — every component here (`Button`, `Badge`, `Dot`, `Avatar`, `Card`, `NavItem`, `Tabs`, `SearchInput`, `StatCard`, `ProgressBar`, `ListRow`) has a direct, repeated counterpart in the source screen.

## Index
- `styles.css` — root stylesheet, imports everything under `tokens/`.
- `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css` — the extracted design tokens.
- `components/core/` — Button, Badge, Dot, Avatar, Card.
- `components/navigation/` — NavItem, Tabs.
- `components/forms/` — SearchInput.
- `components/data/` — StatCard, ProgressBar, ListRow.
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius/shadow, wordmark).
- `ui_kits/clinic-platform/` — click-through recreation of the four core screens (Agenda, Centro de Solicitudes, Clientes, Analítica) built from the components above.
- `SKILL.md` — portable skill file for use in Claude Code.

## Caveats & ask
- No logo file exists anywhere in the source — the sidebar mark is plain type ("Okio") on an accent square. Please share a real logo if one exists.
- No icon system exists in the source (see Iconography above) — flag if you want one added.
- The UI kit covers 4 of the 6 product surfaces (Catálogo and Seguimientos were left out of the click-through to stay focused — the components support them fine, just say the word and I'll add those screens too).
