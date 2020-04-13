import React from 'react';
import cx from 'clsx';
import { FormControlProvider } from './context';
import { UICoreBaseProps } from '../types';
import isUiElement from '../../utils/isUiElement';
import { isFilled } from '../InputCore/utils';

export interface FormControlProps extends UICoreBaseProps {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  // hiddenLabel: boolean,
  required: boolean;
}

export const classes = {
  root: 'FormControl',
};

export function useFormControl(props: FormControlProps, ref: React.Ref<any>) {
  const {
    className,
    component,
    disabled,
    error,
    focused: visuallyFocused,
    required,
    children,
  } = props;

  const [_focused, setFocused] = React.useState(false);

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, child => {
        if (!isUiElement(child, ['Input', 'Select'])) {
          return;
        }

        // @ts-ignore
        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const focused = visuallyFocused !== undefined ? visuallyFocused : _focused;

  if (disabled && focused) {
    setFocused(false);
  }

  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);

  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);

  const onBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  const onFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const context = {
    disabled,
    focused,
    error,
    filled,
    required,
    onEmpty,
    onFilled,
    onBlur,
    onFocus,
  };

  return {
    props: {
      ...props,
      className: cx(className, classes.root),
    },
    ref,
    Component: component || 'div',
    context,
  };
}

const FormControl = React.forwardRef<any, FormControlProps>((p, r) => {
  const { props, ref, context, Component } = useFormControl(p, r);
  // FIXME: figure out how to type this
  const C: any = Component;

  return (
    <FormControlProvider value={context}>
      <C ref={ref} {...props} />
    </FormControlProvider>
  );
});

export default FormControl;
