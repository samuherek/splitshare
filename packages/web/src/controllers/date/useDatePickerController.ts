import React from 'react';
import { ParsableDate } from '../../components/DatePicker/hooks/useDateController';
import useDateNow from '../../hooks/useDateNow';
import { useDateUtils } from '../../libs/date-utils';

type Options = {
  date?: Date | string;
};

function useDatePickerController({ date }: Options = {}) {
  const dateUtils = useDateUtils();
  const now = useDateNow();

  const [dateValue, setDateValue] = React.useState<Date | null>(
    dateUtils.toJsDate(dateUtils.date(date || now))
  );

  function handleDateChange(nextDate: ParsableDate) {
    setDateValue(
      nextDate === null ? null : dateUtils.toJsDate(dateUtils.date(nextDate))
    );
  }

  React.useEffect(() => {
    setDateValue(dateUtils.toJsDate(dateUtils.date(date || now)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return {
    date: {
      value: dateValue,
      onChange: handleDateChange,
      isChanged: !dateUtils.isEqual(date, dateValue),
    },
  };
}

export default useDatePickerController;
