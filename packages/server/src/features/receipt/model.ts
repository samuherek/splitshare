import { getConnection, getRepository } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { Bill } from '../../entity/Bill';
import { Receipt } from '../../entity/Receipt';
import { maybe } from '../../utils/object';
import { paginate } from '../../utils/pagination';
import updateRowTimestamp from '../../utils/updateRowTimestamp';
import {
  CreateReceiptInput,
  ReceiptsArgs,
  RemoveReceiptFilter,
  UpdateReceiptInput,
} from './types.d';
import { getUserSplitsMap } from './utils';
import mapObject = require('map-obj');

export interface ReceiptModel {
  getById: typeof getById;
  getBillReceipts: typeof getBillReceipts;
  getAllBillReceipts: typeof getAllBillReceipts;
  createOne: typeof createOne;
  remove: typeof remove;
  update: typeof update;
}

// TODO: Figure out a way how to only allow "userId"
async function getBillReceipts({ billId, pagination }: ReceiptsArgs) {
  const query = getRepository(Receipt)
    .createQueryBuilder('receipt')
    .where('receipt.billId = :billId', { billId })
    .orderBy({
      'receipt.paidAt': 'DESC',
      'receipt.createdAt': 'DESC',
    });

  return paginate(query, pagination);
}

async function getAllBillReceipts(billId: string) {
  return getRepository(Receipt)
    .createQueryBuilder('receipt')
    .where('receipt.billId = :billId', { billId })
    .getMany();
}

async function getById(id: string) {
  return getRepository(Receipt).findOne(id);
}

async function remove(filter: RemoveReceiptFilter) {
  await getRepository(Receipt).delete(filter);
  return true;
}

async function update(id: string, input: UpdateReceiptInput) {
  const { splits, ...rest } = input;

  const { raw } = await getConnection()
    .createQueryBuilder()
    .update(Receipt)
    .set({
      ...rest,
      ...maybe('splits', splits && getUserSplitsMap(splits)),
    })
    .where('id = :id', { id })
    .updateEntity(true)
    .output('*')
    .execute();

  const [res] = raw;

  if (!res) {
    throw new Error('No such receipt found');
  }

  return mapObject(res, (key, val) => [camelCase(key as string), val]);
}

async function createOne(input: CreateReceiptInput, createdById: string) {
  const { splits, ...rest } = input;

  const receipt = await getRepository(Receipt)
    .create({ ...rest, splits: getUserSplitsMap(splits), createdById })
    .save();

  await updateRowTimestamp(Bill, input.billId);

  return receipt;
}

export default {
  getById,
  getBillReceipts,
  getAllBillReceipts,
  createOne,
  remove,
  update,
};
