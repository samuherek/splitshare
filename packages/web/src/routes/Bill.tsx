import * as React from 'react';
import { RouteComponentProps, Link, Redirect } from '@reach/router';

import {
  TopBarLeft,
  LayoutTopBar,
  LayoutPage,
  TopBarRight,
  styled,
  Button,
} from '@splitshare/ui';
import getUUIDFromUrl from '../utils/getUUIDFromUrl';
import BillInfo from './bill/BillInfo';
import Receipts from './bill/Receipts';
import PageModal, { PageModalInner } from '../components/PageModal';
import InviteOverlay from './bill/InviteOverlay';

interface IProps extends RouteComponentProps {
  billParam?: string;
}

const BillWrapStyled = styled.div`
  display: grid;
  max-width: 1260px;
  margin: 45px auto 0;
  padding: 0 5vw;
  grid-template-columns: 400px 1fr;

  h2 {
    margin-bottom: 25px;
    font-size: 18px;
  }
`;

const Bill = ({ billParam, navigate }: IProps) => {
  const billId = billParam ? getUUIDFromUrl(billParam) : null;

  if (!billId) {
    return <Redirect from="/billParam" to="/" noThrow />;
  }

  const [showInviteOverlay, setInviteOverlay] = React.useState(false);

  return (
    <LayoutPage>
      <LayoutTopBar>
        <TopBarLeft>
          <Link to="/">Back</Link>
        </TopBarLeft>
        <TopBarRight>
          <Button onClick={() => setInviteOverlay(true)}>+ Invite</Button>
          <span>right menu</span>
        </TopBarRight>
      </LayoutTopBar>
      <BillWrapStyled>
        <React.Suspense fallback={<div>loading</div>}>
          <BillInfo billId={billId} navigate={navigate} />
        </React.Suspense>
        <React.Suspense fallback={<div>loading</div>}>
          <Receipts billId={billId} />
        </React.Suspense>
        {showInviteOverlay ? (
          <PageModal>
            <PageModalInner>
              <InviteOverlay
                onCancel={() => setInviteOverlay(false)}
                billId={billId || ''}
                billTitle={''}
              />
            </PageModalInner>
          </PageModal>
        ) : null}
      </BillWrapStyled>
    </LayoutPage>
  );
};

export default Bill;
