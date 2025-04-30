export interface AutoCompletePropsInterface {
  id?: string;
  label?: string;
  className?: any;
  value?: string;
  prefix: string;
  options?: any;
  onChange: (e: any, values: any) => void;
  disabled?: boolean;
}