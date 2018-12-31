// @flow
import * as React from 'react';
import styled, { css } from '../../../styles/styled-components';

import { InputBase, IInputBaseProps } from '../InputBase';

interface IWrapStyled extends IInputBaseProps {
  margin?: string;
  focused?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  className?: string;
}

interface IInputProps extends IWrapStyled {}

const WrapStyled = styled('div')<IWrapStyled>`
  font: inherit;
  display: inline-flex;
  color: currentColor;
  position: relative;
  width: 100%;
  margin-top: 16px;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  &:before {
    left: 0;
    right: 0;
    bottom: 0;
    content: '\00a0';
    position: absolute;
    // transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    pointer-events: none;
  }

  &:after {
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    position: absolute;
    // width: ${({ focused }) => (focused ? '100%' : '0')};
    // transition: width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    // border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    pointer-events: none;
  }
`;

const Input = ({
  disabled,
  error,
  required,
  variant,
  focused,
  className,
  margin,
  ...other
}: IInputProps) => {
  return (
    <WrapStyled
      focused={focused}
      margin={margin}
      variant={variant}
      className={className}
    >
      <InputBase
        disabled={disabled}
        error={error}
        required={required}
        {...other}
      />
    </WrapStyled>
  );
};

export { Input, IInputProps };
