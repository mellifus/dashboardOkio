import React from "react";

export function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-3xl)", padding: 18, boxShadow: "var(--shadow-card)", fontFamily: "var(--font-sans)" }}>
      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 650, textTransform: "uppercase", letterSpacing: "var(--tracking-wider)" }}>{label}</div>
      <div style={{ fontSize: 25, fontWeight: 650, marginTop: 7, letterSpacing: "var(--tracking-tight)" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 5, fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}
