import { gql } from 'apollo-boost';

export default gql`
  enum InviteState {
    PENDING
    REJECTED
    ACCEPTED
  }

  type BillUser {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    avatarUrl: String
    state: InviteState!
    createdAt: Date!
    updatedAt: DateTime!
    invitedBy: User!
  }
`;
