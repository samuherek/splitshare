import * as React from 'react';
import { LoadingPlaceholder, styled } from '@splitshare/ui';

const WrapStyled = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 25px;

  & > div {
    margin-right: 25px;
    width: 330px;
    height: 164px;
    display: inline-block;

    &:nth-child(2) {
      opacity: 0.46;
    }
    &:nth-child(3) {
      opacity: 0.25;
    }
  }
`;

const BillsListPlaceholder = () => (
  <WrapStyled>
    <LoadingPlaceholder />
    <LoadingPlaceholder />
    <LoadingPlaceholder />
  </WrapStyled>
);

export default BillsListPlaceholder;
