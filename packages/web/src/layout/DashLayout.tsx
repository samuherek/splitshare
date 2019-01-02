import { RouteComponentProps, Redirect, Link } from '@reach/router';
import * as React from 'react';
import { styled } from '@splitshare/ui';

import { AppContext } from 'src/context/AppProvider';
import NavLink from 'src/components/NavLink';

interface IAuthLayoutProps extends RouteComponentProps {
  children: React.ReactNode;
}

// JSX.Element

const PageStyled = styled.div`
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
`;

const LogoLinkStyled = styled(Link)`
  /* font-size: 14px; */
  text-decoration: none;
`;

const ActionWrapStyled = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 15px;
  }
`;

const AvatarStyled = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #eee;
`;

const DashLayout = ({ children }: IAuthLayoutProps) => (
  <AppContext.Consumer>
    {({ authenticated }) => {
      if (!authenticated) {
        return <Redirect from="" to="/auth/login" noThrow />;
      }

      return (
        <PageStyled>
          <TopBar>
            <LogoLinkStyled to="/">SplitShare</LogoLinkStyled>
            <ActionWrapStyled>
              <NavLink to="/">Dash</NavLink>
              <NavLink to="/bills">Bills</NavLink>
              <NavLink to="/profile">
                <AvatarStyled>S</AvatarStyled>
              </NavLink>
            </ActionWrapStyled>
          </TopBar>
          {children}
        </PageStyled>
      );
    }}
  </AppContext.Consumer>
);

export default DashLayout;
