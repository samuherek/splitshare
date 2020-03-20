import React from 'react';
import { ParsableDate } from '../../hooks/useDateController';
import { DateInputProps } from '../DateInput';
import DialogWrapper from './components/DialogWrapper';
import StaticWrapper from './components/StaticWrapper';

export type AnyWrapper = 'dialog' | 'static';

export interface WrapperComponentProps<TInputProps = DateInputProps<any, any>> {
  open: boolean;
  onAccept: () => void;
  onDismiss: () => void;
  // onClear: () => void;
}

export interface WrapperProps<TInputValue, TDateValue> {
  children: React.ReactNode;
  variant: AnyWrapper;
  inputProps: DateInputProps<TInputValue, TDateValue>;
  wrapperProps: WrapperComponentProps;
  // wrapperProps: Omit<WrapperProps, 'DateInputProps'>
}

const wrapperComponents = {
  dialog: DialogWrapper,
  static: StaticWrapper,
};

function Wrapper({
  variant,
  children,
  wrapperProps,
  ...rest
}: WrapperProps<ParsableDate, Date>) {
  const WrapperComponent = wrapperComponents[variant] || StaticWrapper;

  return (
    <WrapperComponent {...wrapperProps} {...rest}>
      {children}
    </WrapperComponent>
  );
}

export default Wrapper;
