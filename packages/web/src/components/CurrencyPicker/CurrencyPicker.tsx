import React from 'react';
import currencies from '../../libs/currencies.json';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function CurrencyPicker({ value, onChange }: Props) {
  return (
    <>
      <span>Currency</span>
      <select value={value} onChange={(ev: any) => onChange(ev.target.value)}>
        {Object.keys(currencies).map((key: any) => {
          // @ts-ignore
          const c = currencies[key];
          return (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default CurrencyPicker;
