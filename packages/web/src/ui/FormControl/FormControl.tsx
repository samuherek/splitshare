import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { FormControlProvider } from './FormControlProvider';

interface Props {
  children: React.ReactNode;
  className?: string;
  as?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  variant?: 'standard';
  // pretendFilled?: boolean;
}

export const classes = {
  root: 'SSFormControl',
  disabled: 'disabled',
  fullWidth: 'full-width',
  required: 'required',
  focused: 'focused',
  filled: 'filled',
  error: 'error',
};

const FormControlStyled = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  vertical-align: top;
  width: ${({ fullWidth }: any) => (fullWidth ? '100%' : 'auto')};
`;

const FormControl = React.forwardRef<Props, any>(function FormControl(
  props,
  ref
) {
  const {
    children,
    className,
    as = 'div',
    disabled = false,
    error = false,
    fullWidth = false,
    required = false,
    variant = 'standard',
    // pretendFilled = false,
    ...rest
  } = props;
  const [focused, setFocused] = React.useState(false);
  const [filled, setFilled] = React.useState(false);

  const handleDirty = () => {
    if (!filled) {
      setFilled(true);
    }
  };

  const handleClean = () => {
    if (filled) {
      setFilled(false);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const childContext = {
    disabled,
    error,
    required,
    variant,
    focused,
    filled,
    onFilled: handleDirty,
    onEmpty: handleClean,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    // @ts-ignore
    <FormControlProvider value={childContext}>
      <FormControlStyled
        as={as}
        className={clsx(className, classes.root, {
          [classes.disabled]: disabled,
          [classes.fullWidth]: fullWidth,
          [classes.required]: required,
          [classes.focused]: focused,
          [classes.filled]: filled,
          [classes.error]: error,
        })}
        ref={ref}
        fullWidth={fullWidth}
        // pretendFilled={pretendFilled}
        {...rest}
      >
        {children}
      </FormControlStyled>
    </FormControlProvider>
  );
});

export default FormControl;
