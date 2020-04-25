import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { FRAGMENT_BILL_USER_META } from '../invite/fragments';
import { Bill, QueryBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

export type QueryBillResponse = {
  bill: Bill;
};

export type QueryBillArgsExtended = QueryBillArgs & {
  withMeta: boolean;
  withUsers: boolean;
  withBalance: boolean;
};

const QUERY_BILL = gql`
  query QueryBill(
    $id: ID!
    $withMeta: Boolean!
    $withUsers: Boolean!
    $withBalance: Boolean!
  ) {
    bill(id: $id) {
      id
      ...billMeta @include(if: $withMeta)
      users @include(if: $withUsers) {
        ...billUserMeta
      }
      myBalance @include(if: $withBalance) {
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
  withBalance?: boolean;
  withMeta?: boolean;
  withUsers?: boolean;
  queryOpts?: QueryHookOptions;
};

function useQueryBill({
  id,
  withBalance = false,
  withMeta = true,
  withUsers = true,
  queryOpts,
}: Options) {
  const query = useQuery<QueryBillResponse, QueryBillArgsExtended>(QUERY_BILL, {
    ...queryOpts,
    variables: {
      id,
      withBalance,
      withMeta,
      withUsers,
    },
  });

  return query;
}

export { QUERY_BILL, useQueryBill };
