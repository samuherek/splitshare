import { Router } from '@reach/router';
import { GlobalStyles, theme, ThemeProvider } from '@splitshare/ui';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import client from './apollo';
import AppProvider from './context/AppProvider';
import Bill from './routes/Bill';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Register from './routes/Register';
import AuthLayout from './routes/utils/AuthLayout';
import DashLayout from './routes/utils/DashLayout';

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AppProvider client={client}>
            <ThemeProvider theme={theme}>
              <>
                <GlobalStyles />
                <Router primary={false}>
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
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default App;
