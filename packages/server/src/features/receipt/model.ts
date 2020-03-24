import {
  FindConditions,
  getConnection,
  getRepository,
  ObjectID,
} from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { maybe } from '../../utils/object';
import { paginate } from '../../utils/pagination';
import updateRowTimestamp from '../../utils/updateRowTimestamp';
import { Bill } from '../bill/entity';
import { Receipt } from './entity';
import {
  CreateReceiptInput,
  ReceiptsArgs,
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
  const query = await getRepository(Receipt)
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

async function remove(
  criteria:
    | string
    | number
    | string[]
    | number[]
    | Date
    | Date[]
    | ObjectID
    | ObjectID[]
    | FindConditions<Receipt>
) {
  return getRepository(Receipt).delete(criteria);
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
