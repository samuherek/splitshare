// @flow
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import Fade from '../../transitions/Fade';
import { BackdropProps } from './types.d';

export const classes = {
  root: 'Backdrop',
};

const BackdropStyled = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  position: fixed;
  touch-action: none;
`;

export const BackdropLight = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(255,255,255,0.75)'};
`;

export const BackdropDark = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(50,50,50,0.65)'};
`;

const Backdrop = React.forwardRef<any, BackdropProps>((props, ref) => {
  const {
    open,
    transitionDuration,
    invisible = false,
    className,
    ...rest
  } = props;

  return (
    <Fade in={open} timeout={transitionDuration} {...rest}>
      <BackdropStyled
        as={BackdropDark}
        className={clsx(className, classes.root)}
        aria-hidden
        // @ts-ignore
        invisible={invisible}
      />
    </Fade>
  );
});

export default Backdrop;
