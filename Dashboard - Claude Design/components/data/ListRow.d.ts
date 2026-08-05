/**
 * @startingPoint section="Data" subtitle="Generic row — client list, follow-up queue, catalog line" viewport="700x100"
 */
export interface ListRowProps {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}
