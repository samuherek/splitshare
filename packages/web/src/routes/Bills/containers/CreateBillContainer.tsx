// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { CreateBillMutationArgs, Bill, BillInput } from 'src/types';
import { BILL_META_FRAGMENT } from 'src/graphql/billFragments';

interface IRenderProps {
  loading: boolean;
  createBill: MutationFn<Bill, CreateBillMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  billInput: BillInput;
}

const CREATE_BILL_MUTATION = gql`
  mutation createBill($billInput: BillInput!) {
    createBill(billInput: $billInput) {
      ...billMeta
    }
  }
  ${BILL_META_FRAGMENT}
`;

// Apollo Flow Types
class CreateBillMutation extends Mutation<Bill, CreateBillMutationArgs> {}

const CreateBillContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  billInput,
}) => (
  <CreateBillMutation mutation={CREATE_BILL_MUTATION} variables={{ billInput }}>
    {(createBill, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        createBill,
        loading: other.loading,
      });
    }}
  </CreateBillMutation>
);

export default CreateBillContainer;
export { CREATE_BILL_MUTATION };
