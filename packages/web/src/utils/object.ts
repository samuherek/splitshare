// Comment: check whether adding to an object can be done
export function maybe<T>(
  key: string,
  value: T,
  checkFn?: (value: T) => boolean
): { [key: string]: T } | void {
  let acceptVal: T | boolean = value;

  if (typeof checkFn === 'function') {
    acceptVal = checkFn(value);
  }

  return acceptVal ? { [key]: value } : undefined;
}
