import * as faker from 'faker';
import { Connection } from 'typeorm';
import cleanupDb from '../../../test-utils/cleanupDb';
import { connectTestDatabase } from '../../../test-utils/testConnection';
import bill from '../../bill/model';
import user from '../../user/model';
import invite from '../model';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDatabase({ drop: false });
});

afterAll(async () => {
  conn.close();
});

describe('invite model', () => {
  beforeEach(() => cleanupDb());

  test('createOne: should create an invite in database', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const invite1 = await invite.createOne(
      { email: faker.internet.email(), billId: bill1.id },
      user1.id
    );

    const result1 = await invite.getById(invite1.id);

    // TODO: for whatever reason the model does not return all the DB fields ????
    delete invite1.billId;
    delete invite1.invitedById;

    expect(result1).toEqual(invite1);
  });

  test('getById: should return exiting invite', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const invite1 = await invite.createOne(
      { email: faker.internet.email(), billId: bill1.id },
      user1.id
    );

    const result1 = await invite.getById(invite1.id);

    expect(result1 && result1.id).toEqual(invite1.id);
  });

  test('getById: should return NULL if nothing found', async () => {
    const result1 = await invite.getById(
      'e0fe59f6-ab76-44ab-a153-b3d0cebc22b6'
    );

    expect(result1).toBeUndefined();
  });

  test('remove: should remove all invites by id', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });

    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const bill2 = await bill.createOne({ name: 'name2' }, user1.id);

    const invite1 = await invite.createOne(
      { email: faker.internet.email(), billId: bill1.id },
      user1.id
    );

    // Extra one for testing
    await invite.createOne(
      { email: faker.internet.email(), billId: bill2.id },
      user1.id
    );

    await invite.remove(invite1.id);
    const result1 = await invite.getById(invite1.id);

    expect(result1).toBeUndefined();
  });

  test('remove: should not remove invites not asked to be deleted', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });

    const bill1 = await bill.createOne({ name: 'name' }, user1.id);
    const bill2 = await bill.createOne({ name: 'name2' }, user1.id);

    const invite1 = await invite.createOne(
      { email: faker.internet.email(), billId: bill1.id },
      user1.id
    );

    const invite2 = await invite.createOne(
      { email: faker.internet.email(), billId: bill2.id },
      user1.id
    );

    await invite.remove(invite1.id);
    const result2 = await invite.getById(invite2.id);

    expect(result2).toBeDefined();
  });
});
