// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { CreateBillInviteMutationArgs } from '../types';

interface IRenderProps {
  loading: boolean;
  createBillInviteMutation: MutationFn<boolean, CreateBillInviteMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  billId: string;
  email: string;
}

const CREATE_BILL_INVITE_MUTATION = gql`
  mutation createBillInvite($billId: String!, $email: String!) {
    createBillInvite(billId: $billId, email: $email)
  }
`;

const CreateBillInviteMutationContainer: React.FunctionComponent<
  IContainerProps
> = ({ children, email, billId }) => (
  <Mutation<boolean, CreateBillInviteMutationArgs>
    mutation={CREATE_BILL_INVITE_MUTATION}
    variables={{ email, billId }}
  >
    {(createBillInviteMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        createBillInviteMutation,
        loading: other.loading,
      });
    }}
  </Mutation>
);

export default CreateBillInviteMutationContainer;
export { CREATE_BILL_INVITE_MUTATION };
