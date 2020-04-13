// @flow
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import Fade from '../Fade';
import { BackdropDark, BackdropLight } from './styles';

interface Props {
  isOpen: boolean;
  duration: number;
  onClick?: (ev: SyntheticEvent<HTMLElement>) => void;
  invisible?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

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

const variantComponent = {
  light: BackdropLight,
  dark: BackdropDark,
};

const Backdrop = React.forwardRef<Props, any>((props, ref) => {
  const {
    isOpen,
    duration,
    onClick,
    invisible = false,
    variant = 'dark',
    className,
    ...rest
  } = props;

  // @ts-ignore
  const Component = variantComponent[variant];

  return (
    <Fade in={isOpen} duration={duration} {...rest}>
      <BackdropStyled
        as={Component}
        className={clsx(className, classes.root)}
        aria-hidden
        // @ts-ignore
        invisible={invisible}
        onClick={onClick}
      />
    </Fade>
  );
});

export default Backdrop;
