import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Bill, MutationImportBillArgs } from '../types';

export type MutationImportBillResponse = {
  importBill: Bill;
};

const MUTATION_IMPORT_BILL = gql`
  mutation mutationImportBill($input: ImportBillInput!) {
    importBill(input: $input)
  }
`;

type Options = {
  data: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationImportBill({ data, mutationOpts }: Options) {
  const mutation = useMutation<
    MutationImportBillResponse,
    MutationImportBillArgs
  >(MUTATION_IMPORT_BILL, {
    ...mutationOpts,
    variables: {
      input: {
        data,
      },
    },
  });

  return mutation;
}

export { MUTATION_IMPORT_BILL, useMutationImportBill };
