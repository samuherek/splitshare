import { ParsableDate } from '../hooks/useDateController';

export interface BasePickerProps<
  TInputValue = ParsableDate,
  TOutputValue = ParsableDate | null
> {
  value: TInputValue;
  onChange: (nextDate: TOutputValue) => void;
  inputFormat?: string;
  disabled?: boolean;
  readOnly?: boolean;
  defaultHighlight?: ParsableDate;
  autoOk?: boolean;
  // onAccept?: (date: TDateValue | null) => void;
  // onError?: (error: React.ReactNode, value: TInputValue | TDateValue) => void;
  // onOpen?: () => void;
  // onClose?: () => void;
  open?: boolean;
}
