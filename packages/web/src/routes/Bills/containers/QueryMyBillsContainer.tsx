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
    }
  }
`;

// Apollo Flow Types
class MyBillsQuery extends Query<IQueryData> {}

const QueryMyBillsContainer = ({ children }: IContainerProps) => (
  <MyBillsQuery query={MY_BILLS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      // console.log(other);
      if (error) {
        console.log(error);
      }

      return children({
        bills: data ? data.myBills : [],
      });
    }}
  </MyBillsQuery>
);

export default QueryMyBillsContainer;
