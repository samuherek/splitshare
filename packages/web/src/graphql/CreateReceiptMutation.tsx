// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  ReceiptSplitInput,
  CreateReceiptMutationArgs,
  ReceiptInput,
  Receipt,
} from '../types';
import { RECEIPTS_QUERY } from './ReceiptsQuery';

interface IRenderProps {
  loading: boolean;
  createReceiptMutation: MutationFn<Receipt, CreateReceiptMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  receiptInput: ReceiptInput;
  splitsInput: ReceiptSplitInput[];
  billId: string;
}

const CREATE_RECEIPT_MUTATION = gql`
  mutation createReceipt(
    $billId: String!
    $receiptInput: ReceiptInput!
    $splitsInput: [ReceiptSplitInput!]!
  ) {
    createReceipt(
      billId: $billId
      receiptInput: $receiptInput
      splitsInput: $splitsInput
    ) {
      id
    }
  }
`;

const CreateReceiptMutationContainer: React.FunctionComponent<
  IContainerProps
> = ({ children, receiptInput, splitsInput, billId }) => (
  <Mutation<Receipt, CreateReceiptMutationArgs>
    mutation={CREATE_RECEIPT_MUTATION}
    variables={{ billId, receiptInput, splitsInput }}
    refetchQueries={[
      {
        query: RECEIPTS_QUERY,
        variables: {
          billId,
          where: { limit: 6, offset: 0 },
        },
      },
    ]}
  >
    {(createReceiptMutation, { error, loading }) => {
      if (error) {
        console.log(error);
      }

      return children({
        createReceiptMutation,
        loading,
      });
    }}
  </Mutation>
);

export default CreateReceiptMutationContainer;
export { CREATE_RECEIPT_MUTATION };
