import { getRepository } from 'typeorm';
import { paginate } from '../../utils/pagination';
import { inviteState } from '../billUser/config';
import { BillUser } from '../billUser/entity';
import { User } from '../user/entity';
import { Bill } from './entity';
import { BillsArgs, CreateBillInput } from './types.d';

export interface BillModel {
  getById: typeof getById;
  getUserBills: typeof getUserBills;
  getBillUsers: typeof getBillUsers;
  // getBillInvites: typeof getBillInvites;
  createOne: typeof createOne;
  remove: typeof remove;
}

async function getById(billId: string, userId: string) {
  return getRepository(Bill)
    .createQueryBuilder('bill')
    .innerJoin('bill.billUsers', 'billUser', 'billUser.billId = bill.id')
    .where('billUser.userId = :userId', { userId })
    .andWhere('bill.id = :billId', { billId })
    .getOne();
}

async function getUserBills({ pagination, filter }: BillsArgs, userId: string) {
  const query = getRepository(Bill)
    .createQueryBuilder('bill')
    .innerJoin('bill.billUsers', 'billUser', 'billUser.billId = bill.id')
    .where('billUser.userId = :userId', { userId });

  if (filter?.status) {
    query.andWhere(
      filter.status === 'OPENED'
        ? 'bill.closedAt IS NULL'
        : 'bill.closedAt IS NOT NULL'
    );
  }

  query.orderBy('bill.updatedAt', 'DESC');

  return paginate(query, pagination);
}

async function getBillUsers(billId: string) {
  return getRepository(User)
    .createQueryBuilder('user')
    .innerJoin('user.billUsers', 'billUser', 'billUser.userId = user.id')
    .where('billUser.billId = :billId', { billId })
    .getMany();
}

//   return getRepository(BillInvite)
//     .createQueryBuilder('billInvite')
//     .where('billInvite.billId = :billId', { billId })
//     .andWhere('billInvite.deletedAt is null')
//     .andWhere('billInvite.pending = :pending', { pending: true })
//     .getMany();
// }

// async function getBillSplitsAggregate(billId: string) {
//   // TODO: This needs to be somehow rewritten into a query builder. Just don't know how
//   return getConnection().query(
//     `SELECT splits.key as "userId", sum(splits.value::integer) as value FROM (SELECT key, value FROM receipt, jsonb_each(receipt.splits) WHERE receipt.bill_id = $1) splits GROUP BY "userId"`,
//     [billId]
//   );
//   // return getConnection()
//   //   .createQueryBuilder()
//   //   .select('*')
//   //   .from(
//   //     subQuery =>
//   //       subQuery
//   //         .select('*')
//   //         // .addSelect('value')
//   //         .from(Receipt, 'jsonb_each(receipt.splits)')
//   //         .where('receipt.billId = :billId', { billId }),
//   //     'splits'
//   //   )
//   //   .getRawMany();
// }

async function remove(criteria: string | string[]) {
  return getRepository(Bill).delete(criteria);
}

async function createOne(input: CreateBillInput, creatorId: string) {
  const bill = await getRepository(Bill)
    .create({ ...input, createdById: creatorId })
    .save();

  // TODO: Figure out how to type this
  // @ts-ignore
  await getRepository(BillUser)
    .create({
      billId: bill.id,
      userId: creatorId,
      state: inviteState.ACCEPTED,
    })
    .save();

  return bill;
}

export default {
  getById,
  getUserBills,
  getBillUsers,
  // getBillInvites,
  createOne,
  remove,
};
