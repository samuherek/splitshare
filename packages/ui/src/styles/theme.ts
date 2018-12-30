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
    primary: 'black',
    secondary: 'gray',
    warning: '#FCCC2F',
    danger: 'red',
    success: 'green',
  },
  text: {
    primary: '#000000',
  },
  fonts: {},
};

export default theme;
