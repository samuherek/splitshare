import { Connection } from 'typeorm';
import * as faker from 'faker';

import { testConn } from '../../../test-utils/testConn';
import { gCall } from '../../../test-utils/gCall';
import { Bill } from '../../../entity/Bill';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const BILL_QUERY = `
  query bill($id: String!) {
    bill(id: $id) {
      id
      name
    }
  }
`;

describe.skip('Bill', () => {
  // TODO: Learn to pass the cookies with the gCall.
  it('should return one bill from id', async () => {
    const bill = await Bill.create({
      name: faker.lorem.text(),
    }).save();

    const response = await gCall({
      source: BILL_QUERY,
      variableValues: {
        id: bill.id,
      },
    });

    expect(response).toMatchObject({
      data: {
        bill: {
          id: bill.id,
          name: bill.name,
        },
      },
    });
  });
});
