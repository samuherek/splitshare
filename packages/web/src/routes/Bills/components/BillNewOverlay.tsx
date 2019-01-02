import * as React from 'react';
import { Button, styled } from '@splitshare/ui';

interface IBillNewOverlayProps {
  onCancel: () => void;
}

const WrapStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100%;
`;

const BillNewOverlay: React.FunctionComponent<IBillNewOverlayProps> = ({
  onCancel,
}) => (
  <WrapStyled>
    <h3>Create new bill</h3>
    <Button onClick={onCancel}>Cancel</Button>
  </WrapStyled>
);

export default BillNewOverlay;
