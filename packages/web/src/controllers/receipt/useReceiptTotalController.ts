import React from 'react';
import { useRifm } from 'rifm';
import { formatFloatingPointNumber, parseNumber } from '../../utils/rifm';

type Options = {
  total?: number | string;
};

function useReceiptTotalController({ total = 0 }: Options = {}) {
  const totalRef = React.useRef(total);
  const [totalValue, setTotalValue] = React.useState<string>(String(total));

  const { value, onChange } = useRifm({
    value: totalValue,
    onChange: setTotalValue,
    accept: /[\d.]+/g,
    format: (str: string) => formatFloatingPointNumber(str, 2),
  });

  React.useEffect(() => {
    if (totalRef.current !== total) {
      totalRef.current = total;
      setTotalValue(String(total));
    }
  }, [total]);

  const parsedValue = parseFloat(parseNumber(totalValue)) || 0;

  return {
    total: {
      value,
      parsedValue,
      onChange,
      isChanged: total !== parsedValue,
    },
  };
}

export default useReceiptTotalController;
