import React from 'react';
import cx from 'clsx';
import { BaseProps } from '../types';

export interface FieldsetProps
  extends BaseProps,
    React.HTMLProps<HTMLFieldSetElement> {
  component?: React.ReactNode;
}

export const classes = {
  disabled: 'disabled',
};

export function useFieldset(props: FieldsetProps, ref?: React.Ref<any>) {
  const { className, disabled, component } = props;

  return {
    props: {
      ...props,
      className: cx(className, {
        [classes.disabled]: disabled,
      }),
    },
    ref,
    Component: component || 'fieldset',
  };
}

const Fieldset = React.forwardRef<any, FieldsetProps>(function Fieldset(
  originalProps,
  originalRef
) {
  const { Component, ref, props } = useFieldset(originalProps, originalRef);

  // FIXME: not sure how to type this
  // @ts-ignore
  return <Component ref={ref} {...props} />;
});

export default Fieldset;
