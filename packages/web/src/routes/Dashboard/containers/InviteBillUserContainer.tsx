// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { InviteInput, CreateBillInviteMutationArgs } from '../../../types';

interface IRenderProps {
  loading: boolean;
  inviteUser: MutationFn<boolean, CreateBillInviteMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  inviteInput: InviteInput;
}

const CREATE_BILL_INVITE_MUTATION = gql`
  mutation inviteBillUser($inviteInput: InviteInput!) {
    inviteBillUser(inviteInput: $inviteInput)
  }
`;

const CreateBillInviteContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  inviteInput,
}) => (
  <Mutation<boolean, CreateBillInviteMutationArgs>
    mutation={CREATE_BILL_INVITE_MUTATION}
    variables={{ inviteInput }}
  >
    {(inviteUser, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        inviteUser,
        loading: other.loading,
      });
    }}
  </Mutation>
);

export default CreateBillInviteContainer;
export { CREATE_BILL_INVITE_MUTATION };
