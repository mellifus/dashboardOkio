# Historial Tab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a practitioner mark an Agenda appointment complete, log the resulting session (with an adverse-reaction flag and an optional follow-up), see it show up in the Historial tab and the real Seguimientos queue, and correct a logged entry later if needed.

**Architecture:** Everything lives in one file, `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` — a single-class prototype (`class Component extends DCLogic`) with one `state` object, plain methods that call `this.setState(...)`, and one big `renderVals()` that computes everything the template's `{{ }}` bindings and `sc-if`/`sc-for` directives consume. There's no routing, no components, no build step — just this file, reopened in a browser to see changes. All three tasks below edit this same file, in different, mostly non-overlapping regions.

**Tech Stack:** Plain JS (ES2020+), the project's own tiny `sc-if`/`sc-for`/`{{ }}` templating (`support.js`), inline CSS via `style` attributes using the design tokens already defined in `:root`. No npm, no test runner, no TypeScript.

## Global Constraints

- Git was initialized for this project on 2026-08-04 with a single baseline commit of all existing files (previously there was no repository at all). Each task should be committed on completion per the normal subagent-driven-development flow. There is still no remote — everything stays local.
- Spanish (Argentina, voseo) UI copy throughout — sentence case for labels/buttons, UPPERCASE only for tiny structural eyebrow labels. No new copy in this plan violates that.
- Reuse existing design tokens (`--accent`, `--warning-bg`, `--warning-border`, `--warning-text`, `--danger-bg`, `--danger-text`, `--gray-*`, `--radius-*`) — do not invent new colors.
- Reuse existing interaction patterns — inline expanding panels (like "Nuevo turno"), not modals/popovers/overlays. This codebase has none of those today and this feature doesn't introduce the first one.
- All new/updated state goes through `this.setState(...)` with the existing immutable-update convention (`array.map(x => x.id === id ? {...x, ...} : x)`), matching `confirmAppt`/`actOnFollowup`. Never mutate a class field or state array in place.
- All dates/times are static prose strings (e.g. `'12 de julio de 2026'`, `'En 3 meses'`) — there is no `Date` object or real-time math anywhere in this file today, and this plan doesn't introduce any either.
- **Deviation from spec, flagged here:** the spec says only appointments "at or before the current time" are eligible for "Marcar como completado." This file's calendar is a fixed illustrative week with no concept of "now" relative to it (no live clock, no "today" marker in the fixed Mon–Sat grid). Task 1 instead gates eligibility on `status === 'confirmed'` (an appointment must be confirmed before it can be completed — unconfirmed ones aren't eligible) rather than on real time, since building real-vs-fake-time comparison logic would be fragile and inconsistent with the rest of the file. Flag this to the user if it doesn't match their expectation.
- **Scope refinement from spec Flow 4:** the spec says the inline edit form has "the same fields as the logging form." Task 3 implements *notes* and *reacción adversa* as editable, but **not** the follow-up pills — because the spec's own Out-of-scope section already rules out editing/creating `state.followups` entries from the Historial tab. Editing an entry never touches its `followUpId`.

---

## Task 1: Agenda — mark appointment complete, log the session

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html`
  - `state` object (~line 548-581)
  - `clientsData` class field → moves into `state` (~line 603-623)
  - Methods block (~line 711-748)
  - `renderVals()` (~line 750-943)
  - Calendar appointment-block template (~line 93-101)
  - Right rail template, between "Resumen de la semana" and "Nuevo turno" cards (~line 130-132)
  - Toast: added near the end of the two-column layout (~line 541)

**Interfaces:**
- Consumes: nothing from other tasks (this is the foundation task).
- Produces (used by Tasks 2 and 3):
  - `state.clients` (renamed from the `clientsData` class field) — array of client objects, each with `history: [{treatment, date, practitioner, notes, adverseReaction:{flag,description}, followUpId, edited?:{isEdited,editedAt}}, ...]`.
  - `state.followups` gains new entries shaped `{id, client, treatment, trigger, due, bucket:'scheduled', status:'pending'}`, created via the same shape the view already renders.
  - Method `this.selectAppointment(id)` and the `selectedAppointmentId`/`loggingApptId`/`sessionDraft` state slots (Task 2/3 don't call these directly, but must not clobber them).

### Step 1: Move `clientsData` into reactive state

This is required before anything else — Task 1 needs to append to a client's `history` array, and only things inside `state` trigger re-renders correctly in this codebase's pattern (compare how `appointments` and `followups`, which already change over time, live in `state`, while genuinely static things like `staffList` and `filters` stay as class fields).

Find the `clientsData` class field (currently right after `spacingRules`, before `photoSlots`):

```js
  clientsData = [
    {id:'c1', name:'Elena Vidal', phone:'+34 611 203 981', isVIP:true, isNew:false, lastVisit:'12 jul', nextVisit:'5 de agosto, 10:00 — Retratamiento de Botox',
      overview:'Clienta habitual desde 2023. Prefiere turnos por la mañana. Sensible a la crema anestésica (usa alternativa). Referida por Sofía Ramos.',
      history:[{treatment:'Botox – frente', date:'12 de julio de 2026', practitioner:'Ana Torres', notes:'Sin complicaciones, dosis estándar'},{treatment:'Relleno – labios', date:'2 de abril de 2026', practitioner:'Marta Ruiz', notes:'0.5ml, se solicitó resultado natural'}],
      notes:[{date:'12 de julio de 2026', author:'Ana Torres', text:'Preguntó sobre combinar con un peeling en la próxima visita.'},{date:'2 de abril de 2026', author:'Marta Ruiz', text:'Leve hematoma, se resolvió en 3 días.'}]},
    {id:'c2', name:'Marco Díaz', phone:'+34 622 118 402', isVIP:false, isNew:true, lastVisit:'—', nextVisit:'30 de julio, 11:00 — Consulta',
      overview:'Cliente nuevo, consultó por WhatsApp sobre una consulta de rejuvenecimiento facial. Sin historial previo.',
      history:[], notes:[{date:'28 de julio de 2026', author:'Recepción', text:'Reservó por WhatsApp luego de una conversación con la IA.'}]},
    {id:'c3', name:'Sofía Ramos', phone:'+34 655 902 774', isVIP:true, isNew:false, lastVisit:'20 jun', nextVisit:'30 de julio, 10:00 — Control de relleno',
      overview:'Clienta de largo plazo, con tratamientos de mantenimiento mensuales. Prefiere específicamente a Marta Ruiz.',
      history:[{treatment:'Relleno – labios', date:'20 de junio de 2026', practitioner:'Marta Ruiz', notes:'Retoque, 0.3ml'}],
      notes:[{date:'20 de junio de 2026', author:'Marta Ruiz', text:'Muy conforme con los resultados, refirió a una amiga (Elena Vidal).'}]},
    {id:'c4', name:'Irene Castro', phone:'+34 633 771 220', isVIP:false, isNew:false, lastVisit:'15 jul', nextVisit:'—',
      overview:'Clienta ocasional, reserva de forma estacional antes de eventos.',
      history:[{treatment:'Relleno – pómulos', date:'15 de julio de 2026', practitioner:'Dra. Sofía León', notes:'1ml, aumento de pómulos'}],
      notes:[]},
    {id:'c5', name:'Vera Molina', phone:'+34 699 445 018', isVIP:false, isNew:false, lastVisit:'2 jul', nextVisit:'30 de julio, 10:30 — Microneedling',
      overview:'Tiene un paquete de 6 sesiones de microneedling, quedan 2 sesiones.',
      history:[{treatment:'Microneedling', date:'2 de julio de 2026', practitioner:'Lucía Gómez', notes:'Sesión 4 de 6'}],
      notes:[{date:'2 de julio de 2026', author:'Lucía Gómez', text:'Buen progreso en la textura, continuar según lo planeado.'}]},
  ];
```

Delete this class field entirely, and instead add a `clients:` key inside `state = {...}` (right after the `followups: [...]` entry) with the **exact same array literal** as the value. Nothing about the data itself changes — only where it lives.

Then update the three places that read `this.clientsData`:
1. In `renderVals()`, the client-search filter for the new-appointment form: `this.clientsData.filter(c => ...)` → `s.clients.filter(c => ...)`.
2. `const clients = this.clientsData.map(...)` → `const clients = s.clients.map(...)`.
3. `const selectedClientRaw = this.clientsData.find(...)` → `const selectedClientRaw = s.clients.find(...)`.

### Step 2: Add new state slots

In `state = {...}`, alongside `newApptDraft`, add:

```js
    selectedAppointmentId: null,
    loggingApptId: null,
    sessionDraft: {notes:'', hasReaction:false, reactionDescription:'', followUpChoice:'', followUpCustom:''},
    toast: null,
```

### Step 3: Add methods

In the methods block, right after `confirmAppt(id) { ... }`, add:

```js
  selectAppointment(id) { this.setState({selectedAppointmentId: id, newApptPanelOpen: false, loggingApptId: null}); }
  clearSelectedAppointment() { this.setState({selectedAppointmentId: null, loggingApptId: null}); }
  emptySessionDraft() { return {notes:'', hasReaction:false, reactionDescription:'', followUpChoice:'', followUpCustom:''}; }
  markApptCompletedAndLog(id) {
    this.setState(s => ({
      appointments: s.appointments.map(a => a.id === id ? {...a, status:'completed'} : a),
      loggingApptId: id,
      sessionDraft: this.emptySessionDraft(),
    }));
  }
  reopenSessionForm(id) { this.setState({loggingApptId: id, sessionDraft: this.emptySessionDraft()}); }
  cancelSessionForm() { this.setState({loggingApptId: null}); }
  updateSessionDraft(patch) { this.setState(s => ({sessionDraft: {...s.sessionDraft, ...patch}})); }
  setFollowUpChoice(choice) { this.updateSessionDraft({followUpChoice: choice}); }
  dismissToast() { this.setState({toast: null}); }
  submitSessionLog() {
    const s = this.state;
    const appt = s.appointments.find(a => a.id === s.loggingApptId);
    if (!appt) return;
    const d = s.sessionDraft;
    const dayDef = this.dayDefs.find(dd => dd.id === appt.day);
    const dateLabel = dayDef ? `${dayDef.label} ${dayDef.date}` : '';
    const followUpDueMap = {'1m':'En 1 mes', '3m':'En 3 meses', '6m':'En 6 meses'};
    const followUpDue = d.followUpChoice === 'custom' ? d.followUpCustom.trim() : (followUpDueMap[d.followUpChoice] || '');
    const nextFollowupId = Math.max(0, ...s.followups.map(f => f.id)) + 1;
    const entry = {
      treatment: appt.treatment, date: dateLabel, practitioner: appt.staffName, notes: d.notes,
      adverseReaction: {flag: d.hasReaction, description: d.hasReaction ? d.reactionDescription : ''},
      followUpId: followUpDue ? nextFollowupId : null,
    };
    this.setState(s2 => ({
      clients: s2.clients.map(c => c.name === appt.client ? {...c, history: [entry, ...c.history]} : c),
      followups: followUpDue
        ? [...s2.followups, {id: nextFollowupId, client: appt.client, treatment: appt.treatment, trigger:'Seguimiento post-tratamiento', due: followUpDue, bucket:'scheduled', status:'pending'}]
        : s2.followups,
      appointments: s2.appointments.map(a => a.id === appt.id ? {...a, sessionLogged: true} : a),
      loggingApptId: null,
      toast: followUpDue ? `Seguimiento agregado · ${followUpDue}` : null,
    }));
  }
```

Then update the two existing methods that open other right-rail panels, so opening one closes the appointment detail card (mutual exclusion):

```js
  toggleNewApptPanel() { this.setState(s => ({newApptPanelOpen: !s.newApptPanelOpen, selectedAppointmentId: null, loggingApptId: null})); }
```

(replaces the current `toggleNewApptPanel() { this.setState(s => ({newApptPanelOpen: !s.newApptPanelOpen})); }`)

```js
  handleSlotClick(day, e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const rawHour = 9 + relY / 64;
    const snapped = Math.max(9, Math.min(18.5, Math.round(rawHour * 2) / 2));
    this.setState(s => ({
      newApptPanelOpen: true,
      selectedAppointmentId: null,
      loggingApptId: null,
      newApptDraft: {...(s.newApptPanelOpen ? s.newApptDraft : this.emptyApptDraft()), day: String(day), start: String(snapped)},
    }));
  }
```

(only change: the two new lines `selectedAppointmentId: null, loggingApptId: null,` added to the existing `setState` call)

### Step 4: Wire up the calendar appointment blocks

In `renderVals()`, `statusStyle` currently has two branches plus a fallback. Add a `'completed'` branch:

```js
    const statusStyle = (status) => {
      if (status === 'confirmed') return {bg:'var(--accent-tint-soft)', leftBorder:'3px solid var(--accent)', color:'var(--gray-19)'};
      if (status === 'unconfirmed') return {bg:'var(--gray-2)', leftBorder:'3px dashed var(--accent)', color:'var(--gray-18)'};
      if (status === 'completed') return {bg:'var(--gray-6)', leftBorder:'3px solid var(--gray-13)', color:'var(--gray-15)'};
      return {bg:'var(--gray-6)', leftBorder:'3px solid var(--gray-11)', color:'var(--gray-17)'};
    };
```

In `apptsWithMeta`, replace `stopClick: (e) => e.stopPropagation()` with:

```js
        onClick: (e) => { e.stopPropagation(); this.selectAppointment(a.id); },
```

In the template, find the appointment block:

```html
                      <div onClick="{{ appt.stopClick }}" style="position:absolute;top:{{ appt.top }}px;height:{{ appt.height }}px;left:5px;right:5px;background:{{ appt.bg }};border-left:{{ appt.leftBorder }};border-radius:5px;padding:4px 6px;overflow:hidden;font-size:10.5px;color:{{ appt.color }}">
```

Change `appt.stopClick` to `appt.onClick`:

```html
                      <div onClick="{{ appt.onClick }}" style="position:absolute;top:{{ appt.top }}px;height:{{ appt.height }}px;left:5px;right:5px;background:{{ appt.bg }};border-left:{{ appt.leftBorder }};border-radius:5px;padding:4px 6px;overflow:hidden;font-size:10.5px;color:{{ appt.color }}">
```

### Step 5: Compute the appointment-detail render values

In `renderVals()`, after the existing `const dayLabelFor = ...` line (already defined for other uses — reuse it, don't redefine), add:

```js
    const selectedAppointmentRaw = s.selectedAppointmentId != null ? s.appointments.find(a => a.id === s.selectedAppointmentId) : null;
    const selectedAppointment = selectedAppointmentRaw ? {
      ...selectedAppointmentRaw,
      dayLabel: dayLabelFor(selectedAppointmentRaw.day),
      timeLabel: fmtTime(selectedAppointmentRaw.start),
      isMarkable: selectedAppointmentRaw.status === 'confirmed',
      isAwaitingLog: selectedAppointmentRaw.status === 'completed' && !selectedAppointmentRaw.sessionLogged && s.loggingApptId !== selectedAppointmentRaw.id,
      isLogged: selectedAppointmentRaw.status === 'completed' && !!selectedAppointmentRaw.sessionLogged,
    } : null;
    const hasSelectedAppointment = !!selectedAppointment;
    const isLoggingSelectedAppt = hasSelectedAppointment && s.loggingApptId === selectedAppointmentRaw.id;
    const onCloseApptDetail = () => this.clearSelectedAppointment();
    const onMarkCompleted = hasSelectedAppointment ? () => this.markApptCompletedAndLog(selectedAppointmentRaw.id) : null;
    const onReopenLog = hasSelectedAppointment ? () => this.reopenSessionForm(selectedAppointmentRaw.id) : null;
    const onCancelSessionForm = () => this.cancelSessionForm();
    const onSubmitSessionLog = () => this.submitSessionLog();
    const onSessionNotesChange = (e) => this.updateSessionDraft({notes: e.target.value});
    const onReactionNo = () => this.updateSessionDraft({hasReaction:false, reactionDescription:''});
    const onReactionYes = () => this.updateSessionDraft({hasReaction:true});
    const onReactionDescChange = (e) => this.updateSessionDraft({reactionDescription: e.target.value});
    const onFollowUpCustomChange = (e) => this.updateSessionDraft({followUpCustom: e.target.value});
    const reactionNoStyle = !s.sessionDraft.hasReaction ? 'background:var(--gray-7);color:var(--gray-19);border:none' : 'background:var(--surface-card);color:var(--gray-15);border:1px solid var(--gray-10)';
    const reactionYesStyle = s.sessionDraft.hasReaction ? 'background:var(--danger-bg);color:var(--danger-text);border:none' : 'background:var(--surface-card);color:var(--gray-15);border:1px solid var(--gray-10)';
    const followUpPillDefs = [{key:'1m', label:'1 mes'}, {key:'3m', label:'3 meses'}, {key:'6m', label:'6 meses'}, {key:'custom', label:'Otra fecha…'}];
    const followUpPills = followUpPillDefs.map(p => ({
      ...p,
      onClick: () => this.setFollowUpChoice(p.key),
      bg: s.sessionDraft.followUpChoice === p.key ? 'var(--accent)' : 'var(--surface-card)',
      color: s.sessionDraft.followUpChoice === p.key ? 'var(--text-on-accent)' : 'var(--gray-17)',
      border: s.sessionDraft.followUpChoice === p.key ? '1px solid var(--accent)' : '1px solid var(--gray-10)',
    }));
    const isFollowUpCustom = s.sessionDraft.followUpChoice === 'custom';
    const hasToast = !!s.toast;
    const toastText = s.toast || '';
    const onDismissToast = () => this.dismissToast();
```

Add all of these (`selectedAppointment, hasSelectedAppointment, isLoggingSelectedAppt, onCloseApptDetail, onMarkCompleted, onReopenLog, onCancelSessionForm, onSubmitSessionLog, sessionDraft: s.sessionDraft, onSessionNotesChange, onReactionNo, onReactionYes, onReactionDescChange, reactionNoStyle, reactionYesStyle, followUpPills, isFollowUpCustom, onFollowUpCustomChange, hasToast, toastText, onDismissToast`) to the object returned at the end of `renderVals()`.

### Step 6: Add the "Detalle del turno" card + logging form to the template

Find the boundary between the "Resumen de la semana" card and the "Nuevo turno" card:

```html
          </div>

          <div style="background:var(--surface-card);border:1px solid var(--gray-9);border-radius:12px;box-shadow:var(--shadow-card);overflow:hidden">
            <div onClick="{{ onToggleNewAppt }}" style="padding:16px;cursor:pointer;display:flex;align-items:center">
```

(the first `</div>` here closes "Resumen de la semana"; the following `<div>` opens "Nuevo turno")

Insert the new card between them:

```html
          </div>

          <sc-if value="{{ hasSelectedAppointment }}" hint-placeholder-val="{{ false }}">
            <div style="background:var(--surface-card);border:1px solid var(--gray-9);border-radius:12px;padding:16px;box-shadow:var(--shadow-card)">
              <div style="display:flex;align-items:center;margin-bottom:10px">
                <div style="font-weight:650;font-size:13px;letter-spacing:-0.01em">Detalle del turno</div>
                <div onClick="{{ onCloseApptDetail }}" style="margin-left:auto;color:var(--gray-14);font-size:12px;cursor:pointer">✕</div>
              </div>
              <div style="font-size:12.5px;color:var(--gray-17);line-height:1.6">
                <div style="font-weight:600">{{ selectedAppointment.client }}</div>
                <div>{{ selectedAppointment.treatment }}</div>
                <div>{{ selectedAppointment.dayLabel }} · {{ selectedAppointment.timeLabel }} · {{ selectedAppointment.staffName }}</div>
              </div>
              <sc-if value="{{ selectedAppointment.isMarkable }}" hint-placeholder-val="{{ false }}">
                <button onClick="{{ onMarkCompleted }}" style="margin-top:12px;width:100%;box-sizing:border-box;background:var(--accent);color:var(--text-on-accent);border:none;padding:8px 14px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Marcar como completado</button>
              </sc-if>
              <sc-if value="{{ selectedAppointment.isAwaitingLog }}" hint-placeholder-val="{{ false }}">
                <button onClick="{{ onReopenLog }}" style="margin-top:12px;width:100%;box-sizing:border-box;background:var(--accent);color:var(--text-on-accent);border:none;padding:8px 14px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Registrar sesión</button>
              </sc-if>
              <sc-if value="{{ selectedAppointment.isLogged }}" hint-placeholder-val="{{ false }}">
                <div style="margin-top:12px;font-size:12px;font-weight:600;color:var(--accent-strong)">✓ Sesión registrada</div>
              </sc-if>
              <sc-if value="{{ isLoggingSelectedAppt }}" hint-placeholder-val="{{ false }}">
                <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--gray-7);display:flex;flex-direction:column;gap:10px">
                  <div>
                    <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Notas clínicas</div>
                    <textarea value="{{ sessionDraft.notes }}" onChange="{{ onSessionNotesChange }}" rows="3" style="width:100%;box-sizing:border-box;padding:8px 11px;border:1px solid var(--gray-9);border-radius:var(--radius-md);font-size:12.5px;background:var(--gray-2);color:var(--gray-19);resize:vertical"></textarea>
                  </div>
                  <div>
                    <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Reacción adversa</div>
                    <div style="display:flex;gap:6px">
                      <button onClick="{{ onReactionNo }}" style="flex:1;padding:7px;border-radius:var(--radius-md);font-size:12px;font-weight:600;cursor:pointer;{{ reactionNoStyle }}">No</button>
                      <button onClick="{{ onReactionYes }}" style="flex:1;padding:7px;border-radius:var(--radius-md);font-size:12px;font-weight:600;cursor:pointer;{{ reactionYesStyle }}">Sí</button>
                    </div>
                  </div>
                  <sc-if value="{{ sessionDraft.hasReaction }}" hint-placeholder-val="{{ false }}">
                    <div>
                      <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Descripción de la reacción</div>
                      <textarea value="{{ sessionDraft.reactionDescription }}" onChange="{{ onReactionDescChange }}" rows="2" style="width:100%;box-sizing:border-box;padding:8px 11px;border:1px solid var(--warning-border);border-radius:var(--radius-md);font-size:12.5px;background:var(--warning-bg);color:var(--gray-19);resize:vertical"></textarea>
                    </div>
                  </sc-if>
                  <div>
                    <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Seguimiento recomendado (opcional)</div>
                    <div style="display:flex;flex-wrap:wrap;gap:6px">
                      <sc-for list="{{ followUpPills }}" as="p" hint-placeholder-count="4">
                        <div onClick="{{ p.onClick }}" style="padding:6px 12px;border-radius:var(--radius-pill);font-size:11.5px;font-weight:600;cursor:pointer;background:{{ p.bg }};color:{{ p.color }};border:{{ p.border }}">{{ p.label }}</div>
                      </sc-for>
                    </div>
                    <sc-if value="{{ isFollowUpCustom }}" hint-placeholder-val="{{ false }}">
                      <input value="{{ sessionDraft.followUpCustom }}" onChange="{{ onFollowUpCustomChange }}" placeholder="ej. en 2 semanas" style="margin-top:8px;width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--gray-9);border-radius:var(--radius-md);font-size:12.5px;background:var(--gray-2);color:var(--gray-19)"></input>
                    </sc-if>
                  </div>
                  <div style="display:flex;gap:9px">
                    <button onClick="{{ onCancelSessionForm }}" style="background:var(--surface-card);color:var(--gray-17);border:1px solid var(--gray-10);padding:8px 14px;border-radius:var(--radius-pill);font-size:12px;font-weight:600;cursor:pointer">Cancelar</button>
                    <button onClick="{{ onSubmitSessionLog }}" style="margin-left:auto;background:var(--accent);color:var(--text-on-accent);border:none;padding:8px 16px;border-radius:var(--radius-pill);font-size:12px;font-weight:600;cursor:pointer">Guardar sesión</button>
                  </div>
                </div>
              </sc-if>
            </div>
          </sc-if>

          <div style="background:var(--surface-card);border:1px solid var(--gray-9);border-radius:12px;box-shadow:var(--shadow-card);overflow:hidden">
            <div onClick="{{ onToggleNewAppt }}" style="padding:16px;cursor:pointer;display:flex;align-items:center">
```

### Step 7: Add the toast element

Find the closing of the two-column layout (the outermost grid `div` that holds the sidebar and main content):

```html
    </div>
  </div>
</div>

</x-dc>
```

Insert the toast just before the final `</div>` of the outer grid, so it floats above everything:

```html
    </div>
  </div>
  <sc-if value="{{ hasToast }}" hint-placeholder-val="{{ false }}">
    <div onClick="{{ onDismissToast }}" style="position:fixed;bottom:24px;right:26px;background:var(--gray-19);color:var(--gray-2);padding:10px 16px;border-radius:8px;font-size:12.5px;font-weight:600;box-shadow:0 4px 14px oklch(20% 0.01 260 / 0.25);z-index:50;cursor:pointer">{{ toastText }}</div>
  </sc-if>
</div>

</x-dc>
```

### Step 8: Manual verification

Open `Clinic Platform UX v2.dc.html` in a browser (double-click it, or serve the folder and navigate to it — it's self-contained aside from the sibling `support.js`).

1. Go to Agenda. Click a **confirmed** appointment block (solid left border, e.g. Elena Vidal / Botox – frente, Monday 9:30). Confirm the right rail now shows "Detalle del turno" with client/treatment/time/staff and a "Marcar como completado" button.
2. Click an **unconfirmed** appointment (dashed left border). Confirm the detail card shows but with no "Marcar como completado" and no "Registrar sesión" button (not eligible yet).
3. Back on the confirmed appointment, click "Marcar como completado." Confirm: the block's style on the calendar changes to the grayed "completed" look, and the card now shows the logging form (Notas clínicas / Reacción adversa / Seguimiento recomendado / Cancelar / Guardar sesión).
4. Type a note, leave "Reacción adversa" as "No," pick the "3 meses" pill, click "Guardar sesión." Confirm: a toast appears bottom-right reading "Seguimiento agregado · En 3 meses," and the card collapses back to showing "✓ Sesión registrada."
5. Go to Clientes → select Elena Vidal → Historial tab. Confirm the new entry appears at the top of the list with today's-week date, the practitioner, and your note.
6. Go to Seguimientos. Confirm a new item appears under "Programados" for Elena Vidal / Botox – frente with "En 3 meses."
7. Back on Agenda, click the same (now completed) appointment again. Confirm it shows "✓ Sesión registrada" with no button (already logged).
8. Repeat steps 1-4 on a different confirmed appointment, this time answering "Sí" to Reacción adversa and typing a description, and leaving the follow-up unset. Confirm no toast appears (nothing to confirm) and the Historial entry for that client shows the reaction badge you'll build display for in Task 3 — for now it's fine if it just doesn't crash; the badge itself is Task 3's job. Confirm in the browser console there are no errors.

---

## Task 2: Safety banner on the client profile

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html`
  - `renderVals()`, the `selectedClient` computation (~line 823-824)
  - Client profile header template (~line 229-247)

**Interfaces:**
- Consumes: `state.clients[].history[].adverseReaction.flag` (from Task 1).
- Produces: nothing new consumed elsewhere.

### Step 1: Compute the derived flag

In `renderVals()`, find:

```js
    const selectedClientRaw = s.clients.find(c => c.id === s.selectedClientId) || s.clients[0];
    const selectedClient = {...selectedClientRaw, initials: initials(selectedClientRaw.name)};
```

(this is the post-Task-1 version, using `s.clients` — if Task 1 hasn't run yet, this still reads `this.clientsData`, but Task 2 assumes Task 1 is done first)

Replace with:

```js
    const selectedClientRaw = s.clients.find(c => c.id === s.selectedClientId) || s.clients[0];
    const hasAdverseReactionHistory = (selectedClientRaw.history || []).some(h => h.adverseReaction && h.adverseReaction.flag);
    const selectedClient = {...selectedClientRaw, initials: initials(selectedClientRaw.name), hasAdverseReactionHistory};
    const onOpenReactionHistory = () => this.setClientTab('history');
```

Add `onOpenReactionHistory` to the object returned at the end of `renderVals()`.

### Step 2: Add the banner to the template

Find the end of the client header block and the start of the tabs row:

```html
            <button style="background:var(--accent);color:var(--text-on-accent);border:none;padding:8px 15px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Reservar turno</button>
            <button style="background:var(--surface-card);color:var(--gray-18);border:1px solid var(--gray-11);padding:8px 15px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Mensaje</button>
          </div>
          <div style="display:flex;gap:4px;border-bottom:1px solid var(--gray-8);margin-bottom:18px">
```

Insert the banner between the header's closing `</div>` and the tabs row:

```html
            <button style="background:var(--accent);color:var(--text-on-accent);border:none;padding:8px 15px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Reservar turno</button>
            <button style="background:var(--surface-card);color:var(--gray-18);border:1px solid var(--gray-11);padding:8px 15px;border-radius:var(--radius-pill);font-size:12.5px;font-weight:600;cursor:pointer">Mensaje</button>
          </div>
          <sc-if value="{{ selectedClient.hasAdverseReactionHistory }}" hint-placeholder-val="{{ false }}">
            <div onClick="{{ onOpenReactionHistory }}" style="display:flex;align-items:center;gap:8px;background:var(--warning-bg);border:1px solid var(--warning-border);border-radius:9px;padding:9px 14px;margin-bottom:16px;cursor:pointer;font-size:12.5px;font-weight:600;color:var(--warning-text)">⚠ Reacción adversa registrada — ver Historial</div>
          </sc-if>
          <div style="display:flex;gap:4px;border-bottom:1px solid var(--gray-8);margin-bottom:18px">
```

### Step 2: Manual verification

1. Complete Task 1's verification step 8 first (log a session with a reaction flagged for some client).
2. Open that client's profile (any tab). Confirm the warning banner "⚠ Reacción adversa registrada — ver Historial" appears right below the name/badges/buttons row, above the tabs.
3. Click the banner. Confirm it switches to the Historial tab.
4. Open a different client with no flagged reaction in their history. Confirm no banner appears.

---

## Task 3: Historial tab — display reaction/follow-up/edited state, and inline editing

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html`
  - `state` object (~line 548-581)
  - Methods block (~line 711-748)
  - `renderVals()` (~line 750-943)
  - Historial tab template (~line 256-263)

**Interfaces:**
- Consumes: `state.clients[].history[]` shape and `state.followups` (from Task 1).
- Produces: nothing new consumed elsewhere — this is the leaf task.

### Step 1: Add state for tracking which entry is being edited

In `state = {...}`, add:

```js
    editingHistoryIndex: null,
    historyEditDraft: {notes:'', hasReaction:false, reactionDescription:''},
```

### Step 2: Add edit methods

In the methods block, add:

```js
  currentClientHistoryEntry(index) {
    const c = this.state.clients.find(c => c.id === this.state.selectedClientId);
    return c ? c.history[index] : {};
  }
  emptyHistoryEditDraft(entry) {
    return {notes: entry.notes, hasReaction: !!(entry.adverseReaction && entry.adverseReaction.flag), reactionDescription: (entry.adverseReaction && entry.adverseReaction.description) || ''};
  }
  startEditHistory(index) {
    const entry = this.currentClientHistoryEntry(index);
    this.setState({editingHistoryIndex: index, historyEditDraft: this.emptyHistoryEditDraft(entry)});
  }
  cancelEditHistory() { this.setState({editingHistoryIndex: null}); }
  updateHistoryEditDraft(patch) { this.setState(s => ({historyEditDraft: {...s.historyEditDraft, ...patch}})); }
  saveEditHistory(index) {
    this.setState(s => {
      const d = s.historyEditDraft;
      return {
        clients: s.clients.map(c => c.id !== s.selectedClientId ? c : {
          ...c,
          history: c.history.map((h, i) => i !== index ? h : {
            ...h,
            notes: d.notes,
            adverseReaction: {flag: d.hasReaction, description: d.hasReaction ? d.reactionDescription : ''},
            edited: {isEdited: true, editedAt: 'recién'},
          }),
        }),
        editingHistoryIndex: null,
      };
    });
  }
```

(`editedAt: 'recién'` — this file has no real-time clock anywhere; "recién" — Spanish for "just now" — is consistent with that, rather than fabricating a fake timestamp)

### Step 3: Compute per-entry render values

In `renderVals()`, after the `selectedClient` computation, add:

```js
    const followupById = (id) => s.followups.find(f => f.id === id);
    const historyEntries = (selectedClient.history || []).map((h, i) => {
      const reaction = h.adverseReaction || {};
      const followUp = h.followUpId != null ? followupById(h.followUpId) : null;
      const edited = h.edited || {};
      return {
        ...h, index: i,
        hasReaction: !!reaction.flag, reactionDescription: reaction.description || '',
        hasFollowUp: !!followUp, followUpDue: followUp ? followUp.due : '',
        isEdited: !!edited.isEdited, editedAt: edited.editedAt || '',
        isEditingThis: s.editingHistoryIndex === i, isViewing: s.editingHistoryIndex !== i,
        onEditClick: () => this.startEditHistory(i),
        onSave: () => this.saveEditHistory(i),
      };
    });
    const onHistoryNotesChange = (e) => this.updateHistoryEditDraft({notes: e.target.value});
    const onHistoryReactionNo = () => this.updateHistoryEditDraft({hasReaction:false, reactionDescription:''});
    const onHistoryReactionYes = () => this.updateHistoryEditDraft({hasReaction:true});
    const onHistoryReactionDescChange = (e) => this.updateHistoryEditDraft({reactionDescription: e.target.value});
    const historyReactionNoStyle = !s.historyEditDraft.hasReaction ? 'background:var(--gray-7);color:var(--gray-19);border:none' : 'background:var(--surface-card);color:var(--gray-15);border:1px solid var(--gray-10)';
    const historyReactionYesStyle = s.historyEditDraft.hasReaction ? 'background:var(--danger-bg);color:var(--danger-text);border:none' : 'background:var(--surface-card);color:var(--gray-15);border:1px solid var(--gray-10)';
    const onCancelEditHistory = () => this.cancelEditHistory();
```

Add `historyEntries, historyEditDraft: s.historyEditDraft, onHistoryNotesChange, onHistoryReactionNo, onHistoryReactionYes, onHistoryReactionDescChange, historyReactionNoStyle, historyReactionYesStyle, onCancelEditHistory` to the object returned at the end of `renderVals()`.

### Step 3b: Reset edit state when switching clients

`editingHistoryIndex` is a bare array index with no client identity attached. Without a reset, switching clients mid-edit (the client sidebar is always visible next to the detail panel — one click) leaves a stale index and draft active: if the newly-selected client happens to have a history entry at that same index, it silently renders in edit mode pre-filled with the *previous* client's draft, and saving would overwrite the new client's entry with the old client's data.

Find the existing `selectClient` method:

```js
  selectClient(id) { this.setState({selectedClientId: id, activeClientTab:'overview'}); }
```

Replace with:

```js
  selectClient(id) { this.setState({selectedClientId: id, activeClientTab:'overview', editingHistoryIndex: null}); }
```

(`historyEditDraft` doesn't need clearing — `startEditHistory` always reseeds it fresh from the target entry.)

### Step 4: Replace the Historial tab template

Find:

```html
          <sc-if value="{{ isTabHistory }}" hint-placeholder-val="{{ false }}">
            <sc-for list="{{ selectedClient.history }}" as="h" hint-placeholder-count="3">
              <div style="padding:11px 0;border-top:1px solid var(--gray-7);font-size:13px">
                <div style="font-weight:600">{{ h.treatment }} — {{ h.date }}</div>
                <div style="color:var(--gray-14);font-size:12.5px">{{ h.practitioner }} · {{ h.notes }}</div>
              </div>
            </sc-for>
          </sc-if>
```

Replace with:

```html
          <sc-if value="{{ isTabHistory }}" hint-placeholder-val="{{ false }}">
            <sc-for list="{{ historyEntries }}" as="h" hint-placeholder-count="3">
              <div style="padding:11px 0;border-top:1px solid var(--gray-7);font-size:13px">
                <sc-if value="{{ h.isViewing }}" hint-placeholder-val="{{ true }}">
                  <div style="display:flex;align-items:flex-start;gap:8px">
                    <div style="flex:1;min-width:0">
                      <div style="font-weight:600">{{ h.treatment }} — {{ h.date }} <sc-if value="{{ h.isEdited }}" hint-placeholder-val="{{ false }}"><span style="font-weight:500;color:var(--gray-13);font-size:11.5px">(editado)</span></sc-if></div>
                      <div style="color:var(--gray-14);font-size:12.5px">{{ h.practitioner }} · {{ h.notes }}</div>
                      <sc-if value="{{ h.hasReaction }}" hint-placeholder-val="{{ false }}">
                        <div style="margin-top:6px;display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:var(--warning-text);background:var(--warning-bg);border:1px solid var(--warning-border);padding:3px 9px;border-radius:6px">⚠ Reacción adversa — {{ h.reactionDescription }}</div>
                      </sc-if>
                      <sc-if value="{{ h.hasFollowUp }}" hint-placeholder-val="{{ false }}">
                        <div style="margin-top:5px;font-size:11.5px;font-weight:600;color:var(--accent-strong)">Seguimiento sugerido: {{ h.followUpDue }}</div>
                      </sc-if>
                    </div>
                    <div onClick="{{ h.onEditClick }}" style="font-size:11px;color:var(--gray-13);cursor:pointer;flex-shrink:0">Editar</div>
                  </div>
                </sc-if>
                <sc-if value="{{ h.isEditingThis }}" hint-placeholder-val="{{ false }}">
                  <div style="display:flex;flex-direction:column;gap:10px">
                    <div style="font-weight:600">{{ h.treatment }} — {{ h.date }}</div>
                    <div>
                      <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Notas clínicas</div>
                      <textarea value="{{ historyEditDraft.notes }}" onChange="{{ onHistoryNotesChange }}" rows="3" style="width:100%;box-sizing:border-box;padding:8px 11px;border:1px solid var(--gray-9);border-radius:var(--radius-md);font-size:12.5px;background:var(--gray-2);color:var(--gray-19);resize:vertical"></textarea>
                    </div>
                    <div>
                      <div style="font-size:11.5px;font-weight:600;color:var(--gray-15);margin-bottom:5px">Reacción adversa</div>
                      <div style="display:flex;gap:6px;max-width:220px">
                        <button onClick="{{ onHistoryReactionNo }}" style="flex:1;padding:7px;border-radius:var(--radius-md);font-size:12px;font-weight:600;cursor:pointer;{{ historyReactionNoStyle }}">No</button>
                        <button onClick="{{ onHistoryReactionYes }}" style="flex:1;padding:7px;border-radius:var(--radius-md);font-size:12px;font-weight:600;cursor:pointer;{{ historyReactionYesStyle }}">Sí</button>
                      </div>
                    </div>
                    <sc-if value="{{ historyEditDraft.hasReaction }}" hint-placeholder-val="{{ false }}">
                      <textarea value="{{ historyEditDraft.reactionDescription }}" onChange="{{ onHistoryReactionDescChange }}" rows="2" placeholder="Descripción de la reacción" style="width:100%;box-sizing:border-box;padding:8px 11px;border:1px solid var(--warning-border);border-radius:var(--radius-md);font-size:12.5px;background:var(--warning-bg);color:var(--gray-19);resize:vertical"></textarea>
                    </sc-if>
                    <div style="display:flex;gap:9px">
                      <button onClick="{{ onCancelEditHistory }}" style="background:var(--surface-card);color:var(--gray-17);border:1px solid var(--gray-10);padding:7px 13px;border-radius:var(--radius-pill);font-size:12px;font-weight:600;cursor:pointer">Cancelar</button>
                      <button onClick="{{ h.onSave }}" style="margin-left:auto;background:var(--accent);color:var(--text-on-accent);border:none;padding:7px 15px;border-radius:var(--radius-pill);font-size:12px;font-weight:600;cursor:pointer">Guardar</button>
                    </div>
                  </div>
                </sc-if>
              </div>
            </sc-for>
          </sc-if>
```

### Step 5: Manual verification

1. Open a client whose history now has an entry with a reaction and an entry with a follow-up (from Task 1's verification). Go to Historial.
2. Confirm the reaction entry shows the "⚠ Reacción adversa — {description}" badge, and the follow-up entry shows "Seguimiento sugerido: {due}".
3. Confirm existing seed entries (the ones with no `adverseReaction`/`followUpId`/`edited` fields at all) still render their original two lines with no badges, no "(editado)," and no console errors.
4. Click "Editar" on any entry. Confirm it turns into the edit form pre-filled with that entry's current notes and reaction state.
5. Change the note text, click "Guardar." Confirm the entry now shows the new note and a "(editado)" marker next to the date.
6. Click "Editar" again, then "Cancelar" without changing anything. Confirm it reverts to the display view unchanged (no stray "(editado)" added just from opening and cancelling).
7. Edit an entry to set "Reacción adversa" to "Sí" for the first time (an entry that didn't have one). Confirm the reaction badge appears after saving, and — if this is the client's only flagged entry — the safety banner from Task 2 now appears on their profile header too.

---

## Self-Review Notes

- **Spec coverage:** Flow 1 → Task 1 Steps 3-6. Flow 2 → Task 1 Steps 3, 5-6. Flow 3 → Task 2. Flow 4 → Task 3. Data model → Task 1 Step 1 (clients→state), entry shape used consistently across all three tasks via `adverseReaction`/`followUpId`/`edited`. Out-of-scope items are respected: no manual "+ Agregar sesión" button exists anywhere, no backfilling of seed data, no editing of `followups` entries from Historial (Task 3's edit form only touches `notes`/`adverseReaction`), no bucket recomputation logic.
- **Type/name consistency check:** `state.clients` (not `clientsData`) used consistently in Tasks 1-3. `adverseReaction: {flag, description}` shape matches across the write path (Task 1's `submitSessionLog`), the banner (Task 2's `.some(h => h.adverseReaction && h.adverseReaction.flag)`), and the display/edit path (Task 3's `historyEntries` mapping and `saveEditHistory`). `followUpId` is written once in Task 1 and only ever read (never mutated) in Task 3, matching the "don't edit followups from Historial" constraint.
- **No placeholders:** every step above has real, complete code — no "add validation," no "TODO."
