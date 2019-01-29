// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Bill, Maybe } from 'src/types';

interface IQueryData {
  bill: Bill;
}

interface IRenderProps {
  bill: Maybe<Bill>;
}

interface IContainerProps {
  billId: string;
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const BILL_QUERY = gql`
  query bill($id: String!) {
    bill(id: $id) {
      id
      name
      createdAt
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

const BillQueryContainer: React.FC<IContainerProps> = ({
  children,
  billId,
}) => (
  <Query<IQueryData> query={BILL_QUERY} variables={{ id: billId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      console.log(data);
      // console.log(other);
      if (error) {
        console.log(error);
      }

      return children({
        bill: data ? data.bill : null,
      });
    }}
  </Query>
);

export default BillQueryContainer;
