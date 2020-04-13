import React from 'react';
import Portal from './Portal';

export default {
  title: 'Utils/Portal',
  component: Portal,
};

export const Base = () => {
  return (
    <Portal>
      <div>foo</div>
    </Portal>
  );
};
