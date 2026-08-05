/**
 * @startingPoint section="Forms" subtitle="Top-bar search / filter text input" viewport="700x90"
 */
export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  width?: number;
}
