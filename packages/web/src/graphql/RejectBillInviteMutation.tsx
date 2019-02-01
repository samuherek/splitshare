// @flow
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { gql } from 'apollo-boost';

import { RejectBillInviteMutationArgs } from '../types';

interface IRenderProps {
  loading: boolean;
  rejectBillInviteMutation: MutationFn<boolean, RejectBillInviteMutationArgs>;
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
  id: string;
}

const REJECT_BILL_INVITE_MUTATION = gql`
  mutation rejectBillInvite($id: String!) {
    rejectBillInvite(id: $id)
  }
`;

const RemoveBillMutationContainer: React.FunctionComponent<IContainerProps> = ({
  children,
  id,
}) => (
  <Mutation<boolean, RejectBillInviteMutationArgs>
    mutation={REJECT_BILL_INVITE_MUTATION}
    variables={{ id }}
  >
    {(rejectBillInviteMutation, other) => {
      if (other.error) {
        console.log(other.error);
      }

      return children({
        loading: other.loading,
        rejectBillInviteMutation,
      });
    }}
  </Mutation>
);

export default RemoveBillMutationContainer;
export { REJECT_BILL_INVITE_MUTATION };
