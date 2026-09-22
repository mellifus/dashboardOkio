import React from "react";

export function Avatar({ initials, size = 32, tone = "accent" }) {
  const bg = tone === "accent" ? "var(--accent)" : "var(--accent-tint)";
  const color = tone === "accent" ? "var(--text-on-accent)" : "var(--accent-strong)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-serif)",
        fontSize: size <= 32 ? "13px" : "17px",
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
