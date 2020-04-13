import { CtxStateValues, FormControlCtx } from './context';

type Options = {
  props: Partial<CtxStateValues>;
  states: Array<keyof CtxStateValues>;
  uiFormControlCtx?: FormControlCtx;
};

export default function mergeFormControlState({
  props,
  states,
  uiFormControlCtx,
}: Options) {
  return states.reduce<Partial<CtxStateValues>>((acc, state) => {
    acc[state] = props[state];

    if (uiFormControlCtx) {
      if (typeof props[state] === 'undefined') {
        acc[state] = uiFormControlCtx[state];
      }
    }

    return acc;
  }, {});
}
