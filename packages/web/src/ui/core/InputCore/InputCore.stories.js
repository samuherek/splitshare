import React from 'react';
import InputBase from './InputBase';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11Y } from '@storybook/addon-a11y';

const stories = storiesOf('Input/InputBase', module);
addDecorator(withA11Y);

stories.add('Overview', () => (
  <InputBase placeholder="Input Base" fullWidth={true} />
));
