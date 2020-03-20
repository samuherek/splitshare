type CheckFn<T> = (value: T) => boolean;

// Comment: check whether adding to an object can be done
export function maybe<T>(
  key: string,
  value: T,
  check?: CheckFn<T> | boolean
): { [key: string]: T } | void {
  let acceptVal: T | boolean = value;

  if (typeof check === 'function') {
    acceptVal = check(value);
  } else if (typeof check === 'boolean') {
    acceptVal = check;
  }

  return acceptVal ? { [key]: value } : undefined;
}
