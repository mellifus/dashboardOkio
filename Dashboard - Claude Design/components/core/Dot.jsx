import React from "react";

export function Dot({ color = "var(--accent)", size = 6 }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        background: color,
        flexShrink: 0,
      }}
    />
  );
}
