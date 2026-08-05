/**
 * @startingPoint section="Data" subtitle="KPI tile — label, big number, delta" viewport="700x160"
 */
export interface StatCardProps {
  label: string;
  value: string | number;
  /** Small accent-colored delta/context line, e.g. "+12% vs. el mes pasado". */
  sub?: string;
}
