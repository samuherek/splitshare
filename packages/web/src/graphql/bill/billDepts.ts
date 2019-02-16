import gql from 'graphql-tag';

export const BILL_DEPTS_QUERY = gql`
  query billDepts($id: String!) {
    billDepts(id: $id) {
      userId
      sum
      currency
      owingToId
    }
  }
`;
