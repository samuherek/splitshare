import * as faker from 'faker';
import { createConnection, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CustomNamingStrategy } from '../../../db';
import { Bill as BillEntity } from '../../../entity/bill';
import { Receipt as ReceiptEntity } from '../../../entity/Receipt';
import { User as UserEntity } from '../../../entity/user';
import Bill from '../../bill/model';
import User from '../../user/model';
import Receipt from '../model';

describe('receipt model', () => {
  let user1: UserEntity;
  let user2: UserEntity;
  let bill: BillEntity;

  const receiptType = {
    title: expect.any(String),
    total: expect.any(Number),
    currency: expect.any(String),
    paidAt: expect.any(Date),
    billId: expect.any(String),
    paidById: expect.any(String),
    createdById: expect.any(String),
    splits: expect.any(Object),
    comment: expect.any(String),
    category: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(Date),
    isSettlement: expect.any(Boolean),
  };

  beforeEach(async () => {
    const conn = await createConnection({
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

    user1 = await User.createOne({ email: faker.internet.email() });
    user2 = await User.createOne({ email: faker.internet.email() });
    bill = await Bill.createOne(
      { name: 'bill', currency: faker.finance.currencyCode() },
      user1.id
    );

    return conn;
  });

  afterEach(async () => {
    let conn = getConnection();
    return conn.close();
  });

  describe('createOne', () => {
    test('returns type of receipt after creation', async () => {
      const receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );

      expect(receipt).toEqual(receiptType);
    });

    test('creates the receipt in the database', async () => {
      const receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );

      const result = await Receipt.getById(receipt.id);

      expect(result).toBeDefined();
      expect(result?.id).toEqual(receipt.id);
    });
  });

  describe('update', () => {
    let receipt: ReceiptEntity;

    beforeEach(async () => {
      receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );
      return receipt;
    });

    test('should return type of Receipt', async () => {
      const result = await Receipt.update(receipt.id, { title: 'bill2' });

      expect(result).toEqual({
        ...receiptType,
        createdAt: expect.any(Date),
        total: expect.any(String),
      });
    });

    test('should update receipt fields', async () => {
      const nextTitle = 'next title';
      const update = await Receipt.update(receipt.id, { title: nextTitle });
      const result = await Receipt.getById(update.id);

      expect(result?.title).toEqual(nextTitle);
    });

    test('throws an error when no such receipt exist in database', async () => {
      await expect(Receipt.update(uuidv4(), { title: '' })).rejects.toThrow();
    });
  });

  describe('remove', () => {
    let receipt: ReceiptEntity;

    beforeEach(async () => {
      receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );
      return receipt;
    });

    test('returns type of receipt', async () => {
      const result = await Receipt.remove({ id: receipt.id });

      expect(result).toEqual(expect.any(Boolean));
    });

    test('removes receipt from the database', async () => {
      await Receipt.remove({ id: receipt.id });
      const result = await Receipt.getById(receipt.id);

      expect(result).toEqual(undefined);
    });
  });

  describe('getById', () => {
    let receipt: ReceiptEntity;

    beforeEach(async () => {
      receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );
      return receipt;
    });

    test('returns type of receipt', async () => {
      const result = await Receipt.getById(receipt.id);

      expect(result).toEqual({
        ...receiptType,
        paidAt: expect.any(String),
        total: expect.any(String),
      });
    });

    test('returns the correct receipt', async () => {
      const result = await Receipt.getById(receipt.id);

      expect(result?.id).toEqual(receipt.id);
    });

    test('returns undefined if there is no such receipt', async () => {
      const result = await Receipt.getById(uuidv4());

      expect(result).toEqual(undefined);
    });
  });

  describe('getAllBillReceipts', () => {
    let receipt: ReceiptEntity;
    let receipt2: ReceiptEntity;
    let bill2: BillEntity;

    beforeEach(async () => {
      bill2 = await Bill.createOne(
        { name: 'bill2', currency: faker.finance.currencyCode() },
        user1.id
      );
      receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );
      receipt2 = await Receipt.createOne(
        {
          title: 'receipt2',
          billId: bill.id,
          paidById: user2.id,
          paidAt: new Date('2000-01-01'),
          total: 30,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 20 },
            { userId: user2.id, value: 10 },
          ],
        },
        user1.id
      );
      await Receipt.createOne(
        {
          title: 'receipt3',
          billId: bill2.id,
          paidById: user2.id,
          paidAt: new Date('2000-01-01'),
          total: 20,
          comment: 'comment',
          category: 'car',
          currency: bill2.currency,
          splits: [
            { userId: user1.id, value: 10 },
            { userId: user2.id, value: 10 },
          ],
        },
        user2.id
      );
      return receipt;
    });

    test('returns type of array', async () => {
      const result = await Receipt.getAllBillReceipts(bill.id);

      expect(result).toEqual(expect.any(Array));
    });

    test('returns only receipts assigned to the bill', async () => {
      const result = await Receipt.getAllBillReceipts(bill.id);

      expect(result).toEqual([
        {
          ...receipt,
          total: String(receipt.total),
          paidAt: '2000-01-01',
        },
        {
          ...receipt2,
          total: String(receipt2.total),
          paidAt: '2000-01-01',
        },
      ]);
    });

    test('returns empty array if bill has no receipts', async () => {
      const result = await Receipt.getAllBillReceipts(uuidv4());

      expect(result).toEqual([]);
    });
  });

  describe('getBillReceipts', () => {
    let receipt: ReceiptEntity;
    let receipt2: ReceiptEntity;
    let bill2: BillEntity;

    beforeEach(async () => {
      bill2 = await Bill.createOne(
        { name: 'bill2', currency: faker.finance.currencyCode() },
        user1.id
      );
      receipt = await Receipt.createOne(
        {
          title: 'bill',
          billId: bill.id,
          paidById: user1.id,
          paidAt: new Date('2000-01-01'),
          total: 10,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 5 },
            { userId: user2.id, value: 5 },
          ],
        },
        user1.id
      );
      receipt2 = await Receipt.createOne(
        {
          title: 'receipt2',
          billId: bill.id,
          paidById: user2.id,
          paidAt: new Date('2000-01-01'),
          total: 30,
          comment: 'comment',
          category: 'car',
          currency: bill.currency,
          splits: [
            { userId: user1.id, value: 20 },
            { userId: user2.id, value: 10 },
          ],
        },
        user1.id
      );
      await Receipt.createOne(
        {
          title: 'receipt3',
          billId: bill2.id,
          paidById: user2.id,
          paidAt: new Date('2000-01-01'),
          total: 20,
          comment: 'comment',
          category: 'car',
          currency: bill2.currency,
          splits: [
            { userId: user1.id, value: 10 },
            { userId: user2.id, value: 10 },
          ],
        },
        user2.id
      );
      return receipt;
    });

    test('should return paginated type', async () => {
      const result = await Receipt.getBillReceipts({ billId: bill.id });

      // TODO: turn this into a pagination helper to check the shape
      expect(result).toEqual({
        edges: expect.any(Array),
        pageInfo: {
          endCursor: expect.any(String),
          hasNextPage: expect.any(Boolean),
          itemsCount: expect.any(Number),
        },
      });
    });

    test('returns only receipts assigned to the bill', async () => {
      const result = await Receipt.getBillReceipts({ billId: bill.id });

      expect(result).toEqual({
        edges: [
          {
            node: {
              ...receipt,
              total: String(receipt.total),
              paidAt: '2000-01-01',
            },
            cursor: 'nodeCursor',
          },
          {
            node: {
              ...receipt2,
              total: String(receipt2.total),
              paidAt: '2000-01-01',
            },
            cursor: 'nodeCursor',
          },
        ],
        pageInfo: {
          endCursor: 'cursorEnd',
          hasNextPage: false,
          itemsCount: 2,
        },
      });
    });

    test('returns empty paginated result if bll has no receipts', async () => {
      const result = await Receipt.getBillReceipts({ billId: uuidv4() });

      expect(result).toEqual({
        edges: [],
        pageInfo: {
          endCursor: 'cursorEnd',
          hasNextPage: false,
          itemsCount: 0,
        },
      });
    });
  });
});
