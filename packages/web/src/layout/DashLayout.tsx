import { RouteComponentProps, Redirect } from '@reach/router';
import * as React from 'react';
import { styled } from '@splitshare/ui';

import { AppContext } from 'src/context/AppProvider';

interface IAuthLayoutProps extends RouteComponentProps {
  children: JSX.Element | JSX.Element[];
}

const PageStyled = styled.div`
  min-height: 100vh;

  & > div {
    min-height: 100vh;
  }
`;

const DashLayout = ({ children }: IAuthLayoutProps) => (
  <AppContext.Consumer>
    {({ authenticated }) => {
      if (!authenticated) {
        return <Redirect from="" to="/auth/login" noThrow />;
      }

      return <PageStyled>{children}</PageStyled>;
    }}
  </AppContext.Consumer>
);

export default DashLayout;
