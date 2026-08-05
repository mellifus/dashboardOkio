import React from "react";

export function SearchInput({ placeholder = "Buscar…", value, onChange, width = 280 }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{
        width,
        padding: "7px 12px",
        border: "1px solid var(--border-9, var(--gray-9))",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-base-alt)",
        background: "var(--surface-input)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-sans)",
      }}
    />
  );
}
