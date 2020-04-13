import React from 'react';
import cx from 'clsx';
import { UICoreBaseProps } from '../types';

export interface ButtonCoreProps
  extends UICoreBaseProps,
    React.HTMLProps<HTMLButtonElement> {}

export const classes = {
  disabled: 'disabled',
};

export function useButtonCore({
  props,
  ref,
}: {
  props: ButtonCoreProps;
  ref?: React.Ref<any>;
}) {
  const { tabIndex, disabled, className, component } = props;

  return {
    ...props,
    ref,
    Component: component || 'button',
    ['aria-disabled']: disabled,
    tabIndex: disabled ? '-1' : tabIndex,
    className: cx(className, {
      [classes.disabled]: disabled,
    }),
  };
}

const ButtonCore = React.forwardRef<any, ButtonCoreProps>(
  (originalProps, originalRef) => {
    const { Component, ref, ...props } = useButtonCore({
      props: originalProps,
      ref: originalRef,
    });

    // FIXME: not sure how to type this
    // @ts-ignore
    return <Component ref={ref} {...props} />;
  }
);

export default ButtonCore;
