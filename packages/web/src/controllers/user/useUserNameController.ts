import React from 'react';

type Props = {
  firstName?: string;
  lastName?: string;
};

function useUserNameController({ firstName = '', lastName = '' }: Props = {}) {
  const initialState = React.useMemo(() => ({ firstName, lastName }), [
    firstName,
    lastName,
  ]);

  const [firstValue, setFirstValue] = React.useState<string>(firstName);
  const [lastValue, setLastValue] = React.useState<string>(lastName);

  const handleFirstFormChange = React.useCallback(
    (ev: any) => {
      const { value } = ev.target;
      setFirstValue(value);
    },
    [setFirstValue]
  );

  const handleLastFormChange = React.useCallback(
    (ev: any) => {
      const { value } = ev.target;
      setLastValue(value);
    },
    [setLastValue]
  );

  const reset = React.useCallback(() => {
    setFirstValue(initialState.firstName);
    setLastValue(initialState.lastName);
  }, [initialState, setFirstValue, setLastValue]);

  return {
    firstName: {
      value: firstValue,
      onChange: handleFirstFormChange,
    },
    lastName: {
      value: lastValue,
      onChange: handleLastFormChange,
    },
    reset,
  };
}

export default useUserNameController;
