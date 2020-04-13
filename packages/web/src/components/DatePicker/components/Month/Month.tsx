import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../../../../ui/components/ButtonBase';
import { PickerDate, useDateUtils } from '../../context/DateUtilsProvider';

export interface MonthProps {
  day: PickerDate;
  month: PickerDate;
  onMonthChange: (nextDay: PickerDate) => void;
  disabled: boolean;
  selected: boolean;
  className?: string;
}

const classes = {
  root: 'Month',
  disabled: 'disabled',
  thisMonth: 'this-month',
  selected: 'selected',
};

const WrapStyled = styled.div`
  flex-basis: 33.33%;

  .Month {
    padding: 4px 8px;
    border-radius: 4px;

    &:hover,
    &:focus {
      background: #eee;
    }

    &.selected {
      color: #ffffff;
      background: #00aa00;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

function Month({
  day,
  month,
  onMonthChange,
  disabled,
  selected,
  className,
}: MonthProps) {
  const utils = useDateUtils();
  const monthNumber = utils.getMonth(month);

  const handleMonthChange = React.useCallback(
    (nextMonth: number) => {
      const nextDay = utils.setMonth(day, nextMonth);
      onMonthChange(nextDay);
    },
    [day, onMonthChange, utils]
  );

  return (
    <WrapStyled>
      <ButtonBase
        disabled={disabled}
        onClick={() => handleMonthChange(monthNumber)}
        className={clsx(className, classes.root, {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes.thisMonth]: false,
        })}
      >
        {utils.format(month, 'month')}
      </ButtonBase>
    </WrapStyled>
  );
}

export default Month;
