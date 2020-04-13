import { Link } from '@reach/router';
import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../core/types';

export interface ButtonBaseProps extends BaseProps {
  onClick?: any;
  component?: React.ReactNode;
  to?: string;
  disabled?: boolean;
  tabIndex?: string | number;
  href?: string;
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const classes = {
  root: 'ButtonBase',
};

const ButtonBaseStyled = styled.button`
  color: inherit;
  cursor: pointer;
  margin: 0;
  border: 0;
  display: inline-flex;
  position: relative;
  user-select: none;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  font: inherit;
  padding: 0;
  outline: none;

  &:disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled,
  &.disabled:hover,
  &.disabled:active {
    cursor: default;
    pointer-events: none;
  }
`;

const ButtonBase = React.forwardRef<any, ButtonBaseProps>(function ButtonBase(
  props,
  ref
) {
  const {
    children,
    component: componentProp = 'button',
    tabIndex = '0',
    className,
    disabled,
    onClick,
    startAdornment,
    endAdornment,
    ...other
  } = props;

  let Component = componentProp;

  if (Component === 'button' && other.href) {
    Component = 'a';
  }

  if (Component === 'button' && other.to) {
    Component = Link;
  }

  const buttonProps: any = {};

  // Sometimes it's helpful to use dataset props. Thus we need to make sure we apply them to the button
  Object.keys(other).forEach(key => {
    if (key.startsWith('data-')) {
      // @ts-ignore
      buttonProps[key] = other[key];
    }
  });

  if (Component === 'button') {
    buttonProps.type = other.type;
    buttonProps.disabled = disabled;
  } else {
    if (Component !== 'a' || !other.href) {
      buttonProps.role = 'button';
    }
    buttonProps['aria-disabled'] = disabled;
  }

  function handleClick(ev: SyntheticEvent<any>) {
    ev.currentTarget.blur();

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  }

  return (
    <ButtonBaseStyled
      onClick={handleClick}
      as={Component}
      ref={ref}
      tabIndex={disabled ? '-1' : tabIndex}
      // @ts-ignore
      target={other && other.withNewTab ? '_blank' : null}
      className={clsx(className, classes.root)}
      {...buttonProps}
      {...other}
    >
      {startAdornment}
      {children}
      {endAdornment}
    </ButtonBaseStyled>
  );
});

export default ButtonBase;
