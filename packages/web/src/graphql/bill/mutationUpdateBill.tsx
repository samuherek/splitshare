import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  Bill,
  BillStatus,
  MutationUpdateBillArgs,
  QueryBillArgs,
} from '../types';
import { FRAGMENT_BILL_META } from './fragments';
import { QueryBillResponse, QUERY_BILL } from './queryBill';
import { QUERY_BILLS } from './queryBills';

export type MutationUpdateBillResponse = {
  updateBill: Bill;
};

const MUTATION_UPDATE_BILL = gql`
  mutation MutationUpdateBill($id: ID!, $input: UpdateBillInput!) {
    updateBill(id: $id, input: $input) {
      ...billMeta
      closedAt
    }
  }
  ${FRAGMENT_BILL_META}
`;

type Options = {
  billId: string;
  name?: string;
  currency?: string;
  closed?: boolean;
  mutationOpts?: MutationHookOptions;
};

function useMutationUpdateBill({
  billId,
  name,
  currency,
  closed,
  mutationOpts,
}: Options) {
  const mutation = useMutation<
    MutationUpdateBillResponse,
    MutationUpdateBillArgs
  >(MUTATION_UPDATE_BILL, {
    ...mutationOpts,
    variables: {
      id: billId,
      input: {
        name,
        currency,
        closed,
      },
    },
    update: (cache, res) => {
      const query = {
        query: QUERY_BILL,
        variables: {
          id: billId,
        },
      };

      const data = cache.readQuery<QueryBillResponse, QueryBillArgs>(query);

      if (!data) {
        return;
      }

      cache.writeQuery<QueryBillResponse, QueryBillArgs>({
        ...query,
        data: {
          bill: {
            ...data.bill,
            ...res.data?.updateBill,
          },
        },
      });
    },
    // Dashboard queries
    refetchQueries: [
      {
        query: QUERY_BILLS,
        variables: {
          filter: {
            status: BillStatus.Opened,
          },
        },
      },
      {
        query: QUERY_BILLS,
        variables: {
          filter: {
            status: BillStatus.Closed,
          },
        },
      },
    ],
  });

  return mutation;
}

export { MUTATION_UPDATE_BILL, useMutationUpdateBill };
