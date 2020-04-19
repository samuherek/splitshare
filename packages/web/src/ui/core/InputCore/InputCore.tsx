import cx from 'clsx';
import React from 'react';
import { isFilled } from './utils';
import { UICoreBaseProps } from '../types';
import { useForkRef } from '../../utils/ref';
import { useFormControlCtx } from '../FormControl';
import mergeFormControlState from '../FormControl/mergeFormControlState';
import useEnhancedEffect from '../../hooks/useEnhancedEffect';

export interface InputCoreProps
  extends UICoreBaseProps,
    React.HTMLProps<HTMLInputElement> {}

export const classes = {
  disabled: 'disabled',
  focused: 'focused',
  error: 'error',
  required: 'required',
};

export function useInputCore(props: InputCoreProps, ref: React.Ref<any>) {
  const {
    value,
    className,
    component,
    onClick,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
  } = props;

  const [focused, setFocused] = React.useState(false);
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(inputRef, ref);

  const uiFormControlCtx = useFormControlCtx();
  const fcs = mergeFormControlState({
    props,
    uiFormControlCtx,
    states: ['disabled', 'error', 'required', 'filled'],
  });

  fcs.focused = uiFormControlCtx?.focused ?? focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!uiFormControlCtx && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        // FIXME: look how to fix this
        // @ts-ignore
        onBlur();
      }
    }
  }, [uiFormControlCtx, disabled, focused, onBlur]);

  const handleClick = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (inputRef.current && ev.currentTarget === ev.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(ev);
    }
  };

  const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
    if (!isControlled) {
      const element = ev.target || inputRef.current;
      if (element == null) {
        throw new TypeError(
          'Material-UI: Expected valid input target. ' +
            'Did you use a custom `inputComponent` and forget to forward refs? ' +
            'See https://material-ui.com/r/input-component-ref-interface for more info.'
        );
      }

      checkDirty({
        // FIXME: figure out the type
        // @ts-ignore
        value: element.value,
      });
    }

    if (onChange) {
      onChange(ev);
    }
  };

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(ev);
    }

    if (uiFormControlCtx?.onBlur) {
      uiFormControlCtx.onBlur();
    } else {
      setFocused(false);
    }
  };

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (fcs.disabled) {
      ev.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(ev);
    }

    if (uiFormControlCtx?.onFocus) {
      uiFormControlCtx.onFocus();
    } else {
      setFocused(true);
    }
  };

  const onFilled = uiFormControlCtx?.onFilled;
  const onEmpty = uiFormControlCtx?.onEmpty;

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty]
  );

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  React.useEffect(() => {
    checkDirty(inputRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  return {
    props: {
      ...props,
      className: cx(className, {
        [classes.disabled]: fcs.disabled,
        [classes.focused]: fcs.focused,
        [classes.error]: fcs.error,
        [classes.required]: fcs.required,
      }),
      required: fcs.required,
      disabled: fcs.disabled,
      onClick: handleClick,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
    },
    ref: handleRef,
    Component: component || 'input',
  };
}

const InputCore = React.forwardRef<any, InputCoreProps>(function InputCore(
  p,
  r
) {
  const { props, ref, Component } = useInputCore(p, r);
  // FIXME: not sure typing
  const C: any = Component;

  return <C ref={ref} {...props} />;
});

export default InputCore;
