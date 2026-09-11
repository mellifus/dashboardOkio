# MVP Demo Hybrid Flows Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing clinic dashboard into an explorable, guided, four-case commercial demo that uses only fictional in-browser data.

**Architecture:** Keep `Clinic Platform UX v2.dc.html` as the only rendered application. Move the small, safety-critical demo transition table into a dependency-free browser/CommonJS helper so it can be checked with Node; the DC component consumes it through `window.OkioDemoFlow`. All presentation state remains local and resettable.

**Tech Stack:** Existing DC runtime (`support.js`, `DCLogic`, `x-dc`), vanilla JavaScript, Node built-in `node:test` and `node:assert/strict`; no packages, APIs, or backend.

**Spec:** `Docs/superpowers/specs/2026-09-10-mvp-demo-hybrid-flows-design.md`

## Global Constraints

- All client, professional, message, appointment and clinical values are fictional and the UI labels them as a demo.
- No message can become “sent” without an explicit reception approval action.
- A medical query or possible complication never renders a medically advisory draft or any send action; assignment and escalation are its only actions.
- Do not add authentication, persistence, APIs, Meta integrations, real data, photos, or dependencies.
- State must reset to a fresh fixture copy without reloading the page.
- Preserve the existing navigable views: Agenda, Centro de Solicitudes, Seguimientos, Clientes and Analítica.

---

## File Structure

| File | Responsibility |
|---|---|
| `Dashboard - Claude Design/demo-flow.js` | Pure fixtures and guarded state transitions, exposed to the browser and Node tests. |
| `Dashboard - Claude Design/test/demo-flow.test.cjs` | Runnable checks for allowed transitions, reset isolation, approval gate and clinical block. |
| `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` | Imports the helper; owns the guided UI, local state bindings and existing dashboard presentation. |

### Task 1: Guarded demo-flow helper and executable safety checks

**Files:**
- Create: `Dashboard - Claude Design/demo-flow.js`
- Create: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Produces: `window.OkioDemoFlow` and `module.exports` with `createDemoState()`, `transitionCase(demo, caseId, nextStatus, actor, action, result)`, and `canTransition(caseId, fromStatus, toStatus)`.
- Consumes: no project code and no dependency.
- Contract: `transitionCase` returns the input object unchanged for an invalid case or transition; a valid result is immutable and appends `{at:'Ahora', actor, action, result}` to that case's `audit`.

- [ ] **Step 1: Write failing tests for the transition contract**

Create `Dashboard - Claude Design/test/demo-flow.test.cjs`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { createDemoState, transitionCase, canTransition } = require('../demo-flow.js');

test('inquiry cannot be recorded before reception approval', () => {
  const demo = createDemoState();
  const skipped = transitionCase(demo, 'inquiry', 'recorded', 'Recepción', 'Registrar', 'Enviado simulado');
  assert.equal(skipped, demo);
  assert.equal(demo.cases.inquiry.status, 'classified');
});

test('reschedule follows availability, selection, confirmation and reminder', () => {
  let demo = createDemoState();
  for (const status of ['availability_ready', 'slot_selected', 'confirmed', 'reminder_scheduled']) {
    demo = transitionCase(demo, 'reschedule', status, 'Recepción', status, 'Simulado');
  }
  assert.equal(demo.cases.reschedule.status, 'reminder_scheduled');
  assert.equal(demo.cases.reschedule.audit).length(4);
});

test('clinical flow has no transition to a sendable state', () => {
  const demo = createDemoState();
  assert.equal(canTransition('clinical', 'blocked', 'approved'), false);
  assert.equal(transitionCase(demo, 'clinical', 'approved', 'Recepción', 'Enviar', 'No permitido'), demo);
});

test('each reset returns an isolated fixture', () => {
  const first = createDemoState();
  const changed = transitionCase(first, 'session', 'completed', 'Profesional', 'Completar sesión', 'Registrado');
  const reset = createDemoState();
  assert.equal(changed.cases.session.status, 'completed');
  assert.equal(reset.cases.session.status, 'session_ready');
  assert.deepEqual(reset.cases.session.audit, []);
});
```

- [ ] **Step 2: Run the tests and confirm they fail because the helper is absent**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: a module-not-found failure for `../demo-flow.js`, not a passing suite.

- [ ] **Step 3: Implement the minimal guarded helper**

Create `Dashboard - Claude Design/demo-flow.js` as an IIFE so it works both from `<script src>` and Node:

```js
(function attachDemoFlow(root) {
  const initialCases = {
    inquiry: { status: 'classified', audit: [] },
    reschedule: { status: 'request_received', audit: [] },
    session: { status: 'session_ready', audit: [] },
    clinical: { status: 'blocked', audit: [] },
  };

  const transitions = {
    inquiry: { classified: ['draft_ready'], draft_ready: ['approved', 'edited_and_approved'], approved: ['recorded'], edited_and_approved: ['recorded'] },
    reschedule: { request_received: ['availability_ready'], availability_ready: ['slot_selected'], slot_selected: ['confirmed'], confirmed: ['reminder_scheduled'] },
    session: { session_ready: ['completed'], completed: ['evolution_recorded'], evolution_recorded: ['followup_ready'] },
    clinical: { flagged: ['blocked'], blocked: ['assigned'], assigned: ['escalated'] },
  };

  function createDemoState() {
    return { activeCaseId: null, step: 0, cases: JSON.parse(JSON.stringify(initialCases)) };
  }

  function canTransition(caseId, fromStatus, toStatus) {
    return Boolean(transitions[caseId] && transitions[caseId][fromStatus] && transitions[caseId][fromStatus].includes(toStatus));
  }

  function transitionCase(demo, caseId, nextStatus, actor, action, result) {
    const current = demo.cases[caseId];
    if (!current || !canTransition(caseId, current.status, nextStatus)) return demo;
    const entry = { at: 'Ahora', actor, action, result };
    return {
      ...demo,
      cases: { ...demo.cases, [caseId]: { status: nextStatus, audit: [...current.audit, entry] } },
    };
  }

  const api = { createDemoState, transitionCase, canTransition };
  root.OkioDemoFlow = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run the Node suite and confirm every check passes**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: 4 passing tests and 0 failures.

- [ ] **Step 5: Commit the helper and test**

```bash
git add -- "Dashboard - Claude Design/demo-flow.js" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "feat: add guarded demo flow state"
```

### Task 2: Demo entry, mode and reset wiring

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html:1-10, 41-68, 547-581, 711-724, 920-942`
- Test: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Consumes: `window.OkioDemoFlow.createDemoState()` and `transitionCase()` from Task 1.
- Produces: Component methods `openDemoCase(caseId)`, `exitDemoCase()`, `resetDemo()` and `advanceDemo(caseId, nextStatus, actor, action, result)` plus render values `demo`, `isDemoOpen`, `activeDemoCase`, `onOpenDemoCase`, `onExitDemoCase`, `onResetDemo`.

- [ ] **Step 1: Extend the safety test with a guarded clinical transition**

Add this test to `demo-flow.test.cjs`:

```js
test('clinical case permits assignment then escalation only', () => {
  let demo = createDemoState();
  demo = transitionCase(demo, 'clinical', 'assigned', 'Recepción', 'Asignar profesional', 'Dra. Sofía León');
  demo = transitionCase(demo, 'clinical', 'escalated', 'Profesional', 'Escalar ahora', 'Notificación simulada');
  assert.equal(demo.cases.clinical.status, 'escalated');
  assert.equal(demo.cases.clinical.audit).length(2);
});
```

- [ ] **Step 2: Run the test and confirm it fails before the transition table is complete**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: failure until `clinical.blocked → assigned → escalated` is implemented exactly as shown in Task 1.

- [ ] **Step 3: Wire the helper and the local component state**

1. Add `<script src="./demo-flow.js"></script>` immediately after the existing `support.js` script at `Clinic Platform UX v2.dc.html:6`.
2. Add `demo: window.OkioDemoFlow.createDemoState()` to the component `state` object.
3. Add these methods after `approveSend`:

```js
  openDemoCase(caseId) { this.setState(s => ({demo: {...s.demo, activeCaseId: caseId, step: 0}})); }
  exitDemoCase() { this.setState(s => ({demo: {...s.demo, activeCaseId: null}})); }
  resetDemo() { this.setState({demo: window.OkioDemoFlow.createDemoState()}); }
  advanceDemo(caseId, nextStatus, actor, action, result) {
    this.setState(s => ({demo: window.OkioDemoFlow.transitionCase(s.demo, caseId, nextStatus, actor, action, result)}));
  }
```

4. Derive `isDemoOpen`, `activeDemoCase`, `activeDemo`, `onOpenDemoCase`, `onExitDemoCase`, `onResetDemo`, and `onAdvanceDemo` inside `renderVals()` and return them.
5. Add a compact persistent `Demo con datos simulados` label near the top bar, a four-card launcher in the default Agenda content, and a guided-case header with “Salir del recorrido” and “Reiniciar demo”. Each launcher invokes `onOpenDemoCase('inquiry' | 'reschedule' | 'session' | 'clinical')`.

- [ ] **Step 4: Run the Node suite and manually verify mode controls**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Then open `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` and verify that each launcher opens a case, “Salir” returns to the dashboard without resetting it, and “Reiniciar” restores all statuses and audits.

- [ ] **Step 5: Commit the demo shell**

```bash
git add -- "Dashboard - Claude Design/Clinic Platform UX v2.dc.html" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "feat: add guided demo shell"
```

### Task 3: Implement the inquiry and rescheduling cases

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html:292-438, 628-652, 858-905`
- Test: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Consumes: `advanceDemo()` and guarded statuses from Tasks 1-2.
- Produces: case-specific render values `inquiryCanDraft`, `inquiryCanApprove`, `rescheduleCanCheckAvailability`, `rescheduleCanConfirm`, `rescheduleCanScheduleReminder`, `selectedAlternative`, and their handlers.
- Contract: the inquiry cannot become `recorded` until `approved` or `edited_and_approved`; rescheduling cannot confirm until an alternative was selected.

- [ ] **Step 1: Add failing transition tests for both commercial flows**

Add to `demo-flow.test.cjs`:

```js
test('inquiry records after edited reception approval', () => {
  let demo = createDemoState();
  demo = transitionCase(demo, 'inquiry', 'draft_ready', 'IA', 'Preparar borrador', 'Borrador listo');
  demo = transitionCase(demo, 'inquiry', 'edited_and_approved', 'Recepción', 'Editar y aprobar', 'Envío simulado aprobado');
  demo = transitionCase(demo, 'inquiry', 'recorded', 'Sistema', 'Registrar acción', 'Bitácora actualizada');
  assert.equal(demo.cases.inquiry.status, 'recorded');
});

test('reschedule cannot confirm while availability is only displayed', () => {
  let demo = createDemoState();
  demo = transitionCase(demo, 'reschedule', 'availability_ready', 'IA', 'Verificar disponibilidad', 'Tres horarios');
  assert.equal(transitionCase(demo, 'reschedule', 'confirmed', 'Recepción', 'Confirmar', 'No permitido'), demo);
});
```

- [ ] **Step 2: Run the suite and confirm the second test fails if confirmation is accidentally allowed early**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: the test protects the transition table; it must fail if `availability_ready → confirmed` is added.

- [ ] **Step 3: Make the two existing request fixtures interactive only in guided mode**

1. Keep `t2` as the inquiry fixture and `t1` as the rescheduling fixture. Add a `demoCaseId` property to each.
2. In the selected-thread render mapping, replace `approvalLabel: ... 'Resuelto automáticamente'` with a label that never claims automatic sending: use `Requiere aprobación` until `sentSel`, then `Envío simulado aprobado`.
3. When `activeDemoCase.id === 'inquiry'`, render the fixture's category, confidence, reason, and a staged action sequence: “Preparar borrador” → editable draft → “Aprobar y registrar”. The final button calls `advanceDemo('inquiry', 'recorded', 'Sistema', 'Registrar acción', 'Envío simulado registrado')` only after reception approval.
4. When `activeDemoCase.id === 'reschedule'`, render the three existing `contextCard.alternatives` as buttons. Store one selected value in `state.demoSelectedAlternative`. “Confirmar nuevo turno” is disabled until one is selected; its handler calls `advanceDemo('reschedule', 'confirmed', 'Recepción', 'Confirmar nuevo turno', selectedAlternative)` and changes the matching appointment fixture's displayed time. “Programar recordatorio” then calls `advanceDemo('reschedule', 'reminder_scheduled', 'Sistema', 'Programar recordatorio', 'Recordatorio simulado')`.
5. Render each case audit below its action controls.

- [ ] **Step 4: Run the safety suite and verify both guided paths in a browser**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Manual checks:

1. Inquiry: prepare a draft, edit it, approve it, then register it; verify each event is visible and no earlier action displays “sent”.
2. Reschedule: verify confirm is disabled before an alternative selection; select Friday 10:00, confirm, schedule the simulated reminder, then verify all four audit events.
3. Exit each case and verify the existing Centro de Solicitudes remains navigable.

- [ ] **Step 5: Commit the two commercial flows**

```bash
git add -- "Dashboard - Claude Design/Clinic Platform UX v2.dc.html" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "feat: add inquiry and reschedule demo flows"
```

### Task 4: Complete session logging and follow-up case

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html:69-136, 253-263, 547-581, 711-748, 822-942`
- Modify: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Consumes: `session_ready → completed → evolution_recorded → followup_ready` from `demo-flow.js` and the history-entry shape from `Docs/superpowers/specs/2026-08-04-historial-tab-design.md`.
- Produces: an appointment `status:'completed'`, a history entry with `adverseReaction` and `followUpId`, and a linked `followups` entry with `status:'pending'`.

- [ ] **Step 1: Add a failing session transition test**

Add to `demo-flow.test.cjs`:

```js
test('session reaches follow-up ready only after evolution is recorded', () => {
  let demo = createDemoState();
  demo = transitionCase(demo, 'session', 'completed', 'Profesional', 'Completar sesión', 'Formulario abierto');
  assert.equal(transitionCase(demo, 'session', 'followup_ready', 'Sistema', 'Preparar seguimiento', 'No permitido'), demo);
  demo = transitionCase(demo, 'session', 'evolution_recorded', 'Profesional', 'Guardar evolución', 'Historial actualizado');
  demo = transitionCase(demo, 'session', 'followup_ready', 'Sistema', 'Preparar seguimiento', 'Pendiente de revisión');
  assert.equal(demo.cases.session.status, 'followup_ready');
});
```

- [ ] **Step 2: Run the suite and confirm the desired session sequence is protected**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: the suite passes with the Task 1 transition table; it fails if the skipped `session_ready → followup_ready` transition is introduced.

- [ ] **Step 3: Add the smallest session write path to the existing Agenda and Historial**

1. Follow the approved history design's existing shapes: add `selectedAppointmentId`, `sessionDraft`, and a `completed` branch in the appointment status renderer.
2. Clicking a confirmed demo appointment selects it in the Agenda rail. “Marcar como completado” changes its status to `completed`, calls `advanceDemo('session', 'completed', 'Profesional', 'Completar sesión', 'Formulario de evolución abierto')`, and reveals an inline form.
3. The form has `Notas clínicas`, `Reacción adversa` Sí/No, conditional reaction description, and follow-up choices `1 mes`, `3 meses`, `6 meses`. Do not create a date picker or clinical recommendation engine.
4. `saveSessionLog()` requires notes; if reaction is Sí, it also requires a description. It immutably appends:

```js
{
  treatment, date, practitioner, notes,
  adverseReaction: { flag: hasReaction, description: hasReaction ? reactionDescription : '' },
  followUpId: nextFollowUpId,
}
```

to the selected client's `history`; when a follow-up was chosen, it appends:

```js
{
  id: nextFollowUpId, client, treatment,
  trigger: 'Seguimiento post-tratamiento', due: 'En 3 meses',
  bucket: 'scheduled', status: 'pending',
}
```

to `state.followups`. Then call `advanceDemo('session', 'evolution_recorded', 'Profesional', 'Guardar evolución', 'Historial actualizado')` and `advanceDemo('session', 'followup_ready', 'Sistema', 'Preparar seguimiento', 'Pendiente de revisión')`.
5. In the guided session case, link to the selected client's Historial and Seguimientos views after save. It must say “pendiente de revisión”, not “enviado”.

- [ ] **Step 4: Run the suite and perform the linked-view verification**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Manual checks:

1. Complete a confirmed appointment, enter a note, select “3 meses”, and save.
2. Confirm the demo audit has completed, evolution recorded, and follow-up ready events.
3. Confirm the Historial contains the new entry and Seguimientos contains the linked pending item.
4. Mark a reaction as Sí and verify the warning appears without any diagnostic text.

- [ ] **Step 5: Commit the session flow**

```bash
git add -- "Dashboard - Claude Design/Clinic Platform UX v2.dc.html" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "feat: add session follow-up demo flow"
```

### Task 5: Enforce the clinical block and escalation case

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html:361-370, 672-697, 858-905`
- Modify: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Consumes: clinical case status from Task 1 and selected `t5` request fixture.
- Produces: `selectedThread.isClinicalRisk`, `selectedThread.canSend === false`, `onAssignProfessional`, and `onEscalateClinical`.
- Contract: clinical selection overrides the shared response composer; no UI branch may call `approveSend()` for `t5`.

- [ ] **Step 1: Add a failing regression test for the non-sendable clinical state**

Add to `demo-flow.test.cjs`:

```js
test('clinical assignment cannot create a sendable inquiry status', () => {
  let demo = createDemoState();
  demo = transitionCase(demo, 'clinical', 'assigned', 'Recepción', 'Asignar profesional', 'Dra. Sofía León');
  assert.equal(demo.cases.clinical.status, 'assigned');
  assert.equal(canTransition('clinical', 'assigned', 'recorded'), false);
  assert.equal(canTransition('clinical', 'assigned', 'approved'), false);
});
```

- [ ] **Step 2: Run the suite and confirm it fails if a clinical send transition is added**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: the suite passes now and becomes red if any `approved` or `recorded` transition is permitted from a clinical state.

- [ ] **Step 3: Replace the clinical composer with an escalation-only panel**

1. Add `isClinicalRisk: selectedThreadRaw.id === 't5'` and `canSend: !isClinicalRisk && !sentSel` to `selectedThread` in `renderVals()`.
2. Wrap the textarea and its approval/discard buttons at lines 361-370 in an `sc-if` for `!selectedThread.isClinicalRisk`.
3. Add the opposite branch with a danger-styled card: “Respuesta automática bloqueada”, the assigned fictional professional, and the reason “Posible complicación”. It contains only “Asignar a Dra. Sofía León” and “Escalar ahora”.
4. “Asignar” calls `advanceDemo('clinical', 'assigned', 'Recepción', 'Asignar profesional', 'Dra. Sofía León')`; “Escalar” calls `advanceDemo('clinical', 'escalated', 'Profesional', 'Escalar ahora', 'Notificación simulada')`. Disable escalation until assignment is complete.
5. Remove the current `t5.aiSuggestion` text that opines on whether a reaction is normal. Replace it with a non-advisory fixture reason: `Posible complicación detectada: requiere revisión profesional antes de responder.`
6. Render the clinical audit and a visible priority state, but no confirmation of a message sent.

- [ ] **Step 4: Run the suite and verify the negative path in a browser**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Manual checks:

1. Open the clinical guided case and `t5` from Centro de Solicitudes.
2. Confirm that no textarea, draft, “Aprobar”, “Enviar”, or medical advice appears.
3. Confirm “Escalar ahora” is disabled before assignment, works after assignment, and records two audit events.
4. Navigate away and back; confirm the blocked state remains until reset.

- [ ] **Step 5: Commit the clinical safety flow**

```bash
git add -- "Dashboard - Claude Design/Clinic Platform UX v2.dc.html" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "feat: add clinical escalation demo flow"
```

### Task 6: End-to-end demo rehearsal and responsive check

**Files:**
- Modify: `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` only if a verified issue is found.
- Test: `Dashboard - Claude Design/test/demo-flow.test.cjs`

**Interfaces:**
- Consumes: all four implemented guided cases.
- Produces: no new interface; this is a verification and targeted-fix task.

- [ ] **Step 1: Run the full transition suite before visual changes**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: all transition and safety checks pass before any visual refinement.

- [ ] **Step 2: Rehearse the four paths as a ten-minute sales demo**

Open `Dashboard - Claude Design/Clinic Platform UX v2.dc.html` and perform exactly:

1. Inquiry: classify → prepare → edit/approve → record.
2. Reschedule: show availability → select → confirm → schedule reminder.
3. Session: complete → log evolution/reaction → create follow-up → open Historial and Seguimientos.
4. Clinical: verify blocked composer → assign professional → escalate.
5. Reset the demo and verify all visible state returns to its initial fixture.

- [ ] **Step 3: Check responsive presentation at 375px and 1440px**

At 375px and 1440px, verify the launcher cards, guided header, primary action, audit entries and clinical block remain visible without overlapping controls. If a control overflows, apply the smallest local CSS/layout correction in the HTML and repeat the relevant case rehearsal.

- [ ] **Step 4: Run fresh evidence after any correction**

Run: `node --test "Dashboard - Claude Design/test/demo-flow.test.cjs"`

Expected: all tests pass; manual rehearsal remains successful with no browser-console errors.

- [ ] **Step 5: Commit only verified refinements**

```bash
git add -- "Dashboard - Claude Design/Clinic Platform UX v2.dc.html" "Dashboard - Claude Design/test/demo-flow.test.cjs"
git commit -m "chore: verify hybrid MVP demo flows"
```

## Plan self-review

- **Spec coverage:** Task 2 implements the hybrid entry, mode and reset. Task 3 implements inquiry and scheduling. Task 4 implements session, evolution/reaction and linked follow-up. Task 5 makes clinical blocking override the shared composer. Task 6 verifies the four paths, reset and viewport behavior.
- **Safety coverage:** Task 1 supplies the shared guarded transitions; Tasks 3 and 5 add explicit negative checks for premature confirmation and medical send states.
- **Scope check:** The helper is the only new runtime file because the existing DC file needs pure, executable safety checks. No backend, integration or second frontend is introduced.
- **Name consistency:** `createDemoState`, `transitionCase`, `canTransition`, `advanceDemo`, `demo`, `inquiry`, `reschedule`, `session`, and `clinical` are used consistently throughout.
