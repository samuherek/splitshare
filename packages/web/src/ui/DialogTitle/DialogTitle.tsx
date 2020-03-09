// @flow
import clsx from "clsx";
import React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  children?: any;
};

export const classes = {
  root: "DialogTitle"
};

const WrapStyled = styled.div`
  flex: 0 0 auto;
  margin: 0;
  padding: 16px 24px 8px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    line-height: 1.2;
  }
`;

function DialogTitle({ className, ...props }: Props) {
  return <WrapStyled className={clsx(className, classes.root)} {...props} />;
}

export default DialogTitle;
