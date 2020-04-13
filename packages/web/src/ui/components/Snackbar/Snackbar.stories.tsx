import React from 'react';
import Snackbar from './Snackbar';

export default {
  title: 'Feedback/Snackbar',
  component: Snackbar,
};

export const Base = () => {
  return (
    <Snackbar open={true}>
      <div>Foo</div>
    </Snackbar>
  );
};
