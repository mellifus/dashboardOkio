import React from "react";

export function Card({ padding = "18px", tone = "default", children, style }) {
  const tones = {
    default: { background: "var(--surface-card)", border: "1px solid var(--border-default)" },
    subtle: { background: "var(--gray-4)", border: "1px solid var(--gray-10)" },
    accent: { background: "var(--accent-tint-soft)", border: "1px solid var(--accent-tint-border)" },
    warning: { background: "var(--warning-bg-strong)", border: "1px solid var(--warning-border)" },
  };
  const t = tones[tone] || tones.default;
  return (
    <div
      style={{
        borderRadius: "var(--radius-3xl)",
        boxShadow: tone === "default" ? "var(--shadow-card)" : "none",
        padding,
        fontFamily: "var(--font-sans)",
        ...t,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
