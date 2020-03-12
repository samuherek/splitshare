// @flow
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  children?: any;
};

export const classes = {
  root: 'DialogActions',
};

const WrapStyled = styled.div`
  display: flex;
  padding: 8px 24px 24px;
  align-items: center;
`;

function DialogActions({ className, ...props }: Props) {
  return <WrapStyled className={clsx(className, classes.root)} {...props} />;
}

export default DialogActions;
