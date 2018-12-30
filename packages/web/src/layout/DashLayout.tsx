import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import styled from 'styled-components';

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
  <PageStyled>{children}</PageStyled>
);

export default DashLayout;
