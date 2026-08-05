import React from "react";

export function ProgressBar({ label, pct }) {
  return (
    <div style={{ marginBottom: 11, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base)", marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: "var(--gray-7)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 3 }} />
      </div>
    </div>
  );
}
