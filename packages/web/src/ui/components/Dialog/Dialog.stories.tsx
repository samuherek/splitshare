import React from 'react';
import Dialog from './Dialog';

export default {
  title: 'Dialog/Dialog',
  component: Dialog,
};

export const Base = () => {
  return (
    <Dialog isOpen={true}>
      <div>Foo</div>
    </Dialog>
  );
};
