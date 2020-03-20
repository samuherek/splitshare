import React from 'react';
import { useRifm } from 'rifm';
import { formatFloatingPointNumber, parseNumber } from '../../utils/rifm';

type Options = {
  total?: number | string;
};

function useReceiptTotalController({ total = 0 }: Options = {}) {
  const [totalValue, setTotalValue] = React.useState<string>(String(total));

  const { value, onChange } = useRifm({
    value: totalValue,
    onChange: setTotalValue,
    accept: /[\d.]+/g,
    format: (str: string) => formatFloatingPointNumber(str, 2),
  });

  return {
    total: {
      value,
      parsedValue: parseFloat(parseNumber(totalValue)) || 0,
      onChange,
    },
  };
}

export default useReceiptTotalController;
