import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../theme/Button';
import ButtonLoader from '../ButtonLoader';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (ev: SyntheticEvent<HTMLButtonElement>) => any;
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  variant?: 'text' | 'contained';
  loading?: boolean;
  type?: string;
}

export const classes = {
  root: 'ButtonAsync',
};

// TODO: We should probably move the "position: relative" to
// the button label instead to preserver the spacing in case
// we have a ButtonAdornment of some kind.
const ButtonAsyncStyled = styled(Button)<{ loading?: boolean }>`
  position: relative;

  ${({ loading }) =>
    // $FlowFixMe
    loading &&
    css`
      & > span span:first-child {
        opacity: 0;
        visibility: hidden;
      }

      & > span span:nth-child(2) {
        display: flex !important;
      }
    `}

  & > span span:first-child {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  & > span span:nth-child(2) {
    display: none;
  }
`;

function ButtonAsync({
  onClick,
  disabled = false,
  children,
  loading,
  color,
  variant,
  className,
  ...rest
}: Props) {
  return (
    <ButtonAsyncStyled
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      color={color}
      variant={variant}
      className={clsx(className, classes.root)}
      {...rest}
    >
      <span>{children}</span>
      <ButtonLoader color={color} variant={variant} />
    </ButtonAsyncStyled>
  );
}

export default ButtonAsync;
