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
          // authorization: token
          //   ? `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqZzJSa0kyTXpnMk1VRkJNRE14UlRkRU1EWTVRelUyTmtFeVJqUTFNelJFUWtNMU5EUXhNUSJ9.eyJodHRwczovL3NwbGl0c2hhcmUubWUvZW1haWwiOiJzYW11aGVyZWtiaXpAZ21haWwuY29tIiwiaHR0cHM6Ly9zcGxpdHNoYXJlLm1lL2VtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9zcGxpdHNoYXJlLWRldi5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWRkNmI0YTI3ZThlNTcwZjE3OWU2ZjNiIiwiYXVkIjpbImdyYXBocWwtZGV2IiwiaHR0cHM6Ly9zcGxpdHNoYXJlLWRldi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTc0NDMwMTU5LCJleHAiOjE1NzQ1MTY1NTksImF6cCI6IktoZ3JVaWZudzdRM3B6cXlwVGNOVUk0R1A4emZmWW5kIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.JU9Bqz8kn8jPMe6BSqBYquMWdQQHzzCEiOCaOntPRdwNf5dYtoqjXYBoFqCyDEoLb-lKgi6ftXTNe4YP8e6Sju1AXUImv2V13KDqsHkbYH2092wJDscTVNtbr-mUyfR9FXcUGDw9qw40bad_GqLn5gUkAiZbnZ3fOb0NKI6mgvgctJ6-VMJtrWXNykk8IkGuNqmSwLNM7JQqKR1lmPnukADIVf_3h_sH3gqvvBGknQapo5HS2drE78A_QlIg6lE__c3k86Jt5fk-uAivhVIWVgu-GJKUTUu5aKh-jCpBthB5hg81DwOZTgZekCHyjRUiDOPqdk59yPPgfmM0RpMuHQ`
          //   : null,
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

  // console.log('client', client);
  return <ApolloProvider client={client} {...props} />;
}

export default ApolloProviderWrap;
