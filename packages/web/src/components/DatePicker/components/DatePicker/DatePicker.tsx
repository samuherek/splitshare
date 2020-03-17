import React from 'react';
import { datePickerDefaultProps } from '../../config/default';
import usePickerController from '../../hooks/usePickerController';
import { BasePickerProps } from '../../typings/BasePicker';
import { WithViewProps } from '../../typings/SharedPickerProps';
import Picker from '../Picker';
import { StaticWrapper } from '../Wrapper';

export interface DatePickerProps
  extends WithViewProps<'year' | 'month' | 'date'>,
    BasePickerProps {
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export type DatePickerView = 'year' | 'date' | 'month';

// const Wrapper = styled.div``;

// const PaperStyled = styled(Paper)`
//   display: flex;
//   flex-direction: column;
//   margin: 48px;
//   position: relative;
//   overflow-y: auto;
//   flex: 0 1 auto;
//   max-height: calc(100% - 96px);
//   max-width: 600px;

//   @media print {
//     overflow-y: visible;
//     box-shadow: none;
//   }
// `;

// function validateDateValue(
//   value: ParsableDate,
//   utils: DateUtils,
//   {
//     maxDate,
//     minDate,
//     disableFuture,
//     disablePast,
//     invalidDateMessage,
//     strictCompareDates,
//     maxDateMessage,
//     minDateMessage,
//   }: any
// ) {
//   const parsedValue = utils.date(value);

//   // If null - do not show error
//   if (value === null) {
//     return undefined;
//   }

//   if (!utils.isValid(value)) {
//     return invalidDateMessage;
//   }

//   if (
//     maxDate &&
//     utils.isAfter(
//       parsedValue!,
//       getComparisonMaxDate(utils, utils.date(maxDate)!, !!strictCompareDates)
//     )
//   ) {
//     return maxDateMessage;
//   }

//   if (
//     disableFuture &&
//     utils.isAfter(
//       parsedValue!,
//       getComparisonMaxDate(utils, utils.date()!, !!strictCompareDates)
//     )
//   ) {
//     return maxDateMessage;
//   }

//   if (
//     minDate &&
//     utils.isBefore(
//       parsedValue!,
//       getComparisonMinDate(utils, utils.date(minDate)!, !!strictCompareDates)
//     )
//   ) {
//     return minDateMessage;
//   }

//   if (
//     disablePast &&
//     utils.isBefore(
//       parsedValue!,
//       getComparisonMinDate(utils, utils.date()!, !!strictCompareDates)
//     )
//   ) {
//     return minDateMessage;
//   }

//   return undefined;
// }

// function usePickerState(
//   props: BasePickerProps,
//   parsedInputValue: any,
//   validateInputValue: any
// ) {
//   const {
//     // autoOk,
//     inputFormat,
//     // disabled,
//     // readOnly,
//     // onAccept,
//     // onChange,
//     // onError,
//     value,
//   } = props;

//   if (!inputFormat) {
//     throw new Error('inputFormat prop is required');
//   }

//   const now = useNow();
//   const utils = useDateUtils();
//   const date = parsedInputValue(now, utils, props);

//   return {
//     // pickerProps,
//     // inputProps,
//     // wrapperProps
//   };
// }

function useDefaultProps({
  openToView = 'date',
  views = ['year', 'date'],
}: DatePickerProps) {
  return {
    ...datePickerDefaultProps,
    views,
    openToView,
    mask: '__/__/____',
    // TODO:
    // inputFormat:
  };
}

// Entry level component rendering different styles (like Button).
// It should not concern about the picker state. That should ve in the picker
function DatePicker(props: DatePickerProps) {
  const defaultProps = useDefaultProps(props);
  const allProps = { ...defaultProps, ...props };

  const { day } = usePickerController(allProps);

  // const {};
  // const r = usePickerState(
  //   {
  //     ...props,
  //     ...datePickerDefaultProps,
  //   },
  //   parsePickerInputValue,
  //   validateDateValue
  // );
  // const {

  // } = allProps;
  // console.log(allProps);
  const {
    views,
    openToView,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
  } = allProps;

  return (
    <StaticWrapper>
      <Picker
        day={day.value}
        onDayChange={day.onChange}
        views={views}
        openToView={openToView}
        minDate={minDate}
        maxDate={maxDate}
        disableFuture={disableFuture}
        disablePast={disablePast}
      />
    </StaticWrapper>
  );
}

export default DatePicker;
