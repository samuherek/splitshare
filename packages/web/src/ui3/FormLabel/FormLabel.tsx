import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { useFormControlCtx } from '../FormControl/FormControlProvider';
import getFormControlState from '../FormControl/getFormControlState';

interface Props {
  children: React.ReactNode;
  className?: string;
  component?: any;
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

export const classes = {
  root: 'SSFormLabel',
  optional: 'SSFromLabelOptional',
  disabled: 'disabled',
  focused: 'focused',
  error: 'error',
  required: 'required',
  filled: 'filled',
};

const LabelStyled = styled.label`
  line-height: 1;
  padding: 0;
  font-size: 1em;
  color: inherit;
`;

const FormLabel = React.forwardRef<Props, any>(function FormLabel(props, ref) {
  const {
    children,
    className,
    component: Component = LabelStyled,
    disabled,
    error,
    filled,
    focused,
    required,
    ...rest
  } = props;

  const ctxFormControl = useFormControlCtx();
  const fcs: any = getFormControlState({
    props,
    ctxFormControl,
    states: ['disabled', 'focused', 'error', 'required', 'filled'],
  });

  return (
    <Component
      className={clsx(className, classes.root, {
        [classes.disabled]: fcs.disabled,
        [classes.error]: fcs.error,
        [classes.filled]: fcs.filled,
        [classes.focused]: fcs.focused,
        [classes.required]: fcs.required,
      })}
      ref={ref}
      {...rest}
    >
      {children}
      {!fcs.required && (
        <span
          className={clsx(classes.optional, {
            [classes.error]: fcs.error,
          })}
        >
          &thinsp;{'(Optional)'}
        </span>
      )}
    </Component>
  );
});

export default FormLabel;
