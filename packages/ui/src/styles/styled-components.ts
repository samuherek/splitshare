import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import GlobalStyles from './global';
import { ITheme } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export default styled;
export {
  styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  GlobalStyles,
};
