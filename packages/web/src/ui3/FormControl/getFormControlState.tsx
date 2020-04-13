import {
  FormControlContextPropsKey,
  FormControlContextValue,
} from './FormControlProvider';

type Options = {
  props: object;
  states: FormControlContextPropsKey[];
  ctxFormControl?: FormControlContextValue;
};

export default function getFormControlState({
  props,
  states,
  ctxFormControl,
}: Options) {
  return states.reduce((acc, state) => {
    // @ts-ignore
    acc[state] = props[state];

    if (ctxFormControl) {
      // @ts-ignore
      if (typeof props[state] === 'undefined') {
        // @ts-ignore
        acc[state] = ctxFormControl[state];
      }
    }

    return acc;
  }, {});
}
