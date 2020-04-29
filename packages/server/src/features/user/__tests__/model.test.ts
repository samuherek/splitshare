import * as faker from 'faker';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CustomNamingStrategy } from '../../../db';
import User from '../model';

// createOne,
// getUser,
// getBillUsersByUserId,
// getById,
// update,
// remove,
// getUsersByIds,
// getByEmails

describe.only('user model', () => {
  beforeEach(async () => {
    return createConnection({
      database: 'splitshare-test2',
      dropSchema: true,
      host: 'localhost',
      name: 'default',
      password: '',
      namingStrategy: new CustomNamingStrategy(),
      port: 5432,
      entities: ['src/entity/**/*.*'],
      migrations: ['src/migration/**/*.*'],
      synchronize: true,
      type: 'postgres',
      username: 'samuherek',
    });
  });

  afterEach(async () => {
    let conn = getConnection();
    return conn.close();
  });

  describe('createOne', () => {
    test('creates a new user in database without errors', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getById(user.id);

      expect(result).not.toEqual(undefined);
    });

    test('returns the created user after creation', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getById(user.id);

      expect(result).toEqual(user);
    });

    test('throws an error if a user with such email exists', async () => {
      await User.createOne({ email: 'some@email.com' });

      await expect(
        User.createOne({ email: 'some@email.com' })
      ).rejects.toThrow();
    });
  });

  describe('getById', () => {
    test('finds the user with the id in the database', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getById(user.id);

      expect(result).toEqual(user);
    });

    test('returns undefined if such user does not exist in the database', async () => {
      const result = await User.getById(uuidv4());

      expect(result).toEqual(undefined);
    });
  });

  describe('getUser', () => {
    test('should find a user based on email filter', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getUser({ email: user.email });

      expect(result).toEqual(user);
    });

    test('returns undefined if the user was not found in the database', async () => {
      const result = await User.getUser({ email: faker.internet.email() });

      expect(result).toEqual(undefined);
    });
  });

  describe('getUsersByIds', () => {
    it('returns and array type', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getUsersByIds([user.id]);

      expect(result).toEqual(expect.any(Array));
    });

    it('returns the found users in an array', async () => {
      const user1 = await User.createOne({ email: faker.internet.email() });
      const user2 = await User.createOne({ email: faker.internet.email() });
      await User.createOne({ email: faker.internet.email() });

      const result = await User.getUsersByIds([user1.id, user2.id]);

      expect(result).toEqual([user1, user2]);
    });

    it('finds only the users in the provided ids', async () => {
      const user1 = await User.createOne({ email: faker.internet.email() });
      const user2 = await User.createOne({ email: faker.internet.email() });
      const user3 = await User.createOne({ email: faker.internet.email() });

      const result = await User.getUsersByIds([user1.id, user2.id]);

      expect(result.filter((u) => u.id === user3.id)).toEqual([]);
    });
  });

  describe('getByEmails', () => {
    it('returns an array type', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.getByEmails([user.email]);

      expect(result).toEqual(expect.any(Array));
    });

    it('returns the found users in an array', async () => {
      const user1 = await User.createOne({ email: faker.internet.email() });
      const user2 = await User.createOne({ email: faker.internet.email() });
      await User.createOne({ email: faker.internet.email() });

      const result = await User.getByEmails([user1.email, user2.email]);

      expect(result).toEqual([user1, user2]);
    });

    it('finds only the users in the provided emails', async () => {
      const user1 = await User.createOne({ email: faker.internet.email() });
      const user2 = await User.createOne({ email: faker.internet.email() });
      const user3 = await User.createOne({ email: faker.internet.email() });

      const result = await User.getByEmails([user1.email, user2.email]);

      expect(result.filter((u) => u.id === user3.id)).toEqual([]);
    });
  });

  describe('update', () => {
    it('returns the user type', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.update(
        { firstName: 'sam', lastName: 'uherek' },
        user.id
      );

      expect(result).toEqual({
        ...user,
        createdAt: expect.any(Date),
        firstName: expect.any(String),
        lastName: expect.any(String),
      });
    });

    it('should update the provided fields on the user', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      const result = await User.update(
        { firstName: 'sam', lastName: 'uherek' },
        user.id
      );

      expect(result).toEqual({
        ...user,
        createdAt: expect.any(Date),
        firstName: 'sam',
        lastName: 'uherek',
      });
    });

    it('throws an error when something goes wrong', async () => {
      await User.createOne({ email: faker.internet.email() });

      await expect(
        User.update({ firstName: 'sam', lastName: 'uherek' }, uuidv4())
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    test('removes user from database if exists', async () => {
      const user = await User.createOne({ email: faker.internet.email() });
      await User.remove(user.id);

      const result = await User.getById(user.id);

      expect(result).toEqual(undefined);
    });
  });
});
