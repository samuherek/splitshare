import React from 'react';
import Menu from './Menu';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11Y } from '@storybook/addon-a11y';
import MenuItem from '../MenuItem';
import Button from '../../theme/Button';

const stories = storiesOf('Navigation/Menu', module);
addDecorator(withA11Y);

stories.add('Overview', () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
});
