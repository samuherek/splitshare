import * as React from 'react';
import { Link, LinkGetProps } from '@reach/router';
import { styled } from '@splitshare/ui';

// TODO: fix type checking for LinkProps. We should extend.
interface INavLink {
  to?: string;
  replace?: boolean;
  getProps?: (props: LinkGetProps) => {};
  children: React.ReactNode;
  className?: string;
}

// TODO: This is a hack https://github.com/reach/router/pull/118
const NavLinkBase: React.FunctionComponent<INavLink> = props => (
  <Link
    getProps={({ isCurrent, isPartiallyCurrent, href }) =>
      isCurrent || (isPartiallyCurrent && href !== '/')
        ? { className: `${props.className} active` }
        : {}
    }
    {...props}
  />
);

const NavLink = styled(NavLinkBase)`
  display: block;
  text-decoration: none;

  &.active {
    color: red;
  }
`;

export default NavLink;
