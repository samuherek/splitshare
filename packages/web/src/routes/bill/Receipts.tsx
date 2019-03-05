import { ButtonBase, styled } from '@splitshare/ui';
import { format } from 'date-fns';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import ReceiptNewForm from '../../components/ReceiptNewForm';
import { RECEIPTS_QUERY } from '../../graphql/ReceiptsQuery';
import ReceiptOverlay from './ReceiptOverlay';
import ReceiptsList from './receipts/ReceiptsList';

interface IProps {
  billId: string;
}

const ReceiptsStyled = styled.div`
  position: relative;
  padding-bottom: 50px;
`;

const ReceiptsToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const ButtonStyled = styled(ButtonBase)`
  bottom: 20vh;
  left: 7vw;
  margin-left: auto;
  position: absolute;
  background: #46dc75;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  color: white;
`;

const Receipts = ({ billId }: IProps) => {
  const [showReceiptId, setReceiptId] = React.useState<null | string>(null);
  const [showReceiptNewOverlay, setReceiptOverlay] = React.useState(true);
  const [dateFilter] = React.useState<Date>(new Date());

  const { data, error } = useQuery(RECEIPTS_QUERY, {
    variables: { billId, where: { limit: 6, offset: 0 } },
  });

  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }

  if (!data.receipts) {
    return null;
  }

  return (
    <>
      <ButtonStyled
        onClick={() => {
          if (showReceiptNewOverlay) {
            setReceiptOverlay(false);
          } else {
            setReceiptOverlay(true);
          }
        }}
      >
        {showReceiptNewOverlay ? 'Cancel' : '+'}
      </ButtonStyled>
      <ReceiptsStyled>
        <ReceiptsToolbarStyled>
          <h2 style={{ fontSize: 28 }}>{format(dateFilter, 'MMMM YYYY')}</h2>
          {!showReceiptNewOverlay ? null : <h3>Create new Receipt</h3>}
        </ReceiptsToolbarStyled>
        {showReceiptNewOverlay ? (
          <ReceiptNewForm
            billId={billId}
            onCancel={() => setReceiptOverlay(false)}
          />
        ) : (
          <ReceiptsList billId={billId} onSelect={setReceiptId} />
        )}
        {showReceiptId !== null ? (
          <ReceiptOverlay
            onCancel={() => setReceiptId(null)}
            receiptId={showReceiptId}
          />
        ) : null}
      </ReceiptsStyled>
    </>
  );
};

export default Receipts;
