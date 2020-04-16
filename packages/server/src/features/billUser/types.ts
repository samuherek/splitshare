import gql from 'graphql-tag';

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
  }

  type BillInvite {
    id: ID!
    state: InviteState!
    createdAt: Date!
    user: User!
    bill: Bill!
    invitedBy: User!
  }
`;
