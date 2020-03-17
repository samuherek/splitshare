import { IDateUtils } from '../adapters/types';
import { DatePickerView } from '../components/DatePicker/DatePicker';
import { DateUtils, PickerDate } from '../context/DateUtilsProvider';
import { BasePickerProps } from '../typings/BasePicker';

export function isYearOnlyView(views: readonly DatePickerView[]) {
  return views.length === 1 && views[0] === 'year';
}

export function isYearAndMonthViews(views: readonly DatePickerView[]) {
  return (
    views.length === 2 && views.includes('year') && views.includes('month')
  );
}

export function getFormatByViews(
  views: readonly DatePickerView[],
  utils: IDateUtils<PickerDate>
) {
  if (isYearOnlyView(views)) {
    return utils.formats.year;
  }

  if (isYearAndMonthViews(views)) {
    return utils.formats.monthAndYear;
  }

  return utils.formats.keyboardDate;
}

type ParseInputOptions = Pick<BasePickerProps, 'value' | 'defaultHighlight'> & {
  fallback: PickerDate;
};

export function parseInputValue(
  utils: DateUtils,
  { value, fallback }: ParseInputOptions
) {
  // const parsedValue = utils.date(value || defaultHighlight || now);
  const parsedValue = utils.date(value || fallback);
  return parsedValue && utils.isValid(parsedValue) ? parsedValue : fallback;
}
