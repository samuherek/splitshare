// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Maybe, Receipt, ReceiptsQueryArgs, ReceiptsResponse } from 'src/types';
import { RECEIPT_META_FRAGMENT } from 'src/graphql/receiptFragments';

interface IQueryData {
  receipts: ReceiptsResponse;
}

interface IRenderProps {
  receipts: Maybe<Receipt[]>;
  hasMore: boolean;
}

interface IContainerProps {
  billId: string;
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const RECEIPTS_QUERY = gql`
  query receipts($billId: String!, $limit: Int!, $offset: Int!) {
    receipts(billId: $billId, limit: $limit, offset: $offset) {
      hasMore
      receipts {
        ...receiptMeta
        createdAt
        paidBy {
          email
        }
      }
    }
  }
  ${RECEIPT_META_FRAGMENT}
`;

const QueryReceiptsContainer: React.FC<IContainerProps> = ({
  children,
  billId,
}) => (
  <Query<IQueryData, ReceiptsQueryArgs>
    query={RECEIPTS_QUERY}
    variables={{ billId, where: { limit: 6, offset: 0 } }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        console.log(error);
      }

      return children({
        hasMore: data && data.receipts ? data.receipts.hasMore : false,
        receipts: data && data.receipts ? data.receipts.receipts : null,
      });
    }}
  </Query>
);

export default QueryReceiptsContainer;
