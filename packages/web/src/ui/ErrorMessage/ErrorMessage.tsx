import React from 'react';
import Snackbar from '../Snackbar';

interface Props {
  error: Error | { message: string };
  className?: string;
}

const ErrorMessage = ({ error, ...rest }: Props) => {
  const [open, setOpen] = React.useState(false);
  console.log(error);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={3000}
      message={error.message || 'An unknown error occurred'}
      {...rest}
    />
  );
};

export default ErrorMessage;
