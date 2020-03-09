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
    displayName: String
    photoUrl: String
    inviteState: InviteState!
    createdAt: Date!
    updatedAt: DateTime!
    invitedBy: User!
  }

  input CreateInviteInput {
    email: String!
    billId: ID!
  }

  extend type Mutation {
    createInvite(input: CreateInviteInput!): BillUser!
  }
`;
