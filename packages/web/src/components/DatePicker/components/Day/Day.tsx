import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../../../../ui/components/ButtonBase';
import { PickerDate, useDateUtils } from '../../context/DateUtilsProvider';

type Props = {
  day: PickerDate;
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  isToday?: boolean;
  hidden: boolean;
  onSelect: (date: PickerDate) => void;
};

const classes = {
  root: 'Day',
  disabled: 'disabled',
  today: 'today',
  selected: 'selected',
  hidden: 'hidden',
};

const WrapStyled = styled.div`
  .Day {
    width: 36px;
    height: 36px;
    margin: 0 2px;
    border-radius: 36px;

    &:hover,
    &:focus {
      background: #eee;
    }

    &.today {
      /* color: var(--day-active); */
      color: #aaa;
      border: 1px solid #eee;
    }

    &.selected {
      color: #ffffff;
      background: #00aa00;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

function Day({
  day,
  className,
  disabled,
  selected,
  isToday,
  onSelect,
  hidden,
}: Props) {
  const utils = useDateUtils();

  function handleSelection() {
    if (!disabled) {
      onSelect(day);
    }
  }

  return (
    <WrapStyled role="presentation">
      <ButtonBase
        disabled={disabled}
        className={clsx(className, classes.root, {
          [classes.selected]: selected,
          [classes.today]: isToday,
          [classes.disabled]: disabled,
          [classes.hidden]: hidden,
        })}
        onClick={handleSelection}
      >
        {utils.format(day, 'dayOfMonth')}
      </ButtonBase>
    </WrapStyled>
  );
}

export default Day;
