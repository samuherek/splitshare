import capitalize from 'capitalize';
import clsx from 'clsx';
import React from 'react';
import { ButtonLabel } from './styles';
import { ButtonBaseStyled } from './styles-contained';

interface Props {
  children: any;
  className?: string;
  variant?: 'text' | 'contained';
  color?: 'secondary' | 'primary' | 'danger';
  active?: boolean;
}

export const classes = {
  root: 'ButtonIcon',
  label: 'label',
  active: 'active',
};

const themedComponent = {
  primaryText: ButtonBaseStyled,
  secondaryText: ButtonBaseStyled,
  dangerText: ButtonBaseStyled,
  primaryContained: ButtonBaseStyled,
  secondaryContained: ButtonBaseStyled,
  dangerContained: ButtonBaseStyled,
};

const ButtonIcon = React.forwardRef<Props, any>(function ButtonIcon(
  props,
  ref
) {
  const {
    children,
    className,
    variant = 'text',
    color = 'secondary',
    active = false,
    ...rest
  } = props;

  const key = `${color}${capitalize(variant)}`;
  // @ts-ignore
  const ThemedComponent = themedComponent[key] || ButtonBaseStyled;

  return (
    <ThemedComponent
      ref={ref}
      active={active}
      className={clsx(className, classes.root, {
        [classes.active]: active,
      })}
      {...rest}
    >
      <ButtonLabel className={classes.label}>{children}</ButtonLabel>
    </ThemedComponent>
  );
});

export default ButtonIcon;
