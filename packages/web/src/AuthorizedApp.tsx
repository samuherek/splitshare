import { Router } from '@reach/router';
import React from 'react';
import { ThemeProvider } from 'styled-components';
// import Dashboard from './routes/Dashboard';
// import DashLayout from './routes/utils/DashLayout';
import theme from './styles';

function AuthorizedApp() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <DashLayout path="/"> */}
        {/* <Dashboard path="/" /> */}
        {/* <NotFound default={true} /> */}
        {/* </DashLayout> */}
      </Router>
    </ThemeProvider>
  );
}

export default AuthorizedApp;
