import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { styled } from '@splitshare/ui';

const SectionWrapStyled = styled.div`
  margin: 45px;

  h3 {
    margin-bottom: 25px;
  }
`;

const Bills: React.FC<RouteComponentProps> = () => (
  <SectionWrapStyled>
    <span>we are working on this ;</span>
  </SectionWrapStyled>
);

export default Bills;
