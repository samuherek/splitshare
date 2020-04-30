import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';

const baseReceipt = {
  category: null,
  comment: null,
  createdAt: new Date('2000-01-01'),
  currency: 'EUR',
  id: 1,
  isSettlement: false,
  paidAt: new Date('2000-01-01'),
  title: 'first receipt',
  total: 20,
  updatedAt: new Date('2000-01-01'),
  splits: {
    2: 10,
    1: 10,
  },
};

const baseUser = {
  id: 1,
  email: 'email@email.com',
  firstName: 'first',
  lastName: 'ast',
  avatarUrl: 'http://...',
  state: 'ACTIVE',
};

const CREATE_RECEIPT = gql`
  mutation createReceipt($input: CreateReceiptInput!) {
    createReceipt(input: $input) {
      category
      comment
      createdAt
      currency
      id
      isSettlement
      paidAt
      title
      total
      updatedAt
      paidBy {
        id
        email
        firstName
        lastName
        avatarUrl
        state
      }
      splits {
        value
        currency
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

const DELETE_RECEIPT = gql`
  mutation deleteReceipt($id: ID!) {
    deleteReceipt(id: $id) {
      category
      comment
      createdAt
      currency
      id
      isSettlement
      paidAt
      title
      total
      updatedAt
      paidBy {
        id
        email
        firstName
        lastName
        avatarUrl
        state
      }
      splits {
        value
        currency
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

const UPDATE_RECEIPT = gql`
  mutation updateReceipt($id: ID!, $input: UpdateReceiptInput!) {
    updateReceipt(id: $id, input: $input) {
      category
      comment
      createdAt
      currency
      id
      isSettlement
      paidAt
      title
      total
      updatedAt
      paidBy {
        id
        email
        firstName
        lastName
        avatarUrl
        state
      }
      splits {
        value
        currency
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

describe('receipt mutations', () => {
  describe('createReceipt', () => {
    test('should match snapshot', async () => {
      const { mutate } = await createTestServer({
        user: { id: 1 },
        models: {
          Receipt: {
            createOne: jest.fn(() => ({
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

      const res = await mutate({
        mutation: CREATE_RECEIPT,
        variables: {
          input: {
            billId: 1,
            title: 'first receipt',
            total: 20,
            currency: 'EUR',
            paidAt: new Date('2000-01-01').toJSON(),
            paidById: 1,
            splits: [
              {
                userId: 1,
                value: 20,
              },
            ],
          },
        },
      });

      expect(res).toMatchSnapshot();
    });
  });

  describe('deleteReceipt', () => {
    test('should match snapshot', async () => {
      const { mutate } = await createTestServer({
        user: { id: 1 },
        models: {
          Receipt: {
            getById: jest.fn(() => ({
              ...baseReceipt,
            })),
            remove: jest.fn(() => {}),
          },
          User: {
            getById: jest.fn(() => ({
              ...baseUser,
            })),
          },
        },
      });

      const res = await mutate({
        mutation: DELETE_RECEIPT,
        variables: {
          id: 1,
        },
      });

      expect(res).toMatchSnapshot();
    });
  });

  describe('updateReceipt', () => {
    test('should match snapshot', async () => {
      const { mutate } = await createTestServer({
        user: { id: 1 },
        models: {
          Receipt: {
            update: jest.fn(() => ({
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

      const res = await mutate({
        mutation: UPDATE_RECEIPT,
        variables: {
          id: 1,
          input: {
            title: 'first receipt',
            total: 20,
            currency: 'EUR',
            paidAt: new Date('2000-01-01').toJSON(),
            paidById: 1,
            splits: [
              {
                userId: 1,
                value: 20,
              },
            ],
          },
        },
      });

      expect(res).toMatchSnapshot();
    });
  });
});
