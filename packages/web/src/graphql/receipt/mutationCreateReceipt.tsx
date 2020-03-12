import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { MutationCreateReceiptArgs, Receipt, SplitInput } from '../types';
import { FRAGMENT_RECEIPT_META } from './fragments';

export type MutationCreateReceiptResponse = {
  createReceipt: Receipt;
};

const MUTATION_CREATE_RECEIPT = gql`
  mutation MutationCreateReceipt($input: CreateReceiptInput!) {
    createReceipt(input: $input) {
      ...receiptMeta
    }
  }
  ${FRAGMENT_RECEIPT_META}
`;

type Options = {
  billId: string;
  title: string;
  comment?: string;
  category?: string;
  paidAt: Date;
  paidById: string;
  total: number;
  currency: string;
  splits: SplitInput[];
  mutationOpts?: MutationHookOptions;
};

function useMutationCreateReceipt({
  billId,
  title,
  comment,
  category,
  paidAt,
  paidById,
  total,
  currency,
  splits,
  mutationOpts,
}: Options) {
  const mutation = useMutation<
    MutationCreateReceiptResponse,
    MutationCreateReceiptArgs
  >(MUTATION_CREATE_RECEIPT, {
    ...mutationOpts,
    variables: {
      input: {
        billId,
        title,
        comment,
        category,
        paidAt,
        paidById,
        total,
        currency,
        splits,
      },
    },
  });

  return mutation;
}

export { MUTATION_CREATE_RECEIPT, useMutationCreateReceipt };
