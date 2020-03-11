export function getUUIDFromUrl(value: string): string | null {
  const uuidRgx = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/;
  const uuid = value.match(uuidRgx);

  if (!uuid) {
    return null;
  }

  return uuid[0];
}

export function sanitizeName(value: string): string {
  return value.replace(/ |\//g, '-');
}
