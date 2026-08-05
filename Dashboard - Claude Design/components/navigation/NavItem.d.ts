/**
 * @startingPoint section="Navigation" subtitle="Dark sidebar item with active state and unread badge" viewport="700x160"
 */
export interface NavItemProps {
  label: string;
  active?: boolean;
  /** Number or string shown as a small pill on the right (unread/needs-attention count). */
  badge?: number | string | null;
  onClick?: () => void;
}
