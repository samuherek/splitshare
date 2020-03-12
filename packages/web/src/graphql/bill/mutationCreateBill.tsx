import { gql, useMutation } from '@apollo/client';
import { Bill, MutationCreateBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

export type MutationCreateBillResponse = {
  createBill: Bill;
};

const MUTATION_CREATE_BILL = gql`
  mutation mutationCreateBill($input: CreateBillInput!) {
    createBill(input: $input) {
      ...billMeta
    }
  }
  ${FRAGMENT_BILL_META}
`;

type Options = {
  name: string;
  currency: string;
};

function useMutationCreateBill({ name, currency }: Options) {
  const mutation = useMutation<
    MutationCreateBillResponse,
    MutationCreateBillArgs
  >(MUTATION_CREATE_BILL, {
    variables: {
      input: {
        name,
        currency,
      },
    },
  });

  return mutation;
}

export { MUTATION_CREATE_BILL, useMutationCreateBill };
