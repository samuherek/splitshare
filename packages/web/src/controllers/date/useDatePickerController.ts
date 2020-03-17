import dayjs from 'dayjs';
import React from 'react';
import { djsAnchors } from '../../utils/date';

type Options = {
  date?: Date | string;
};

function useDatePickerController({
  date = djsAnchors.today.toDate(),
}: Options = {}) {
  const [dateValue, setDateValue] = React.useState<Date>(dayjs(date).toDate());

  function handleDateChange(nextDate: Date) {
    setDateValue(nextDate);
  }

  return {
    date: {
      value: dateValue,
      onChange: handleDateChange,
    },
  };
}

export default useDatePickerController;
