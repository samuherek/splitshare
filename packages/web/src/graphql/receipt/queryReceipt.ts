import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { QueryReceiptArgs, Receipt } from '../types';
import { FRAGMENT_USER_META } from '../user/fragments';
import { FRAGMENT_RECEIPT_META } from './fragments';

export type QueryReceiptData = {
  receipt: Receipt;
};

const QUERY_RECEIPT = gql`
  query QueryReceipt($id: ID!) {
    receipt(id: $id) {
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
      isSettlement
      splits {
        user {
          ...userMeta
        }
        value
        currency
        owingTo {
          ...userMeta
        }
      }
    }
  }
  ${FRAGMENT_RECEIPT_META}
  ${FRAGMENT_USER_META}
`;

type Options = {
  receiptId: string;
  queryOpts?: QueryHookOptions;
};

function useQueryReceipt({ receiptId, queryOpts }: Options) {
  const query = useQuery<QueryReceiptData, QueryReceiptArgs>(QUERY_RECEIPT, {
    ...queryOpts,
    variables: {
      id: receiptId,
    },
  });

  return query;
}

export { QUERY_RECEIPT, useQueryReceipt };
