import * as React from 'react';
import { useAuth0 } from './Auth0/Auth0Provider';
import AuthorizedApp from './AuthorizedApp';
import GlobalStyles from './styles/global';
import UnauthorizedApp from './UnauthorizedApp';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<div>Loading fallback</div>}>
        {isAuthenticated ? <AuthorizedApp /> : <UnauthorizedApp />}
      </React.Suspense>
    </>
  );
}

export default App;
