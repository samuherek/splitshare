import React from 'react';

export function setRef(ref: React.Ref<unknown>, value: any) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // @ts-ignore
    ref.current = value;
  }
}

// FIXME: not sure how to type it
export function useForkRef(refA: any, refB: any) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: any) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
