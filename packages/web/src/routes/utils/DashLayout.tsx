import { Link, Redirect, RouteComponentProps } from '@reach/router';
import {
  LayoutPage,
  LayoutTopBar,
  styled,
  TopBarLeft,
  TopBarRight,
} from '@splitshare/ui';
import get from 'lodash.get';
import * as React from 'react';
import SvgBack from '../../components/icons/Back';
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

const DashLayout = ({ children, location }: IAuthLayoutProps) => (
  <AppContext.Consumer>
    {({ authenticated }) => {
      if (!authenticated) {
        return <Redirect from="" to="/auth/login" noThrow />;
      }

      return (
        <LayoutPage>
          <LayoutTopBar>
            <TopBarLeft>
              {get(location, 'pathname', '/') !== '/' ? (
                <Link
                  to="/"
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginRight: 45,
                  }}
                >
                  <SvgBack style={{ marginRight: 10 }} />
                  Back
                </Link>
              ) : null}
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
