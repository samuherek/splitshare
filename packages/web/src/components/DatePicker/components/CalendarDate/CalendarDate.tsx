import capitalize from 'capitalize';
import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../../../../ui/components/ButtonBase';
import Typography from '../../../../ui/components/Typography';
import {
  PickerDate,
  useDateUtils,
  useNow,
} from '../../context/DateUtilsProvider';
import useCurrentMonthController from '../../hooks/useCurrentMonthController';
import useValidateMinMaxDate from '../../hooks/useValidateMinMaxDate';
import Day from '../Day';

type Props = {
  day: PickerDate;
  onDayChange: (nextVal: PickerDate) => void;
  minDay: PickerDate;
  maxDay: PickerDate;
  disableFuture?: boolean;
  disablePast?: boolean;
};

const HeaderWeekStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

type Options = {
  day: PickerDate;
};

function useCalendarController({ day }: Options) {
  const utils = useDateUtils();
  const { currentMonth } = useCurrentMonthController({ day });

  const handlePreviousMonthChange = React.useCallback(() => {
    currentMonth.onChange(utils.getPreviousMonth(currentMonth.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth.onChange, utils]);

  const handleNextMonthChange = React.useCallback(() => {
    currentMonth.onChange(utils.getNextMonth(currentMonth.value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth.onChange, utils]);

  return {
    currentMonth,
    onPreviousMonthChange: handlePreviousMonthChange,
    onNextMonthChange: handleNextMonthChange,
  };
}

function CalendarDate({
  day,
  onDayChange,
  minDay,
  maxDay,
  disableFuture = false,
  disablePast = false,
}: Props) {
  const utils = useDateUtils();
  const now = useNow();

  const {
    currentMonth,
    onPreviousMonthChange,
    onNextMonthChange,
  } = useCalendarController({
    day: utils.startOfMonth(day),
  });

  const isDayDisabled = useValidateMinMaxDate({
    disableFuture,
    disablePast,
    minDay,
    maxDay,
    now,
  });

  const selectedDate = utils.startOfDay(day);
  const currentMonthNumber = utils.getMonth(currentMonth.value);

  return (
    <>
      <div
        style={{
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ButtonBase
          onClick={onPreviousMonthChange}
          disabled={isDayDisabled(utils.startOfMonth(currentMonth.value))}
        >
          {'<'}
        </ButtonBase>
        <span>{utils.format(currentMonth.value, 'month')}</span>
        <ButtonBase
          onClick={onNextMonthChange}
          disabled={isDayDisabled(utils.endOfMonth(currentMonth.value))}
        >
          {'>'}
        </ButtonBase>
      </div>
      <HeaderWeekStyled>
        {utils.getWeekdays().map((day, i) => (
          <Typography
            aria-hidden
            component="span"
            key={day + i.toString()}
            children={capitalize(day)}
          />
        ))}
      </HeaderWeekStyled>
      <div>
        {utils.getWeekArray(currentMonth.value).map((week) => (
          <div
            key={`week-${week[0].toString()}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            {week.map((weekDay) => {
              const disabled = isDayDisabled(weekDay);
              const isDayInCurrentMonth =
                utils.getMonth(weekDay) === currentMonthNumber;

              return (
                <Day
                  key={`day-${weekDay.toString()}`}
                  day={weekDay}
                  isToday={utils.isSameDay(weekDay, now)}
                  selected={utils.isSameDay(weekDay, selectedDate)}
                  onSelect={onDayChange}
                  hidden={!isDayInCurrentMonth}
                  disabled={disabled}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarDate;
