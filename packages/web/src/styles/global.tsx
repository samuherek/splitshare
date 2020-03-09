import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --green-main: #287159;
}


* {
  padding: 0;
  margin: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: relative;
  background: #ffffff;
}

a {
    text-decoration: none;
  }

`;

export default GlobalStyles;
