export default function sanitizeName(value: string): string {
  return value.replace(/ |\//g, '-');
}
