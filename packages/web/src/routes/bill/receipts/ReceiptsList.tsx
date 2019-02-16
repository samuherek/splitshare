import { AvatarUser, Button, styled } from '@splitshare/ui';
import { distanceInWordsStrict } from 'date-fns';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RECEIPTS_QUERY } from '../../../graphql/ReceiptsQuery';
import { Receipt, ReceiptsQueryArgs } from '../../../types';
import getCurrencySymbol from '../../../utils/getCurrencySymbol';

interface IProps {
  billId: string;
}

const ReceiptStyled = styled.div`
  padding: 15px 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ReceiptsList: React.FC<IProps> = ({ billId }) => {
  const { data, loading, fetchMore, error, ...rest } = useQuery<
    any,
    ReceiptsQueryArgs
  >(RECEIPTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { billId, where: { limit: 6, offset: 0 } },
  });

  if (!data && loading) {
    return <div>Loading......</div>;
  }

  if (data.receipts.length === 0) {
    return (
      <div>
        <span>You have no receipts</span>
      </div>
    );
  }

  console.log(data, loading, error, rest);

  return (
    <>
      {data.receipts.receipts.map((r: Receipt) => (
        <ReceiptStyled key={r.id}>
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
              {distanceInWordsStrict(new Date(), Date.parse(r.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <span>
            {r.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
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
