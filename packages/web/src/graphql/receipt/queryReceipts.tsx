import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { FRAGMENT_PG_PAGE_INFO } from '../fragments';
import { QueryReceiptsArgs, ReceiptConnection } from '../types';
import { FRAGMENT_USER_META } from '../user/fragments';
import { FRAGMENT_RECEIPT_META } from './fragments';

export type QueryReceiptsData = {
  receipts: ReceiptConnection;
};

const QUERY_RECEIPTS = gql`
  query QueryReceipts(
    $billId: ID!
    $pagination: PaginationInput
    $filter: ReceiptsFilter
  ) {
    receipts(billId: $billId, pagination: $pagination, filter: $filter) {
      edges {
        node {
          ...receiptMeta
          category
          total
          currency
          paidAt
          createdAt
          updatedAt
          paidBy {
            ...userMeta
          }
        }
        cursor
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${FRAGMENT_PG_PAGE_INFO}
  ${FRAGMENT_RECEIPT_META}
  ${FRAGMENT_USER_META}
`;

type Options = {
  billId: string;
  queryOpts?: QueryHookOptions;
};

function useQueryReceipts({ billId, queryOpts }: Options) {
  const query = useQuery<QueryReceiptsData, QueryReceiptsArgs>(QUERY_RECEIPTS, {
    ...queryOpts,
    variables: {
      billId,
    },
  });

  return query;
}

export { QUERY_RECEIPTS, useQueryReceipts };
