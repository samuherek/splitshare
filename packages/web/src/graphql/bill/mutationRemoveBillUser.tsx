import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { FRAGMENT_BILL_USER_META } from '../invite/fragments';
import { BillUser, MutationRemoveBillUserArgs, QueryBillArgs } from '../types';
import { QueryBillResponse, QUERY_BILL } from './queryBill';

export type MutationRemoveBillUserResponse = {
  removeBillUser: BillUser;
};

const MUTATION_REMOVE_BILL_USER = gql`
  mutation MutationRemoveBillUser($input: RemoveBillUserInput!) {
    removeBillUser(input: $input) {
      ...billUserMeta
    }
  }
  ${FRAGMENT_BILL_USER_META}
`;

type Options = {
  billId: string;
  userId: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationRemoveBillUser({ billId, userId, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationRemoveBillUserResponse,
    MutationRemoveBillUserArgs
  >(MUTATION_REMOVE_BILL_USER, {
    ...mutationOpts,
    variables: {
      input: {
        billId,
        userId,
      },
    },
    update: (cache, res) => {
      const data = cache.readQuery<QueryBillResponse, QueryBillArgs>({
        query: QUERY_BILL,
        variables: {
          id: billId,
        },
      });

      if (!data) {
        return;
      }

      cache.writeQuery<QueryBillResponse, QueryBillArgs>({
        query: QUERY_BILL,
        variables: {
          id: billId,
        },
        data: {
          bill: {
            ...data.bill,
            users: data.bill.users.filter(
              u => u.id !== res.data?.removeBillUser.id
            ),
          },
        },
      });
    },
  });

  return mutation;
}

export { MUTATION_REMOVE_BILL_USER, useMutationRemoveBillUser };
