import { Redirect, RouteComponentProps } from '@reach/router';
import { styled } from '@splitshare/ui';
import * as React from 'react';
import PageModal, { PageModalInner } from '../components/PageModal';
import getUUIDFromUrl from '../utils/getUUIDFromUrl';
import BillInfo from './bill/BillInfo';
import InviteOverlay from './bill/InviteOverlay';
import Receipts from './bill/Receipts';

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
    <>
      {/* <Link to="/">Back</Link> */}
      <BillWrapStyled>
        <React.Suspense fallback={<div>loading</div>}>
          <BillInfo
            billId={billId}
            navigate={navigate}
            setInviteOverlay={setInviteOverlay}
          />
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
    </>
  );
};

export default Bill;
