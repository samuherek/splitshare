export default function convertSpaceToDash(value: string): string {
  return value.replace(/ /g, '-');
}
