import React from 'react';
import TextField from '../../../../ui/TextField';
import { TextFieldProps } from '../../../../ui/TextField/TextField';
import { PickerDate } from '../../context/DateUtilsProvider';
import { ParsableDate } from '../../hooks/useDateController';
import useInputValueController from '../../hooks/useInputValueController';
import { ExtendUI } from '../../typings/helpers';

export interface DateInputProps<
  TInputValue = ParsableDate,
  TDateValue = PickerDate
> extends ExtendUI<TextFieldProps, 'onChange' | 'value'> {
  value: TInputValue;
  onChange: (nextDate: TDateValue | null) => void;
  mask?: string;
  openPicker: () => void;
  inputFormat: string;
}

function DateInput({
  value,
  mask,
  openPicker,
  inputFormat,
  onFocus,
  ...rest
}: DateInputProps) {
  const inputValue = useInputValueController({
    value,
    inputFormat,
  });

  return (
    <TextField
      value={inputValue}
      onClick={openPicker}
      onFocus={(ev: any) => {
        openPicker();

        if (onFocus) {
          onFocus(ev);
        }
      }}
      {...rest}
    />
  );
}

export default DateInput;
