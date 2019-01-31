import { Router } from '@reach/router';
import { GlobalStyles, theme, ThemeProvider } from '@splitshare/ui';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import AuthLayout from './routes/utils/AuthLayout';
import DashLayout from './routes/utils/DashLayout';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';
import NotFound from './routes/NotFound';
import client from './apollo';
import AppProvider from './context/AppProvider';
import Bill from './routes/Bill';

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider client={client}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Router>
                <AuthLayout path="auth">
                  <Login path="login" />
                  <Register path="signup" />
                  <NotFound default={true} />
                </AuthLayout>
                <DashLayout path="/">
                  <Dashboard path="/" />
                  <Bill path="/:billParam" />
                  <NotFound default={true} />
                </DashLayout>
              </Router>
            </>
          </ThemeProvider>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default App;
