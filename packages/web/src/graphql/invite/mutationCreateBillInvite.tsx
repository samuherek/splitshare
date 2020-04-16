import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { QueryBillResponse, QUERY_BILL } from '../bill/queryBill';
import {
  BillInvite,
  MutationCreateBillInviteArgs,
  QueryBillArgs,
} from '../types';
import { FRAGMENT_USER_META } from '../user/fragments';

export type MutationCreateBillInviteResponse = {
  createBillInvite: BillInvite;
};

const MUTATION_CREATE_BILL_INVITE = gql`
  mutation MutationCreateBillInvite($input: CreateBillInviteInput!) {
    createBillInvite(input: $input) {
      state
      user {
        ...userMeta
      }
    }
  }
  ${FRAGMENT_USER_META}
`;

type Options = {
  billId: string;
  email: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationCreateBillInvite({ billId, email, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationCreateBillInviteResponse,
    MutationCreateBillInviteArgs
  >(MUTATION_CREATE_BILL_INVITE, {
    ...mutationOpts,
    variables: {
      input: {
        billId,
        email,
      },
    },
    update: (cache, res) => {
      const data = cache.readQuery<QueryBillResponse, QueryBillArgs>({
        query: QUERY_BILL,
        variables: {
          id: billId,
        },
      });

      if (!data?.bill || !data.bill.users) {
        return;
      }

      const nextUsers = [...data.bill.users];

      if (res.data?.createBillInvite) {
        const {
          id,
          firstName,
          lastName,
          email,
        } = res.data.createBillInvite.user;

        nextUsers.push({
          id,
          firstName,
          lastName,
          email,
          state: res.data.createBillInvite.state,
          __typename: 'BillUser',
        });
      }

      cache.writeQuery<QueryBillResponse, QueryBillArgs>({
        query: QUERY_BILL,
        variables: {
          id: billId,
        },
        data: {
          bill: {
            ...data.bill,
            users: nextUsers,
          },
        },
      });
    },
  });

  return mutation;
}

export { MUTATION_CREATE_BILL_INVITE, useMutationCreateBillInvite };
