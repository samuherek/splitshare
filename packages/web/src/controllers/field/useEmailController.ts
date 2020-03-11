import React from 'react';

type Options = {
  email?: string;
};

function useEmailController({ email = '' }: Options = {}) {
  const [emailValue, setEmailValue] = React.useState(email);

  const handleEmailChange = React.useCallback(
    (ev: any) => {
      const { value } = ev.target;
      setEmailValue(value);
    },
    [setEmailValue]
  );

  return {
    email: {
      value: emailValue,
      onChange: handleEmailChange,
    },
  };
}

export default useEmailController;
