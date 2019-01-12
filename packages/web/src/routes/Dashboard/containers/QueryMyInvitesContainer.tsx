// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BillInvite } from '../../../types';

interface IQueryData {
  myInvites: BillInvite[];
}

interface IRenderProps {
  invites: BillInvite[];
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const MY_INVITES_QUERY = gql`
  query myInvites {
    myInvites {
      id
      accepted
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

const QueryMyInvitesContainer = ({ children }: IContainerProps) => (
  <Query<IQueryData> query={MY_INVITES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        console.log(error);
      }

      return children({
        invites: data ? data.myInvites : [],
      });
    }}
  </Query>
);

export default QueryMyInvitesContainer;
