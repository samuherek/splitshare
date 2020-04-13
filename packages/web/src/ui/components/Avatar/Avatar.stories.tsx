import React from 'react';
import Avatar from './Avatar';
import { Bell } from '../icons';

export default {
  title: 'Avatar/Avatar',
  component: Avatar,
};

export const Circle = () => (
  <>
    <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/profile-img.jpg" />
    <Avatar style={{ background: '#FE4179', color: 'white' }}>MH</Avatar>
    <Avatar style={{ background: '#1F9DF8', color: 'white' }}>MD</Avatar>
    <Avatar style={{ background: 'var(--greenTeal)', color: 'white' }}>
      <Bell />
    </Avatar>
  </>
);

export const Square = () => (
  <>
    <Avatar
      variant="square"
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/252775/profile-img.jpg"
    />
    <Avatar svariant="square" style={{ background: '#FE4179', color: 'white' }}>
      MH
    </Avatar>
    <Avatar variant="square" style={{ background: '#1F9DF8', color: 'white' }}>
      MD
    </Avatar>
    <Avatar
      variant="square"
      style={{ background: 'var(--greenTeal)', color: 'white' }}
    >
      <Bell />
    </Avatar>
  </>
);
