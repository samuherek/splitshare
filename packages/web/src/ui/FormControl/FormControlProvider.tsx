import React from 'react';

export type FormControlContextPropsKey =
  | 'disabled'
  | 'error'
  | 'required'
  | 'filled'
  | 'focused'
  | 'variant';

export type FormControlContextValue = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  required: boolean;
  variant: 'standard' | 'outline';
  filled: boolean;
  onFilled?: () => void;
  onEmpty?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export interface FormControlProviderProps {
  value: FormControlContextValue;
}

const FormControlContext = React.createContext<
  FormControlContextValue | undefined
>(undefined);

function FormControlProvider(props: FormControlProviderProps) {
  const { value: valueProp, ...rest } = props;

  const value = React.useMemo(() => {
    return { ...valueProp };
  }, [valueProp]);

  return <FormControlContext.Provider value={value} {...rest} />;
}

function useFormControlCtx() {
  return React.useContext(FormControlContext);
}

export { FormControlContext, FormControlProvider, useFormControlCtx };
