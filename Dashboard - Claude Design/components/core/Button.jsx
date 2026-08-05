import React from "react";

const SIZES = {
  sm: { padding: "6px 12px", fontSize: "var(--text-sm-alt)" },
  md: { padding: "8px 14px", fontSize: "var(--text-base-alt)" },
  lg: { padding: "9px 15px", fontSize: "var(--text-base-alt)" },
};

const VARIANTS = {
  primary: {
    background: "var(--accent)",
    color: "var(--text-on-accent)",
    border: "none",
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-11, var(--border-strong))",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "none",
  },
};

export function Button({ variant = "primary", size = "md", withShadow = false, disabled = false, children, onClick, style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "var(--font-sans)",
        borderRadius: "var(--radius-md)",
        fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow: withShadow && variant === "primary" ? "var(--shadow-button-accent)" : "none",
        ...s,
        ...v,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
