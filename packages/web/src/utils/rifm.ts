export const float = /[\d.]+/g;

export function parseNumber(str: string) {
  return (str.match(float) || []).join('');
}

export function formatFloatingPointNumber(value: string, maxFloats: number) {
  const parsed = parseNumber(value);
  const [head, tail] = parsed.split('.');

  const scaledTail = tail?.slice(0, maxFloats) ?? '';

  let number = Number.parseFloat(`${head}.${scaledTail}`);

  if (Number.isNaN(number)) {
    return '';
  }

  const formatted = number.toLocaleString(undefined, {
    minimumFractionDigits: maxFloats,
    maximumFractionDigits: maxFloats,
  });

  if (parsed.includes('.')) {
    const [formattedHead] = formatted.split('.');

    const formattedTail =
      scaledTail !== '' && scaledTail[maxFloats - 1] === '0'
        ? scaledTail.slice(0, -1)
        : scaledTail;

    return `${formattedHead}.${formattedTail}`;
  }

  return formatted;
}
