import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
import React from 'react';
import { useAuth0 } from '../Auth0/Auth0Provider';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // TODO: Log out user if not authenticated anymore???
  if (networkError) {
    console.log('[Network Error]:', networkError);
  }
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
});

async function createApolloClient(getToken: any) {
  const token = await getToken();
  const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_API_BASE_URL!}/graphql` as string,
    credentials: 'include',
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]),
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
