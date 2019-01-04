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

export const FIND_BILL_BY_ID_QUERY = gql`
  query findBillById($id: String!) {
    bill: findBillById(id: $id) {
      id
      name
      createdAt
      users {
        displayName
        id
        email
      }
    }
  }
`;

// Apollo Flow Types
class FindBillByIdQuery extends Query<IQueryData> {}

const FindBillByIdContainer: React.FC<IContainerProps> = ({
  children,
  billId,
}) => (
  <FindBillByIdQuery query={FIND_BILL_BY_ID_QUERY} variables={{ id: billId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      // console.log(other);
      if (error) {
        console.log(error);
      }

      return children({
        bill: data ? data.bill : null,
      });
    }}
  </FindBillByIdQuery>
);

export default FindBillByIdContainer;
