import * as faker from 'faker';
import { Connection } from 'typeorm';
import cleanupDb from '../../../test-utils/cleanupDb';
import { connectTestDatabase } from '../../../test-utils/testConnection';
import user from '../../user/model';

let conn: Connection;

beforeAll(async () => {
  conn = await connectTestDatabase({ drop: false });
});

afterAll(async () => {
  conn.close();
});

describe('user model', () => {
  beforeEach(() => cleanupDb());

  test('createOne: should create a new user', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const result1 = await user.getById(user1.id);

    expect(user1).toEqual(result1);
  });

  // TODO: Figure out how to test this
  // test('createOne: should not create two users with the same email', async () => {
  //   await user.createOne({ email: 'same@email.com' });

  //   expect(async () => {
  //     await user.createOne({ email: 'same@email.com' });
  //   }).toThrowError();
  // });

  test('getById: should find the user with the id', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const result1 = await user.getById(user1.id);

    expect(result1).toEqual(user1);
  });

  test('getUser: should find a user based on email filter', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    const result1 = await user.getUser({ email: user1.email });

    expect(result1).toEqual(user1);
  });

  test('remove: should remove user from database', async () => {
    const user1 = await user.createOne({ email: faker.internet.email() });
    await user.remove(user1.id);

    const result1 = await user.getById(user1.id);

    expect(result1).toBeUndefined();
  });
});
