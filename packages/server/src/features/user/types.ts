import gql from 'graphql-tag';

export default gql`
  enum UserState {
    ONBOARDING_VERIFY_EMAIL
    ONBOARDING_PROFILE
    ACTIVE
  }

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    avatarUrl: String
    state: UserState!
  }

  input MeInput {
    firstName: String
    lastName: String
    email: String
  }

  input SetupInput {
    firstName: String!
    lastName: String!
    avatarUrl: String
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    updateMe(meInput: MeInput!): User!
    setupAccount(input: SetupInput!): Boolean!
  }
`;
