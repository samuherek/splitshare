import React from 'react';

type Options = {
  comment?: string;
};

function useReceiptCommentController({ comment = '' }: Options = {}) {
  const [commentValue, setCommentValue] = React.useState(comment);

  function handleSetCommentValue(ev: React.SyntheticEvent<HTMLInputElement>) {
    // @ts-ignore
    const { value } = ev.target;
    setCommentValue(value);
  }

  return {
    comment: {
      value: commentValue,
      onChange: handleSetCommentValue,
    },
  };
}

export default useReceiptCommentController;
