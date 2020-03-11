import React from 'react';

type Options = {
  name?: string
}

function useBillNameController({ name = ''}: Options = {}) {
  const [nameValue, setNameValue] = React.useState(name);

  const handleNameChange = React.useCallback(
    (ev: any) => {
      const { value } = ev.target;
      setNameValue(value);
    },
    [setNameValue]
  );

  return {
    name: {
      value: nameValue,
      onChange: handleNameChange,
    },
  };
}

export default useBillNameController;
