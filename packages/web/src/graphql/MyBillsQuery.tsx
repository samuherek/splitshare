// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Bill } from 'src/types';

interface IQueryData {
  myBills: Bill[];
}

interface IRenderProps {
  bills: Bill[];
}

interface IContainerProps {
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const MY_BILLS_QUERY = gql`
  query myBills {
    myBills {
      id
      name
      createdAt
      updatedAt
      icon

      users {
        id
        email
        displayName
        photoUrl
      }

      invites {
        id
        email
      }
    }
  }
`;

const MyBillsQueryContainer = ({ children }: IContainerProps) => (
  <Query<IQueryData> query={MY_BILLS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        console.log(error);
      }

      return children({
        bills: data ? data.myBills : [],
      });
    }}
  </Query>
);

export default MyBillsQueryContainer;
