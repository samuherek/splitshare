export function firstLetter(string?: string | null): string {
  return string?.substr(0, 1) ?? '';
}
