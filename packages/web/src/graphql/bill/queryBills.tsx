import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { FRAGMENT_PG_PAGE_INFO } from '../fragments';
import { FRAGMENT_BILL_USER_META } from '../invite/fragments';
import {
  BillConnection,
  BillStatus,
  PaginationInput,
  QueryBillsArgs,
} from '../types';
import { FRAGMENT_BILL_META } from './fragments';

type QueryBillsData = {
  bills: BillConnection;
};

export type QueryBillsArgsExtended = QueryBillsArgs & {
  withUsers: boolean;
};

const QUERY_BILLS = gql`
  query QueryBills(
    $withUsers: Boolean!
    $pagination: PaginationInput
    $filter: BillsFilter
  ) {
    bills(pagination: $pagination, filter: $filter) {
      edges {
        node {
          id
          ...billMeta
          users @include(if: $withUsers) {
            ...billUserMeta
          }
        }
        cursor
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${FRAGMENT_BILL_META}
  ${FRAGMENT_PG_PAGE_INFO}
  ${FRAGMENT_BILL_USER_META}
`;

type Options = PaginationInput & {
  status?: BillStatus;
  withUsers?: boolean;
  queryOpts?: QueryHookOptions;
};

function useQueryBills({
  status,
  limit,
  after,
  offset,
  withUsers = false,
  queryOpts,
}: Options = {}) {
  const query = useQuery<QueryBillsData, QueryBillsArgsExtended>(QUERY_BILLS, {
    ...queryOpts,
    variables: {
      withUsers,
      pagination: {
        limit,
        after,
        offset,
      },
      filter: {
        status,
      },
    },
  });

  return query;
}

export { QUERY_BILLS, useQueryBills };
