import React from 'react';

type Options = {
  id?: string | null;
};

function useReceiptPayerController({ id = null }: Options = {}) {
  const [idValue, setIdValue] = React.useState<string | null>(id);

  function handleSetPayerId(nextId: string | null) {
    setIdValue(nextId);
  }

  return {
    id: {
      value: idValue,
      onChange: handleSetPayerId,
    },
  };
}

export default useReceiptPayerController;
