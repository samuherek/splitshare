export const nexyColors = {
  azure: '#05a8fa',
  battleshipGrey: '#71727a',
  blueGrey: '#888a94',
  blueyGrey: '#a0a2ad',
  brightLilac: '#d564ed',
  charcoalGrey: '#424347',
  cloudyBlue: '#b7bac7',
  dandelion: '#fad311',
  darkGrey: '#131314',
  darkGreyTwo: '#2a2b2e',
  ghostWhite: '#fafbff',
  greenTeal: '#0ec76a',
  greenTeal2: '#0ebf66', // button hover
  greenTeal3: '#0db862', // button
  greenTeal4: '#0dba63', // hover button text color
  lightPeriwinkle: '#ced1e0',
  orangeyRed: '#ed3434',
  paleGrey: '#f0f2fa',
  paleLilac: '#dfe1ed',
  paleLilac07: 'rgba(223, 225, 237, 0.07)',
  paleLilac10: 'rgba(223, 225, 237, 0.10)',
  paleLilac25: 'rgba(223, 225, 237, 0.25)',
  paleLilac33: 'rgba(223, 225, 237, 0.33)',
  paleLilac40: 'rgba(223, 225, 237, 0.40)',
  paleLilac50: 'rgba(223, 225, 237, 0.50)',
  paleLilac66: 'rgba(223, 225, 237, 0.66)',
  pumpkinOrange: '#f6820d',
  purpleishBlue: '#674ced',
  slateGrey: '#595a61',
  white: '#ffffff',
};

const nexyFonts = {
  font: '"EuclidCircularB"',
  fontFallback: 'Poppins',
  fontSystem:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

function createFonts(fonts: any) {
  return {
    ...fonts,
    fontFamily: Object.keys(fonts)
      .map(key => fonts[key])
      .join(','),
  };
}

function createTheme(colors: any) {
  const transformed = Object.keys(colors)
    .map(c => ({ key: c, value: colors[c] }))
    .map(({ key, value }) => ({ key, value }))
    .reduce((prev, { key, value }) => ({ ...prev, [key]: value }), {});

  return transformed;
}

const theme = {
  nexy: {
    ...createTheme(nexyColors),
    ...createFonts(nexyFonts),
  },
};

if (process.env.NODE_ENV === 'development') {
  console.log(theme);
}

export type ThemeStyled = typeof theme;
export default theme;
