import { Router } from '@reach/router';
import { GlobalStyles, theme, ThemeProvider } from '@splitshare/ui';
import * as React from 'react';

import AuthLayout from './layout/AuthLayout';
import DashLayout from './layout/DashLayout';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <Router>
            <DashLayout path="/">
              <Home path="/" />
            </DashLayout>
            <AuthLayout path="auth">
              <Login path="login" />
              <Signup path="signup" />
            </AuthLayout>
          </Router>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
