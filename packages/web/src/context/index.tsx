import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ApolloProviderWrap from '../Apollo/ApolloProviderWrap';
import { Auth0Provider } from '../Auth0/Auth0Provider';
import theme from '../styles/index';

interface Props {
  children: React.ReactNode;
}

// We need this to block all the other "gql request"
// before we verify there is an already existing user.
// Otherwise we can trigger two requests which both
// would want to create a user if doesn't exist (auth0)
// and one of them would have to fail in the backend.
// Because we have a unique email constraint and
// both actions are async.
// TODO: look if this is the only way to do it with
// current implementation.
function WaitForUserCreation({ children }: any) {
  const { data, loading, error } = useQuery(gql`
    query Me {
      me {
        id
        email
        displayName
      }
    }
  `);

  if (loading || error || !data) {
    return null;
  }

  return children;
}

function AppProviders({ children }: Props) {
  return (
    <Auth0Provider>
      <ApolloProviderWrap>
        <ThemeProvider theme={theme}>
          <WaitForUserCreation>{children}</WaitForUserCreation>
        </ThemeProvider>
      </ApolloProviderWrap>
    </Auth0Provider>
  );
}

export default AppProviders;
