// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { UpdateBillMutationArgs } from '../types';
import Bill from '../routes/Bill';
import { BILL_QUERY } from './BillQuery';

// TODO: This doesn't use the generated types. We need to make sure of that.
interface IMutationData {
  bill: Bill;
}

interface IRenderProps {
  bill?: Bill;
  loading: boolean;
  updateBillMutation: MutationFn<IMutationData, UpdateBillMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => JSX.Element;
  name?: string;
  icon?: string;
  billId: string;
}

export const UPDATE_BILL_MUTATION = gql`
  mutation updateBill($billId: String!, $name: String, $icon: String) {
    updateBill(billId: $billId, name: $name, icon: $icon) {
      id
    }
  }
`;

const UpdateBillMutationContainer = ({
  children,
  billId,
  name,
  icon,
}: IContainerProps) => (
  <Mutation<IMutationData, UpdateBillMutationArgs>
    mutation={UPDATE_BILL_MUTATION}
    variables={{ billId, name, icon }}
    refetchQueries={[{ query: BILL_QUERY, variables: { id: billId } }]}
  >
    {(updateBillMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        updateBillMutation,
      });
    }}
  </Mutation>
);

export default UpdateBillMutationContainer;
