export function hasValue(value: any): boolean {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
export function isFilled(obj: object, SRR: boolean = false): boolean {
  return (
    obj &&
    // @ts-ignore
    ((hasValue(obj.value) && obj.value !== '') ||
      // @ts-ignore
      (SRR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}
