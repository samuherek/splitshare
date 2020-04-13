import React from 'react';
import Backdrop from './Backdrop';

export default {
  title: 'Misc/Backdrop',
  component: Backdrop,
};

export const Base = () => {
  return (
    <>
      <div>Some content behind the backdrop</div>
      <Backdrop open={true} />
    </>
  );
};
