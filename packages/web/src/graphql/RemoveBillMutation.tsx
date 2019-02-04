// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { RemoveBillMutationArgs } from '../types';
import { MY_BILLS_QUERY } from './MyBillsQuery';

interface IRenderProps {
  loading: boolean;
  removeBillMutation: MutationFn<boolean, RemoveBillMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  id: string;
}

const REMOVE_BILL_MUTATION = gql`
  mutation removeBill($id: String!) {
    removeBill(id: $id)
  }
`;

const RejectBillInviteMutationContainer: React.FunctionComponent<
  IContainerProps
> = ({ children, id }) => (
  <Mutation<boolean, RemoveBillMutationArgs>
    mutation={REMOVE_BILL_MUTATION}
    variables={{ id }}
    refetchQueries={[{ query: MY_BILLS_QUERY }]}
  >
    {(removeBillMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        removeBillMutation,
      });
    }}
  </Mutation>
);

export default RejectBillInviteMutationContainer;
export { REMOVE_BILL_MUTATION };
