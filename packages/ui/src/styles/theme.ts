export interface ITheme {
  colors: {
    [key: string]: string;
  };
  text: {
    [key: string]: string;
  };
  fonts: {
    [key: string]: string;
  };
}

const theme: ITheme = {
  colors: {
    primary: '#46dc75',
    secondary: 'gray',
    warning: '#FCCC2F',
    danger: 'red',
    success: 'green',
    white: '#ffffff',
  },
  text: {
    primary: '#000000',
    white: '#ffffff',
  },
  fonts: {},
};

export default theme;
