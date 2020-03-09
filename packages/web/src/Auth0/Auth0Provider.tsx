import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface Auth0Ctx {
  auth0: Auth0Client;
  getToken: (options?: GetTokenSilentlyOptions) => Promise<any>;
  isAuthenticated: boolean;
  loading: boolean;
  login: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => void;
}

const Auth0Context = React.createContext<Auth0Ctx | undefined>(undefined);

function Auth0Provider(props: Props) {
  const [loading, setLoading] = React.useState(true);
  const [auth0Client, setAuth0] = React.useState<Auth0Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    async function initAuth0() {
      // Init auth0 client
      const auth0 = await createAuth0Client({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE || '',
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
        domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
        redirect_uri: window.location.origin,
        // responseType: 'token',
      });

      // In case we already have an authenticated token in URL
      if (window.location.search.includes('code=')) {
        try {
          const { appState } = await auth0.handleRedirectCallback();
          const { pathname = '/', search = '', hash = '' } = JSON.parse(
            appState || '{}'
          );

          window.history.replaceState(
            {},
            document.title,
            `${pathname}${search}${hash}`
          );
        } catch {}
      }

      // Check if user is authenticated
      let authenticated = false;
      try {
        authenticated = await auth0.isAuthenticated();
        // console.log(authenticated);
        if (!authenticated) {
          // const res = await auth0.getTokenSilently();
          // console.log(res);
          const { pathname, search, hash } = window.location;
          auth0.loginWithRedirect({
            appState: JSON.stringify({ pathname, search, hash }),
          });
        }
      } catch {}

      // We are done. Get the app going as usual
      setAuth0(auth0);
      setIsAuthenticated(authenticated);
      setLoading(false);
    }

    initAuth0();
  }, []);

  const getToken = React.useCallback(
    (options?: GetTokenSilentlyOptions) =>
      auth0Client && auth0Client.getTokenSilently(options),
    [auth0Client]
  );

  const login = React.useCallback(
    (options?: RedirectLoginOptions) =>
      auth0Client && auth0Client.loginWithRedirect(options),
    [auth0Client]
  );

  const logout = React.useCallback(
    (options?: LogoutOptions) => auth0Client && auth0Client.logout(options),
    [auth0Client]
  );

  const values = {
    auth0: auth0Client,
    getToken,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  if (loading) {
    return null;
  }

  return (
    // @ts-ignore
    <Auth0Context.Provider value={values} {...props} />
  );
}

function useAuth0() {
  const context = React.useContext(Auth0Context);
  if (context === undefined) {
    throw new Error('useAuth0 must be used within Auth0Provider');
  }

  return context;
}

export { Auth0Provider, useAuth0 };
