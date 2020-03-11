import { QueryHookOptions, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { FRAGMENT_PG_PAGE_INFO } from '../fragments';
import { BillConnection, BillStatus, QueryBillsArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

type QueryBillsData = {
  bills: BillConnection;
};

const QUERY_BILLS = gql`
  query queryBills($pagination: PaginationInput, $filter: BillsFilter) {
    bills(pagination: $pagination, filter: $filter) {
      edges {
        node {
          ...billMeta
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
`;

type Options = {
  status?: BillStatus;
  queryOpts?: QueryHookOptions;
};

function useQueryBills({ status, queryOpts }: Options = {}) {
  const query = useQuery<QueryBillsData, QueryBillsArgs>(QUERY_BILLS, {
    ...queryOpts,
    variables: {
      filter: {
        status,
      },
    },
  });

  return query;
}

export { QUERY_BILLS, useQueryBills };
