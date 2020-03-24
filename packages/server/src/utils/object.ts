type CheckFn<T> = (value: T) => boolean;

// Comment: check whether adding to an object can be done
export function maybe<T>(
  key: string,
  value: T,
  ...checks: Array<CheckFn<T> | boolean>
): { [key: string]: T } | void {
  let shouldAcceptValue = !!value;

  let loopAccept = true;

  if (checks) {
    let counter = 0;

    while (loopAccept && counter < (checks?.length ?? 0)) {
      const check = checks[counter];
      if (typeof check === 'function') {
        loopAccept = check(value);
      } else if (typeof check === 'boolean') {
        loopAccept = check;
      }
      counter += 1;
    }
  }

  return loopAccept && shouldAcceptValue ? { [key]: value } : undefined;
}
