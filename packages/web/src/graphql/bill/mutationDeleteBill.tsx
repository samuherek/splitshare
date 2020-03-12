import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Bill, MutationDeleteBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

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
    // update: (cache, res) => {
    //   const query = {
    //     query: QUERY_BILL,
    //     variables: {
    //       id: billId,
    //     },
    //   };

    //   const data = cache.readQuery<QueryBillResponse, QueryBillArgs>(query);

    //   if (!data) {
    //     return;
    //   }

    //   cache.writeQuery<QueryBillResponse, QueryBillArgs>({
    //     ...query,
    //     data: {
    //       bill: {
    //         ...data.bill,
    //         ...res.data?.archiveBill,
    //       },
    //     },
    //   });
    // },
  });

  return mutation;
}

export { MUTATION_DELETE_BILL, useMutationDeleteBill };
