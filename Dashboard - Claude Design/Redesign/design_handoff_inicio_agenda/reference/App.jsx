import React from "react";
const { NavItem, Avatar, SearchInput, Card, Badge, Dot, StatCard, Button, ListRow, Tabs, ProgressBar } = window.Okio;

const NAV = [
  { id: "dashboard", label: "Inicio" },
  { id: "calendar", label: "Agenda" },
  { id: "requests", label: "Conversaciones" },
  { id: "clients", label: "Clientes" },
  { id: "catalog", label: "Catálogo" },
  { id: "followups", label: "Seguimientos" },
  { id: "analytics", label: "Analítica" },
];

const THREADS = [
  { id: "t1", name: "Elena Vidal", category: "Reprogramación", color: "oklch(58% 0.16 55)", meta: "Mañana 10:00 · horarios alternativos", channel: "WhatsApp", wait: "12 min", status: "Listo para aprobar", vip: true, suggestion: "El viernes hay disponibilidad a las 10:00 y a las 15:30 con Ana Torres — ¿querés que lo mueva a uno de esos horarios?" },
  { id: "t2", name: "Camila Reyes", category: "Consulta de precio", color: "oklch(56% 0.15 230)", meta: "Oportunidad de $420", channel: "Instagram", wait: "2 min", status: "Esperando aprobación", vip: false, suggestion: "Tenemos un horario libre este jueves a las 15:00 para una consulta de relleno. ¿Querés que te lo reserve?" },
  { id: "t3", name: "Irene Castro", category: "Consulta médica", color: "oklch(56% 0.18 25)", meta: "Posible complicación", channel: "WhatsApp", wait: "6 min", status: "Requiere revisión inmediata", vip: false, suggestion: "Puede ser una reacción normal, pero se recomienda contactar a la Dra. Sofía León antes de responder." },
];

const CLIENTS = [
  { id: "c1", name: "Elena Vidal", lastVisit: "12 jul", overview: "Clienta habitual desde 2023. Prefiere turnos por la mañana. Referida por Sofía Ramos.",
    history: [{ t: "Botox – frente", d: "12 jul 2026" }, { t: "Relleno – labios", d: "2 abr 2026" }] },
  { id: "c2", name: "Sofía Ramos", lastVisit: "20 jun", overview: "Clienta de largo plazo, tratamientos mensuales. Prefiere a Marta Ruiz.",
    history: [{ t: "Relleno – labios", d: "20 jun 2026" }] },
];

const INITIAL_APPTS = [
  { id: "a1", client: "Elena Vidal", treatment: "Botox – frente", time: "09:30", duration: "30 min", pro: "Dra. Sofía León", confirmed: true, done: true },
  { id: "a2", client: "Marco Díaz", treatment: "Consulta inicial", time: "11:00", duration: "45 min", pro: "Dra. Sofía León", confirmed: false,
    issue: { kind: "confirm", text: "No respondió el recordatorio de ayer. Confirmá por WhatsApp o liberá el horario.", cta: "Enviar recordatorio" } },
  { id: "a3", client: "Lucía Ferrer", treatment: "Limpieza facial profunda", time: "12:15", duration: "60 min", pro: "Ana Torres", confirmed: true },
  { id: "a4", client: "Carla Núñez", treatment: "Depilación láser – piernas", time: "14:00", duration: "50 min", pro: "Ana Torres", confirmed: true,
    issue: { kind: "consent", text: "Falta el consentimiento informado firmado. Enviáselo antes de las 13:30.", cta: "Enviar consentimiento" } },
  { id: "a5", client: "Valentina Soto", treatment: "Relleno – labios", time: "16:30", duration: "45 min", pro: "Dra. Sofía León", confirmed: true },
  { id: "a6", client: "Paula Giménez", treatment: "Peeling químico", time: "18:00", duration: "40 min", pro: "Ana Torres", confirmed: false },
];
const NOW = "10:12";
const TODAY = 1;
const DAY_SHORT = ["Lun 29", "Mar 30", "Mié 31", "Jue 1", "Vie 2", "Sáb 3"];
const DAY_LONG = ["lunes 29 de julio", "martes 30 de julio", "miércoles 31 de julio", "jueves 1 de agosto", "viernes 2 de agosto", "sábado 3 de agosto"];
const P1 = "Dra. Sofía León", P2 = "Ana Torres";
const WEEK_EXTRA = [
  { id: "w1", day: 0, time: "09:00", duration: "60 min", client: "Martina Ruiz", treatment: "Limpieza facial profunda", pro: P2, confirmed: true, done: true },
  { id: "w2", day: 0, time: "11:30", duration: "30 min", client: "Rocío Álvarez", treatment: "Toxina – entrecejo", pro: P1, confirmed: true, done: true },
  { id: "w3", day: 0, time: "15:00", duration: "30 min", client: "Agustina Paz", treatment: "Depilación láser – axilas", pro: P2, confirmed: true, done: true },
  { id: "w4", day: 0, time: "17:00", duration: "45 min", client: "Delfina Correa", treatment: "Relleno – ojeras", pro: P1, confirmed: true, done: true },
  { id: "w5", day: 2, time: "10:00", duration: "30 min", client: "Abril Méndez", treatment: "Consulta inicial", pro: P1, confirmed: false },
  { id: "w6", day: 2, time: "12:30", duration: "45 min", client: "Sofía Benítez", treatment: "Mesoterapia facial", pro: P1, confirmed: true },
  { id: "w7", day: 2, time: "16:00", duration: "30 min", client: "Julieta Sosa", treatment: "Control post tratamiento", pro: P2, confirmed: true },
  { id: "w8", day: 3, time: "09:30", duration: "60 min", client: "Florencia Ríos", treatment: "Limpieza facial", pro: P2, confirmed: true },
  { id: "w9", day: 3, time: "11:00", duration: "60 min", client: "Lucía Paredes", treatment: "Hilos tensores", pro: P1, confirmed: true },
  { id: "w10", day: 3, time: "11:00", duration: "50 min", client: "Camila Ortega", treatment: "Depilación láser – piernas", pro: P2, confirmed: false },
  { id: "w11", day: 3, time: "18:00", duration: "40 min", client: "Martina Ruiz", treatment: "Peeling químico", pro: P2, confirmed: true },
  { id: "w12", day: 4, time: "10:00", duration: "30 min", client: "Elena Vidal", treatment: "Control de toxina", pro: P1, confirmed: true },
  { id: "w13", day: 4, time: "14:30", duration: "40 min", client: "Valentina Gómez", treatment: "Peeling químico", pro: P2, confirmed: false },
  { id: "w14", day: 4, time: "17:00", duration: "45 min", client: "Paula Giménez", treatment: "Radiofrecuencia facial", pro: P2, confirmed: true },
  { id: "w15", day: 5, time: "10:00", duration: "50 min", client: "Carla Núñez", treatment: "Depilación láser – piernas", pro: P2, confirmed: true },
  { id: "w16", day: 5, time: "11:30", duration: "30 min", client: "Marco Díaz", treatment: "Consulta inicial", pro: P1, confirmed: false },
];
const durMin = (d) => parseInt(d, 10) || 30;
const fmtMin = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const apptStatus = (a) => a.done ? { label: "Atendido", fg: OK.muted, bg: "#ECE7E2" }
  : a.confirmed ? { label: "Confirmado", fg: OK.green, bg: "#E3ECE9" }
  : a.reminded ? { label: "Recordatorio enviado", fg: OK.goldInk, bg: "#F3EADF" }
  : { label: "Sin confirmar", fg: OK.goldInk, bg: "#F3EADF" };
const OK = { green: "#003F36", cream: "#F5F1EC", taupe: "#DED1CB", gold: "#B99269", goldInk: "#7A5A33", ink: "#1D2B28", muted: "#5B6763", white: "#FFFFFF" };
const SERIF = "'Fraunces', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";
const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

const CATALOG = [
  { name: "Botox – frente", category: "Inyectables", price: "$280" },
  { name: "Relleno – labios", category: "Inyectables", price: "$420" },
  { name: "Peeling químico", category: "Piel", price: "$150" },
];

const INITIAL_FOLLOWUPS = [
  { id: "f1", client: "Julia Ortiz", treatment: "Peeling químico", due: "2 días de atraso", status: "pending" },
  { id: "f2", client: "Sofía Ramos", treatment: "Relleno – labios", due: "Hoy", status: "pending" },
];

function Sidebar({ view, setView, requestCount }) {
  return (
    <div style={{ background: OK.green, width: 210, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "20px 12px", fontFamily: SANS }}>
      <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 22, color: OK.cream, padding: "0 10px 22px", letterSpacing: "-0.01em" }}>Okio</div>
      {NAV.map((n) => {
        const on = view === n.id;
        return (
          <div key={n.id} onClick={() => setView(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, cursor: "pointer", background: on ? "rgba(245,241,236,0.10)" : "transparent", color: on ? OK.cream : "rgba(245,241,236,0.72)", fontSize: 13.5, fontWeight: on ? 600 : 500 }}>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: on ? OK.gold : "rgba(245,241,236,0.3)", flexShrink: 0 }}></span>
            <span>{n.label}</span>
            {n.id === "requests" && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 10, background: "rgba(245,241,236,0.14)", color: OK.cream }}>{requestCount}</span>}
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ title, query, setQuery }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 26px", background: OK.cream, borderBottom: `1px solid ${OK.taupe}`, fontFamily: SANS, color: OK.ink }}>
      <div style={{ fontWeight: 600, fontSize: 14.5 }}>{title}</div>
      <div style={{ marginLeft: "auto" }}>
        <SearchInput placeholder="Buscar clientes, turnos…" value={query} onChange={setQuery} />
      </div>
      <div style={{ width: 30, height: 30, borderRadius: 15, background: OK.green, color: OK.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11.5, fontWeight: 600, flexShrink: 0 }}>MR</div>
    </div>
  );
}

function useWidth() {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(1000);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    setW(ref.current.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function OkBtn({ kind = "primary", children, onClick, full }) {
  const base = { fontFamily: SANS, fontSize: 13.5, fontWeight: 600, borderRadius: 10, padding: "10px 16px", minHeight: 40, cursor: "pointer", whiteSpace: "nowrap", width: full ? "100%" : "auto" };
  const k = kind === "primary"
    ? { background: OK.green, color: OK.cream, border: `1px solid ${OK.green}` }
    : kind === "ghost"
    ? { background: "transparent", color: OK.muted, border: "1px solid transparent" }
    : { background: OK.white, color: OK.green, border: `1px solid ${OK.taupe}` };
  return <button onClick={onClick} style={{ ...base, ...k }}>{children}</button>;
}

function AgendaOverview({ appts: all, setAppts, forceMobile, listStyle = "v1", onOpen }) {
  const [ref, w] = useWidth();
  const mobile = forceMobile || w < 640;
  const appts = all.filter((a) => a.day === TODAY).sort((a, b) => toMin(a.time) - toMin(b.time));
  const [done, setDone] = React.useState({});
  const pros = [...new Set(appts.map((a) => a.pro))];
  const showPro = pros.length > 1;
  const confirmed = appts.filter((a) => a.confirmed).length;
  const attention = appts.filter((a) => a.issue && !done[a.id]);
  const unconfirmed = appts.filter((a) => !a.confirmed && !a.issue);
  const next = appts.find((a) => toMin(a.time) > toMin(NOW));
  const inMin = next ? toMin(next.time) - toMin(NOW) : 0;
  const resolve = (a) => {
    setDone((d) => ({ ...d, [a.id]: true }));
    if (a.issue.kind === "confirm") setAppts((prev) => prev.map((x) => (x.id === a.id ? { ...x, reminded: true } : x)));
  };
  const confirm = (id) => setAppts((prev) => prev.map((a) => (a.id === id ? { ...a, confirmed: true } : a)));

  const stats = [
    { label: "Turnos hoy", value: appts.length, sub: showPro ? `${pros.length} profesionales` : pros[0] },
    { label: "Confirmados", value: confirmed, sub: `de ${appts.length}` },
    { label: "Requieren atención", value: attention.length + unconfirmed.length, sub: attention.length ? `${attention.length} por resolver` : "Todo al día", warn: attention.length + unconfirmed.length > 0 },
  ];

  return (
    <div ref={ref} style={{ background: OK.cream, minHeight: "100%", padding: mobile ? "20px 16px 28px" : "28px 32px 36px", fontFamily: SANS, color: OK.ink, boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: "column", gap: mobile ? 14 : 18 }}>
        <div style={{ background: OK.green, color: OK.cream, borderRadius: 18, padding: mobile ? "20px 18px" : "26px 28px", display: "flex", flexDirection: "column", gap: mobile ? 18 : 22 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-end", gap: mobile ? 16 : 24 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: OK.gold, marginBottom: 8 }}>Resumen del día</div>
              <div style={{ fontFamily: SERIF, fontSize: mobile ? 28 : 36, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.01em", textWrap: "pretty" }}>Hoy, martes 30 de julio</div>
            </div>
            <OkBtn kind="secondary" full={mobile} onClick={() => openNewAppt()}>+ Nuevo turno</OkBtn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, minmax(0,1fr))" : "repeat(4, minmax(0,1fr))", gap: 1, background: "rgba(245,241,236,0.16)", borderRadius: 12, overflow: "hidden" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: OK.green, padding: mobile ? "12px 12px" : "14px 16px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "rgba(245,241,236,0.78)", fontWeight: 500 }}>{s.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: SERIF, fontSize: mobile ? 26 : 30, fontWeight: 500, lineHeight: 1, color: s.warn ? OK.gold : OK.cream, fontVariantNumeric: "tabular-nums" }}>{s.value}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(245,241,236,0.72)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: mobile ? "normal" : "nowrap", lineHeight: 1.3 }}>{s.sub}</div>
              </div>
            ))}
            {next && (
              <div style={{ background: OK.green, padding: mobile ? "12px 12px" : "14px 16px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "rgba(245,241,236,0.78)", fontWeight: 500 }}>Próximo turno · en {inMin} min</div>
                <div style={{ fontFamily: SERIF, fontSize: mobile ? 26 : 30, fontWeight: 500, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{next.time}</div>
                <div style={{ fontSize: 12, color: "rgba(245,241,236,0.72)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: mobile ? "normal" : "nowrap", lineHeight: 1.3 }}>{next.client}</div>
              </div>
            )}
          </div>
        </div>

        {attention.length > 0 && (
          <div style={{ background: OK.white, border: `1px solid ${OK.gold}`, borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: mobile ? "14px 16px" : "14px 20px", background: "#F4ECE2", borderBottom: `1px solid ${OK.taupe}` }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: OK.gold, flexShrink: 0 }}></span>
              <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: OK.green, whiteSpace: "nowrap" }}>Requiere atención</div>
              <div style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 600, color: OK.goldInk, whiteSpace: "nowrap" }}>{attention.length} {mobile ? "" : (attention.length === 1 ? "acción antes del turno" : "acciones antes del turno")}{mobile ? "pendientes" : ""}</div>
            </div>
            {attention.map((a, i) => (
              <div key={a.id} style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "center", gap: mobile ? 12 : 20, padding: mobile ? "14px 16px" : "16px 20px", borderTop: i ? `1px solid ${OK.taupe}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: OK.ink }}>{a.client} <span style={{ fontWeight: 500, color: OK.muted }}>· {a.time} · {a.treatment}</span></div>
                  <div style={{ fontSize: 13.5, color: OK.ink, lineHeight: 1.45, textWrap: "pretty" }}>{a.issue.text}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <OkBtn kind="primary" full={mobile} onClick={() => resolve(a)}>{a.issue.cta}</OkBtn>
                </div>
              </div>
            ))}
          </div>
        )}

        {listStyle === "compare" ? (
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "minmax(0,1fr)" : "repeat(3, minmax(0,1fr))", gap: mobile ? 22 : 18, alignItems: "start" }}>
            {DAY_LISTS.map(({ id, n, name, C }) => (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: OK.ink }}><span style={{ fontWeight: 700, color: OK.green }}>{n}</span> · {name}</div>
                <C appts={appts} mobile={true} nextId={next && next.id} done={done} onOpen={onOpen} />
              </div>
            ))}
          </div>
        ) : (() => {
          const L = (DAY_LISTS.find((l) => l.id === listStyle) || DAY_LISTS[0]).C;
          return <L appts={appts} mobile={mobile} nextId={next && next.id} done={done} onOpen={onOpen} />;
        })()}
      </div>
    </div>
  );
}


const DASH_NOW = "10:40";
const CH = {
  whatsapp: { label: "WhatsApp", fg: "#1F5E3A", bg: "#E2EEE5" },
  instagram: { label: "Instagram", fg: "#7A3B57", bg: "#F3E5EB" },
};
const DASH_CONVOS = [
  { id: "c1", channel: "whatsapp", client: "Camila Ortega", msg: "¿Puedo llegar 15 min tarde al turno de las 11:30?", wait: "hace 2 h", cta: "Responder" },
  { id: "c2", channel: "instagram", client: "Abril Méndez", msg: "Hola! ¿Cuánto sale el relleno de labios y tienen lugar esta semana?", wait: "hace 40 min", cta: "Responder" },
  { id: "c3", channel: "whatsapp", client: "Valentina Gómez", msg: "¿Me pasan el turno de hoy al viernes a la mañana?", wait: "hace 25 min", cta: "Reprogramar" },
];
const DASH_UNCONF = [
  { id: "u1", client: "Camila Ortega", time: "11:30", treatment: "Depilación láser – piernas", note: "Turno en menos de 1 h" },
  { id: "u2", client: "Florencia Ríos", time: "18:30", treatment: "Limpieza facial", note: "Sin respuesta desde ayer" },
];
const DASH_FU_OVERDUE = [
  { id: "f1", client: "Rocío Álvarez", reason: "Control a 15 días de toxina botulínica", due: "Vencido hace 3 días" },
];
const DASH_APPTS = [
  { id: "d1", time: "09:00", client: "Martina Ruiz", treatment: "Limpieza facial profunda", pro: "Ingrid", status: "done" },
  { id: "d2", time: "10:30", client: "Sofía Benítez", treatment: "Toxina botulínica – frente", pro: "Eliana", status: "inprogress" },
  { id: "d3", time: "11:30", client: "Camila Ortega", treatment: "Depilación láser – piernas", pro: "Ingrid", status: "unconfirmed" },
  { id: "d4", time: "14:00", client: "Lucía Paredes", treatment: "Relleno de labios", pro: "Eliana", status: "confirmed" },
  { id: "d5", time: "16:00", client: "Valentina Gómez", treatment: "Peeling químico", pro: "Ingrid", status: "reschedule" },
  { id: "d6", time: "17:30", client: "Julieta Sosa", treatment: "Control post tratamiento", pro: "Eliana", status: "confirmed" },
  { id: "d7", time: "18:30", client: "Florencia Ríos", treatment: "Limpieza facial", pro: "Ingrid", status: "unconfirmed" },
];
const DASH_FOLLOWUPS = [
  { id: "s1", client: "Rocío Álvarez", reason: "Control 15 días · toxina", when: "Vencido", overdue: true },
  { id: "s2", client: "Martina Ruiz", reason: "Cómo se sintió tras la limpieza", when: "Hoy" },
  { id: "s3", client: "Agustina Paz", reason: "Ofrecer 2ª sesión de láser", when: "Mañana" },
  { id: "s4", client: "Delfina Correa", reason: "Retoque de labios a 30 días", when: "Lunes" },
];
const STATUS = {
  done: { label: "Atendida", fg: OK.muted, bg: "#ECE7E2" },
  inprogress: { label: "En curso", fg: OK.cream, bg: OK.green },
  confirmed: { label: "Confirmado", fg: OK.green, bg: "#E3ECE9" },
  unconfirmed: { label: "Sin confirmar", fg: OK.goldInk, bg: "#F3EADF" },
  reschedule: { label: "Pide reprogramar", fg: OK.goldInk, bg: "#F3EADF" },
  moved: { label: "Movido al viernes", fg: OK.muted, bg: "#ECE7E2" },
};
const CARD = { background: OK.white, borderRadius: 16, boxShadow: "0 1px 2px rgba(0,63,54,0.05), 0 6px 20px rgba(0,63,54,0.05)", overflow: "hidden", minWidth: 0 };

function Pill({ fg, bg, children }) {
  return <span style={{ display: "inline-block", fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 999, color: fg, background: bg, whiteSpace: "nowrap" }}>{children}</span>;
}
function BlockHead({ title, count, right, pad, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: `14px ${pad}px`, borderBottom: `1px solid ${OK.taupe}` }}>
      {accent && <span style={{ width: 8, height: 8, borderRadius: 4, background: OK.gold, flexShrink: 0 }}></span>}
      <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: OK.green, whiteSpace: "nowrap" }}>{title}</div>
      {count != null && <span style={{ fontSize: 12.5, color: OK.muted, fontVariantNumeric: "tabular-nums" }}>{count}</span>}
      <div style={{ marginLeft: "auto" }}>{right}</div>
    </div>
  );
}
function LinkBtn({ children, onClick }) {
  return <button onClick={onClick} style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: OK.green, background: "none", border: "none", padding: "6px 0", cursor: "pointer", whiteSpace: "nowrap" }}>{children}</button>;
}
function SubLabel({ children, pad }) {
  return <div style={{ padding: `12px ${pad}px 6px`, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: OK.muted }}>{children}</div>;
}

function DashboardOverview({ forceMobile, setView }) {
  const [ref, w] = useWidth();
  const mobile = forceMobile || w < 760;
  const [cleared, setCleared] = React.useState({});
  const [appts, setAppts] = React.useState(DASH_APPTS);
  const clear = (id) => setCleared((c) => ({ ...c, [id]: true }));
  const convos = DASH_CONVOS.filter((x) => !cleared[x.id]);
  const unconf = DASH_UNCONF.filter((x) => !cleared[x.id]);
  const fuOver = DASH_FU_OVERDUE.filter((x) => !cleared[x.id]);
  const follow = DASH_FOLLOWUPS.filter((x) => !cleared[x.id]);
  const total = convos.length + unconf.length + fuOver.length;
  const pad = mobile ? 16 : 22;
  const go = (v) => setView && setView(v);
  const confirmAppt = (u) => { clear(u.id); setAppts((p) => p.map((a) => a.client === u.client && a.time === u.time ? { ...a, status: "confirmed" } : a)); };
  const onConvo = (c) => { clear(c.id); if (c.cta === "Reprogramar") setAppts((p) => p.map((a) => a.client === c.client ? { ...a, status: "moved" } : a)); };
  const upcoming = appts.filter((a) => a.status !== "done");
  const nextId = (appts.find((a) => toMin(a.time) > toMin(DASH_NOW)) || {}).id;
  const row = (i) => ({ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "center", gap: mobile ? 10 : 16, padding: `12px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none" });

  return (
    <div ref={ref} style={{ background: OK.cream, minHeight: "100%", padding: mobile ? "22px 16px 32px" : "30px 36px 40px", boxSizing: "border-box", fontFamily: SANS, color: OK.ink }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexDirection: "column", gap: mobile ? 16 : 20 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-end", gap: mobile ? 14 : 24 }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 13, color: OK.muted }}>Jueves 17 de septiembre</div>
            <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: mobile ? 30 : 38, lineHeight: 1.1, letterSpacing: "-0.015em", color: OK.green }}>Resumen de hoy</h1>
            <div style={{ fontSize: 14, color: OK.muted, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span>{appts.length} turnos</span><span style={{ color: OK.taupe }}>·</span>
              <span style={{ color: total ? OK.goldInk : OK.muted, fontWeight: total ? 600 : 400 }}>{total ? `${total} para resolver` : "Nada pendiente"}</span><span style={{ color: OK.taupe }}>·</span>
              <span>{follow.length} seguimientos</span>
            </div>
          </div>
          <OkBtn kind="primary" full={mobile} onClick={() => openNewAppt()}>+ Nuevo turno</OkBtn>
        </div>

        <div style={{ ...CARD, border: total ? `1px solid ${OK.gold}` : "none" }}>
          <BlockHead title="Para resolver ahora" count={total} pad={pad} accent={total > 0} />
          {total === 0 && <div style={{ padding: `18px ${pad}px`, fontSize: 14, color: OK.muted }}>Todo resuelto por ahora.</div>}
          {convos.length > 0 && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: pad }}>
                <SubLabel pad={pad}>Conversaciones sin responder</SubLabel>
                <LinkBtn onClick={() => go("requests")}>Ver conversaciones →</LinkBtn>
              </div>
              {convos.map((c, i) => (
                <div key={c.id} style={row(i)}>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <Pill fg={CH[c.channel].fg} bg={CH[c.channel].bg}>{CH[c.channel].label}</Pill>
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{c.client}</span>
                      <span style={{ fontSize: 12, color: OK.muted }}>{c.wait}</span>
                    </div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.45, color: OK.ink, textWrap: "pretty" }}>“{c.msg}”</div>
                  </div>
                  <OkBtn kind="primary" full={mobile} onClick={() => onConvo(c)}>{c.cta}</OkBtn>
                </div>
              ))}
            </div>
          )}
          {unconf.length > 0 && (
            <div style={{ borderTop: convos.length ? `1px solid ${OK.taupe}` : "none" }}>
              <SubLabel pad={pad}>Turnos sin confirmar</SubLabel>
              {unconf.map((u, i) => (
                <div key={u.id} style={row(i)}>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{u.client} <span style={{ fontWeight: 400, color: OK.muted }}>· {u.time} · {u.treatment}</span></div>
                    <div style={{ fontSize: 12.5, color: OK.goldInk }}>{u.note}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexDirection: mobile ? "column" : "row" }}>
                    <OkBtn kind="primary" full={mobile} onClick={() => confirmAppt(u)}>Marcar confirmado</OkBtn>
                    <OkBtn kind="secondary" full={mobile} onClick={() => go("requests")}>Escribirle</OkBtn>
                  </div>
                </div>
              ))}
            </div>
          )}
          {fuOver.length > 0 && (
            <div style={{ borderTop: `1px solid ${OK.taupe}` }}>
              <SubLabel pad={pad}>Follow-ups vencidos</SubLabel>
              {fuOver.map((f, i) => (
                <div key={f.id} style={row(i)}>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{f.client}</div>
                    <div style={{ fontSize: 13.5 }}>{f.reason} <span style={{ color: OK.goldInk, fontWeight: 600 }}>· {f.due}</span></div>
                  </div>
                  <OkBtn kind="primary" full={mobile} onClick={() => { clear(f.id); clear("s1"); }}>Contactar</OkBtn>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "minmax(0,1fr)" : "minmax(0,1.6fr) minmax(0,1fr)", gap: mobile ? 16 : 20, alignItems: "start" }}>
          <div style={CARD}>
            <BlockHead title="Próximos turnos" count={upcoming.length} pad={pad} right={<LinkBtn onClick={() => go("calendar")}>Agenda completa →</LinkBtn>} />
            {upcoming.map((a, i) => {
              const st = STATUS[a.status];
              return (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: mobile ? "48px minmax(0,1fr)" : "52px minmax(0,1fr) auto", alignItems: "center", columnGap: 14, rowGap: 6, padding: `11px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none", background: a.status === "inprogress" ? "#F8F5F1" : OK.white }}>
                  <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 500, color: OK.green, fontVariantNumeric: "tabular-nums", alignSelf: "start", lineHeight: 1.3 }}>{a.time}</div>
                  <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{a.client}</span>
                      {a.id === nextId && <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: OK.muted }}>Sigue</span>}
                    </div>
                    <div style={{ fontSize: 13, color: OK.ink }}>{a.treatment} <span style={{ color: OK.muted }}>· con {a.pro}</span></div>
                  </div>
                  <div style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end" }}><Pill fg={st.fg} bg={st.bg}>{st.label}</Pill></div>
                </div>
              );
            })}
          </div>

          <div style={CARD}>
            <BlockHead title="Seguimientos" count={follow.length} pad={pad} right={<LinkBtn onClick={() => go("followups")}>Ver todos →</LinkBtn>} />
            {follow.map((f, i) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: `11px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{f.client}</div>
                  <div style={{ fontSize: 12.5, color: OK.muted, textWrap: "pretty" }}>{f.reason}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: f.overdue ? OK.goldInk : OK.muted, whiteSpace: "nowrap" }}>{f.when}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "minmax(0,1fr)" : "repeat(2, minmax(0,1fr))", gap: 12 }}>
          <div onClick={() => go("clients")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: `1px solid ${OK.taupe}`, cursor: "pointer", background: "transparent" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: OK.green }}>Clientes</div>
              <div style={{ fontSize: 12.5, color: OK.muted }}>Fichas, tratamientos y contacto</div>
            </div>
            <span style={{ color: OK.green, fontSize: 14 }}>→</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: `1px dashed ${OK.taupe}`, cursor: "default" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: OK.muted }}>Historial</span>
                <Pill fg={OK.goldInk} bg="#F3EADF">Próxima etapa</Pill>
              </div>
              <div style={{ fontSize: 12.5, color: OK.muted }}>Registro de turnos y conversaciones pasadas. Todavía no está disponible.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const HOME_FU = [
  { id: "h1", client: "Rocío Álvarez", reason: "Control a 15 días de toxina", when: "Vencido hace 3 días", overdue: true },
  { id: "h2", client: "Martina Ruiz", reason: "Cómo se sintió tras la limpieza", when: "Hoy" },
  { id: "h3", client: "Agustina Paz", reason: "Ofrecer 2ª sesión de láser", when: "Mañana" },
];
const HOME_CONVOS = [
  { id: "hc1", channel: "WhatsApp", client: "Camila Ortega", msg: "¿Puedo llegar 15 min tarde al turno de las 11:30?", wait: "hace 2 h" },
  { id: "hc2", channel: "Instagram", client: "Abril Méndez", msg: "¿Cuánto sale el relleno de labios? ¿Tienen lugar esta semana?", wait: "hace 40 min" },
  { id: "hc3", channel: "WhatsApp", client: "Valentina Gómez", msg: "¿Me pasan el turno de hoy al viernes a la mañana?", wait: "hace 25 min" },
];
const HOME_STATUS = { done: "Atendida", inprogress: "En curso", confirmed: "Confirmado", unconfirmed: "Sin confirmar", reschedule: "Pide reprogramar" };

function HomeEditorial({ forceMobile, setView }) {
  const [ref, w] = useWidth();
  const mobile = forceMobile || w < 640;
  const stack = mobile || w < 960;
  const [answered, setAnswered] = React.useState({});
  const [contacted, setContacted] = React.useState({});
  const go = (v) => setView && setView(v);
  const convos = HOME_CONVOS.filter((c) => !answered[c.id]);
  const fus = HOME_FU.filter((f) => !contacted[f.id]);
  const unconfirmed = DASH_APPTS.filter((a) => a.status === "unconfirmed" || a.status === "reschedule").length;
  const pend = unconfirmed + fus.filter((f) => f.overdue).length;
  const nextId = (DASH_APPTS.find((a) => toMin(a.time) > toMin(DASH_NOW)) || {}).id;
  const pad = mobile ? 16 : 24;
  const line = `1px solid ${OK.taupe}`;
  const metrics = [
    { n: DASH_APPTS.length, l: "Turnos de hoy" },
    { n: pend, l: "Pendientes" },
    { n: convos.length, l: "Conversaciones nuevas" },
  ];
  return (
    <div ref={ref} style={{ background: OK.cream, minHeight: "100%", padding: mobile ? "28px 18px 36px" : "44px 48px 56px", boxSizing: "border-box", fontFamily: SANS, color: OK.ink }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexDirection: "column", gap: mobile ? 28 : 40 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-end", gap: mobile ? 20 : 32 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: mobile ? 72 : 112, lineHeight: 0.92, letterSpacing: "-0.035em", color: OK.green }}>Hoy</h1>
            <div style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic", fontSize: mobile ? 24 : 32, lineHeight: 1.15, color: OK.green, marginTop: mobile ? 10 : 14, letterSpacing: "-0.01em" }}>jueves 17 de septiembre</div>
            <p style={{ margin: mobile ? "14px 0 0" : "18px 0 0", fontSize: mobile ? 15 : 16.5, lineHeight: 1.5, color: OK.muted, maxWidth: 480, textWrap: "pretty" }}>Tus turnos y conversaciones, en un solo lugar.</p>
          </div>
          <OkBtn kind="primary" full={mobile} onClick={() => openNewAppt()}>+ Nuevo turno</OkBtn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", borderTop: line, borderBottom: line }}>
          {metrics.map((m, i) => (
            <div key={m.l} style={{ paddingTop: mobile ? 14 : 18, paddingBottom: mobile ? 14 : 18, paddingRight: mobile ? 10 : 24, paddingLeft: i ? (mobile ? 12 : 24) : 0, borderLeft: i ? line : "none", display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
              <span style={{ fontFamily: SERIF, fontSize: mobile ? 34 : 44, fontWeight: 400, lineHeight: 1, color: OK.green, fontVariantNumeric: "tabular-nums" }}>{m.n}</span>
              <span style={{ fontSize: mobile ? 12.5 : 13.5, color: OK.muted, lineHeight: 1.3 }}>{m.l}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: stack ? "minmax(0,1fr)" : "minmax(0,1.45fr) minmax(0,1fr)", gap: stack ? 32 : 40, alignItems: "start" }}>
          <section style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${OK.green}` }}>
              <h2 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 24, color: OK.green }}>Turnos</h2>
              <span style={{ fontSize: 13, color: OK.muted }}>{DASH_APPTS.length} hoy</span>
              <div style={{ marginLeft: "auto" }}><LinkBtn onClick={() => go("calendar")}>Ver agenda →</LinkBtn></div>
            </div>
            {DASH_APPTS.map((a) => {
              const past = a.status === "done";
              const flag = a.status === "unconfirmed" || a.status === "reschedule";
              return (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: mobile ? "52px minmax(0,1fr)" : "64px minmax(0,1fr) auto", columnGap: mobile ? 12 : 20, rowGap: 4, alignItems: "baseline", padding: "14px 0", borderBottom: line }}>
                  <span style={{ fontFamily: SERIF, fontSize: mobile ? 18 : 20, color: past ? OK.muted : OK.green, fontVariantNumeric: "tabular-nums" }}>{a.time}</span>
                  <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ fontSize: 15, lineHeight: 1.35, color: past ? OK.muted : OK.ink, textWrap: "pretty" }}>
                      <span style={{ fontWeight: 600 }}>{a.client}</span>
                      <span style={{ color: past ? OK.muted : OK.ink }}> — {a.treatment}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: OK.muted }}>con {a.pro}</div>
                  </div>
                  <span style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end", fontSize: 12.5, fontWeight: flag || a.id === nextId || a.status === "inprogress" ? 600 : 400, color: flag ? OK.ink : a.status === "inprogress" ? OK.green : OK.muted, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    {flag && <span style={{ width: 6, height: 6, borderRadius: 3, background: OK.gold }}></span>}
                    {a.id === nextId && !flag ? "Sigue" : HOME_STATUS[a.status]}
                  </span>
                </div>
              );
            })}
          </section>

          <section style={{ minWidth: 0, background: OK.white, borderRadius: 18, boxShadow: "0 1px 2px rgba(0,63,54,0.05), 0 10px 30px rgba(0,63,54,0.06)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: `18px ${pad}px 14px` }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: OK.gold, flexShrink: 0 }}></span>
              <h2 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 22, color: OK.green }}>Para resolver ahora</h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `6px ${pad}px 6px`, borderTop: line }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.muted }}>Conversaciones</span>
              <LinkBtn onClick={() => go("requests")}>Ver todas →</LinkBtn>
            </div>
            {convos.length === 0 && <div style={{ padding: `8px ${pad}px 16px`, fontSize: 13.5, color: OK.muted }}>No hay mensajes sin responder.</div>}
            {convos.map((c) => (
              <div key={c.id} style={{ display: "flex", flexDirection: "column", gap: 8, padding: `12px ${pad}px 14px`, borderTop: line }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: OK.green, background: "#ECE6DF", padding: "3px 8px", borderRadius: 6 }}>{c.channel}</span>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>{c.client}</span>
                  <span style={{ fontSize: 12.5, color: OK.muted, marginLeft: "auto" }}>{c.wait}</span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: OK.ink, textWrap: "pretty" }}>“{c.msg}”</div>
                <div><OkBtn kind="secondary" full={mobile} onClick={() => setAnswered((s) => ({ ...s, [c.id]: true }))}>Responder</OkBtn></div>
              </div>
            ))}

            <div style={{ padding: `14px ${pad}px 6px`, borderTop: line }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.muted }}>Follow-ups</span>
            </div>
            {fus.length === 0 && <div style={{ padding: `8px ${pad}px 18px`, fontSize: 13.5, color: OK.muted }}>Nadie para contactar por ahora.</div>}
            {fus.map((f) => (
              <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: `12px ${pad}px`, borderTop: line }}>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{f.client}</div>
                  <div style={{ fontSize: 13, color: OK.muted, textWrap: "pretty" }}>{f.reason} · <span style={{ color: OK.ink, fontWeight: f.overdue ? 600 : 400 }}>{f.when}</span></div>
                </div>
                <OkBtn kind={f.overdue ? "primary" : "secondary"} onClick={() => setContacted((s) => ({ ...s, [f.id]: true }))}>Contactar</OkBtn>
              </div>
            ))}
            <div style={{ padding: `6px ${pad}px 14px`, borderTop: line }}>
              <LinkBtn onClick={() => go("followups")}>Ver seguimientos →</LinkBtn>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const V1_APPTS = [
  { id: "v1", time: "09:00", dur: "45 min", client: "Martina Ruiz", treatment: "Limpieza facial profunda", pro: "Ingrid", status: "done" },
  { id: "v2", time: "10:30", dur: "30 min", client: "Sofía Benítez", treatment: "Toxina botulínica – frente", pro: "Eliana", status: "inprogress" },
  { id: "v3", time: "11:30", dur: "60 min", client: "Camila Ortega", treatment: "Depilación láser – piernas", pro: "Ingrid", status: "unconfirmed",
    issue: { title: "Sin confirmar a 1 h del turno", text: "Escribió ayer preguntando si podía llegar 15 min tarde y nadie le respondió.", actions: [["Responder conversación", "chat"], ["Reprogramar", "move"]] } },
  { id: "v4", time: "14:00", dur: "45 min", client: "Lucía Paredes", treatment: "Relleno de labios", pro: "Eliana", status: "confirmed" },
  { id: "v5", time: "16:00", dur: "40 min", client: "Valentina Gómez", treatment: "Peeling químico", pro: "Ingrid", status: "reschedule",
    issue: { title: "Pidió cambiar el horario", text: "Quiere pasar su turno de hoy a la mañana del viernes. Hay lugar a las 10:00 con Ingrid.", actions: [["Mover al viernes 10:00", "move"], ["Abrir conversación", "chat"]] } },
  { id: "v6", time: "17:30", dur: "30 min", client: "Julieta Sosa", treatment: "Control post tratamiento", pro: "Eliana", status: "confirmed" },
];
const V1_STATUS = { ...STATUS, answered: { label: "Respondida", fg: OK.green, bg: "#E3ECE9" } };

function DashboardV1({ forceMobile }) {
  const [ref, w] = useWidth();
  const mobile = forceMobile || w < 680;
  const [appts, setAppts] = React.useState(V1_APPTS);
  const [resolved, setResolved] = React.useState({});
  const pending = appts.filter((a) => a.issue && !resolved[a.id]);
  const act = (a, kind) => {
    setResolved((r) => ({ ...r, [a.id]: true }));
    setAppts((p) => p.map((x) => x.id === a.id ? { ...x, status: kind === "chat" ? "answered" : "moved" } : x));
  };
  const nextId = (appts.find((a) => toMin(a.time) > toMin(DASH_NOW)) || {}).id;
  const pad = mobile ? 16 : 22;
  return (
    <div ref={ref} style={{ background: OK.cream, minHeight: "100%", padding: mobile ? "22px 16px 32px" : "32px 36px 40px", boxSizing: "border-box", fontFamily: SANS, color: OK.ink }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: mobile ? 16 : 22 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-end", gap: mobile ? 14 : 24 }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 500, fontSize: mobile ? 28 : 38, lineHeight: 1.1, letterSpacing: "-0.015em", color: OK.green, textWrap: "pretty" }}>Hoy, jueves 17 de septiembre</h1>
            <div style={{ fontSize: 14.5, color: OK.muted, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span>{appts.length} turnos</span>
              <span style={{ color: OK.taupe }}>·</span>
              <span style={{ color: pending.length ? OK.goldInk : OK.muted, fontWeight: pending.length ? 600 : 400 }}>{pending.length ? `${pending.length} requieren atención` : "Nada pendiente"}</span>
            </div>
          </div>
          <OkBtn kind="primary" full={mobile} onClick={() => openNewAppt()}>+ Nuevo turno</OkBtn>
        </div>
        {pending.length > 0 && (
          <div style={CARD}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: `14px ${pad}px`, borderBottom: `1px solid ${OK.taupe}` }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: OK.gold, flexShrink: 0 }}></span>
              <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: OK.green, whiteSpace: "nowrap" }}>Requiere atención</div>
              <div style={{ marginLeft: "auto", fontSize: 12.5, color: OK.muted }}>Resolver ahora</div>
            </div>
            {pending.map((a, i) => (
              <div key={a.id} style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "center", gap: mobile ? 12 : 20, padding: `16px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none" }}>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600 }}>{a.issue.title}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.45, textWrap: "pretty" }}>{a.issue.text}</div>
                  <div style={{ fontSize: 12.5, color: OK.muted }}>{a.client} · {a.time} · {a.treatment}</div>
                </div>
                <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 8, flexShrink: 0 }}>
                  {a.issue.actions.map(([label, kind], j) => (
                    <OkBtn key={label} kind={j === 0 ? "primary" : "secondary"} full={mobile} onClick={() => act(a, kind)}>{label}</OkBtn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={CARD}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: `14px ${pad}px`, borderBottom: `1px solid ${OK.taupe}` }}>
            <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: OK.green }}>Agenda del día</div>
            <div style={{ fontSize: 12.5, color: OK.muted }}>Por hora</div>
          </div>
          {appts.map((a, i) => {
            const st = V1_STATUS[a.status];
            const flagged = a.issue && !resolved[a.id];
            return (
              <div key={a.id} style={{ display: "grid", gridTemplateColumns: mobile ? "56px minmax(0,1fr)" : "76px minmax(0,1fr) auto", alignItems: "center", columnGap: mobile ? 12 : 20, rowGap: 8, padding: `14px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none", opacity: a.status === "done" ? 0.62 : 1, background: a.status === "inprogress" ? "#F8F5F1" : OK.white }}>
                <div style={{ alignSelf: "start", display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ fontFamily: SERIF, fontSize: mobile ? 18 : 20, fontWeight: 500, color: OK.green, fontVariantNumeric: "tabular-nums", lineHeight: 1.15 }}>{a.time}</div>
                  <div style={{ fontSize: 11.5, color: OK.muted }}>{a.dur}</div>
                </div>
                <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{a.client}</span>
                    {flagged && <span style={{ width: 7, height: 7, borderRadius: 4, background: OK.gold }}></span>}
                    {a.id === nextId && <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.muted }}>Sigue</span>}
                  </div>
                  <div style={{ fontSize: 13.5, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span>{a.treatment}</span>
                    <span style={{ color: OK.muted }}>· con {a.pro}</span>
                  </div>
                </div>
                <div style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end" }}>
                  <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, color: st.fg, background: st.bg, whiteSpace: "nowrap" }}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const VERSIONS = [
  { id: "v1", n: "V1", name: "Agenda general", C: DashboardV1 },
  { id: "v2", n: "V2", name: "Bandeja de recepción", C: DashboardOverview },
  { id: "v3", n: "V3", name: "Editorial", C: HomeEditorial },
];

function DashboardView({ setView }) {
  const [ver, setVer] = React.useState(() => localStorage.getItem("okio-dash-ver") || "v3");
  const [preview, setPreview] = React.useState("desktop");
  const pick = (v) => { setVer(v); localStorage.setItem("okio-dash-ver", v); };
  const seg = (on) => ({ fontFamily: SANS, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", border: `1px solid ${on ? OK.green : OK.taupe}`, background: on ? OK.green : "transparent", color: on ? OK.cream : OK.muted });
  const all = ver === "all";
  const cur = VERSIONS.find((v) => v.id === ver) || VERSIONS[2];
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: OK.cream }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "12px 36px", borderBottom: `1px solid ${OK.taupe}` }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {VERSIONS.map((v) => (
            <button key={v.id} onClick={() => pick(v.id)} style={seg(ver === v.id)}>{v.n} · {v.name}</button>
          ))}
          <button onClick={() => pick("all")} style={seg(all)}>Las tres</button>
        </div>
        {!all && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            {[["desktop", "Escritorio"], ["mobile", "375 px"]].map(([id, l]) => (
              <button key={id} onClick={() => setPreview(id)} style={seg(preview === id)}>{l}</button>
            ))}
          </div>
        )}
      </div>
      {all ? (
        <div style={{ display: "flex", gap: 24, padding: "24px 36px 40px", overflowX: "auto", alignItems: "flex-start" }}>
          {VERSIONS.map(({ id, n, name, C }) => (
            <div key={id} style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: SANS, fontSize: 13, color: OK.ink }}><span style={{ fontWeight: 700, color: OK.green }}>{n}</span> · {name}</div>
              <div style={{ width: 375, borderRadius: 24, overflow: "hidden", border: `1px solid ${OK.taupe}`, boxShadow: "0 12px 40px rgba(0,63,54,0.10)" }}>
                <C forceMobile setView={setView} />
              </div>
            </div>
          ))}
        </div>
      ) : preview === "desktop" ? <cur.C key={cur.id} setView={setView} /> : (
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 32px" }}>
          <div style={{ width: 375, borderRadius: 24, overflow: "hidden", border: `1px solid ${OK.taupe}`, boxShadow: "0 12px 40px rgba(0,63,54,0.12)" }}>
            <cur.C key={cur.id} forceMobile setView={setView} />
          </div>
        </div>
      )}
    </div>
  );
}

function ListHead({ pad, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: `14px ${pad}px`, borderBottom: `1px solid ${OK.taupe}` }}>
      <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 500, color: OK.green }}>Turnos del día</div>
      <div style={{ fontSize: 12.5, color: OK.muted }}>{sub}</div>
    </div>
  );
}

function DayListV1({ appts, mobile, nextId, done, onOpen }) {
  const pad = mobile ? 16 : 20;
  return (
    <div style={{ background: OK.white, border: `1px solid ${OK.taupe}`, borderRadius: 16, overflow: "hidden" }}>
      <ListHead pad={pad} sub="Orden cronológico" />
      {appts.map((a, i) => {
        const stt = apptStatus(a);
        const isNext = a.id === nextId;
        const flagged = a.issue && !done[a.id];
        return (
          <div key={a.id} onClick={() => onOpen(a.id)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: mobile ? "52px minmax(0,1fr)" : "72px minmax(0,1fr) auto", alignItems: "center", columnGap: mobile ? 12 : 18, rowGap: 8, padding: `14px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none", background: isNext ? "#FBF8F4" : OK.white, opacity: a.done ? 0.62 : 1, boxShadow: isNext ? `inset 3px 0 0 ${OK.green}` : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignSelf: "start" }}>
              <div style={{ fontFamily: SERIF, fontSize: mobile ? 18 : 20, fontWeight: 500, color: OK.green, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>{a.time}</div>
              <div style={{ fontSize: 11.5, color: OK.muted }}>{a.duration}</div>
            </div>
            <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{a.client}</span>
                {isNext && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.green }}>Próximo</span>}
                {flagged && <span style={{ width: 7, height: 7, borderRadius: 4, background: OK.gold }}></span>}
              </div>
              <div style={{ fontSize: 13.5, textWrap: "pretty" }}>{a.treatment} <span style={{ color: OK.muted }}>· con {a.pro}</span></div>
            </div>
            <div style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end" }}>
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, color: stt.fg, background: stt.bg, whiteSpace: "nowrap" }}>{stt.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DayListV2({ appts, mobile, nextId, done, onOpen }) {
  const pad = mobile ? 14 : 18;
  return (
    <div style={{ background: OK.white, borderRadius: 16, boxShadow: "0 1px 2px rgba(0,63,54,0.05), 0 6px 20px rgba(0,63,54,0.05)", overflow: "hidden" }}>
      <ListHead pad={pad} sub={`${appts.length} turnos`} />
      {appts.map((a, i) => {
        const stt = apptStatus(a);
        return (
          <div key={a.id} onClick={() => onOpen(a.id)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: mobile ? "46px minmax(0,1fr)" : "52px minmax(0,1fr) auto", alignItems: "center", columnGap: 12, rowGap: 6, padding: `10px ${pad}px`, borderTop: i ? `1px solid ${OK.taupe}` : "none", opacity: a.done ? 0.62 : 1 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 500, color: OK.green, fontVariantNumeric: "tabular-nums", alignSelf: "start", lineHeight: 1.35 }}>{a.time}</div>
            <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{a.client}</span>
                {a.id === nextId && <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: OK.muted }}>Sigue</span>}
              </div>
              <div style={{ fontSize: 12.5, textWrap: "pretty" }}>{a.treatment} <span style={{ color: OK.muted }}>· con {a.pro}</span></div>
            </div>
            <div style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end" }}>
              <span style={{ display: "inline-block", fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 999, color: stt.fg, background: stt.bg, whiteSpace: "nowrap" }}>{stt.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DayListV3({ appts, mobile, nextId, done, onOpen }) {
  const line = `1px solid ${OK.taupe}`;
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, paddingBottom: 10, borderBottom: `1px solid ${OK.green}` }}>
        <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 22, color: OK.green }}>Turnos</div>
        <span style={{ fontSize: 12.5, color: OK.muted }}>{appts.length} hoy</span>
      </div>
      {appts.map((a) => {
        const stt = apptStatus(a);
        const flag = !a.confirmed && !a.done;
        return (
          <div key={a.id} onClick={() => onOpen(a.id)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: mobile ? "50px minmax(0,1fr)" : "64px minmax(0,1fr) auto", columnGap: mobile ? 12 : 20, rowGap: 4, alignItems: "baseline", padding: "13px 0", borderBottom: line }}>
            <span style={{ fontFamily: SERIF, fontSize: mobile ? 18 : 20, color: a.done ? OK.muted : OK.green, fontVariantNumeric: "tabular-nums" }}>{a.time}</span>
            <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 14.5, lineHeight: 1.35, color: a.done ? OK.muted : OK.ink, textWrap: "pretty" }}><span style={{ fontWeight: 600 }}>{a.client}</span> — {a.treatment}</div>
              <div style={{ fontSize: 12.5, color: OK.muted }}>con {a.pro}</div>
            </div>
            <span style={{ gridColumn: mobile ? "2" : "auto", justifySelf: mobile ? "start" : "end", fontSize: 12.5, fontWeight: flag ? 600 : 400, color: flag ? OK.ink : OK.muted, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              {flag && <span style={{ width: 6, height: 6, borderRadius: 3, background: OK.gold }}></span>}
              {a.id === nextId && !flag ? "Sigue" : stt.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const DAY_LISTS = [
  { id: "v1", n: "V1", name: "Tarjeta", C: DayListV1 },
  { id: "v2", n: "V2", name: "Compacta", C: DayListV2 },
  { id: "v3", n: "V3", name: "Editorial", C: DayListV3 },
];

const RESCHED_SLOTS = [[1, "15:00"], [1, "17:30"], [2, "10:30"], [3, "12:30"], [4, "09:30"], [5, "12:30"]];

function ApptDrawer({ a, onClose, onUpdate, onMove, mobile }) {
  const [resched, setResched] = React.useState(false);
  React.useEffect(() => setResched(false), [a && a.id]);
  if (!a) return null;
  const stt = apptStatus(a);
  const end = fmtMin(toMin(a.time) + durMin(a.duration));
  const panel = mobile
    ? { left: 0, right: 0, bottom: 0, maxHeight: "86%", borderRadius: "20px 20px 0 0" }
    : { top: 0, right: 0, bottom: 0, width: 400, maxWidth: "100%" };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, fontFamily: SANS, color: OK.ink }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(29,43,40,0.32)" }}></div>
      <div style={{ position: "absolute", ...panel, background: OK.cream, boxShadow: "0 10px 40px rgba(0,63,54,0.18)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", padding: mobile ? "14px 18px 0" : "20px 24px 0" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: OK.muted }}>Turno</span>
          <button onClick={onClose} aria-label="Cerrar" style={{ marginLeft: "auto", width: 36, height: 36, borderRadius: 18, border: `1px solid ${OK.taupe}`, background: OK.white, color: OK.green, fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: mobile ? "8px 18px 22px" : "10px 24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 500, color: OK.green, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{a.time}<span style={{ fontSize: 22, color: OK.muted }}> – {end}</span></div>
            <div style={{ fontSize: 14, color: OK.muted, marginTop: 6 }}>{a.day === TODAY ? "Hoy, " : ""}{DAY_LONG[a.day]} · {a.duration}</div>
          </div>
          <div style={{ background: OK.white, borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{a.client}</div>
            <div style={{ fontSize: 14.5 }}>{a.treatment}</div>
            <div style={{ fontSize: 13, color: OK.muted }}>con {a.pro}</div>
            <div style={{ marginTop: 8 }}><span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, color: stt.fg, background: stt.bg }}>{stt.label}</span></div>
          </div>
          {a.notes && <div style={{ fontSize: 13.5, lineHeight: 1.45, color: OK.ink, padding: "0 2px" }}><span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.muted, display: "block", marginBottom: 4 }}>Notas internas</span>{a.notes}</div>}
          {a.issue && !a.issueDone && (
            <div style={{ display: "flex", gap: 10, padding: "12px 14px", borderRadius: 12, background: "#F4ECE2" }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: OK.gold, marginTop: 6, flexShrink: 0 }}></span>
              <div style={{ fontSize: 13.5, lineHeight: 1.45, textWrap: "pretty" }}>{a.issue.text}</div>
            </div>
          )}
          {!a.done && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {!a.confirmed && <OkBtn kind="primary" full onClick={() => onUpdate(a.id, { confirmed: true })}>Confirmar turno</OkBtn>}
              <OkBtn kind="secondary" full onClick={() => setResched((r) => !r)}>{resched ? "Cerrar reprogramación" : "Reprogramar"}</OkBtn>
              {resched && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "12px 0 4px" }}>
                  <div style={{ fontSize: 12.5, color: OK.muted }}>Horarios libres con {a.pro}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8 }}>
                    {RESCHED_SLOTS.filter(([d, t]) => !(d === a.day && t === a.time)).map(([d, t]) => (
                      <button key={d + t} onClick={() => { onMove(a, d, t); onClose(); }} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, minHeight: 44, borderRadius: 10, border: `1px solid ${OK.taupe}`, background: OK.white, color: OK.green, cursor: "pointer" }}>{d === TODAY ? "Hoy" : DAY_SHORT[d]} · {t}</button>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: OK.muted }}>También podés arrastrarlo en la vista Semana.</div>
                </div>
              )}
              <OkBtn kind="ghost" full onClick={() => alert(`Abrir conversación con ${a.client}`)}>Abrir conversación</OkBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const WK_START = 8 * 60, WK_END = 20 * 60, WK_PX = 1.2, WK_SNAP = 15;

function layoutDay(list) {
  const sorted = [...list].sort((a, b) => toMin(a.time) - toMin(b.time));
  const out = {}; let cluster = []; let lanesEnd = []; let clusterEnd = -1;
  const flush = () => { const n = lanesEnd.length; cluster.forEach((c) => (out[c.id].lanes = n)); cluster = []; lanesEnd = []; };
  sorted.forEach((a) => {
    const s0 = toMin(a.time), e0 = s0 + durMin(a.duration);
    if (s0 >= clusterEnd) { flush(); clusterEnd = -1; }
    let lane = lanesEnd.findIndex((e) => e <= s0);
    if (lane < 0) { lane = lanesEnd.length; lanesEnd.push(e0); } else lanesEnd[lane] = e0;
    clusterEnd = Math.max(clusterEnd, e0);
    out[a.id] = { lane, lanes: 1 }; cluster.push(a);
  });
  flush();
  return out;
}

function WeekView({ appts, mobile, onOpen, onMove }) {
  const [drag, setDrag] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const H = (WK_END - WK_START) * WK_PX;
  const hours = []; for (let m = WK_START; m < WK_END; m += 60) hours.push(m);
  const line = `1px solid ${OK.taupe}`;
  const total = appts.length;
  const overDay = (e, d) => {
    if (!drag) return;
    e.preventDefault();
    const r = e.currentTarget.getBoundingClientRect();
    let m = WK_START + Math.round(((e.clientY - r.top - drag.grab) / WK_PX) / WK_SNAP) * WK_SNAP;
    m = Math.max(WK_START, Math.min(WK_END - drag.dur, m));
    if (!hover || hover.d !== d || hover.m !== m) setHover({ d, m });
  };
  const drop = (e, d) => {
    e.preventDefault();
    if (drag && hover) { const a = appts.find((x) => x.id === drag.id); if (a && (a.day !== hover.d || a.time !== fmtMin(hover.m))) onMove(a, hover.d, fmtMin(hover.m)); }
    setDrag(null); setHover(null);
  };
  return (
    <div style={{ background: OK.cream, minHeight: "100%", padding: mobile ? "20px 16px 28px" : "28px 32px 36px", boxSizing: "border-box", fontFamily: SANS, color: OK.ink }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: mobile ? 14 : 18 }}>
        <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "stretch" : "flex-end", gap: mobile ? 12 : 24 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SERIF, fontSize: mobile ? 26 : 32, fontWeight: 500, lineHeight: 1.1, color: OK.green, textWrap: "pretty" }}>Semana del 29 de julio</div>
            <div style={{ fontSize: 13.5, color: OK.muted, marginTop: 6 }}>{total} turnos · Arrastrá un turno para moverlo · Tocá un espacio libre para agendar</div>
          </div>
          <OkBtn kind="primary" full={mobile} onClick={() => openNewAppt()}>+ Nuevo turno</OkBtn>
        </div>
        <div style={{ background: OK.white, border: line, borderRadius: 16, overflowX: "auto" }}>
          <div style={{ minWidth: mobile ? 760 : 860 }}>
            <div style={{ display: "grid", gridTemplateColumns: "52px repeat(6, minmax(0,1fr))", borderBottom: line, position: "sticky", top: 0, background: OK.white, zIndex: 2 }}>
              <div></div>
              {DAY_SHORT.map((l, d) => {
                const n = appts.filter((a) => a.day === d).length;
                const today = d === TODAY;
                return (
                  <div key={l} style={{ padding: "10px 10px", borderLeft: line, display: "flex", alignItems: "baseline", gap: 6, background: today ? "#F8F5F1" : OK.white }}>
                    <span style={{ fontSize: 13.5, fontWeight: today ? 700 : 600, color: today ? OK.green : OK.ink }}>{l}</span>
                    {today && <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.green }}>Hoy</span>}
                    <span style={{ marginLeft: "auto", fontSize: 12, color: OK.muted, fontVariantNumeric: "tabular-nums" }}>{n}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "52px repeat(6, minmax(0,1fr))" }}>
              <div style={{ position: "relative", height: H }}>
                {hours.map((m) => (
                  <div key={m} style={{ position: "absolute", top: (m - WK_START) * WK_PX - 7, right: 8, fontSize: 11, color: OK.muted, fontVariantNumeric: "tabular-nums" }}>{m === WK_START ? "" : fmtMin(m)}</div>
                ))}
              </div>
              {DAY_SHORT.map((l, d) => {
                const list = appts.filter((a) => a.day === d);
                const lay = layoutDay(list);
                const today = d === TODAY;
                return (
                  <div key={l} onDragOver={(e) => overDay(e, d)} onDrop={(e) => drop(e, d)} onClick={(e) => { if (e.target !== e.currentTarget || d < TODAY) return; const r = e.currentTarget.getBoundingClientRect(); const m = WK_START + Math.floor((e.clientY - r.top) / WK_PX / 30) * 30; openNewAppt({ day: d, time: fmtMin(Math.min(m, WK_END - 30)) }); }} style={{ cursor: d < TODAY ? "default" : "copy", position: "relative", height: H, borderLeft: line, background: `repeating-linear-gradient(to bottom, #EEE6E1 0, #EEE6E1 1px, transparent 1px, transparent ${60 * WK_PX}px)`, backgroundColor: today ? "#FBF8F4" : OK.white }}>
                    {today && <div style={{ position: "absolute", left: 0, right: 0, top: (toMin(NOW) - WK_START) * WK_PX, height: 2, background: OK.green, zIndex: 1 }}><span style={{ position: "absolute", left: -4, top: -3, width: 8, height: 8, borderRadius: 4, background: OK.green }}></span></div>}
                    {list.map((a) => {
                      const t = toMin(a.time), dur = durMin(a.duration);
                      const { lane, lanes } = lay[a.id];
                      const stt = apptStatus(a);
                      const past = a.done || d < TODAY;
                      const confirmedLook = a.confirmed && !past;
                      const dragging = drag && drag.id === a.id;
                      const hpx = dur * WK_PX - 3;
                      return (
                        <div key={a.id} draggable={!past}
                          onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", a.id); const r = e.currentTarget.getBoundingClientRect(); setDrag({ id: a.id, grab: e.clientY - r.top, dur }); }}
                          onDragEnd={() => { setDrag(null); setHover(null); }}
                          onClick={() => onOpen(a.id)}
                          title={`${a.time} ${a.client} — ${a.treatment} · con ${a.pro} · ${stt.label}`}
                          style={{ position: "absolute", top: (t - WK_START) * WK_PX + 1, height: hpx, left: `calc(${(lane / lanes) * 100}% + 3px)`, width: `calc(${100 / lanes}% - 6px)`, boxSizing: "border-box", borderRadius: 8, padding: "4px 7px", overflow: "hidden", cursor: past ? "pointer" : "grab", zIndex: 2, opacity: dragging ? 0.4 : 1,
                            background: past ? "#F1ECE8" : confirmedLook ? "#E3ECE9" : OK.white,
                            border: past ? "1px solid #E6DED9" : confirmedLook ? "1px solid #C9DAD5" : `1px dashed ${OK.gold}`,
                            color: past ? OK.muted : OK.ink }}>
                          {hpx < 44 ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, fontSize: 11.5, lineHeight: 1.3, whiteSpace: "nowrap" }}>
                              <span style={{ fontWeight: 600, color: past ? OK.muted : OK.green, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{a.time}</span>
                              {!a.confirmed && !past && <span style={{ width: 6, height: 6, borderRadius: 3, background: OK.gold, flexShrink: 0 }}></span>}
                              <span style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{a.client}</span>
                            </div>
                          ) : (
                            <React.Fragment>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: past ? OK.muted : OK.green, fontVariantNumeric: "tabular-nums" }}>
                                {a.time}
                                {!a.confirmed && !past && <span style={{ width: 6, height: 6, borderRadius: 3, background: OK.gold }}></span>}
                              </div>
                              <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.client}</div>
                            </React.Fragment>
                          )}
                          {hpx > 58 && <div style={{ fontSize: 11, lineHeight: 1.25, color: past ? OK.muted : OK.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.treatment}</div>}
                        </div>
                      );
                    })}
                    {hover && hover.d === d && drag && (
                      <div style={{ position: "absolute", top: (hover.m - WK_START) * WK_PX + 1, height: drag.dur * WK_PX - 3, left: 3, right: 3, borderRadius: 8, border: `2px solid ${OK.green}`, background: "rgba(0,63,54,0.06)", zIndex: 3, pointerEvents: "none", display: "flex", alignItems: "flex-start", padding: "3px 6px", boxSizing: "border-box" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: OK.cream, background: OK.green, padding: "1px 6px", borderRadius: 4, fontVariantNumeric: "tabular-nums" }}>{fmtMin(hover.m)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: OK.muted }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 10, borderRadius: 3, background: "#E3ECE9", border: "1px solid #C9DAD5" }}></span>Confirmado</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 10, borderRadius: 3, background: OK.white, border: `1px dashed ${OK.gold}` }}></span>Sin confirmar</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 10, borderRadius: 3, background: "#F1ECE8", border: "1px solid #E6DED9" }}></span>Atendido</span>
        </div>
      </div>
    </div>
  );
}


const openNewAppt = (prefill) => window.dispatchEvent(new CustomEvent("okio:new-appt", { detail: prefill || {} }));
const TREATMENTS = [
  { name: "Botox – frente", dur: 30, price: "$280", pros: [P1] },
  { name: "Relleno – labios", dur: 45, price: "$420", pros: [P1] },
  { name: "Hilos tensores", dur: 60, price: "$650", pros: [P1] },
  { name: "Mesoterapia facial", dur: 45, price: "$180", pros: [P1] },
  { name: "Consulta inicial", dur: 45, price: "Sin cargo", pros: [P1] },
  { name: "Limpieza facial profunda", dur: 60, price: "$90", pros: [P2] },
  { name: "Peeling químico", dur: 40, price: "$150", pros: [P2, P1] },
  { name: "Depilación láser – piernas", dur: 50, price: "$120", pros: [P2] },
  { name: "Control post tratamiento", dur: 30, price: "Sin cargo", pros: [P1, P2] },
];
const norm = (x) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function freeSlots(appts, day, pro, dur, extra) {
  const busy = appts.filter((a) => a.day === day && a.pro === pro).map((a) => [toMin(a.time), toMin(a.time) + durMin(a.duration)]);
  const from = day === TODAY ? Math.ceil((toMin(NOW) + 20) / 30) * 30 : WK_START;
  const free = (m) => m >= from && m + dur <= WK_END && !busy.some(([s0, e0]) => m < e0 && m + dur > s0);
  const out = [];
  for (let m = WK_START; m + dur <= WK_END; m += 30) if (free(m)) out.push(fmtMin(m));
  if (extra && !out.includes(extra) && free(toMin(extra))) { out.push(extra); out.sort((a, b) => toMin(a) - toMin(b)); }
  return out;
}
const FIELD = { width: "100%", boxSizing: "border-box", fontFamily: SANS, fontSize: 14, color: OK.ink, background: OK.white, border: `1px solid ${OK.taupe}`, borderRadius: 10, padding: "11px 12px", minHeight: 44, outlineColor: OK.green };
function FSection({ label, error, right, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: OK.muted }}>{label}</span>
        <span style={{ marginLeft: "auto" }}>{right}</span>
      </div>
      {children}
      {error && <div style={{ fontSize: 12.5, fontWeight: 600, color: OK.goldInk, display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: 3, background: OK.gold, flexShrink: 0 }}></span>{error}</div>}
    </div>
  );
}
function Chip({ on, disabled, onClick, children, sub }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{ fontFamily: SANS, minHeight: 44, borderRadius: 10, cursor: disabled ? "default" : "pointer", padding: "6px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
      border: `1px solid ${on ? OK.green : OK.taupe}`, background: on ? OK.green : disabled ? "transparent" : OK.white, color: on ? OK.cream : disabled ? "#A9AFAC" : OK.green, opacity: disabled ? 0.7 : 1 }}>
      <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{children}</span>
      {sub != null && <span style={{ fontSize: 11, color: on ? "rgba(245,241,236,0.78)" : OK.muted, whiteSpace: "nowrap" }}>{sub}</span>}
    </button>
  );
}

function NewApptForm({ open, prefill, appts, onClose, onCreate }) {
  const [mobile, setMobile] = React.useState(window.innerWidth < 640);
  const [q, setQ] = React.useState("");
  const [client, setClient] = React.useState(null);
  const [phone, setPhone] = React.useState("");
  const [tname, setTname] = React.useState("");
  const [pro, setPro] = React.useState("");
  const [day, setDay] = React.useState(TODAY);
  const [time, setTime] = React.useState("");
  const [wa, setWa] = React.useState(true);
  const [notes, setNotes] = React.useState("");
  const [tried, setTried] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    setMobile(window.innerWidth < 640);
    setQ(""); setClient(null); setPhone(""); setNotes(""); setWa(true); setTried(false);
    setTname(prefill.treatment || ""); setPro(prefill.pro || "");
    setDay(prefill.day != null && prefill.day >= TODAY ? prefill.day : TODAY); setTime(prefill.time || "");
  }, [open]);
  if (!open) return null;
  const t = TREATMENTS.find((x) => x.name === tname);
  const pros = t ? t.pros : [P1, P2];
  const curPro = pros.includes(pro) ? pro : (t ? t.pros[0] : "");
  const dur = t ? t.dur : 30;
  const slots = curPro ? freeSlots(appts, day, curPro, dur, prefill.day === day ? prefill.time : null) : [];
  const timeOk = slots.includes(time) ? time : "";
  const known = [...new Set(CLIENTS.map((c) => c.name).concat(appts.map((a) => a.client)))].sort();
  const matches = q.trim() ? known.filter((n) => norm(n).includes(norm(q.trim()))).slice(0, 5) : [];
  const exact = known.some((n) => norm(n) === norm(q.trim()));
  const weekCount = client ? appts.filter((a) => a.client === client.name && !a.done).length : 0;
  const err = {
    client: !client && "Elegí una clienta o agregala como nueva.",
    phone: client && client.isNew && wa && phone.replace(/\D/g, "").length < 8 && "Agregá un teléfono para mandarle la confirmación.",
    t: !t && "Elegí un tratamiento.",
    time: !timeOk && (t ? "Elegí un horario libre." : null),
  };
  const valid = !err.client && !err.phone && t && timeOk;
  const submit = () => {
    if (!valid) { setTried(true); return; }
    onCreate({ id: "n" + Date.now(), day, time: timeOk, duration: `${dur} min`, client: client.name, treatment: t.name, pro: curPro, confirmed: false, reminded: wa, notes: notes.trim() || undefined });
  };
  const pad = mobile ? 18 : 24;
  const panel = mobile
    ? { left: 0, right: 0, bottom: 0, top: "6%", borderRadius: "20px 20px 0 0" }
    : { top: 0, right: 0, bottom: 0, width: 460, maxWidth: "100%" };
  const end = timeOk ? fmtMin(toMin(timeOk) + dur) : "";
  const dayLabel = (d) => (d === TODAY ? "Hoy" : DAY_SHORT[d]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 70, fontFamily: SANS, color: OK.ink }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(29,43,40,0.32)" }}></div>
      <div role="dialog" aria-label="Nuevo turno" style={{ position: "absolute", ...panel, background: OK.cream, boxShadow: "0 10px 40px rgba(0,63,54,0.18)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: `${mobile ? 16 : 22}px ${pad}px 16px`, borderBottom: `1px solid ${OK.taupe}` }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: OK.muted }}>Nuevo turno</div>
            <div style={{ fontFamily: SERIF, fontSize: mobile ? 26 : 30, fontWeight: 500, color: OK.green, lineHeight: 1.1, marginTop: 4 }}>Agendar turno</div>
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{ width: 36, height: 36, borderRadius: 18, border: `1px solid ${OK.taupe}`, background: OK.white, color: OK.green, fontSize: 18, cursor: "pointer", lineHeight: 1, flexShrink: 0 }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: `20px ${pad}px 24px`, display: "flex", flexDirection: "column", gap: 24 }}>
          <FSection label="Clienta" error={tried && (err.client || err.phone)} right={client && <LinkBtn onClick={() => { setClient(null); setQ(""); }}>Cambiar</LinkBtn>}>
            {client ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, background: OK.white, borderRadius: 12, padding: "12px 14px", border: `1px solid ${OK.taupe}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: client.isNew ? "#F3EADF" : "#E3ECE9", color: client.isNew ? OK.goldInk : OK.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>{client.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{client.name}</div>
                    <div style={{ fontSize: 12.5, color: OK.muted }}>{client.isNew ? "Nueva clienta" : weekCount ? `${weekCount} ${weekCount === 1 ? "turno" : "turnos"} esta semana` : "Clienta existente"}</div>
                  </div>
                </div>
                {client.isNew && <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono (WhatsApp)" inputMode="tel" style={FIELD} />}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre…" style={{ ...FIELD, borderRadius: q.trim() ? "10px 10px 0 0" : 10 }} />
                {q.trim() && (
                  <div style={{ background: OK.white, border: `1px solid ${OK.taupe}`, borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                    {matches.map((n) => (
                      <button key={n} onClick={() => setClient({ name: n })} style={{ display: "flex", alignItems: "center", width: "100%", textAlign: "left", fontFamily: SANS, fontSize: 14, color: OK.ink, background: "transparent", border: "none", borderTop: `1px solid ${OK.taupe}`, padding: "0 12px", minHeight: 44, cursor: "pointer" }}>{n}</button>
                    ))}
                    {!exact && (
                      <button onClick={() => setClient({ name: q.trim().replace(/\s+/g, " "), isNew: true })} style={{ display: "flex", alignItems: "center", width: "100%", textAlign: "left", fontFamily: SANS, fontSize: 14, fontWeight: 600, color: OK.green, background: "#FBF8F4", border: "none", borderTop: matches.length ? `1px solid ${OK.taupe}` : "none", padding: "0 12px", minHeight: 44, cursor: "pointer" }}>+ Agregar “{q.trim()}” como nueva clienta</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </FSection>

          <FSection label="Tratamiento" error={tried && err.t}>
            <select value={tname} onChange={(e) => setTname(e.target.value)} style={{ ...FIELD, appearance: "none", WebkitAppearance: "none", cursor: "pointer", color: tname ? OK.ink : OK.muted, paddingRight: 36, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23003F36' stroke-width='1.6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
              <option value="" disabled>Elegí un tratamiento</option>
              {TREATMENTS.map((x) => <option key={x.name} value={x.name}>{x.name}</option>)}
            </select>
            {t && <div style={{ fontSize: 13, color: OK.muted }}>{t.dur} min · {t.price}</div>}
          </FSection>

          <FSection label="Profesional">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 8 }}>
              {[P1, P2].map((p) => {
                const ok = pros.includes(p);
                return <Chip key={p} on={curPro === p} disabled={!ok} onClick={() => setPro(p)} sub={ok ? null : "No hace este tratamiento"}>{p}</Chip>;
              })}
            </div>
          </FSection>

          <FSection label="Día y horario" error={tried && err.time} right={timeOk && <span style={{ fontSize: 13, fontWeight: 600, color: OK.green, fontVariantNumeric: "tabular-nums" }}>{timeOk} – {end}</span>}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${mobile ? 3 : 5}, minmax(0,1fr))`, gap: 8 }}>
              {DAY_SHORT.map((l, d) => {
                if (d < TODAY) return null;
                const n = curPro ? freeSlots(appts, d, curPro, dur).length : null;
                return <Chip key={l} on={day === d} onClick={() => setDay(d)} sub={n == null ? " " : n ? `${n} libres` : "Completo"}>{dayLabel(d)}</Chip>;
              })}
            </div>
            {!t ? (
              <div style={{ fontSize: 13, color: OK.muted, padding: "10px 0 2px" }}>Elegí un tratamiento para ver los horarios libres.</div>
            ) : slots.length === 0 ? (
              <div style={{ fontSize: 13, color: OK.muted, padding: "10px 0 2px" }}>{curPro} no tiene horarios libres ese día. Probá otro día.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${mobile ? 4 : 5}, minmax(0,1fr))`, gap: 6, marginTop: 4 }}>
                {slots.map((s0) => <Chip key={s0} on={timeOk === s0} onClick={() => setTime(s0)}>{s0}</Chip>)}
              </div>
            )}
          </FSection>

          <FSection label="Confirmación">
            <label style={{ display: "flex", alignItems: "flex-start", gap: 12, background: OK.white, border: `1px solid ${OK.taupe}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer" }}>
              <input type="checkbox" checked={wa} onChange={(e) => setWa(e.target.checked)} style={{ width: 18, height: 18, margin: "1px 0 0", accentColor: OK.green, flexShrink: 0 }} />
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Enviar confirmación por WhatsApp</span>
                <span style={{ fontSize: 12.5, color: OK.muted, lineHeight: 1.4, textWrap: "pretty" }}>Le llega el detalle del turno y un pedido para confirmar. El recordatorio sale 24 h antes.</span>
              </span>
            </label>
          </FSection>

          <FSection label="Notas internas">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opcional. Solo lo ve el equipo." rows={3} style={{ ...FIELD, resize: "vertical", lineHeight: 1.45 }}></textarea>
          </FSection>
        </div>

        <div style={{ borderTop: `1px solid ${OK.taupe}`, background: OK.white, padding: `14px ${pad}px ${mobile ? 18 : 16}px`, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, color: valid ? OK.ink : OK.muted, lineHeight: 1.4, minHeight: 18 }}>
            {valid
              ? <span><strong style={{ fontWeight: 600 }}>{client.name}</strong> · {t.name} · {dayLabel(day)} {timeOk}–{end} · con {curPro}</span>
              : "Completá clienta, tratamiento y horario."}
          </div>
          <div style={{ display: "flex", gap: 8, flexDirection: mobile ? "column-reverse" : "row" }}>
            <OkBtn kind="ghost" full={mobile} onClick={onClose}>Cancelar</OkBtn>
            <div style={{ flex: 1, display: "flex" }}><OkBtn kind="primary" full onClick={submit}>{wa ? "Agendar y enviar confirmación" : "Agendar turno"}</OkBtn></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaScreen({ appts, setAppts, mobile, mode, listStyle }) {
  const [openId, setOpenId] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const open = appts.find((a) => a.id === openId);
  const onUpdate = (id, patch) => setAppts((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const onMove = (a, d, t) => {
    const prev = { day: a.day, time: a.time };
    onUpdate(a.id, { day: d, time: t });
    setToast({ text: `${a.client} → ${d === TODAY ? "Hoy" : DAY_SHORT[d]}, ${t}`, undo: () => onUpdate(a.id, prev) });
  };
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 5000); return () => clearTimeout(t); }, [toast]);
  return (
    <div>
      {mode === "week"
        ? <WeekView appts={appts} mobile={mobile} onOpen={setOpenId} onMove={onMove} />
        : <AgendaOverview appts={appts} setAppts={setAppts} forceMobile={mobile} listStyle={listStyle} onOpen={setOpenId} />}
      <ApptDrawer a={open} mobile={mobile} onClose={() => setOpenId(null)} onUpdate={onUpdate} onMove={onMove} />
      {toast && (
        <div style={{ position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)", zIndex: 60, display: "flex", alignItems: "center", gap: 14, padding: "10px 12px 10px 16px", borderRadius: 12, background: OK.green, color: OK.cream, fontFamily: SANS, fontSize: 13.5, boxShadow: "0 8px 24px rgba(0,63,54,0.25)", maxWidth: "calc(100% - 32px)", boxSizing: "border-box" }}>
          <span style={{ minWidth: 0 }}>Turno movido: {toast.text}</span>
          <button onClick={() => { toast.undo(); setToast(null); }} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: OK.cream, background: "rgba(245,241,236,0.14)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", whiteSpace: "nowrap" }}>Deshacer</button>
        </div>
      )}
    </div>
  );
}

function CalendarView({ appts, setAppts }) {
  const ls = (k, d) => localStorage.getItem(k) || d;
  const [preview, setPreview] = React.useState(() => ls("okio-ag-preview", "desktop"));
  const [mode, setMode] = React.useState(() => ls("okio-ag-mode", "day"));
  const [listStyle, setListStyle] = React.useState(() => ls("okio-ag-list", "v1"));
  const set = (k, fn) => (v) => { fn(v); localStorage.setItem(k, v); };
  const seg = (on) => ({ fontFamily: SANS, fontSize: 12, fontWeight: 600, padding: "6px 11px", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", border: `1px solid ${on ? OK.green : OK.taupe}`, background: on ? OK.green : "transparent", color: on ? OK.cream : OK.muted });
  const group = (items, cur, fn) => <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{items.map(([id, l]) => <button key={id} onClick={() => fn(id)} style={seg(cur === id)}>{l}</button>)}</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", background: OK.cream }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "12px 32px", borderBottom: `1px solid ${OK.taupe}`, fontFamily: SANS }}>
        {group([["day", "Día"], ["week", "Semana"]], mode, set("okio-ag-mode", setMode))}
        {mode === "day" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: OK.muted }}>Lista:</span>
            {group([["v1", "V1 · Tarjeta"], ["v2", "V2 · Compacta"], ["v3", "V3 · Editorial"], ["compare", "Comparar"]], listStyle, set("okio-ag-list", setListStyle))}
          </div>
        )}
        <div style={{ marginLeft: "auto" }}>{group([["desktop", "Escritorio"], ["mobile", "375 px"]], preview, set("okio-ag-preview", setPreview))}</div>
      </div>
      {preview === "desktop" ? (
        <AgendaScreen appts={appts} setAppts={setAppts} mode={mode} listStyle={listStyle} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 32px" }}>
          <div style={{ width: 375, height: 780, transform: "translateZ(0)", border: `1px solid ${OK.taupe}`, borderRadius: 24, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,63,54,0.12)" }}>
            <div style={{ height: "100%", overflowY: "auto" }}>
              <AgendaScreen appts={appts} setAppts={setAppts} mode={mode} listStyle={listStyle} mobile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RequestsView() {
  const [selected, setSelected] = React.useState("t2");
  const [approved, setApproved] = React.useState({});
  const [editing, setEditing] = React.useState(null);
  const [drafts, setDrafts] = React.useState({});
  const thread = THREADS.find((t) => t.id === selected);
  const isApproved = !!approved[thread.id];
  const isEditing = editing === thread.id;
  const draft = drafts[thread.id] ?? thread.suggestion;

  return (
    <div style={{ display: "flex", gap: 16, padding: 24, minWidth: 900 }}>
      <div style={{ width: 260, background: "white", border: "1px solid var(--border-default)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid var(--gray-7)", fontWeight: 650, fontSize: 14 }}>Centro de Solicitudes</div>
        {THREADS.map((t) => (
          <ListRow
            key={t.id}
            active={t.id === selected}
            onClick={() => setSelected(t.id)}
            leading={<Dot color={t.color} />}
            title={<span>{t.name}{t.vip && <span style={{ marginLeft: 6 }}><Badge tone="accent" uppercase>VIP</Badge></span>}</span>}
            subtitle={t.meta}
            trailing={<Badge tone={approved[t.id] ? "neutral" : "accent"}>{approved[t.id] ? "Enviado" : t.status}</Badge>}
          />
        ))}
      </div>
      <div style={{ flex: 1, background: "white", border: "1px solid var(--border-default)", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Dot color={thread.color} size={7} />
          <span style={{ fontSize: 11, fontWeight: 700, color: thread.color, textTransform: "uppercase" }}>{thread.category}</span>
          <div style={{ fontWeight: 650, fontSize: 14.5 }}>{thread.name}</div>
        </div>
        <Card tone="accent">
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <Dot color="var(--accent)" size={8} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-strong)", textTransform: "uppercase" }}>Copiloto IA</span>
          </div>
          <div style={{ fontSize: 13.5, marginBottom: 12 }}>{thread.meta}</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--accent-strong)", textTransform: "uppercase", marginBottom: 6 }}>Respuesta sugerida</div>
          {isEditing ? (
            <textarea
              value={draft}
              onChange={(e) => setDrafts((d) => ({ ...d, [thread.id]: e.target.value }))}
              style={{ width: "100%", minHeight: 60, fontFamily: "var(--font-sans)", fontSize: 13, border: "1px solid var(--accent-tint-border-2)", borderRadius: 8, padding: 10, marginBottom: 9, boxSizing: "border-box" }}
            />
          ) : (
            <div style={{ fontSize: 13, background: "white", border: "1px solid var(--accent-tint-border-2)", borderRadius: 8, padding: "10px 12px", marginBottom: 9 }}>{draft}</div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            {isApproved ? (
              <Badge tone="neutral">✓ Enviado por {thread.channel}</Badge>
            ) : isEditing ? (
              <Button variant="primary" onClick={() => { setApproved((a) => ({ ...a, [thread.id]: true })); setEditing(null); }}>Guardar y enviar</Button>
            ) : (
              <React.Fragment>
                <Button variant="primary" onClick={() => setApproved((a) => ({ ...a, [thread.id]: true }))}>Aprobar y enviar por {thread.channel}</Button>
                <Button variant="secondary" onClick={() => setEditing(thread.id)}>Editar antes</Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ClientsView() {
  const [id, setId] = React.useState("c1");
  const client = CLIENTS.find((c) => c.id === id);
  const [tab, setTab] = React.useState("overview");
  return (
    <div style={{ display: "flex", gap: 20, padding: 24 }}>
      <div style={{ width: 240, background: "white", border: "1px solid var(--border-default)", borderRadius: 12, overflow: "hidden" }}>
        {CLIENTS.map((c) => (
          <ListRow key={c.id} active={c.id === id} onClick={() => { setId(c.id); setTab("overview"); }} title={c.name} subtitle={`Última visita ${c.lastVisit}`} />
        ))}
      </div>
      <div style={{ flex: 1, background: "white", border: "1px solid var(--border-default)", borderRadius: 12, padding: 22 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
          <Avatar size={52} tone="tint" />
          <div style={{ fontSize: 17, fontWeight: 650 }}>{client.name}</div>
          <div style={{ marginLeft: "auto" }}><Button variant="primary" onClick={() => openNewAppt({ client: client.name })}>Reservar turno</Button></div>
        </div>
        <Tabs tabs={[{ id: "overview", label: "Resumen" }, { id: "history", label: "Historial" }]} activeId={tab} onChange={setTab} />
        {tab === "overview" && <div style={{ paddingTop: 16, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>{client.overview}</div>}
        {tab === "history" && (
          <div style={{ paddingTop: 8 }}>
            {client.history.map((h) => (
              <div key={h.t} style={{ padding: "10px 0", borderTop: "1px solid var(--gray-7)", fontSize: 13 }}><strong>{h.t}</strong> — {h.d}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CatalogView() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "white", border: "1px solid var(--border-default)", borderRadius: 12, overflow: "hidden" }}>
        {CATALOG.map((t) => (
          <ListRow key={t.name} title={t.name} subtitle={t.category} trailing={<span style={{ fontWeight: 600, fontSize: 13 }}>{t.price}</span>} />
        ))}
      </div>
    </div>
  );
}

function FollowupsView() {
  const [items, setItems] = React.useState(INITIAL_FOLLOWUPS);
  const act = (id, status) => setItems((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "white", border: "1px solid var(--border-default)", borderRadius: 12, overflow: "hidden" }}>
        {items.map((f) => (
          <ListRow
            key={f.id}
            title={`${f.client} — ${f.treatment}`}
            subtitle={f.due}
            trailing={
              f.status === "pending" ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <Button size="sm" onClick={() => act(f.id, "sent")}>Enviar</Button>
                  <Button size="sm" variant="secondary" onClick={() => act(f.id, "skipped")}>Omitir</Button>
                </div>
              ) : (
                <Badge tone="neutral">{f.status === "sent" ? "Enviado" : "Omitido"}</Badge>
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        <StatCard label="Ingresos este mes" value="$18.420" sub="+12% vs. el mes pasado" />
        <StatCard label="Turnos reservados" value="214" sub="96% de la capacidad" />
        <StatCard label="Tasa de ausentismo" value="4.2%" sub="-1.1pt vs. el mes pasado" />
        <StatCard label="Retención de clientes" value="68%" sub="+3pt vs. el mes pasado" />
      </div>
      <div style={{ background: "white", border: "1px solid var(--border-default)", borderRadius: 12, padding: 18 }}>
        <div style={{ fontWeight: 650, fontSize: 13, marginBottom: 14 }}>Tratamientos más solicitados</div>
        <ProgressBar label="Botox" pct={32} />
        <ProgressBar label="Relleno" pct={24} />
        <ProgressBar label="Depilación láser" pct={18} />
      </div>
    </div>
  );
}

const VIEW_LABEL = { dashboard: "Inicio", calendar: "Agenda", requests: "Conversaciones", clients: "Clientes", catalog: "Catálogo", followups: "Seguimientos", analytics: "Analítica" };

function App() {
  const [view, setView] = React.useState("dashboard");
  const [query, setQuery] = React.useState("");
  const [appts, setAppts] = React.useState(() => INITIAL_APPTS.map((a) => ({ ...a, day: TODAY })).concat(WEEK_EXTRA));
  const requestCount = THREADS.length;
  const [newAppt, setNewAppt] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { const h = (e) => setNewAppt(e.detail || {}); window.addEventListener("okio:new-appt", h); return () => window.removeEventListener("okio:new-appt", h); }, []);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 5000); return () => clearTimeout(t); }, [toast]);
  const create = (a) => {
    setAppts((p) => [...p, a]);
    setNewAppt(null);
    setToast({ text: `${a.client} · ${a.day === TODAY ? "Hoy" : DAY_SHORT[a.day]}, ${a.time}`, undo: () => setAppts((p) => p.filter((x) => x.id !== a.id)) });
  };
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--surface-page)" }}>
      <Sidebar view={view} setView={setView} requestCount={requestCount} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar title={VIEW_LABEL[view]} query={query} setQuery={setQuery} />
        <div style={{ flex: 1, overflow: "auto" }}>
          {view === "dashboard" && <DashboardView setView={setView} />}
          {view === "calendar" && <CalendarView appts={appts} setAppts={setAppts} />}
          {view === "requests" && <RequestsView />}
          {view === "clients" && <ClientsView />}
          {view === "catalog" && <CatalogView />}
          {view === "followups" && <FollowupsView />}
          {view === "analytics" && <AnalyticsView />}
        </div>
      </div>
      <NewApptForm open={!!newAppt} prefill={newAppt || {}} appts={appts} onClose={() => setNewAppt(null)} onCreate={create} />
      {toast && (
        <div style={{ position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)", zIndex: 80, display: "flex", alignItems: "center", gap: 14, padding: "10px 12px 10px 16px", borderRadius: 12, background: OK.green, color: OK.cream, fontFamily: SANS, fontSize: 13.5, boxShadow: "0 8px 24px rgba(0,63,54,0.25)", maxWidth: "calc(100% - 32px)", boxSizing: "border-box" }}>
          <span style={{ minWidth: 0 }}>Turno agendado: {toast.text}</span>
          <button onClick={() => { toast.undo(); setToast(null); }} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: OK.cream, background: "rgba(245,241,236,0.14)", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", whiteSpace: "nowrap" }}>Deshacer</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
