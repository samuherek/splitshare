import * as React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

import { AppContext } from '../../context/AppProvider';

interface IAuthLayoutProps extends RouteComponentProps {
  children: React.ReactNode;
}

const DashLayout = ({ children }: IAuthLayoutProps) => (
  <AppContext.Consumer>
    {({ authenticated }) => {
      if (!authenticated) {
        return <Redirect from="" to="/auth/login" noThrow />;
      }

      return children;
    }}
  </AppContext.Consumer>
);

export default DashLayout;
