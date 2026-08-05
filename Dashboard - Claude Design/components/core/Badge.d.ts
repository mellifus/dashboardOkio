/**
 * @startingPoint section="Core" subtitle="Status pills, category tags, VIP markers" viewport="700x200"
 */
export interface BadgeProps {
  /** Color treatment. `accent` = AI/active states, `dark` = on dark sidebar, others map to semantic status. */
  tone?: "accent" | "neutral" | "warning" | "danger" | "success" | "dark";
  /** Small caps pill (e.g. "VIP") vs a normal status-label rectangle (e.g. "Listo para aprobar"). */
  uppercase?: boolean;
  children: React.ReactNode;
}
