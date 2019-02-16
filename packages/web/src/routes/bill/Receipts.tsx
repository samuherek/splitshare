import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import ReceiptsQueryContainer, {
  RECEIPTS_QUERY,
} from '../../graphql/ReceiptsQuery';
import { styled, ButtonBase, AvatarUser } from '@splitshare/ui';
// import ReceiptNewForm from '../../components/ReceiptNewForm';
import { distanceInWordsStrict } from 'date-fns';
import getCurrencySymbol from '../../utils/getCurrencySymbol';
import ReceiptOverlay from './ReceiptOverlay';
import ReceiptNewForm from '../../components/ReceiptNewForm';

interface IProps {
  billId: string;
}

const ReceiptsStyled = styled.div`
  position: relative;
`;

const ReceiptsToolbarStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const ReceiptStyled = styled.div`
  padding: 15px 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
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
        <ReceiptsQueryContainer billId={billId}>
          {({ receipts }) => {
            if (!receipts) {
              return null;
            }

            if (receipts.length === 0) {
              return (
                <div>
                  <span>You have no receipts</span>
                </div>
              );
            }

            return receipts.map(r => (
              <ReceiptStyled key={r.id} onClick={() => setReceiptId(r.id)}>
                <AvatarUser
                  name={r.paidBy.displayName || r.paidBy.email}
                  style={{
                    fontSize: '18px',
                    height: '40px',
                    width: '40px',
                  }}
                />
                <div
                  style={{
                    marginLeft: 15,
                    marginRight: 15,
                    width: 250,
                  }}
                >
                  <span style={{ display: 'block' }}>{r.company}</span>
                  <span style={{ fontSize: 12, opacity: 0.3 }}>
                    {distanceInWordsStrict(
                      new Date(),
                      Date.parse(r.createdAt),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </div>
                <span>
                  {r.total.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  {getCurrencySymbol(r.currency)}
                </span>
              </ReceiptStyled>
            ));
          }}
        </ReceiptsQueryContainer>
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
