import React from 'react';
import { ThemeProvider } from '../src/styles/styled-components';
import theme from '../src/styles/theme';

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Wrapper;
