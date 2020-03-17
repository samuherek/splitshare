import React from 'react';
import styled from 'styled-components';
import {
  PickerDate,
  useDateUtils,
  useNow,
} from '../../context/DateUtilsProvider';
import useValidateMinMaxMonth from '../../hooks/useValidateMinMaxMonth';
import Month from '../Month';

export interface MonthSelectionProps {
  day: PickerDate;
  onMonthChange: (nextDay: PickerDate) => void;
  minDay: PickerDate;
  maxDay: PickerDate;
  disableFuture: boolean;
  disablePast: boolean;
}

const WrapStyled = styled.div`
  width: 360px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  .ButtonBase {
    flex-basis: 33.33%;
  }
`;

function CalendarMonth({
  day,
  onMonthChange,
  minDay,
  maxDay,
  disableFuture,
  disablePast,
}: MonthSelectionProps) {
  const utils = useDateUtils();
  const now = useNow();
  const currentMonth = utils.getMonth(day);

  const isMonthDisabled = useValidateMinMaxMonth({
    disableFuture,
    disablePast,
    minDay,
    maxDay,
    now,
  });

  return (
    <WrapStyled>
      {utils.getMonthArray(day).map(month => {
        const monthNumber = utils.getMonth(month);
        const selected = monthNumber === currentMonth;
        const disabled = isMonthDisabled(month);

        return (
          <Month
            day={day}
            month={month}
            selected={selected}
            disabled={disabled}
            key={utils.format(month, 'month')}
            onMonthChange={onMonthChange}
          />
        );
      })}
    </WrapStyled>
  );
}

export default CalendarMonth;
