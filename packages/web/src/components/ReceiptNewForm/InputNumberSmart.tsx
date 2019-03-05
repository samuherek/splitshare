import { IInputBaseProps, InputBase } from '@splitshare/ui';
import * as React from 'react';

// interface IProps extends IInputBaseProps {}
// @ts-ignore
function getMultiplyValue(ev: any): number {
  if (ev.shiftKey) {
    return 10;
  } else if (ev.altKey) {
    return 0.1;
  }
  return 1;
}

const InputNumberSmart = ({ onChange, value, ...rest }: IInputBaseProps) => {
  function handleKeyNavigation(ev: any) {
    if (ev.key === 'ArrowUp') {
      // const nextValue = (Number(value) || 0) + 1 * getMultiplyValue(ev);
      // onChange()
    } else if (ev.key === 'ArrowDown') {
      // const nextValue = (Number(value) || 0) - 1 * getMultiplyValue(ev);
    }
  }

  return <InputBase onKeyDown={handleKeyNavigation} value={value} {...rest} />;
};

export default InputNumberSmart;
