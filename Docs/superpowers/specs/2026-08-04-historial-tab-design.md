# Historial tab: session logging + browsing flow

**Status:** Draft — pending user review
**Date:** 2026-08-04
**Scope:** `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` — the Agenda (Calendar) view, the Clientes view's Historial tab, and the existing Seguimientos view.

**Revision note (2026-08-04):** an earlier draft of this spec said the Seguimientos surface "doesn't exist yet" and scoped the follow-up hand-off down to a toast only. That was based on incomplete exploration — the Seguimientos view is already fully built (`isFollowupsView`, lines 441-505, backed by `state.followups`). This revision corrects Flow 2 and the data model to integrate with it for real.

## Context

The client profile in `Clinic Platform UX v2.dc.html` has a Historial tab (alongside Resumen, Fotos, Notas, Consentimiento) that today is a flat, read-only, reverse-chronological list of past sessions: `{treatment, date, practitioner, notes}`. There is no way to add a new session from the UI — the seed data is hardcoded. Per `Docs/00_Project_Vision.md`, this record will hold real clinical history (photos, treatment history, signed consents) once the data-consent question (O2 in `Docs/14_Decision_Log.md`) is resolved — it's a real clinical record, not a demo.

This design covers two things: **how a new session gets logged** (write path) and **how the Historial tab displays it** (read path).

## Data model changes

**Appointment status** gains a third value, `'completed'`, alongside the existing `'confirmed'` / `'unconfirmed'` (see `appointments` array and `confirmAppt` around line 560/712 of the DC file). Only appointments at or before the current time are eligible to be marked completed.

**History entry** shape grows from `{treatment, date, practitioner, notes}` to:

```js
{
  treatment, date, practitioner, notes,
  adverseReaction: { flag: bool, description: string }, // description only meaningful when flag is true
  followUpId: number,                                     // id of the linked entry in state.followups, if a follow-up was set
  edited: { isEdited: bool, editedAt: string }            // absent until the entry is edited once
}
```

Existing seed history entries (lines ~606-621) do not have these fields — the UI must treat their absence as "no reaction / no follow-up / not edited," not as an error.

All date/time strings (`date`, `editedAt`) follow the existing convention already used throughout the file — Spanish long-form prose (e.g. `'12 de julio de 2026'`), not ISO — since that's what every other date in this data set already uses. The follow-up itself is **not** a date string on the history entry — see Flow 2, it's a real entry in `state.followups`, matching that array's existing prose-based shape (`due: 'En 3 meses'`, no `Date` object) rather than introducing real date math nothing else in this file does.

**Client-level derived flag:** `hasAdverseReactionHistory` — true if any entry in `selectedClient.history` has `adverseReaction.flag === true`. Drives the safety banner (see below). Computed the same way other derived render flags already are (e.g. `isTabHistory`, `isVIP`).

## Flow 1 — Marking an appointment complete (Agenda / Calendar view)

Appointment blocks in the calendar grid (`col.appts`, ~line 93-100) currently have `appt.stopClick`, which only stops the click from bubbling to the day-column's `onTrackClick`. This is replaced with `appt.onClick`, which sets a new `selectedAppointment` state slot and opens a "Detalle del turno" card in the right rail — the same rail that currently holds "Requiere atención," "Resumen de la semana," and "Nuevo turno" (~lines 109-136).

The detail card shows client, treatment, time, and staff. If the appointment's time has passed and its status isn't already `'completed'`, it shows a **"Marcar como completado"** button. Clicking it:
1. Sets that appointment's `status` to `'completed'`.
2. Expands the same card in place into the logging form — mirroring exactly how the existing "Nuevo turno" card expands into the new-appointment form today (same toggle-panel mechanism, not a new pattern).

Only one right-rail panel is expanded at a time — opening the appointment detail card while "Nuevo turno" is expanded collapses the latter, and vice versa (single-selection state, same as `selectedClient` already works for the Clientes view).

## Flow 2 — Logging form

Appears inline in the right rail, replacing the "Detalle del turno" card's content once "Marcar como completado" is clicked. Client, treatment, date, and practitioner are pre-filled from the appointment (no re-typing).

Fields:
- **Notas clínicas** — textarea, free text. Same role as the existing `notes` field.
- **Reacción adversa** — Sí/No toggle, default No. Selecting Sí reveals a "Descripción de la reacción" textarea beneath it (required when Sí is selected).
- **Seguimiento recomendado (opcional)** — quick-pick pills: "1 mes", "3 meses", "6 meses", "Otra fecha…". Picking a pill sets `due` to matching prose ("En 1 mes" / "En 3 meses" / "En 6 meses") — the same style `state.followups` entries already use (e.g. `'En 4 días'`, `'Hoy'`). "Otra fecha…" reveals a plain text input for a custom `due` string instead of a date picker, since no real date picker or `Date` math exists anywhere else in this file (the "Día" field in the new-appointment form is a dropdown over the fixed calendar week, not a generic date input).

**Guardar sesión** button:
1. Appends the new entry to `selectedClient.history`.
2. If a follow-up pill was picked, appends a real entry to `state.followups`: `{id: nextId, client: selectedClient.name, treatment, trigger: 'Seguimiento post-tratamiento', due: <prose from the pill>, bucket: 'scheduled', status: 'pending'}` — always `bucket: 'scheduled'`, since a follow-up set at the moment of logging is by definition not yet due or overdue. The history entry's `followUpId` is set to this new followup's `id`, linking the two.
3. Collapses the right rail back to its normal state (Requiere atención / Resumen de la semana / Nuevo turno).
4. If a follow-up was set, shows a toast confirmation: "Seguimiento agregado · {due}" (e.g. "Seguimiento agregado · En 3 meses"). It's now a real, visible item in the Seguimientos view — the toast is just an in-the-moment acknowledgment, not the only trace of it.

No cancel confirmation is needed — "Cancelar" simply collapses the form back to the detail card without changing the appointment's `'completed'` status (marking complete and logging the session are treated as one committed action once the button is clicked, per the click-to-complete-and-open behavior in Flow 1).

## Flow 3 — Safety banner (client profile header)

If `hasAdverseReactionHistory` is true, a warning-styled bar appears in the client profile header (Clientes view, ~lines 229-246), directly below the name/VIP/Nuevo badges row. Reuses the existing `--warning-bg` / `--warning-border` / `--warning-text` tokens (already used for `conflictWarning` in the new-appointment form). Text: "⚠ Reacción adversa registrada — ver Historial". Clicking it sets `activeClientTab` to `'history'`, jumping straight to the relevant tab.

This banner is visible regardless of which client tab is currently active — staff should see it before they even click into Historial.

## Flow 4 — Historial tab display

Each timeline entry (~lines 256-263) keeps its current two-line layout (`treatment — date` / `practitioner · notes`) and adds, conditionally:
- An inline "⚠ Reacción adversa" badge plus the `description`, styled with the warning tokens, when `adverseReaction.flag` is true.
- A "Seguimiento sugerido: {due}" line, in accent color, when `followUpId` is set — `due` is looked up from `state.followups.find(f => f.id === entry.followUpId)`, not stored redundantly on the history entry.
- A muted "(editado)" marker near the date when `edited.isEdited` is true.

Each entry also gets a low-emphasis "Editar" text-link (visible at low visual weight, not a prominent button — this is a correction affordance, not a primary action). Clicking it turns that entry into an inline edit form with the same fields as the logging form (minus the appointment pre-fill, since the entry already has its data). Saving sets `edited: {isEdited: true, editedAt: <now>}` and re-collapses to the display view.

## Out of scope (explicitly, not gaps to silently miss)

- **Manual/walk-in session logging** without a prior appointment. The logging flow is appointment-triggered only, per an explicit scope decision — there is no "+ Agregar sesión" button anywhere in the Historial tab.
- **Backfilling** existing seed history entries with the new fields. They render correctly via the "absent = no reaction / no follow-up / not edited" rule above, but are not retroactively edited.
- **Editing or deleting a `state.followups` entry from the Historial tab.** Once created, it's managed like any other Seguimientos item — via that view's own `Enviar`/`Omitir` actions (`actOnFollowup`). The Historial tab only links to it (`followUpId`) and displays its current `due`, it doesn't duplicate Seguimientos' own controls.
- **Auto-recomputing `bucket`** (overdue/today/scheduled) over time as a real calendar date passes. Existing `followups` entries have their bucket set once in seed data with no recomputation logic anywhere in the file; new entries created here follow the same convention (`bucket: 'scheduled'` at creation, no ongoing date-driven transitions).
- **Full audit trail / edit history.** A single "(editado)" marker with a timestamp is shown; prior versions of an edited entry are not retained or viewable.

## Testing / verification

This is a static HTML/JS prototype (`.dc.html`, no test runner in the project). Verification is manual, in-browser:
1. Open the file, go to Agenda, click a past appointment → confirm the right-rail detail card appears with "Marcar como completado."
2. Mark it complete → confirm the logging form appears pre-filled, and the appointment block's style reflects `'completed'` status.
3. Log a session with a reaction and a follow-up → confirm the toast appears, the client's Historial tab shows the new entry with both badges, the safety banner appears in the client header, and a new "Programados" item appears in the Seguimientos view with the matching client/treatment/due text.
4. Click "Editar" on an entry → confirm it edits in place and shows "(editado)" after saving.
5. Confirm existing seed history entries (no `adverseReaction`/`followUp`/`edited` fields) still render without errors or stray badges.
