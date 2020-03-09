import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';
import console = require('console');

describe('bill queries', () => {
  test('myBills: query should return basic bill with all model fields', async () => {
    const MY_BILLS = gql`
      {
        myBills {
          id
          name
          icon
          createdAt
          updatedAt
        }
      }
    `;

    const { query } = await createTestServer({
      user: { id: 1 },
      models: {
        Bill: {
          getUserBills: jest.fn(() => [
            {
              id: 1,
              name: 'bill name',
              icon: null,
              createdAt: new Date('2000-01-01'),
              updatedAt: new Date('2000-01-01'),
            },
          ]),
        },
      },
    });

    const res = await query({ query: MY_BILLS });

    expect(res).toMatchSnapshot();
  });

  test('myBills: query including "users" should return list of bill users', async () => {
    const MY_BILLS_USERS = gql`
      {
        myBills {
          users {
            id
            email
            displayName
            photoUrl
          }
        }
      }
    `;

    const { query } = await createTestServer({
      user: { id: 1 },
      models: {
        Bill: {
          getUserBills: jest.fn(() => [{}]),
          getBillUsers: jest.fn(() => [
            {
              id: 1,
              email: 'email@email.com',
              displayName: null,
              photoUrl: null,
            },
          ]),
        },
      },
    });

    const res = await query({ query: MY_BILLS_USERS });

    expect(res).toMatchSnapshot();
  });

  test('myBills: query including "invites" should return list of bill invites', async () => {
    const MY_BILLS_INVITES = gql`
      {
        myBills {
          invites {
            id
            email
            pending
            createdAt
            updatedAt
            deletedAt
          }
        }
      }
    `;

    const { query } = await createTestServer({
      user: { id: 1 },
      models: {
        Bill: {
          getUserBills: jest.fn(() => [{}]),
          getBillInvites: jest.fn(() => [
            {
              id: 1,
              email: 'email@email.com',
              pending: true,
              createdAt: new Date('2000-01-01'),
              updatedAt: new Date('2000-01-01'),
              deletedAt: null,
            },
          ]),
        },
      },
    });

    const res = await query({ query: MY_BILLS_INVITES });

    expect(res).toMatchSnapshot();
  });

  test('bill: should return a bill with all base values', async () => {
    const QUERY = gql`
      query Bill($id: ID!) {
        bill(id: $id) {
          id
          name
          icon
          createdAt
          updatedAt
        }
      }
    `;

    const { query } = await createTestServer({
      user: { id: 1 },
      models: {
        Bill: {
          getById: jest.fn((...args) => ({
            id: 1,
            name: 'bill name',
            icon: null,
            createdAt: new Date('2000-01-01'),
            updatedAt: new Date('2000-01-01'),
          })),
        },
      },
    });

    const res = await query({
      query: QUERY,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });
});
