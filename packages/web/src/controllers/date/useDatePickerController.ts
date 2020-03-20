import dayjs from 'dayjs';
import React from 'react';
import { ParsableDate } from '../../components/DatePicker/hooks/useDateController';
import { djsAnchors } from '../../utils/date';

type Options = {
  date?: Date | string;
};

// TODO: use global dayjs from DatePicker date.
function useDatePickerController({
  date = djsAnchors.today.toDate(),
}: Options = {}) {
  const [dateValue, setDateValue] = React.useState<Date | null>(
    dayjs(date).toDate()
  );

  function handleDateChange(nextDate: ParsableDate) {
    setDateValue(nextDate === null ? null : dayjs(nextDate).toDate());
  }

  return {
    date: {
      value: dateValue,
      onChange: handleDateChange,
    },
  };
}

export default useDatePickerController;
