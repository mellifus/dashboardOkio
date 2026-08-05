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
        fontFamily: "var(--font-sans)",
        fontSize: size <= 32 ? "11.5px" : "13px",
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
