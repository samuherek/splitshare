// @flow
import * as React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Maybe, Receipt, ReceiptQueryArgs } from 'src/types';

interface IQueryData {
  receipt: Receipt;
}

interface IRenderProps {
  receipt: Maybe<Receipt>;
}

interface IContainerProps {
  receiptId: string;
  children: (renderProps: IRenderProps) => React.ReactNode;
}

export const RECEIPT_QUERY = gql`
  query receipts($id: String!) {
    receipt(id: $id) {
      id
      comment
      company
      category
      country
      total
      currency
      paidAt
      createdAt
      paidBy {
        id
        displayName
      }
      splits {
        id
        value
        currency
        user {
          id
          displayName
          email
        }
      }
    }
  }
`;

const ReceiptQueryContainer: React.FC<IContainerProps> = ({
  children,
  receiptId,
}) => (
  <Query<IQueryData, ReceiptQueryArgs>
    query={RECEIPT_QUERY}
    variables={{ id: receiptId }}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        console.log(error);
      }

      return children({
        receipt: data && data.receipt ? data.receipt : null,
      });
    }}
  </Query>
);

export default ReceiptQueryContainer;
