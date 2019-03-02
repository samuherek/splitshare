import { AvatarUser, Button, styled } from '@splitshare/ui';
// @ts-ignore
import capitalize from 'capitalize';
import { format } from 'date-fns';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import SvgGroceries from '../../../components/icons/Groceries';
import { RECEIPTS_QUERY } from '../../../graphql/ReceiptsQuery';
import { Receipt, ReceiptsQueryArgs } from '../../../types';
import getCurrencySymbol from '../../../utils/getCurrencySymbol';

interface IProps {
  billId: string;
  onSelect: (id: string) => void;
}

const ReceiptStyled = styled.div`
  padding: 15px 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  max-width: 600px;
`;

const ReceiptsList: React.FC<IProps> = ({ billId, onSelect }) => {
  const { data, loading, fetchMore } = useQuery<any, ReceiptsQueryArgs>(
    RECEIPTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: { billId, where: { limit: 6, offset: 0 } },
    }
  );

  if (!data && loading) {
    return <div>Loading......</div>;
  }

  if (data.receipts.receipts.length === 0) {
    return (
      <div>
        <span>You have no receipts</span>
      </div>
    );
  }

  // console.log(data, loading, error, rest);

  return (
    <>
      {data.receipts.receipts.map((r: Receipt) => (
        <ReceiptStyled key={r.id} onClick={() => onSelect(r.id)}>
          <AvatarUser
            name={r.paidBy.displayName || r.paidBy.email}
            style={{
              fontSize: '18px',
              height: '40px',
              width: '40px',
            }}
          />
          <span
            style={{
              background: '#E1E1E6',
              display: 'block',
              height: 22,
              margin: '0 25px',
              width: 1,
            }}
          />

          <SvgGroceries style={{ fontSize: 32 }} />

          <div
            style={{
              marginLeft: 15,
              marginRight: 15,
              width: 250,
            }}
          >
            <div>
              <span style={{ display: 'block', marginBottom: 5 }}>
                {r.company}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {r.category ? (
                <>
                  <span style={{ fontSize: 12, opacity: 0.3 }}>
                    {capitalize(r.category)}
                  </span>
                  <span
                    style={{
                      background: '#E1E1E6',
                      display: 'inline-block',
                      height: 10,
                      margin: '0 10px',
                      width: 1,
                    }}
                  />
                </>
              ) : null}
              <span style={{ fontSize: 12, opacity: 0.3 }}>
                {format(r.paidAt, 'MMM D, YYYY')}
              </span>
            </div>
          </div>
          <span style={{ marginLeft: 'auto' }}>
            {r.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{' '}
            {getCurrencySymbol(r.currency)}
          </span>
        </ReceiptStyled>
      ))}
      {data.receipts.hasMore ? (
        <Button
          onClick={() => {
            fetchMore({
              updateQuery: (prev, { fetchMoreResult }) => {
                console.log('=======', prev, fetchMoreResult);
                if (!fetchMoreResult) {
                  return prev;
                }
                return {
                  ...prev,
                  receipts: {
                    ...prev.receipts,
                    hasMore: fetchMoreResult.receipts.hasMore,
                    receipts: [
                      ...prev.receipts.receipts,
                      ...fetchMoreResult.receipts.receipts,
                    ],
                  },
                };
              },
              variables: {
                where: { offset: data.receipts.receipts.length },
              },
            });
          }}
        >
          Load more
        </Button>
      ) : null}
    </>
  );
};

export default ReceiptsList;
