import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { useAuth0 } from '../Auth0/Auth0Provider';

async function createApolloClient(getToken: any) {
  const token = await getToken();

  return new ApolloClient({
    credentials: 'include',
    // @ts-ignore
    onError: ({ graphQLErrors, networkError }) => {
      // Show the field based errors in the console
      console.log(graphQLErrors, networkError);
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, ...args }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      // Show a network error in the console
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
    request: (operation): any => {
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      });
    },
    uri: `${process.env.REACT_APP_API_BASE_URL!}/graphql` as string,
  });
}

function ApolloProviderWrap(props: any) {
  const { getToken } = useAuth0();
  const [client, setClient] = React.useState<any>();

  React.useEffect(() => {
    async function initClient() {
      let c;
      try {
        c = await createApolloClient(getToken);
      } catch (err) {
        console.log(err);
      }
      setClient(c);
    }
    initClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client} {...props} />;
}

export default ApolloProviderWrap;
