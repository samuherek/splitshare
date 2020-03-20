import React from 'react';
import { PickerDate } from '../context/DateUtilsProvider';
import { BasePickerProps } from '../typings/BasePicker';
import useDateController, { ParsableDate } from './useDateController';

function useDatePickerController({
  value,
  onChange,
  open: openProp,
  readOnly,
  disabled,
  autoOk,
  inputFormat,
}: BasePickerProps<ParsableDate, ParsableDate>) {
  const { day } = useDateController({ value, onChange });
  const [isOpen, setIsOpen] = React.useState<boolean>(openProp || false);

  if (!inputFormat) {
    //TODO: check if this is the right way to do this
    throw new Error('inputFormat prop is required');
  }

  const acceptDate = React.useCallback(
    (acceptedDate: ParsableDate, closePicker: boolean) => {
      onChange(acceptedDate);

      if (closePicker) {
        setIsOpen(false);
      }
    },
    [onChange]
  );

  const pickerProps = {
    day: day.value,
    onDayChange: (nextDay: PickerDate) => {
      day.onChange(nextDay);

      if (Boolean(autoOk)) {
        acceptDate(nextDay.toDate(), true);
      }
    },
  };

  const inputProps = {
    value,
    onChange,
    inputFormat,
    openPicker: () => !readOnly && !disabled && setIsOpen(true),
  };

  const wrapperProps = {
    open: isOpen,
    onDismiss: () => setIsOpen(false),
    onAccept: () => acceptDate(day.value.toDate(), true),
    // onClear: () => acceptDate(null),
  };

  return {
    pickerProps,
    inputProps,
    wrapperProps,
  };
}

export default useDatePickerController;
