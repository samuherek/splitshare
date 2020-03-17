import { FindConditions, getRepository, ObjectID } from 'typeorm';
import { paginate } from '../../utils/pagination';
import updateRowTimestamp from '../../utils/updateRowTimestamp';
import { Bill } from '../bill/entity';
import { Receipt, UserSplitsMap } from './entity';
import { CreateReceiptInput, ReceiptsArgs } from './types.d';

export interface ReceiptModel {
  getById: typeof getById;
  getBillReceipts: typeof getBillReceipts;
  getAllBillReceipts: typeof getAllBillReceipts;
  createOne: typeof createOne;
  remove: typeof remove;
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

async function createOne(input: CreateReceiptInput, createdById: string) {
  const { splits, ...rest } = input;

  const userSplitsMap: UserSplitsMap = splits.reduce(
    (acc: UserSplitsMap, split) => {
      acc[split.userId] = split.value;
      return acc;
    },
    {}
  );

  const receipt = await getRepository(Receipt)
    .create({ ...rest, splits: userSplitsMap, createdById })
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
};
