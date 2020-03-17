import React from 'react';

type Options = {
  title?: string;
};

function useReceiptTitleController({ title = '' }: Options = {}) {
  const [titleValue, setTitleValue] = React.useState(title);

  function handleSetTitleValue(ev: React.SyntheticEvent<HTMLInputElement>) {
    // @ts-ignore
    const { value } = ev.target;
    setTitleValue(value);
  }

  return {
    title: {
      value: titleValue,
      onChange: handleSetTitleValue,
    },
  };
}

export default useReceiptTitleController;
