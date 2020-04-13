import React from 'react';
import styled from 'styled-components';
import ButtonBase from '../../../../ui/components/ButtonBase';
import { PickerDate, useDateUtils } from '../../context/DateUtilsProvider';
import { AnyPickerView } from '../../typings/SharedPickerProps';

type Props = {
  date: PickerDate;
  onViewChange: (nextView: AnyPickerView) => void;
};

const WrapStyled = styled.div`
  padding: 12px;
`;

function Toolbar({ date, onViewChange }: Props) {
  const utils = useDateUtils();

  return (
    <WrapStyled>
      <ButtonBase onClick={() => onViewChange('date')}>
        {utils.format(date, 'dayOfMonth')}
      </ButtonBase>
      <ButtonBase onClick={() => onViewChange('month')}>
        {utils.format(date, 'month')}
      </ButtonBase>
      <ButtonBase onClick={() => onViewChange('year')}>
        {utils.format(date, 'year')}
      </ButtonBase>
    </WrapStyled>
  );
}

export default Toolbar;
