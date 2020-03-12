import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Bill, BillStatus, MutationDeleteBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';
import { QUERY_BILLS } from './queryBills';

export type MutationDeleteBillResponse = {
  deleteBill: Bill;
};

const MUTATION_DELETE_BILL = gql`
  mutation MutationDeleteBill($id: ID!) {
    deleteBill(id: $id) {
      ...billMeta
    }
  }
  ${FRAGMENT_BILL_META}
`;

type Options = {
  billId: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationDeleteBill({ billId, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationDeleteBillResponse,
    MutationDeleteBillArgs
  >(MUTATION_DELETE_BILL, {
    ...mutationOpts,
    variables: {
      id: billId,
    },
    // // Dashboard
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

export { MUTATION_DELETE_BILL, useMutationDeleteBill };
