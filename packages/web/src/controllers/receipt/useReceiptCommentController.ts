import React from 'react';

type Options = {
  comment?: string;
};

function useReceiptCommentController({ comment = '' }: Options = {}) {
  const commentRef = React.useRef(comment);
  const [commentValue, setCommentValue] = React.useState(comment);

  function handleSetCommentValue(ev: React.SyntheticEvent<HTMLInputElement>) {
    // @ts-ignore
    const { value } = ev.target;
    setCommentValue(value);
  }

  React.useEffect(() => {
    if (commentRef.current !== comment) {
      commentRef.current = comment;
      setCommentValue(comment);
    }
  }, [comment]);

  return {
    comment: {
      value: commentValue,
      onChange: handleSetCommentValue,
      isChanged: comment !== commentValue,
    },
  };
}

export default useReceiptCommentController;
