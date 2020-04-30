import gql from 'graphql-tag';
import paginateTestResult from '../../../test-utils/paginateTestResult';
import createTestServer from '../../../test-utils/server';

const baseReceipt = {
  id: 1,
  comment: null,
  category: null,
  title: 'title',
  total: 23.0,
  currency: 'EUR',
  paidAt: new Date('2000-01-01'),
  createdAt: new Date('2000-01-01'),
  updatedAt: new Date('2000-01-01'),
  isSettlement: false,
  splits: {
    2: 11.5,
    1: 11.5,
  },
};

const baseUser = {
  id: 2,
  email: 'email@email.com',
  firstName: 'first',
  lastName: 'last',
  avatarUrl: 'http://..',
  state: 'ACTIVE',
};

const RECEIPT = gql`
  query Receipt($id: ID!) {
    receipt(id: $id) {
      id
      comment
      category
      title
      total
      currency
      paidAt
      createdAt
      updatedAt
      isSettlement
      paidBy {
        id
        email
        firstName
        lastName
        avatarUrl
        state
      }
      splits {
        currency
        value
        user {
          id
          email
          firstName
          lastName
          avatarUrl
          state
        }
        owingTo {
          id
          email
          firstName
          lastName
          avatarUrl
          state
        }
      }
    }
  }
`;

const RECEIPTS = gql`
  query Receipts($billId: ID!) {
    receipts(billId: $billId) {
      edges {
        node {
          id
          comment
          category
          title
          total
          currency
          paidAt
          createdAt
          updatedAt
          isSettlement
          paidBy {
            id
            email
            firstName
            lastName
            avatarUrl
            state
          }
          splits {
            currency
            value
            user {
              id
              email
              firstName
              lastName
              avatarUrl
              state
            }
            owingTo {
              id
              email
              firstName
              lastName
              avatarUrl
              state
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
        itemsCount
      }
    }
  }
`;

describe('receipt queries', () => {
  describe('receipt', () => {
    test('should match snapshot', async () => {
      const { query } = await createTestServer({
        models: {
          Receipt: {
            getById: jest.fn(() => ({
              ...baseReceipt,
            })),
          },
          User: {
            getById: jest.fn(() => ({
              ...baseUser,
            })),
          },
        },
      });

      const res = await query({ query: RECEIPT, variables: { id: 1 } });

      expect(res).toMatchSnapshot();
    });
  });

  describe('receipts', () => {
    test('should match snapshot', async () => {
      const { query } = await createTestServer({
        models: {
          Receipt: {
            getBillReceipts: jest.fn(() =>
              paginateTestResult([
                {
                  ...baseReceipt,
                },
              ])
            ),
          },
          User: {
            getById: jest.fn(() => ({
              ...baseUser,
            })),
          },
        },
      });

      const res = await query({ query: RECEIPTS, variables: { billId: 1 } });

      expect(res).toMatchSnapshot();
    });
  });
});
