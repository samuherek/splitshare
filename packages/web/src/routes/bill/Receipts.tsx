import { ButtonBase, styled } from '@splitshare/ui';
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

const Receipts = ({ billId }: IProps) => {
  const [showReceiptId, setReceiptId] = React.useState<null | string>(null);
  const [showReceiptNewOverlay, setReceiptOverlay] = React.useState(false);

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
    <ReceiptsStyled>
      <ReceiptsToolbarStyled>
        {!showReceiptNewOverlay ? (
          <span>Order by newest</span>
        ) : (
          <h3>Create new Receipt</h3>
        )}
        <ButtonBase
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            if (showReceiptNewOverlay) {
              setReceiptOverlay(false);
            } else {
              setReceiptOverlay(true);
            }
          }}
        >
          {showReceiptNewOverlay ? 'Cancel' : '+ Add Receipt'}
        </ButtonBase>
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
  );
};

export default Receipts;
