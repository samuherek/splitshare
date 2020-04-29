import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';
import { UserState } from '../config';

const baseUser = {
  email: 'email@email.com',
  firstName: null,
  lastName: null,
  avatarUrl: null,
  state: UserState.ACTIVE,
};

describe('user queries', () => {
  describe('me', () => {
    test('should match snapshot', async () => {
      const ME = gql`
        query Me {
          me {
            id
            email
            firstName
            lastName
            avatarUrl
            state
          }
        }
      `;
      const { query } = await createTestServer({
        user: { id: 1 },
        models: {
          User: {
            getById: jest.fn(() => ({
              ...baseUser,
              id: 1,
            })),
          },
        },
      });

      const res = await query({ query: ME });

      expect(res).toMatchSnapshot();
    });
  });

  describe('myUsers', () => {
    it('should match snapshot', async () => {
      const MY_USERS = gql`
        query MyUsers {
          myUsers {
            id
            email
            firstName
            lastName
            avatarUrl
            state
          }
        }
      `;

      const { query } = await createTestServer({
        user: { id: 1 },
        models: {
          User: {
            getBillUsersByUserId: jest.fn(() => [
              {
                ...baseUser,
                id: 1,
              },
              {
                ...baseUser,
                id: 2,
              },
            ]),
          },
        },
      });

      const res = await query({ query: MY_USERS });

      expect(res).toMatchSnapshot();
    });
  });
});
