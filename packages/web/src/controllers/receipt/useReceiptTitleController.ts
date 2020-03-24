import React from 'react';

type Options = {
  title?: string;
};

function useReceiptTitleController({ title = '' }: Options = {}) {
  const titleRef = React.useRef(title);
  const [titleValue, setTitleValue] = React.useState(title);

  function handleSetTitleValue(ev: React.SyntheticEvent<HTMLInputElement>) {
    // @ts-ignore
    const { value } = ev.target;
    setTitleValue(value);
  }

  React.useEffect(() => {
    if (titleRef.current !== title) {
      titleRef.current = title;
      setTitleValue(title);
    }
  }, [title]);

  return {
    title: {
      value: titleValue,
      onChange: handleSetTitleValue,
      isChanged: title !== titleValue,
    },
  };
}

export default useReceiptTitleController;
