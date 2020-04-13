import clsx from 'clsx';
import React from 'react';
import InputBase from '../../core/InputCore';
import { Outlined } from './styles';

interface Props {
  variant?: 'outlined';
  className?: string;
}

export const classes = {
  outlined: 'outlined',
};

const themedComponent = {
  outlined: Outlined,
};

const Input = React.forwardRef<Props, any>(function Input(props, ref) {
  const { variant = 'outlined', className, ...rest } = props;

  // @ts-ignore
  const ThemedComponent = themedComponent[`${variant}`] || 'div';

  return (
    <InputBase
      className={clsx(className, {
        [classes.outlined]: variant === 'outlined',
      })}
      wrapProps={{ as: ThemedComponent }}
      {...rest}
    />
  );
});

export default Input;
