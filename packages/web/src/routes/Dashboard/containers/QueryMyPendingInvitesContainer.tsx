// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BillInvite } from '../../../types';

interface IQueryData {
  myPendingInvites: BillInvite[];
}

interface IRenderProps {
  invites: BillInvite[];
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const MY_PENDING_INVITES_QUERY = gql`
  query myInvites {
    myPendingInvites {
      id
      pending
      createdAt
      bill {
        name
        id
      }
      invitedBy {
        displayName
      }
    }
  }
`;

const QueryMyPendingInvitesContainer = ({ children }: IContainerProps) => (
  <Query<IQueryData> query={MY_PENDING_INVITES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        console.log(error);
      }

      return children({
        invites: data ? data.myPendingInvites : [],
      });
    }}
  </Query>
);

export default QueryMyPendingInvitesContainer;
