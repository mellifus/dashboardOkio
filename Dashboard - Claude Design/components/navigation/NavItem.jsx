import React from "react";

export function NavItem({ label, dotColor, active = false, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        marginBottom: 2,
        cursor: "pointer",
        background: active ? "oklch(22% 0.03 260)" : "transparent",
        color: active ? "var(--ink-sidebar-text-strong)" : "var(--ink-sidebar-text)",
        borderRadius: "var(--radius-md)",
        fontWeight: active ? 650 : 500,
        fontSize: "var(--text-md)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: active ? "var(--accent)" : "var(--accent-dot-inactive)", flexShrink: 0 }} />
      <span>{label}</span>
      {badge != null && (
        <span style={{ marginLeft: "auto", background: "oklch(from var(--accent) l c h / 0.22)", color: "oklch(from var(--accent) 80% 0.09 h)", fontSize: 10.5, fontWeight: 600, padding: "1px 7px", borderRadius: 10 }}>
          {badge}
        </span>
      )}
    </div>
  );
}
