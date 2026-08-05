import React from "react";

const TONES = {
  accent: { background: "var(--accent-tint)", color: "var(--accent-strong)" },
  neutral: { background: "var(--gray-7)", color: "var(--gray-17)" },
  warning: { background: "var(--danger-bg)", color: "var(--danger-text)" },
  danger: { background: "var(--danger-bg)", color: "var(--danger-text)" },
  success: { background: "var(--success-bg)", color: "var(--success)" },
  dark: { background: "oklch(from var(--accent) l c h / 0.22)", color: "oklch(from var(--accent) 80% 0.09 h)" },
};

export function Badge({ tone = "neutral", uppercase = false, children }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-sans)",
        fontSize: uppercase ? "var(--text-2xs)" : "var(--text-xs-alt)",
        fontWeight: 700,
        padding: uppercase ? "1px 6px" : "2px 7px",
        borderRadius: uppercase ? "var(--radius-pill)" : "var(--radius-sm)",
        textTransform: uppercase ? "uppercase" : "none",
        letterSpacing: uppercase ? "var(--tracking-wide)" : "normal",
        whiteSpace: "nowrap",
        ...t,
      }}
    >
      {children}
    </span>
  );
}
