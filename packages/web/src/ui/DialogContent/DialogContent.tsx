// @flow
import clsx from "clsx";
import React from "react";
import styled from "styled-components";

type Props = {
  className?: string;
  children?: any;
};

export const classes = {
  root: `DialogContent`
};

const WrapStyled = styled.div`
  flex: 1 1 auto;
  padding: 8px 24px;
  overflow-y: auto;
  /* WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling. */
`;

function DialogContent({ className, ...props }: Props) {
  return <WrapStyled className={clsx(className, classes.root)} {...props} />;
}

export default DialogContent;
