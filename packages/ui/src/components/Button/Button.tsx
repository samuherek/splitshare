// @flow
import { lighten, rem } from 'polished';
import * as React from 'react';
import styled, { css } from '../../styles/styled-components';
import { ButtonBase } from '../ButtonBase';
import { IBaseButtonProps } from '../ButtonBase/ButtonBase';

const IconBefore: any = styled.span``;

const IconAfter: any = styled.span``;

interface IProps extends IBaseButtonProps {
  // COMMENT: How big the button gets with font and padding
  size?: 'mini' | 'small' | 'medium' | 'large';
  // COMMENT: what colors will be applied to font and background
  variant?: 'default' | 'primary' | 'danger' | 'success';
  // COMMENT: what type the button is. -> background, no background, filled circle...
  shape?: 'text' | 'outlined' | 'contained' | 'circle' | 'transparent';
  // COMMENT: how loud the button should be. If silent, it is normal color and only on hover adds colors and styles.
  figure?: 'normal' | 'silent';
  // COMMENT: in case we have a small button and we want to reset things
  resetSize?: boolean;
  iconBefore?: React.ComponentType | null;
  iconAfter?: React.ComponentType | null;
  fullWidth?: boolean;
  to?: string;
  className?: string;
  onClick?: () => void;
}

// TODO: Fix the types
// @ts-ignore
const ButtonStyledExtended: any = styled(ButtonBase)`
  transition: all 0.2s;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  position: relative;
  // @ts-ignore
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  // @ts-ignore
  font-size: ${({ size }) => {
    if (size === 'mini') return rem('11px');
    if (size === 'small') return rem('13px');
    if (size === 'medium') return rem('15px');
    if (size === 'large') return rem('17px');
    return null;
  }};
  // @ts-ignore
  padding: ${({ size, resetSize }) => {
    if (resetSize) return '2px';
    if (size === 'mini') return '2px';
    if (size === 'small') return '2px 6px';
    if (size === 'medium') return '5px 10px';
    if (size === 'large') return '7px 14px';
    return null;
  }};
  // @ts-ignore
  min-width: ${({ size, resetSize }) => {
    if (resetSize) return '20px';
    if (size === 'mini') return '20px';
    if (size === 'small') return '52px';
    if (size === 'medium') return '64px';
    if (size === 'large') return '100px';
    return null;
  }};
  // @ts-ignore
  min-height: ${({ size, resetSize }) => {
    if (resetSize) return '20px';
    if (size === 'mini') return '22px';
    if (size === 'small') return '28px';
    if (size === 'medium') return '34px;';
    if (size === 'large') return '40px';
    return null;
  }};
  // @ts-ignore
  color: ${({ shape, figure, variant, theme }) => {
    if (figure === 'silent') return '#797B7C';
    if (['contained', 'circle'].includes(shape)) {
      if (variant === 'default') return theme.text.primary;
      return theme.colors.white;
    }
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'danger') return theme.colors.danger;
    if (variant === 'success') return theme.colors.success;
    return theme.text.primary;
  }};
  // @ts-ignore
  border-color: ${({ shape, variant, theme }) => {
    if (shape === 'outlined') {
      if (variant === 'primary') return theme.colors.primary;
      if (variant === 'danger') return theme.colors.danger;
      if (variant === 'success') return theme.colors.success;
      if (variant === 'default') return '#dadada';
    }
    return 'transparent';
  }};
  // @ts-ignore
  background: ${({ shape, variant, theme }) => {
    if (['contained', 'circle'].includes(shape)) {
      if (variant === 'primary') return theme.colors.primary;
      if (variant === 'danger') return theme.colors.danger;
      if (variant === 'success') return theme.colors.success;
      return '#dcdfe0';
    }
    return 'transparent';
  }};

  &:hover,
  &:focus {
    // @ts-ignore
    background: ${({ shape, variant, theme }) => {
      if (shape === 'transparent') return 'transparent';

      if (['contained', 'circle'].includes(shape)) {
        if (variant === 'primary') return lighten(0.1, theme.colors.primary);
        if (variant === 'danger') return lighten(0.1, theme.colors.danger);
        if (variant === 'success') return lighten(0.1, theme.colors.success);
        return '#d0d4d6';
      }

      if (variant === 'primary') return theme.colors.primary;
      if (variant === 'danger') return theme.colors.danger;
      if (variant === 'success') return theme.colors.success;

      return theme.colors.secondary;
    }};
    // @ts-ignore
    color: ${({ shape, variant, theme }) => {
      if (['transparent'].includes(shape)) {
        if (variant === 'primary') return theme.colors.primary;
        if (variant === 'danger') return theme.colors.danger;
        if (variant === 'success') return theme.colors.success;
        return theme.colors.secondary;
      }
      if (variant !== 'default') {
        return 'white';
      }
    }};
  }
  // @ts-ignore
  ${({ disabled, shape, variant }) => {
    if (disabled) {
      return css`
        color: #c5c5c5;
        background: ${['contained', 'circle'].includes(shape)
          ? '#eee'
          : 'transparent'};
      `;
    } else {
      return null;
    }
  }}

  /* &:disabled,
  &:[aria-disabled="true"] {
  } */

  &:active {
    top: 1px;
  }

  svg {
    // @ts-ignore
    font-size: ${({ size }) => {
      if (size === 'mini') return rem('13px');
      if (size === 'small') return rem('13px');
      if (size === 'medium') return rem('15px');
      if (size === 'large') return rem('17px');
    }};
  }

  /* This is for the icons temporarily */
  & > svg:first-child {
    display: inline-block;
    margin-right: 6px;
  }

  & > svg:last-child {
    display: inline-block;
    margin-left: 6px;
  }

  /* &:focus {
    outline: 0;
  } */
`;

export class Button extends React.PureComponent<IProps, {}> {
  static defaultProps = {
    size: 'medium',
    shape: 'text',
    variant: 'default',
    fullWidth: false,
    to: '',
    figure: 'normal',
  };

  render() {
    const {
      children,
      variant,
      shape,
      iconBefore,
      iconAfter,
      size,
      figure,
      to,
      resetSize,
      className,
      disabled,
      ...other
    } = this.props;

    return (
      <ButtonStyledExtended
        variant={variant}
        shape={shape}
        size={size}
        to={to}
        resetSize={resetSize}
        className={className}
        figure={figure}
        disabled={disabled}
        {...other}
      >
        {iconBefore ? <IconBefore size={size} as={iconBefore} /> : null}
        <span>{children}</span>
        {iconAfter ? <IconAfter size={size} as={iconAfter} /> : null}
      </ButtonStyledExtended>
    );
  }
}
