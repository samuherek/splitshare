import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';

describe('bill invite mutations', () => {
  test('createInvite: mutation should create and return a bill invite', async () => {
    const CREATE_INVITE = gql`
      mutation createInvite($input: CreateInviteInput!) {
        createInvite(input: $input) {
          id
          email
          pending
          createdAt
          updatedAt
          deletedAt
        }
      }
    `;

    const { mutate } = await createTestServer({
      user: { id: 1 },
      models: {
        BillInvite: {
          createOne: jest.fn(() => ({
            id: 1,
            email: 'email@email.com',
            pending: true,
            createdAt: new Date('2000-01-01'),
            updatedAt: new Date('2000-01-01'),
            deletedAt: null,
          })),
        },
      },
    });

    const res = await mutate({
      mutation: CREATE_INVITE,
      variables: { input: { email: 'email@email.com', billId: 1 } },
    });

    expect(res).toMatchSnapshot();
  });
});
