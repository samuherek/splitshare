import gql from 'graphql-tag';
import paginateTestResult from '../../../test-utils/paginateTestResult';
import createTestServer from '../../../test-utils/server';

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
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

describe('receipt queries', () => {
  test('receipts: query should return an arry of receipts with appropriate fields', async () => {
    const { query } = await createTestServer({
      models: {
        Receipt: {
          getBillReceipts: jest.fn(() =>
            paginateTestResult([
              {
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
              },
            ])
          ),
        },
      },
    });

    const res = await query({ query: RECEIPTS, variables: { billId: 1 } });

    expect(res).toMatchSnapshot();
  });
});
