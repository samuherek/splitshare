import React from 'react';
import { storiesOf } from '@storybook/react';
// import styled from 'styled-components';
import TextField from './TextField';

const stories = storiesOf('Input', module);

stories.add('TextField', () => (
  <div>
    <TextField />
    <TextField placeholder="Placeholder" label="Label" />
  </div>
));
