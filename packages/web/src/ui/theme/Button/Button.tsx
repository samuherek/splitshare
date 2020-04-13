import capitalize from 'capitalize';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ButtonBase, { ButtonBaseProps } from '../../components/ButtonBase';
import { ButtonBaseStyled } from './styles-contained';

interface ButtonProps extends ButtonBaseProps {
  variant?: 'text' | 'contained';
  flat?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  children: ReactNode;
  onClick?: any;
  to?: string;
  disabled?: boolean;
  tabIndex?: string | number;
  href?: string;
  type?: string;
  withNewTab?: boolean;
  className?: string;
  style?: object;
}

export const classes = {
  root: 'Button',
  label: 'ButtonLabel',
  primaryText: 'primary-text',
  primaryContained: 'primary-contained',
  secondaryText: 'secondary-text',
  secondaryContained: 'secondary-contained',
  tertiaryText: 'tertiary-text',
  tertiaryContained: 'tertiary-contained',
  darkText: 'dark-text',
  darkContained: 'dark-contained',
};

const themedComponent = {
  primaryText: ButtonBaseStyled,
  primaryContained: ButtonBaseStyled,
  secondaryText: ButtonBaseStyled,
  secondaryContained: ButtonBaseStyled,
  tertiaryText: ButtonBaseStyled,
  tertiaryContained: ButtonBaseStyled,
  darkContained: ButtonBaseStyled,
  darkText: ButtonBaseStyled,
};

const LabelStyled = styled.span`
  /* To make sure text ellipsis are being applied */
  min-width: 0;
`;

const Button = React.forwardRef<unknown, ButtonProps>(function Button(
  props,
  ref
) {
  const {
    children,
    variant = 'text',
    color = 'tertiary',
    className,
    disabled,
    ...other
  } = props;

  const key = `${color}${capitalize(variant)}`;
  // @ts-ignore
  const ButtonComponent = themedComponent[key] || ButtonBase;

  const text = variant === 'text';
  const contained = variant === 'contained';
  const primary = color === 'primary';
  const secondary = color === 'secondary';
  const tertiary = color === 'tertiary';
  const dark = color === 'dark';

  return (
    <ButtonComponent
      className={clsx(className, classes.root, {
        [classes.primaryContained]: primary && contained,
        [classes.primaryText]: primary && text,
        [classes.secondaryContained]: secondary && contained,
        [classes.secondaryText]: secondary && text,
        [classes.tertiaryContained]: tertiary && contained,
        [classes.tertiaryText]: tertiary && text,
        [classes.darkContained]: dark && contained,
        [classes.darkText]: dark && text,
      })}
      disabled={disabled}
      ref={ref}
      {...other}
    >
      <LabelStyled className={classes.label}>{children}</LabelStyled>
    </ButtonComponent>
  );
});

export default Button;
