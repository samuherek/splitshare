import { Link, Redirect, RouteComponentProps } from '@reach/router';
import {
  LayoutPage,
  LayoutTopBar,
  styled,
  TopBarLeft,
  TopBarRight,
} from '@splitshare/ui';
import * as React from 'react';
import SvgLogo from '../../components/icons/Logo';
import MenuInvites from '../../components/MenuInvites';
import MenuProfile from '../../components/MenuProfile';
import { AppContext } from '../../context/AppProvider';

interface IAuthLayoutProps extends RouteComponentProps {
  children: React.ReactNode;
}

const LogoLinkStyled = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    display: inline-block;
    margin-right: 5px;
  }
`;

const DashLayout = ({ children }: IAuthLayoutProps) => (
  <AppContext.Consumer>
    {({ authenticated }) => {
      if (!authenticated) {
        return <Redirect from="" to="/auth/login" noThrow />;
      }

      return (
        <LayoutPage>
          <LayoutTopBar>
            <TopBarLeft>
              <LogoLinkStyled to="/">
                <SvgLogo style={{ fontSize: 28 }} />
                Split Share
              </LogoLinkStyled>
            </TopBarLeft>
            <TopBarRight>
              <MenuInvites />
              <MenuProfile />
            </TopBarRight>
          </LayoutTopBar>
          {children}
        </LayoutPage>
      );
    }}
  </AppContext.Consumer>
);

export default DashLayout;
