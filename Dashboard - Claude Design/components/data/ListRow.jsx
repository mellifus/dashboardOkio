import React from "react";

export function ListRow({ leading, title, subtitle, trailing, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 18px",
        borderTop: "1px solid var(--gray-7)",
        cursor: onClick ? "pointer" : "default",
        background: active ? "oklch(from var(--accent) 96.5% 0.01 h)" : "transparent",
        fontFamily: "var(--font-sans)",
      }}
    >
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "var(--text-base-alt)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        {subtitle && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}
