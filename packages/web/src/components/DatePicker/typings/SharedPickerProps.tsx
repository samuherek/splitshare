export type AnyPickerView =
  | 'year'
  | 'date'
  | 'month'
  | 'hours'
  | 'minutes'
  | 'seconds';

export interface WithViewProps<T extends AnyPickerView> {
  views?: T[];
  openToView?: T;
}
