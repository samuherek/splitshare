import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { FRAGMENT_BILL_USER_META } from '../invite/fragments';
import { Bill, QueryBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

export type QueryBillResponse = {
  bill: Bill;
};

const QUERY_BILL = gql`
  query QueryBill($id: ID!) {
    bill(id: $id) {
      ...billMeta
      updatedAt
      closedAt
      users {
        ...billUserMeta
      }
      myBalance {
        value
        currency
        user {
          id
          email
        }
      }
    }
  }
  ${FRAGMENT_BILL_META}
  ${FRAGMENT_BILL_USER_META}
`;

type Options = {
  id: string;
  queryOpts?: QueryHookOptions;
};

function useQueryBill({ id, queryOpts }: Options) {
  const query = useQuery<QueryBillResponse, QueryBillArgs>(QUERY_BILL, {
    ...queryOpts,
    variables: {
      id,
    },
  });

  return query;
}

export { QUERY_BILL, useQueryBill };
