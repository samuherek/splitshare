// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word a the sentence.
// We only handle the first word.
export function capitalize(val: string): string {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof val !== 'string') {
      throw new Error(
        'capitalize: capitalize(string) expects a string argument.'
      );
    }
  }

  return val.charAt(0).toUpperCase() + val.slice(1);
}

// tslint:disable-next-line:ban-types
export function createChainedFunction(...funcs: Function[]) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      // warning(
      //   typeof func === 'function',
      //   'Material-UI: invalid Argument Type, must only provide functions, undefined, or null.',
      // );

      return function chainedFunction(...args: any[]) {
        // @ts-ignore
        acc.apply(this, args);
        // @ts-ignore
        func.apply(this, args);
      };
    },
    () => {}
  );
}

export function getHasTransition(props: any) {
  return props.children ? props.children.props.hasOwnProperty('in') : false;
}
