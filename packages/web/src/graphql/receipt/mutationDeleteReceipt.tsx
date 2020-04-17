import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { QUERY_BILL } from '../bill/queryBill';
import {
  MutationDeleteReceiptArgs,
  QueryReceiptsArgs,
  Receipt,
} from '../types';
import { FRAGMENT_RECEIPT_META } from './fragments';
import { QueryReceiptsData, QUERY_RECEIPTS } from './queryReceipts';

export type MutationDeleteReceiptResponse = {
  deleteReceipt: Receipt;
};

const MUTATION_DELETE_RECEIPT = gql`
  mutation MutationDeleteReceipt($id: ID!) {
    deleteReceipt(id: $id) {
      ...receiptMeta
    }
  }
  ${FRAGMENT_RECEIPT_META}
`;

type Options = {
  receiptId: string;
  billId: string;
  mutationOpts?: MutationHookOptions;
};

function useMutationDeleteReceipt({
  receiptId,
  billId,
  mutationOpts,
}: Options) {
  const mutation = useMutation<
    MutationDeleteReceiptResponse,
    MutationDeleteReceiptArgs
  >(MUTATION_DELETE_RECEIPT, {
    ...mutationOpts,
    variables: {
      id: receiptId,
    },
    update: (cache, res) => {
      const query = {
        query: QUERY_RECEIPTS,
        variables: {
          billId,
        },
      };

      const data = cache.readQuery<QueryReceiptsData, QueryReceiptsArgs>(query);

      if (!data) {
        return;
      }

      cache.writeQuery<QueryReceiptsData, QueryReceiptsArgs>({
        ...query,
        data: {
          receipts: {
            ...data.receipts,
            edges: data.receipts.edges.filter(
              ({ node }) => node.id !== res.data?.deleteReceipt.id
            ),
            pageInfo: {
              ...data.receipts.pageInfo,
              itemsCount: data.receipts.pageInfo.itemsCount - 1,
            },
          },
        },
      });
    },
    refetchQueries: [
      {
        query: QUERY_BILL,
        variables: {
          id: billId,
          withMeta: false,
          withUsers: false,
          withBalance: true,
        },
      },
    ],
  });

  return mutation;
}

export { MUTATION_DELETE_RECEIPT, useMutationDeleteReceipt };
