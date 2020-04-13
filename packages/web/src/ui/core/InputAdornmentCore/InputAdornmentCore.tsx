import React from 'react';
import cx from 'clsx';
import { UICoreBaseProps } from '../types';

interface InputAdornmentCore extends UICoreBaseProps {
  disablePointerEvents?: boolean;
  disableTypography?: boolean;
  position: 'start' | 'end';
}

export const classes = {
  root: 'InputAdornment',
  positionStart: 'start',
  positionEnd: 'end',
};

export function useInputAdornmentCore(
  props: InputAdornmentCore,
  ref: React.Ref<any>
) {
  const { component, className, position } = props;

  return {
    props: {
      ...props,
      className: cx(className, classes.root, {
        [classes.positionStart]: position === 'start',
        [classes.positionEnd]: position === 'end',
      }),
    },
    ref,
    Component: component || 'div',
  };
}

const InputAdornmentCore = React.forwardRef<any, InputAdornmentCore>(
  function InputAdornmentCore(p, r) {
    const { props, ref, Component } = useInputAdornmentCore(p, r);

    // FIXME: how??
    const C: any = Component;

    return (
      <C ref={ref} {...props}>
        {typeof props.children === 'string' ? (
          <span>{props.children}</span>
        ) : (
          props.children
        )}
      </C>
    );
  }
);

export default InputAdornmentCore;
