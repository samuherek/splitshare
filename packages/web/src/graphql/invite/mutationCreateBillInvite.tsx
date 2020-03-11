import { MutationHookOptions, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BillUser, MutationCreateBillInviteArgs } from '../types';
import { FRAGMENT_BILL_USER_META } from './fragments';

export type MutationCreateBillInviteResponse = {
  createBillInvite: BillUser;
};

const MUTATION_CREATE_BILL_INVITE = gql`
  mutation MutationCreateBillInvite($input: CreateBillInviteInput!) {
    createBillInvite(input: $input) {
      ...billUserMeta
    }
  }
  ${FRAGMENT_BILL_USER_META}
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
  });

  return mutation;
}

export { MUTATION_CREATE_BILL_INVITE, useMutationCreateBillInvite };
