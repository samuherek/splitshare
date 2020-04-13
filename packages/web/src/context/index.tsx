import { navigate } from '@reach/router';
import React from 'react';
import ApolloProviderWrap from '../Apollo/ApolloProviderWrap';
import { Auth0Provider } from '../Auth0/Auth0Provider';
import { DateUtilsProvider, DayjsUtils } from '../components/DatePicker';
import ErrorMessage from '../components/ErrorMessage';
import { UserState } from '../graphql/types';
import { useQueryMe } from '../graphql/user/queryMe';
import {
  DateUtilsProvider as GlobalDateUtilsProvider,
  DayjsDateUtils,
} from '../libs/date-utils';

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
  const { data, loading, error } = useQueryMe();

  console.log('logged in user:', data?.me);
  const userState = data?.me?.state;

  React.useEffect(() => {
    if (userState === UserState.OnboardingVerifyEmail) {
      navigate('/verify', { replace: true });
    } else if (userState === UserState.OnboardingProfile) {
      navigate('/setup', { replace: true });
    }
  }, [userState]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !data) {
    return null;
  }

  return children;
}

function AppProviders({ children }: Props) {
  return (
    <Auth0Provider>
      <ApolloProviderWrap>
        <WaitForUserCreation>
          <GlobalDateUtilsProvider utils={DayjsDateUtils}>
            <DateUtilsProvider utils={DayjsUtils}>{children}</DateUtilsProvider>
          </GlobalDateUtilsProvider>
        </WaitForUserCreation>
      </ApolloProviderWrap>
    </Auth0Provider>
  );
}

export default AppProviders;
