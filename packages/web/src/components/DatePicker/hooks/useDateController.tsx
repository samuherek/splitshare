import React from 'react';
import { PickerDate, useDateUtils, useNow } from '../context/DateUtilsProvider';
import { parseInputValue } from '../utils/date-utils';

export type ParsableDate =
  | string
  | number
  | Date
  | null
  | undefined
  | PickerDate;

type Options = {
  value: ParsableDate;
  onChange: (nextVal: any) => void;
};

function useDateController({ value, onChange }: Options) {
  const now = useNow();
  const utils = useDateUtils();

  const [dayValue, setDayValue] = React.useState(() => {
    return parseInputValue(utils, { value, fallback: now! });
  });

  const handleDayChange = React.useCallback(
    (nextDate: PickerDate) => {
      setDayValue(nextDate);
      if (onChange) {
        onChange(utils.toJsDate(nextDate));
      }
    },
    [setDayValue, onChange, utils]
  );

  return {
    day: {
      value: dayValue,
      onChange: handleDayChange,
    },
  };
}

export default useDateController;
