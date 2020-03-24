import { DateUtilsAdapter } from '../libs/date-utils';

export function hasStringLength(val: any) {
  return typeof val === 'string' && val.length > 0;
}

export function notUndefined(val: any) {
  return typeof val !== undefined;
}

export function hasDate(utils: DateUtilsAdapter) {
  return (val: any) => {
    return utils.isValid(val);
  };
}

export function isNumber(val: any) {
  return typeof val === 'number' && !isNaN(val);
}

export function hasArrayLength(val: any) {
  return Array.isArray(val) && val.length > 0;
}

export function notEqual<T>(compare: T) {
  return (val: T) => {
    return val !== compare;
  };
}
