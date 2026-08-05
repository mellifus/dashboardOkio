import React from "react";

/**
 * @startingPoint section="Core" subtitle="Primary, secondary and ghost actions" viewport="700x220"
 */
export interface ButtonProps {
  /** Visual style. `primary` = solid accent CTA, `secondary` = outlined, `ghost` = text-only. */
  variant?: "primary" | "secondary" | "ghost";
  /** Padding/font scale. */
  size?: "sm" | "md" | "lg";
  /** Adds the accent drop-shadow used for prominent top-of-page CTAs (primary only). */
  withShadow?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
