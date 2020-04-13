import React from 'react';
import ButtonIcon from './ButtonIcon';
import SvgBell from '../icons/Bell';

export default {
  title: 'Buttons/Button',
  component: ButtonIcon,
};

export const Icon = () => (
  <>
    <div>
      <ButtonIcon color="primary" variant="contained">
        <SvgBell />
      </ButtonIcon>
      <ButtonIcon color="secondary" variant="contained">
        <SvgBell />
      </ButtonIcon>
      <ButtonIcon color="danger" variant="contained">
        <SvgBell />
      </ButtonIcon>
    </div>
    <div>
      <ButtonIcon color="primary">
        <SvgBell />
      </ButtonIcon>
      <ButtonIcon color="secondary">
        <SvgBell />
      </ButtonIcon>
      <ButtonIcon color="danger">
        <SvgBell />
      </ButtonIcon>
    </div>
  </>
);
