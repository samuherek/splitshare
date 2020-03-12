import gql from 'graphql-tag';

export default gql`
  type UserSplit {
    user: User!
    value: Float!
    currency: String!
    owingTo: User!
  }

  type Receipt {
    id: ID!
    comment: String
    category: String
    title: String
    total: Float!
    currency: String!
    paidAt: Date!
    paidBy: User!
    createdAt: Date!
    updatedAt: DateTime!
    isSettlement: Boolean!
    splits: [UserSplit!]!
  }

  type ReceiptEdges {
    node: Receipt!
    cursor: String!
  }

  type ReceiptConnection {
    edges: [ReceiptEdges!]!
    pageInfo: PageInfo!
  }

  input SplitInput {
    userId: ID!
    value: Float!
  }

  input CreateReceiptInput {
    billId: ID!
    title: String!
    comment: String
    category: String
    paidAt: Date!
    total: Float!
    currency: String!
    paidById: ID!
    splits: [SplitInput!]!
  }

  extend type Query {
    receipt(id: ID!): Receipt
    receipts(billId: ID!, pagination: PaginationInput): ReceiptConnection!
  }

  extend type Mutation {
    createReceipt(input: CreateReceiptInput!): Receipt!
  }
`;
