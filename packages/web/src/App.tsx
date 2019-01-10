import { Router } from '@reach/router';
import { GlobalStyles, theme, ThemeProvider } from '@splitshare/ui';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import AuthLayout from './layout/AuthLayout';
import DashLayout from './layout/DashLayout';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';
import NotFound from './routes/NotFound';
import client from './apollo';
import AppProvider from './context/AppProvider';
import Bills from './routes/Bills';
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
                <DashLayout path="/">
                  <Dashboard path="/" />
                  <Bills path="/bills" />
                  <Bill path="/bills/:billId" />
                  <NotFound default={true} />
                </DashLayout>
                <AuthLayout path="auth">
                  <Login path="login" />
                  <Register path="signup" />
                  <NotFound default={true} />
                </AuthLayout>
              </Router>
            </>
          </ThemeProvider>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default App;
