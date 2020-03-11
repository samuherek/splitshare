import { gql } from 'apollo-boost';

export default gql`
  enum BillStatus {
    OPENED
    CLOSED
  }

  type UserBalance {
    value: Float!
    currency: String!
    user: User!
    # owingToId: ID!
    # user: User!
    # owingToUser: User!
  }

  type Bill {
    id: ID!
    name: String!
    icon: String
    createdAt: Date!
    updatedAt: DateTime!
    closedAt: DateTime
    currency: String!
    users: [BillUser]!
    myBalance: UserBalance!
  }

  type BillEdges {
    node: Bill!
    cursor: String!
  }

  type BillConnection {
    edges: [BillEdges!]!
    pageInfo: PageInfo!
  }

  input CreateBillInput {
    name: String!
    currency: String!
  }

  input BillsFilter {
    status: BillStatus
  }

  input CreateBillInviteInput {
    email: String!
    billId: ID!
  }

  extend type Query {
    bill(id: ID!): Bill
    bills(pagination: PaginationInput, filter: BillsFilter): BillConnection!
  }

  extend type Mutation {
    createBill(input: CreateBillInput!): Bill!
    createBillInvite(input: CreateBillInviteInput!): Boolean!
  }
`;
