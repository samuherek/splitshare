import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ButtonBase from './ButtonBase';

export default {
  title: 'Buttons/Button',
  component: ButtonBase,
};

export const Base = () => (
  <ButtonBase
    disabled={boolean('disabled', false)}
    onClick={action('Base button clicked')}
  >
    Button Base
  </ButtonBase>
);
