import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';

const ME = gql`
  query Me {
    me {
      id
      email
      displayName
      photoUrl
    }
  }
`;

describe('user queries', () => {
  test('me: query should return a user with appropriate fields', async () => {
    const { query } = await createTestServer({
      user: { id: 1 },
      models: {
        User: {
          getById: jest.fn(() => ({
            id: 1,
            email: 'email@email.com',
            displayName: null,
            photoUrl: null,
          })),
        },
      },
    });

    const res = await query({ query: ME });

    expect(res).toMatchSnapshot();
  });
});
