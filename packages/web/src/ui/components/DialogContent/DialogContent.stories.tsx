import React from 'react';
import DialogContent from './DialogContent';

export default {
  title: 'Dialog/Content',
  component: DialogContent,
};

export const Base = () => {
  return (
    <DialogContent>
      <div>Dialog Content</div>
    </DialogContent>
  );
};
