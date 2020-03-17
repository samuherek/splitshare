import { DateUtils, PickerDate } from '../context/DateUtilsProvider';

export interface BaseValidationProps {
  invalidDateMessage?: React.ReactNode;
}

export interface DateValidationProps extends BaseValidationProps {
  minDateMessage?: React.ReactNode;
  maxDateMessage?: React.ReactNode;
  strictCompareDates?: boolean;
}

export function getComparisonMaxDate(
  utils: DateUtils,
  date: PickerDate,
  strict: boolean
) {
  return strict ? date : utils.endOfDay(date);
}

export function getComparisonMinDate(
  utils: DateUtils,
  date: PickerDate,
  strict: boolean
) {
  return strict ? date : utils.startOfDay(date);
}
