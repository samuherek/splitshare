import { useDateUtils } from '../context/DateUtilsProvider';
import { ParsableDate } from './useDateController';

type Options = {
  value: ParsableDate;
  inputFormat: string;
};

function useInputValueController({ value, inputFormat }: Options) {
  const utils = useDateUtils();

  const day = utils.date(value);
  const isEmpty = value === null;

  if (isEmpty || day === null) {
    return 'Pick a day';
  }

  return utils.isValid(day) ? utils.formatByString(day, inputFormat) : '';
}

export default useInputValueController;
