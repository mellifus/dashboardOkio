/**
 * @startingPoint section="Navigation" subtitle="Underline tabs for client profile / detail sections" viewport="700x100"
 */
export interface TabsProps {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}
