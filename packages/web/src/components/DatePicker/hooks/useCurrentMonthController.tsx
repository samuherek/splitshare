import React from 'react';
import { PickerDate, useDateUtils } from '../context/DateUtilsProvider';

type Options = {
  day: PickerDate;
};

function useCurrentMonthController({ day }: Options) {
  const [monthValue, setMonthValue] = React.useState(day);

  const utils = useDateUtils();

  const handleMonthChange = React.useCallback(
    (nextDate: PickerDate) => {
      if (utils.isSameMonth(nextDate, monthValue)) {
        return;
      }
      setMonthValue(nextDate);
    },
    [monthValue, setMonthValue, utils]
  );

  return {
    currentMonth: {
      value: monthValue,
      onChange: handleMonthChange,
    },
  };
}

export default useCurrentMonthController;
