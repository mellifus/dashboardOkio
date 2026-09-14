import React from "react";
const { NavItem, Avatar, SearchInput, Card, Badge, Dot, StatCard, Button, ListRow, Tabs, ProgressBar } = window.Okio;

const NAV = [
  { id: "calendar", label: "Agenda" },
  { id: "requests", label: "Centro de Solicitudes" },
  { id: "clients", label: "Clientes" },
  { id: "analytics", label: "Analítica" },
];

const THREADS = [
  { id: "t1", name: "Elena Vidal", category: "Reprogramación", color: "oklch(58% 0.16 55)", meta: "Mañana 10:00 · horarios alternativos", channel: "WhatsApp", wait: "12 min", status: "Listo para aprobar", vip: true },
  { id: "t2", name: "Camila Reyes", category: "Consulta de precio", color: "oklch(56% 0.15 230)", meta: "Oportunidad de $420", channel: "Instagram", wait: "2 min", status: "Esperando aprobación", vip: false },
  { id: "t3", name: "Irene Castro", category: "Consulta médica", color: "oklch(56% 0.18 25)", meta: "Posible complicación", channel: "WhatsApp", wait: "6 min", status: "Requiere revisión inmediata", vip: false },
];

const CLIENTS = [
  { id: "c1", name: "Elena Vidal", lastVisit: "12 jul", overview: "Clienta habitual desde 2023. Prefiere turnos por la mañana. Referida por Sofía Ramos." },
  { id: "c2", name: "Sofía Ramos", lastVisit: "20 jun", overview: "Clienta de largo plazo, tratamientos mensuales. Prefiere a Marta Ruiz." },
];

function Lotus({ size = 20, stroke = "var(--okio-accent-gold)" }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 100 78" aria-hidden="true"
      style={{ fill: "none", stroke, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" }}>
      <path d="M50 8 C57 24 57 42 50 56 C43 42 43 24 50 8 Z" />
      <path d="M50 56 C41 49 34 38 34 24 C43 30 49 43 50 56 Z" />
      <path d="M50 56 C59 49 66 38 66 24 C57 30 51 43 50 56 Z" />
      <path d="M50 58 C37 57 23 50 16 39 C31 38 45 46 50 58 Z" />
      <path d="M50 58 C63 57 77 50 84 39 C69 38 55 46 50 58 Z" />
      <path d="M22 46 C34 52 44 60 50 66 C56 60 66 52 78 46" />
    </svg>
  );
}

// Sidebar = Okio's institutional (green) layer. Scoped nav tokens let the shared
// NavItem read gold/green active states on the dark-green ground.
const SIDEBAR_VARS = {
  background: "var(--okio-primary)",
  "--ink-sidebar-text": "rgba(235,233,232,0.72)",
  "--ink-sidebar-text-strong": "#FFFFFF",
  "--nav-active-bg": "rgba(255,255,255,0.10)",
  "--nav-active-dot": "var(--okio-accent-gold)",
  "--nav-badge-bg": "var(--okio-accent-gold)",
  "--nav-badge-text": "var(--okio-primary)",
};

function Sidebar({ view, setView }) {
  return (
    <div style={{ ...SIDEBAR_VARS, width: 210, display: "flex", flexDirection: "column", padding: "18px 12px", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 24px" }}>
        <Lotus size={26} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, color: "var(--okio-accent-gold)" }}>Okio</span>
          <span style={{ fontSize: 7.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--okio-accent-gold-light)", fontWeight: 600, marginTop: 3 }}>Estética y Bienestar</span>
        </div>
      </div>
      {NAV.map((n) => (
        <NavItem key={n.id} label={n.label} active={view === n.id} badge={n.id === "requests" ? 3 : null} onClick={() => setView(n.id)} />
      ))}
    </div>
  );
}

function TopBar({ title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 26px", borderBottom: "1px solid var(--border-8, var(--gray-8))", fontFamily: "var(--font-sans)" }}>
      <div style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 20, letterSpacing: "-0.01em" }}>{title}</div>
      <div style={{ marginLeft: "auto" }}>
        <SearchInput placeholder="Buscar clientes, turnos…" />
      </div>
      <Avatar initials="MR" size={30} />
    </div>
  );
}

function CalendarView() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.01em" }}>Martes, 30 de julio</div>
          <div style={{ marginLeft: "auto" }}><Button variant="primary" withShadow>+ Nuevo turno</Button></div>
        </div>
        <div style={{ background: "white", border: "1px solid var(--border-default)", borderRadius: 12, padding: 16, boxShadow: "var(--shadow-card)" }}>
          {["Elena Vidal — Botox – frente · 09:30", "Marco Díaz — Consulta · 11:00", "Carla Núñez — Depilación láser · 14:00"].map((r) => (
            <div key={r} style={{ padding: "10px 0", borderTop: "1px solid var(--gray-7)", fontSize: 13 }}>{r}</div>
          ))}
        </div>
      </div>
      <div style={{ width: 260 }}>
        <Card>
          <div style={{ fontWeight: 650, fontSize: 13, marginBottom: 10 }}>Requiere atención (2)</div>
          <ListRow title="Marco Díaz" subtitle="11:00 · Ana Torres" trailing={<Button size="sm">Confirmar</Button>} />
        </Card>
      </div>
    </div>
  );
}

function RequestsView() {
  const [selected, setSelected] = React.useState("t2");
  const thread = THREADS.find((t) => t.id === selected);
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
            trailing={<Badge tone="accent">{t.status}</Badge>}
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
          <div style={{ fontSize: 13.5, marginBottom: 12 }}>Nuevo contacto preguntando por precio — alta intención de reservar.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary">Aprobar y enviar por {thread.channel}</Button>
            <Button variant="secondary">Editar antes</Button>
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
          <ListRow key={c.id} active={c.id === id} onClick={() => setId(c.id)} title={c.name} subtitle={`Última visita ${c.lastVisit}`} />
        ))}
      </div>
      <div style={{ flex: 1, background: "white", border: "1px solid var(--border-default)", borderRadius: 12, padding: 22 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <Avatar size={52} tone="tint" />
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 23, fontWeight: 500, alignSelf: "center", letterSpacing: "-0.01em" }}>{client.name}</div>
          <div style={{ marginLeft: "auto" }}><Button variant="primary">Reservar turno</Button></div>
        </div>
        <Tabs tabs={[{ id: "overview", label: "Resumen" }, { id: "history", label: "Historial" }]} activeId={tab} onChange={setTab} />
        <div style={{ paddingTop: 16, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)" }}>{client.overview}</div>
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

const VIEW_LABEL = { calendar: "Agenda", requests: "Centro de Solicitudes", clients: "Clientes", analytics: "Analítica" };

function App() {
  const [view, setView] = React.useState("requests");
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--surface-page)" }}>
      <Sidebar view={view} setView={setView} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar title={VIEW_LABEL[view]} />
        <div style={{ flex: 1, overflow: "auto" }}>
          {view === "calendar" && <CalendarView />}
          {view === "requests" && <RequestsView />}
          {view === "clients" && <ClientsView />}
          {view === "analytics" && <AnalyticsView />}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
