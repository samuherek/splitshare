import gql from 'graphql-tag';
import createTestServer from '../../../test-utils/server';
import console = require('console');

describe('receipt mutations', () => {
  test('createReceipt: mutation should create and return a created receipt', async () => {
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
        }
      }
    `;

    const { mutate } = await createTestServer({
      user: { id: 1 },
      models: {
        Receipt: {
          createOne: jest.fn(() => ({
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
          paidAt: '2000-01-01',
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
