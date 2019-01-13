// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { InviteBillUserMutationArgs, InviteInput } from '../../../types';

interface IRenderProps {
  loading: boolean;
  inviteUser: MutationFn<boolean, InviteBillUserMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  inviteInput: InviteInput;
}

const INVITE_BILL_USER_MUTATION = gql`
  mutation inviteBillUser($inviteInput: InviteInput!) {
    inviteBillUser(inviteInput: $inviteInput)
  }
`;

const InviteBillUserContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  inviteInput,
}) => (
  <Mutation<boolean, InviteBillUserMutationArgs>
    mutation={INVITE_BILL_USER_MUTATION}
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

export default InviteBillUserContainer;
export { INVITE_BILL_USER_MUTATION };
