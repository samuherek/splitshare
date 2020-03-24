import React from 'react';

type Options = {
  id?: string | null;
};

function useReceiptPayerController({ id = null }: Options = {}) {
  const payerRef = React.useRef(id);
  const [idValue, setIdValue] = React.useState<string | null>(id);

  function handleSetPayerId(nextId: string | null) {
    setIdValue(nextId);
  }

  React.useEffect(() => {
    if (payerRef.current !== id) {
      payerRef.current = id;
      setIdValue(id);
    }
  }, [id]);

  return {
    id: {
      value: idValue,
      onChange: handleSetPayerId,
      isChanged: id !== idValue,
    },
  };
}

export default useReceiptPayerController;
