import * as React from 'react';
import { styled } from '@splitshare/ui';

const InnerStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: white;
`;

const PageModalInner: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => <InnerStyled>{children}</InnerStyled>;

export default PageModalInner;
