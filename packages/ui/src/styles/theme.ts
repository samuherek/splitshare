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
    warning: '#FCCC2F',
  },
  text: {},
  fonts: {},
};

export default theme;
