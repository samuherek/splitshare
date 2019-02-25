import { RouteComponentProps } from '@reach/router';
import { ButtonBase, styled } from '@splitshare/ui';
import * as React from 'react';
import PageModal, { PageModalInner } from '../components/PageModal';
import BillNewOverlay from './dashboard/BillNewOverlay';
import BillsList from './dashboard/BillsList';
import BillsListPlaceholder from './dashboard/BillsListPlaceholder';
import ReceiptNewOverlay from './dashboard/ReceiptNewOverlay';

const ButtonsWrapStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonStyled: any = styled(ButtonBase)`
  padding: 50px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 15px;

  &:hover {
    opacity: 0.5;
  }
`;

const SectionWrapStyled = styled.div`
  max-width: 1260px;
  margin: 45px auto;
  padding: 0 5vw;

  h3 {
    margin-bottom: 25px;
  }
`;

const Dashboard = (props: RouteComponentProps) => {
  const [showBillNewOverlay, setShowBillNewOverlay] = React.useState(false);
  const [showReceiptNewOverlay, setShowReceiptNewOverlay] = React.useState(
    false
  );

  return (
    <>
      <SectionWrapStyled>
        <React.Suspense fallback={<BillsListPlaceholder />}>
          <BillsList />
        </React.Suspense>
      </SectionWrapStyled>
      <ButtonsWrapStyled>
        <ButtonStyled
          onClick={() => {
            setShowBillNewOverlay(true);
          }}
        >
          Add new bill
        </ButtonStyled>
        <ButtonStyled
          onClick={() => {
            setShowReceiptNewOverlay(true);
          }}
        >
          Add new receipt
        </ButtonStyled>
      </ButtonsWrapStyled>
      {showBillNewOverlay ? (
        <PageModal>
          <PageModalInner>
            <BillNewOverlay
              onCancel={() => {
                setShowBillNewOverlay(false);
              }}
            />
          </PageModalInner>
        </PageModal>
      ) : null}
      {showReceiptNewOverlay ? (
        <PageModal>
          <PageModalInner>
            <ReceiptNewOverlay
              onCancel={() => {
                setShowReceiptNewOverlay(false);
              }}
            />
          </PageModalInner>
        </PageModal>
      ) : null}
    </>
  );
};

export default Dashboard;
