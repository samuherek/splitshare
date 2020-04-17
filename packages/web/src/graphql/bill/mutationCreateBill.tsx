import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Bill, MutationCreateBillArgs } from '../types';
import { FRAGMENT_BILL_META } from './fragments';

export type MutationCreateBillResponse = {
  createBill: Bill;
};

const MUTATION_CREATE_BILL = gql`
  mutation mutationCreateBill($input: CreateBillInput!) {
    createBill(input: $input) {
      id
      ...billMeta
    }
  }
  ${FRAGMENT_BILL_META}
`;

type Options = {
  name: string;
  currency: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationCreateBill({ name, currency, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationCreateBillResponse,
    MutationCreateBillArgs
  >(MUTATION_CREATE_BILL, {
    ...mutationOpts,
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
