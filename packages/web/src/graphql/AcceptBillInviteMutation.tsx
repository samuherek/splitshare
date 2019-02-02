// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';
import { AcceptBillInviteMutationArgs } from '../types';
import { MY_PENDING_INVITES_QUERY } from './MyPendingInvitesQuery';
import { MY_BILLS_QUERY } from './MyBillsQuery';

interface IRenderProps {
  loading: boolean;
  acceptBillInviteMutation: MutationFn<boolean, AcceptBillInviteMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  id: string;
}

const ACCEPT_BILL_INVITE_MUTATION = gql`
  mutation acceptBillInvite($id: String!) {
    acceptBillInvite(id: $id)
  }
`;

const AcceptBillInviteMutationContainer: React.FunctionComponent<
  IContainerProps
> = ({ children, id }) => (
  <Mutation<boolean, AcceptBillInviteMutationArgs>
    mutation={ACCEPT_BILL_INVITE_MUTATION}
    variables={{ id }}
    refetchQueries={[
      {
        query: MY_PENDING_INVITES_QUERY,
      },
      {
        query: MY_BILLS_QUERY,
      },
    ]}
  >
    {(acceptBillInviteMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        acceptBillInviteMutation,
        loading: other.loading,
      });
    }}
  </Mutation>
);

export default AcceptBillInviteMutationContainer;
export { ACCEPT_BILL_INVITE_MUTATION };
