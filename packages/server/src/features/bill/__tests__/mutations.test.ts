import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';

describe('bill mutations', () => {
  test('createBill: mutation should create and return a created bill', async () => {
    const CREATE_BILL = gql`
      mutation createBill($input: CreateBillInput!) {
        createBill(input: $input) {
          id
          name
          icon
          createdAt
          updatedAt
        }
      }
    `;

    const { mutate } = await createTestServer({
      user: { id: 1 },
      models: {
        Bill: {
          createOne: jest.fn(() => ({
            id: 1,
            name: 'new bill',
            icon: null,
            createdAt: new Date('2000-01-01'),
            updatedAt: new Date('2000-01-01'),
          })),
        },
      },
    });

    const res = await mutate({
      mutation: CREATE_BILL,
      variables: { input: { name: 'new bill' } },
    });

    expect(res).toMatchSnapshot();
  });
});
