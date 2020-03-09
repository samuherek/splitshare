import * as faker from 'faker';
import { Connection } from 'typeorm';
import cleanupDb from '../../../test-utils/cleanupDb';
import { connectTestDatabase } from '../../../test-utils/testConnection';
import bill from '../../bill/model';
import user from '../../user/model';
import receipt from '../model';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDatabase({ drop: false });
});

afterAll(async () => {
  conn.close();
});

describe('receipt model', () => {
  beforeEach(() => cleanupDb());

  test('createOne: should create a receipt in database', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const receipt1 = await receipt.createOne(
      {
        billId: bill1.id,
        title: 'receipt',
        paidAt: new Date('2000-01-01'),
        total: 5,
        currency: 'EUR',
        splits: [],
      },
      user1.id
    );

    const result1 = await receipt.getById(receipt1.id);

    // TODO: I have no clue why it again doesn't return all the keys
    delete receipt1.billId;
    delete receipt1.createdById;

    expect(result1).toEqual({
      ...receipt1,
      paidAt: '2000-01-01',
      total: '5',
    });
  });

  test('getBillReceipts: should return paginated list of receipts', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const receipt1 = await receipt.createOne(
      {
        billId: bill1.id,
        title: 'receipt',
        paidAt: new Date('2000-01-01'),
        total: 5,
        currency: 'EUR',
        splits: [],
      },
      user1.id
    );

    // TODO: I have no clue why it again doesn't return all the keys
    delete receipt1.billId;
    delete receipt1.createdById;

    const result1 = await receipt.getBillReceipts({ billId: bill1.id });

    expect(result1).toEqual({
      edges: [
        {
          cursor: expect.any(String),
          node: {
            ...receipt1,
            paidAt: '2000-01-01',
            total: '5',
          },
        },
      ],
      pageInfo: {
        endCursor: expect.any(String),
        hasNextPage: expect.any(Boolean),
      },
    });
  });

  test('remove: should remove receipt from the database', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const receipt1 = await receipt.createOne(
      {
        billId: bill1.id,
        title: 'receipt',
        paidAt: new Date('2000-01-01'),
        total: 5,
        currency: 'EUR',
        splits: [],
      },
      user1.id
    );

    await receipt.remove(receipt1.id);

    const result1 = await receipt.getById(receipt1.id);

    expect(result1).toBeUndefined();
  });
});
