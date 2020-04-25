import gql from 'graphql-tag';

export default gql`
  input ImportBillInput {
    data: String!
  }

  extend type Mutation {
    importBill(input: ImportBillInput!): Boolean!
  }
`;
