import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import ButtonIcon from '..//ui/components/ButtonIcon';
import SvgLongArrowLeftLight from '../components/icons/LongArrowLeftLight';
import Stepper from '../components/Stepper';
import Button from '../ui/theme/Button';
import FirstBill from './setup/FirstBill';
import FirstBillInvite from './setup/FirstBillInvite';
import FirstProfile from './setup/Profile';

type Props = RouteComponentProps & {
  '*'?: string;
};

const WrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderStyled = styled.div`
  padding: 24px;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  .ButtonIcon {
    position: absolute;
    left: 24px;
  }

  .Button {
    position: absolute;
    right: 24px;
  }
`;

function Setup({ navigate, ...props }: Props) {
  console.log(props);
  const activeIndex =
    props['*'] === ''
      ? 1
      : props['*'] === 'bill'
      ? 2
      : props['*']?.split('/')[1]
      ? 3
      : 0;

  return (
    <WrapStyled>
      <HeaderStyled>
        {activeIndex === 2 ? (
          <ButtonIcon onClick={() => navigate && navigate('')}>
            <SvgLongArrowLeftLight />
          </ButtonIcon>
        ) : null}
        <Stepper steps={3} active={activeIndex} />
        {activeIndex > 1 ? <Button>Skip</Button> : null}
      </HeaderStyled>
      <Router primary={false}>
        <FirstProfile path="/" />
        <FirstBill path="bill" />
        <FirstBillInvite path="bill/:id" />
      </Router>
    </WrapStyled>
  );
}

export default Setup;
