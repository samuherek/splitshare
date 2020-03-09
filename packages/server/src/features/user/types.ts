import { gql } from 'apollo-boost';

export default gql`
  type User {
    id: ID!
    email: String!
    displayName: String
    photoUrl: String
  }

  input MeInput {
    displayName: String
    email: String
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    updateMe(meInput: MeInput!): User!
  }
`;
