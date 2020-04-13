import React from 'react';
import Button from '../../theme/Button';
import { Bell } from '../icons';
import ButtonAdornment from './ButtonAdornment';

export default {
  title: 'Buttons/Button',
  component: ButtonAdornment,
};

export const Adornment = () => (
  <>
    <Button
      color="primary"
      variant="contained"
      startAdornment={
        <ButtonAdornment position="start">
          <Bell />
        </ButtonAdornment>
      }
    >
      Start
    </Button>
    <Button
      color="primary"
      variant="contained"
      endAdornment={
        <ButtonAdornment position="end">
          <Bell />
        </ButtonAdornment>
      }
    >
      End
    </Button>
  </>
);
