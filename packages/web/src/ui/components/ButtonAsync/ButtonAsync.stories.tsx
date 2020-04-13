import React from 'react';
import ButtonAsync from './ButtonAsync';

export default {
  title: 'Buttons/Button',
  component: ButtonAsync,
};

export const Async = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <ButtonAsync
        color="primary"
        variant="contained"
        loading={loading}
        onClick={() => setLoading(s => !s)}
      >
        Button
      </ButtonAsync>
    </>
  );
};
