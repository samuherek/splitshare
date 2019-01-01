import { Router } from '@reach/router';
import { GlobalStyles, theme, ThemeProvider } from '@splitshare/ui';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import AuthLayout from './layout/AuthLayout';
import DashLayout from './layout/DashLayout';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import NotFound from './routes/NotFound';
import client from './apollo';

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles />
            <Router>
              <DashLayout path="/">
                <Home path="/" />
                <NotFound default={true} />
              </DashLayout>
              <AuthLayout path="auth">
                <Login path="login" />
                <Signup path="signup" />
                <NotFound default={true} />
              </AuthLayout>
            </Router>
          </>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
