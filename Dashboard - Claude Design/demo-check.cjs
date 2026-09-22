// Ejecutar: node "Dashboard - Claude Design/demo-check.cjs"
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, 'Clinic Platform UX v2.dc.html'), 'utf8');
const script = html.match(/<script type="text\/x-dc" data-dc-script>([\s\S]*?)<\/script>/)[1];
class DCLogic {
  setState(change) { this.state = {...this.state, ...(typeof change === 'function' ? change(this.state) : change)}; }
}
const app = vm.runInNewContext(script + '\nnew Component()', {DCLogic});
const main = () => app.state.demo.appointments.find(a => a.id === 'demo-1');
const initial = JSON.stringify(app.state.demo);

// Orden, edición efectiva, estados separados y actualización del turno correcto.
app.sendDemoReminder();
app.receiveDemoReply('confirmation');
app.confirmDemoAppointment();
assert.equal(main().status, 'unconfirmed');
assert.equal(app.state.demo.sentText, null);
app.prepareDemoReminder();
for (const required of ['Luciana', main().reminderDateLabel.toLowerCase(), main().time, ...main().treatments.map(t => t.toLowerCase())]) {
  const valid = app.state.demo.draft;
  app.updateReceptionDemo({draft:valid.replace(required, '')});
  app.sendDemoReminder();
  assert.equal(app.state.demo.sentText, null, 'No debe permitir omitir: ' + required);
  app.updateReceptionDemo({draft:valid});
}
app.updateReceptionDemo({draft:app.state.demo.draft.replace('Gracias!', 'Te esperamos!')});
assert.doesNotMatch(app.state.demo.draft, /2026/);
app.sendDemoReminder();
assert.match(app.state.demo.sentText, /Te esperamos!/);
assert.equal(main().status, 'unconfirmed');
const approved = app.state.demo.sentText;
app.sendDemoReminder();
assert.equal(app.state.demo.sentText, approved);
app.receiveDemoReply('confirmation');
assert.equal(main().status, 'unconfirmed');
app.confirmDemoAppointment();
assert.equal(main().status, 'confirmed');
app.selectDemoClient('agustina');
app.renderReceptionDemo().navItems.find(v => v.id === 'conversations').onClick();
assert.equal(app.state.demo.appointmentId, 'demo-1');
assert.equal(app.renderReceptionDemo().demoStatus, 'Confirmado');
assert.equal(app.state.demo.appointments.length, 3);
app.renderReceptionDemo().onDemoWeekView();
let week = app.renderReceptionDemo();
assert.equal(week.demoWeekView, true);
assert.equal(week.demoWeekDays.length, 7);
assert.equal(week.demoWeekDays[3].appointments.find(a => a.id === 'demo-1').statusLabel, 'Confirmado');
week.demoWeekDays[3].appointments.find(a => a.id === 'demo-1').onClick();
assert.equal(app.state.demo.appointmentId, 'demo-1');
assert.equal(app.state.demo.view, 'calendar');
assert.equal(app.state.demo.agendaView, 'day');
app.renderReceptionDemo().onDemoDayView();
assert.equal(app.renderReceptionDemo().demoAppointments.find(a => a.id === 'demo-1').statusLabel, 'Confirmado');
// Agrupar por fecha: un turno de otro día no debe aparecer en la lista diaria.
app.updateReceptionDemo({appointments:app.state.demo.appointments.map(a => a.id === 'demo-2' ? {...a,date:'2026-09-14'} : a)});
week = app.renderReceptionDemo();
assert.equal(week.demoWeekDays[0].appointments[0].id, 'demo-2');
assert.equal(week.demoAppointments.length, 2);
assert.equal(week.demoWeekDays[1].empty, true);

// Sin respuesta no confirma; un aviso de ausencia conserva el turno y pide atención.
app.resetReceptionDemo();
app.receiveDemoReply('unavailable');
assert.equal(app.state.demo.reply, null);
app.prepareDemoReminder();
app.sendDemoReminder();
assert.match(app.renderReceptionDemo().demoReminderStatus, /Sin respuesta/);
app.confirmDemoAppointment();
assert.equal(main().status, 'unconfirmed');
const unchangedAppointment = JSON.stringify(main());
app.renderReceptionDemo().onDemoUnavailable();
app.confirmDemoAppointment();
app.receiveDemoReply('confirmation');
app.escalateDemoReply();
assert.equal(JSON.stringify(main()), unchangedAppointment);
assert.equal(app.state.demo.reply.kind, 'unavailable');
assert.equal(app.state.demo.escalated, false);
assert.equal(app.renderReceptionDemo().demoUnavailable, true);
assert.equal(app.renderReceptionDemo().demoCanConfirm, false);
assert.equal(app.renderReceptionDemo().demoCanReply, false);
assert.match(app.renderReceptionDemo().demoStatus, /Requiere atención de recepción/);
assert.match(app.renderReceptionDemo().demoWeekDays[3].appointments.find(a => a.id === 'demo-1').statusLabel, /Requiere atención de recepción/);
app.selectDemoClient('agustina');
assert.equal(app.renderReceptionDemo().demoUnavailable, false);
assert.equal(app.renderReceptionDemo().demoStatus, 'Confirmado');

// Una consulta sensible no puede entrar en la confirmación ni habilitar otro envío.
app.resetReceptionDemo();
assert.equal(JSON.stringify(app.state.demo), initial);
app.prepareDemoReminder();
app.sendDemoReminder();
app.receiveDemoReply('sensitive');
app.confirmDemoAppointment();
app.receiveDemoReply('confirmation');
assert.equal(main().status, 'unconfirmed');
assert.equal(app.renderReceptionDemo().demoCanConfirm, false);
assert.equal(app.renderReceptionDemo().demoCanDraft, false);
app.escalateDemoReply();
assert.equal(app.state.demo.escalated, true);
app.confirmDemoAppointment();
assert.equal(main().status, 'unconfirmed');
app.resetReceptionDemo();
assert.equal(JSON.stringify(app.state.demo), initial);
assert.equal(app.renderReceptionDemo().isAnalyticsView, false);
assert.equal(app.renderReceptionDemo().isFollowupsView, false);
console.log('OK: edición, aprobación, confirmación, Día/Semana, sin respuesta, aviso de ausencia, derivación y reinicio.');
