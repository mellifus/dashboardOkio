/**
 * @startingPoint section="Core" subtitle="Container for panels, KPI tiles, and the AI Copilot card" viewport="700x220"
 */
export interface CardProps {
  padding?: string;
  /** `default` = white card w/ shadow (panels, KPI tiles); `subtle` = flat gray (embedded sub-cards); `accent` = AI Copilot tint; `warning` = medical/urgent protocol tint. */
  tone?: "default" | "subtle" | "accent" | "warning";
  children: React.ReactNode;
  style?: React.CSSProperties;
}
