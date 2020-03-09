type PropsWithTheme = {
  theme: {
    nexy: {
      [key: string]: string;
    };
  };
};

export function nexyColors(
  props: PropsWithTheme,
  key: any,
  fallback: string = ''
): string {
  const result = fallback || '#000000';
  return props.theme?.nexy[key] ?? result;
}

export function colorByKey(key: any, fallback?: string) {
  // tslint:disable-next-line:only-arrow-functions
  return function(props: PropsWithTheme): string {
    return nexyColors(props, key, fallback);
  };
}

export function fontByKey(key: string, fallback: string = '') {
  // tslint:disable-next-line:only-arrow-functions
  return function(props: PropsWithTheme): string {
    return props.theme.nexy[key] || fallback;
  };
}
