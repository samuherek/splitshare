import clsx from 'clsx';
import React from 'react';
import FormLabel from '../FormLabel';
import { LabelStandard } from './styles';

interface Props {
  className?: string;
  variant?: 'standard';
}

export const classes = {
  root: 'SSInputLabel',
};

const variantComponent = {
  standard: LabelStandard,
};

const InputLabel = React.forwardRef<Props, any>(function InputLabel(
  props,
  ref
) {
  const { className, variant = 'standard', ...rest } = props;

  // @ts-ignore
  const LabelComponent = variantComponent[variant];

  return (
    <FormLabel
      className={clsx(className, classes.root)}
      as={LabelComponent}
      ref={ref}
      {...rest}
    />
  );
});

export default InputLabel;
