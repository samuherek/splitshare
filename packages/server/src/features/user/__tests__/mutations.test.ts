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

describe('user mutation', () => {
  describe('setupAccount', () => {
    it('should match snapshot', async () => {
      const SETUP_ACCOUNT = gql`
        mutation SetupAccount($input: SetupInput!) {
          setupAccount(input: $input) {
            id
            email
            firstName
            lastName
            avatarUrl
            state
          }
        }
      `;

      const { mutate } = await createTestServer({
        user: { id: 1 },
        models: {
          User: {
            update: jest.fn(() => ({
              ...baseUser,
              id: 1,
            })),
          },
        },
      });

      const res = await mutate({
        mutation: SETUP_ACCOUNT,
        variables: { input: { firstName: 'sam', lastName: 'uherek' } },
      });

      expect(res).toMatchSnapshot();
    });
  });
});
