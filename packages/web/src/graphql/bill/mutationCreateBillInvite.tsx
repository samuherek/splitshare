import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { MutationCreateBillInviteArgs } from '../types';

export type MutationCreateBillInviteResponse = {
  createBillInvite: boolean;
};

const MUTATION_CREATE_BILL_INVITE = gql`
  mutation MutationCreateBillInvite($input: CreateBillInviteInput!) {
    createBillInvite(input: $input)
  }
`;

type Options = {
  billId: string;
  email: string;
};

function useMutationCreateBillInvite({ billId, email }: Options) {
  const mutation = useMutation<
    MutationCreateBillInviteResponse,
    MutationCreateBillInviteArgs
  >(MUTATION_CREATE_BILL_INVITE, {
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
