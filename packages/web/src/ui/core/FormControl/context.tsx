import React from 'react';

export interface CtxStateValues {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  required: boolean;
  filled: boolean;
}

export interface CtxFunctions {
  onFilled?: () => void;
  onEmpty?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface FormControlCtx extends CtxStateValues, CtxFunctions {}

export interface FormControlProviderProps {
  value: FormControlCtx;
  children: React.ReactNode;
}

const FormControlContext = React.createContext<FormControlCtx | undefined>(
  undefined
);

function useFormControlProvider(props: FormControlProviderProps) {
  const { value: valueProp } = props;

  const value = React.useMemo(() => ({ ...valueProp }), [valueProp]);

  return {
    props,
    value,
  };
}

function FormControlProvider(oriProps: FormControlProviderProps) {
  const { props, value } = useFormControlProvider(oriProps);
  return <FormControlContext.Provider value={value} {...props} />;
}

function useFormControlCtx() {
  return React.useContext(FormControlContext);
}

export { FormControlProvider, useFormControlCtx, useFormControlProvider };
