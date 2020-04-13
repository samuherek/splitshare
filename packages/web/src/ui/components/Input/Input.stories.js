import React from 'react';
import Input from './Input';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11Y } from '@storybook/addon-a11y';
import { WrapStyled } from '../../theme/Button/Button.stories';
import FormControl from '../FormControl/FormControl';
import InputAdornment from '../InputAdornment';

const stories = storiesOf('Input', module);
addDecorator(withA11Y);

stories.add('Overview', () => <div>To be done...</div>);

stories.add('InputBase', () => <div>To be done.</div>);

stories.add('Input', () => (
  <WrapStyled>
    <div>
      <p>Input outlined</p>
      <Input className="focused" value="Input value" />
      <Input placeholder="Input placeholder" />
      <Input disabled={true} placeholder="Input disabled" />
    </div>
    <div>
      <p>Textarea outlined</p>
      <Input
        className="focused"
        multiline={true}
        rows={6}
        value="Textarea value"
      />
      <Input multiline={true} rows={6} placeholder="Textarea placeholder" />
      <Input
        multiline={true}
        rows={6}
        disabled={true}
        placeholder="Textarea disabled"
      />
    </div>
  </WrapStyled>
));

stories.add('Input Adornment', () => (
  <WrapStyled>
    <FormControl>
      <Input
        placeholder="Start"
        startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
      />
    </FormControl>
    <FormControl>
      <Input
        placeholder="End"
        endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
      />
    </FormControl>
    <FormControl>
      <Input
        placeholder="start and end"
        startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
        endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
      />
    </FormControl>
  </WrapStyled>
));
