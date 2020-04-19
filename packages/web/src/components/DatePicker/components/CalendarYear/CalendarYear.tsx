import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../../../../ui/components/ButtonBase';
import { PickerDate, useDateUtils } from '../../context/DateUtilsProvider';

export interface CalendarYearProps {
  day: PickerDate;
  minYear: PickerDate;
  maxYear: PickerDate;
  onYearChange: (nextDate: PickerDate) => void;
  className?: string;
}

export const classes = {
  root: 'CalendarYear',
};

const WrapStyled = styled.div`
  height: 300px;
  overflow-y: auto;

  .ButtonBase {
    height: 40px;
    display: flex;
    outline: none;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
`;

function CalendarYear({
  day,
  minYear,
  maxYear,
  onYearChange,
  className,
}: CalendarYearProps) {
  const utils = useDateUtils();
  const currentYear = utils.getYear(day);
  const selectedYearRef = React.useRef<HTMLButtonElement>(null);

  const handleYearChange = React.useCallback(
    (year: number) => {
      const nextDay = utils.setYear(day, year);
      onYearChange(nextDay);
    },
    [day, onYearChange, utils]
  );

  React.useEffect(() => {
    if (selectedYearRef.current?.scrollIntoView) {
      // selectedYearRef.current.scrollIntoView(true);
    }
  }, []);

  return (
    <WrapStyled className={clsx(className, classes.root)}>
      {utils.getYearRange(minYear, maxYear).map((year) => {
        const yearNumber = utils.getYear(year);
        const selected = yearNumber === currentYear;
        const yearText = utils.format(year, 'year');

        return (
          <ButtonBase
            key={yearText}
            // @ts-ignore
            ref={selectedYearRef}
            onClick={() => handleYearChange(yearNumber)}
            style={{
              color: selected ? 'green' : 'inherit',
              fontSize: selected ? 24 : 'inherit',
            }}
          >
            {yearText}
          </ButtonBase>
        );
      })}
    </WrapStyled>
  );
}

export default CalendarYear;
