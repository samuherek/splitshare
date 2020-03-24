import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { MutationUpdateReceiptArgs, Receipt, SplitInput } from '../types';
import { FRAGMENT_USER_META } from '../user/fragments';
import { FRAGMENT_RECEIPT_META } from './fragments';

export type MutationUpdateReceiptResponse = {
  updateReceipt: Receipt;
};

const MUTATION_UPDATE_RECEIPT = gql`
  mutation UpdateReceipt($id: ID!, $input: UpdateReceiptInput!) {
    updateReceipt(id: $id, input: $input) {
      ...receiptMeta
      category
      total
      currency
      paidAt
      createdAt
      updatedAt
      paidBy {
        ...userMeta
      }
      isSettlement
      splits {
        user {
          ...userMeta
        }
        value
        currency
        owingTo {
          ...userMeta
        }
      }
    }
  }
  ${FRAGMENT_RECEIPT_META}
  ${FRAGMENT_USER_META}
`;

type Options = {
  receiptId: string;
  title?: string;
  comment?: string;
  category?: string;
  paidAt?: Date;
  paidById?: string;
  total?: number;
  currency?: string;
  splits?: SplitInput[];
  mutationOpts?: MutationHookOptions;
};

function useMutationUpdateReceipt({
  receiptId,
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
    MutationUpdateReceiptResponse,
    MutationUpdateReceiptArgs
  >(MUTATION_UPDATE_RECEIPT, {
    ...mutationOpts,
    variables: {
      id: receiptId,
      input: {
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

export { MUTATION_UPDATE_RECEIPT, useMutationUpdateReceipt };
