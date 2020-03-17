import { PickerDate } from '../context/DateUtilsProvider';
import { BasePickerProps } from '../typings/BasePicker';
import useDateController, { ParsableDate } from './useDateController';

function usePickerController({
  value,
  onChange,
}: BasePickerProps<ParsableDate, PickerDate>) {
  const { day } = useDateController({ value, onChange });

  return {
    day,
  };
}

export default usePickerController;
