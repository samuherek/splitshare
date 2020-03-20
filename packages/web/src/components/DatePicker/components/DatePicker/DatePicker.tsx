import React from 'react';
import { TextFieldProps } from '../../../../ui/TextField/TextField';
import { datePickerDefaultProps } from '../../config/default';
import { useDateUtils } from '../../context/DateUtilsProvider';
import useDatePickerController from '../../hooks/useDatePickerController';
import { BasePickerProps } from '../../typings/BasePicker';
import { WithViewProps } from '../../typings/SharedPickerProps';
import { getFormatByViews } from '../../utils/date-utils';
import Picker from '../Picker';
import Wrapper from '../Wrapper';
import { AnyWrapper } from '../Wrapper/Wrapper';

export interface DatePickerProps
  extends WithViewProps<'year' | 'month' | 'date'>,
    BasePickerProps {
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  variant?: AnyWrapper;
  inputProps: Omit<TextFieldProps, 'value' | 'onChange'>;
}

export type DatePickerView = 'year' | 'date' | 'month';

function useDefaultProps({
  openToView = 'date',
  views = ['year', 'date'],
  variant = 'dialog',
}: DatePickerProps) {
  const utils = useDateUtils();

  return {
    ...datePickerDefaultProps,
    views,
    openToView,
    variant,
    inputFormat: getFormatByViews(views, utils),
    // mask: '__/__/____',
  };
}

// Entry level component rendering different styles (like Button).
// It should not concern about the picker state. That should ve in the picker
function DatePicker(props: DatePickerProps) {
  const defaultProps = useDefaultProps(props);
  const allProps = { ...defaultProps, ...props };

  const { pickerProps, inputProps, wrapperProps } = useDatePickerController(
    allProps
  );

  const {
    views,
    openToView,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    variant,
    ...restPropsForTextField
  } = allProps;

  return (
    <Wrapper
      inputProps={{ ...inputProps, ...restPropsForTextField }}
      wrapperProps={wrapperProps}
      variant={variant}
    >
      <Picker
        views={views}
        openToView={openToView}
        minDate={minDate}
        maxDate={maxDate}
        disableFuture={disableFuture}
        disablePast={disablePast}
        {...pickerProps}
      />
    </Wrapper>
  );
}

export default DatePicker;
