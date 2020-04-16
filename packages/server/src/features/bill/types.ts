import gql from 'graphql-tag';

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
    users: [BillUser!]!
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

  input RemoveBillUserInput {
    billId: ID!
    userId: ID!
  }

  input UpdateBillInput {
    name: String
    currency: String
    closed: Boolean
  }

  input UpdateBillInviteInput {
    billId: ID!
    state: InviteState!
  }

  extend type Query {
    bill(id: ID!): Bill
    bills(pagination: PaginationInput, filter: BillsFilter): BillConnection!
  }

  extend type Mutation {
    createBill(input: CreateBillInput!): Bill!
    updateBill(id: ID!, input: UpdateBillInput!): Bill!
    deleteBill(id: ID!): Bill!
    createBillInvite(input: CreateBillInviteInput!): BillInvite!
    removeBillUser(input: RemoveBillUserInput!): BillUser!
    updateBillInvite(input: UpdateBillInviteInput!): BillInvite!
  }
`;
