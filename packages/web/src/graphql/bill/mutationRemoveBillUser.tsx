import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { FRAGMENT_BILL_USER_META } from '../invite/fragments';
import { BillUser, MutationRemoveBillUserArgs } from '../types';
import {
  QueryBillArgsExtended,
  QueryBillResponse,
  QUERY_BILL,
} from './queryBill';

export type MutationRemoveBillUserResponse = {
  removeBillUser: BillUser;
};

const MUTATION_REMOVE_BILL_USER = gql`
  mutation MutationRemoveBillUser($input: RemoveBillUserInput!) {
    removeBillUser(input: $input) {
      id
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
      const variables = {
        id: billId,
        withBalance: false,
        withUsers: true,
        withMeta: true,
      };
      const data = cache.readQuery<QueryBillResponse, QueryBillArgsExtended>({
        query: QUERY_BILL,
        variables,
      });

      if (!data) {
        return;
      }

      cache.writeQuery<QueryBillResponse, QueryBillArgsExtended>({
        query: QUERY_BILL,
        variables,
        data: {
          bill: {
            ...data.bill,
            users: data.bill.users.filter(
              (u) => u.id !== res.data?.removeBillUser.id
            ),
          },
        },
      });
    },
  });

  return mutation;
}

export { MUTATION_REMOVE_BILL_USER, useMutationRemoveBillUser };
