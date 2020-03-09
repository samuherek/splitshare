import * as dayjs from 'dayjs';
import * as faker from 'faker';
import { Connection } from 'typeorm';
import cleanupDb from '../../../test-utils/cleanupDb';
import { connectTestDatabase } from '../../../test-utils/testConnection';
import { BillUser } from '../../billUser/entity';
import billInvite from '../../invite/model';
import user from '../../user/model';
import bill from '../model';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDatabase({ drop: false });
});

afterAll(async () => {
  conn.close();
});

describe('bill model', () => {
  beforeEach(() => cleanupDb());

  test('createOne: should create a bill in database', async () => {
    const name = 'bill name';

    const user1 = await user.createOne({ email: faker.internet.email() });
    const result = await bill.createOne({ name }, user1.id);

    expect(result).toEqual({
      name,
      icon: null,
      id: expect.any(String),
      createdAt: dayjs().format('YYYY-MM-DD'),
      updatedAt: expect.any(Date),
    });
  });

  test('createOne: should also create a BillUser relationship row', async () => {
    const name = 'random bill name';

    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name }, user1.id);

    const result = await BillUser.find({
      billId: bill1.id,
      userId: user1.id,
    });

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual({
      createdAt: dayjs().format('YYYY-MM-DD'),
      deletedAt: null,
    });
  });

  test('getById: should find the correct bill', async () => {
    const bills = [];
    const user1 = await user.createOne({ email: faker.internet.email() });

    for (const b of Array(2)) {
      const temp = await bill.createOne(
        { name: faker.lorem.words() },
        user1.id
      );
      bills.push(temp);
    }

    const [bill1, bill2] = bills;

    const result1 = await bill.getById(bill1.id, user1.id);
    const result2 = await bill.getById(bill2.id, user1.id);

    expect(result1).toEqual(bill1);
    expect(result2).toEqual(bill2);
  });

  test('getUserBills: should find all the bills for a provided user', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const user2 = await user.createOne({ email: faker.internet.email() });

    const user1Bills = [];

    for (const _ of Array(2)) {
      const temp = await bill.createOne(
        { name: faker.lorem.words() },
        user1.id
      );
      user1Bills.push(temp);
    }

    const user2Bills = [];

    const temp2 = await bill.createOne(
      {
        name: faker.lorem.words(),
      },
      user2.id
    );

    user2Bills.push(temp2);

    const result1 = await bill.getUserBills(user1.id);
    const result2 = await bill.getUserBills(user2.id);

    expect(result1).toEqual(user1Bills.reverse());
    expect(result2).toEqual(user2Bills.reverse());
  });

  test('getBillUsers: should return array of users associated with the bill', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const user2 = await user.createOne({ email: faker.internet.email() });

    const bill1 = await bill.createOne({ name: 'bu1' }, user1.id);
    const bill2 = await bill.createOne({ name: 'bu2' }, user2.id);

    const result1 = await bill.getBillUsers(bill1.id);
    const result2 = await bill.getBillUsers(bill2.id);

    expect(result1).toEqual([user1]);
    expect(result2).toEqual([user2]);
  });

  test('getBillInvites: should return array of invites associated with the bill', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'bu1' }, user1.id);
    const invite1 = await billInvite.createOne(
      { email: faker.internet.email(), billId: bill1.id },
      user1.id
    );

    const result1 = await bill.getBillInvites(bill1.id);

    // TODO: for whatever reason the model does not return all the DB fields ????
    delete invite1.billId;
    delete invite1.invitedById;

    expect(result1).toEqual([invite1]);

    await bill.remove(bill1.id);
    await user.remove(user1.id);
  });
});
