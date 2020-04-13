import React from 'react';
import Modal from './Modal';

export default {
  title: 'Utils/Modal',
  component: Modal,
};

export const Base = () => {
  return (
    <Modal open={true}>
      <div>Foo</div>
    </Modal>
  );
};
