import React from 'react';

type Options = {
  total?: string;
};

function useReceiptTotalController({ total = '0' }: Options = {}) {
  const [totalValue, setTotalValue] = React.useState<string>(total);

  function handleSetTotalValue(ev: React.SyntheticEvent<HTMLInputElement>) {
    // @ts-ignore
    const { value } = ev.target;
    setTotalValue(value);
  }

  return {
    total: {
      value: totalValue,
      onChange: handleSetTotalValue,
    },
  };
}

export default useReceiptTotalController;
