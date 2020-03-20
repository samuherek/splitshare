import React from 'react';
import {
  DateUtils,
  PickerDate,
  useDateUtils,
  useNow,
} from '../../context/DateUtilsProvider';
import { ParsableDate } from '../../hooks/useDateController';
import useViewController from '../../hooks/useViewController';
import { BasePickerProps } from '../../typings/BasePicker';
import { AnyPickerView, WithViewProps } from '../../typings/SharedPickerProps';
import CalendarDate from '../CalendarDate';
import CalendarMonth from '../CalendarMonth';
import CalendarYear from '../CalendarYear';
import Toolbar from '../Toolbar';

export interface PickerProps<
  TView extends AnyPickerView,
  TInputValue = ParsableDate,
  TDateValue = PickerDate
> extends Omit<BasePickerProps, 'value' | 'onChange'>, WithViewProps<TView> {
  day: TDateValue;
  onDayChange: (nextVal: PickerDate) => void;
  minDate?: TInputValue;
  maxDate?: TInputValue;
  disableFuture?: boolean;
  disablePast?: boolean;
}

// export type DatePickerView = 'year' | 'date' | 'month';

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

function parseDate(
  utils: DateUtils,
  date: ParsableDate,
  fallback?: PickerDate
) {
  return utils.date(date || fallback);
}

function getAnchorYear(
  utils: DateUtils,
  now: PickerDate,
  limitDay: PickerDate,
  disableOutside: boolean
) {
  const anchorDay = disableOutside ? now : limitDay;
  return utils.date(anchorDay)!;
}

const defaultMinDate = new Date('1900-01-01');
const defaultMaxDate = new Date('2100-01-01');

function Picker({
  day,
  onDayChange,
  openToView = 'date',
  views = ['year', 'date'],
  minDate: unparsedMinDate = defaultMinDate,
  maxDate: unparsedMaxDate = defaultMaxDate,
  disableFuture = false,
  disablePast = false,
}: PickerProps<AnyPickerView>) {
  const { view } = useViewController({ views, openToView, onDayChange });
  const utils = useDateUtils();
  const now = useNow();

  // TODO: check if this can ever fail!!!
  const minDay = parseDate(utils, unparsedMinDate)!;
  const maxDay = parseDate(utils, unparsedMaxDate)!;

  const startYear = getAnchorYear(utils, now, minDay, disablePast);
  const endYear = getAnchorYear(utils, now, maxDay, disableFuture);

  return (
    <>
      <Toolbar date={day} onViewChange={view.onChange} />
      {view.value === 'year' ? (
        <CalendarYear
          day={day}
          onYearChange={view.onDayChangeAndNext}
          minYear={startYear}
          maxYear={endYear}
        />
      ) : null}
      {view.value === 'month' ? (
        <CalendarMonth
          day={day}
          onMonthChange={view.onDayChangeAndNext}
          minDay={minDay}
          maxDay={maxDay}
          disableFuture={disableFuture}
          disablePast={disablePast}
        />
      ) : null}
      {view.value === 'date' ? (
        <CalendarDate
          day={day}
          onDayChange={onDayChange}
          minDay={minDay}
          maxDay={maxDay}
          disableFuture={disableFuture}
          disablePast={disablePast}
        />
      ) : null}
    </>
  );

  // return (
  //   <Wrapper {...rest}>
  //     <TextField
  //       onClick={() => setOpen(s => !s)}
  //       // value={inputValue}
  //       // {...inputProps}
  //     />
  //     <Modal isOpen={open} onClose={() => setOpen(false)}>
  //       <Grow appear in={open}>
  //         <PaperStyled>
  //           <span>Here</span>
  //           <div>
  //             <Calendar />
  //           </div>
  //         </PaperStyled>
  //       </Grow>
  //     </Modal>
  //   </Wrapper>
  // );
}

export default Picker;
