import React from "react";

export function Tabs({ tabs, activeId, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border-8, var(--gray-8))", fontFamily: "var(--font-sans)" }}>
      {tabs.map((t) => (
        <div
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "9px 14px",
            cursor: "pointer",
            fontSize: "var(--text-base-alt)",
            fontWeight: t.id === activeId ? 650 : 500,
            color: t.id === activeId ? "var(--text-primary)" : "var(--text-muted)",
            borderBottom: `2px solid ${t.id === activeId ? "var(--accent)" : "transparent"}`,
          }}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}
