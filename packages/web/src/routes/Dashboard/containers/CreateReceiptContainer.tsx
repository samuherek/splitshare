// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  ReceiptSplitInput,
  CreateReceiptMutationArgs,
  ReceiptInput,
  Receipt,
} from 'src/types';

interface IRenderProps {
  loading: boolean;
  createReceipt: MutationFn<Receipt, CreateReceiptMutationArgs>;
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

const CreateReceiptContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  receiptInput,
  splitsInput,
  billId,
}) => (
  <Mutation<Receipt, CreateReceiptMutationArgs>
    mutation={CREATE_RECEIPT_MUTATION}
    variables={{ billId, receiptInput, splitsInput }}
  >
    {(createReceipt, { error, loading }) => {
      if (error) {
        console.log(error);
      }

      return children({
        createReceipt,
        loading,
      });
    }}
  </Mutation>
);

export default CreateReceiptContainer;
export { CREATE_RECEIPT_MUTATION };
