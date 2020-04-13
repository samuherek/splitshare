import React from 'react';
import DialogTitle from './DialogTitle';

export default {
  title: 'Dialog/Title',
  component: DialogTitle,
};

export const Base = () => {
  return (
    <DialogTitle>
      <div>Dialog Title</div>
    </DialogTitle>
  );
};
