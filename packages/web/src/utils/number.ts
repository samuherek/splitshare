export function round(num: number, floatPoints: number = 0) {
  const multiplier = Math.pow(10, floatPoints);
  return Math.round(num * multiplier) / multiplier;
}

export function floor(num: number, floatPoints: number = 0) {
  const multiplier = Math.pow(10, floatPoints);
  return Math.floor(num * multiplier) / multiplier;
}
