import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Bill, QueryBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

type QueryBillResponse = {
  bill: Bill;
};

const QUERY_BILL = gql`
  query QueryBill($id: ID!) {
    bill(id: $id) {
      ...billMeta
    }
  }
  ${FRAGMENT_BILL_META}
`;

type Options = {
  id: string;
};

function useQueryBill({ id }: Options) {
  const query = useQuery<QueryBillResponse, QueryBillArgs>(QUERY_BILL, {
    variables: {
      id,
    },
  });

  return query;
}

export { QUERY_BILL, useQueryBill };
