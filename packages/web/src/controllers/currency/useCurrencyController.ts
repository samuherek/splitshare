import React from 'react';

type Options = {
  currency?: string;
};

function useCurrencyController({ currency = 'EUR' }: Options = {}) {
  const [currencyValue, setCurrencyValue] = React.useState(currency);

  const handleCurrencyChange = React.useCallback(
    (nextVal: string) => {
      setCurrencyValue(nextVal);
    },
    [setCurrencyValue]
  );

  return {
    currency: {
      value: currencyValue,
      onChange: handleCurrencyChange,
    },
  };
}

export default useCurrencyController;
