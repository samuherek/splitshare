import { PickerDate } from '../context/DateUtilsProvider';
import { ParsableDate } from '../hooks/useDateController';

export interface BasePickerProps<
  TInputValue = ParsableDate,
  TDateValue = PickerDate | null
> {
  value: TInputValue;
  onChange: (nextDate: Date) => void;
  inputFormat?: string;
  disabled?: boolean;
  readOnly?: boolean;
  defaultHighlight?: ParsableDate;
  onAccept?: (date: TDateValue | null) => void;
  onError?: (error: React.ReactNode, value: TInputValue | TDateValue) => void;
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
}
