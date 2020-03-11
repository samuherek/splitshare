import { plainToClass } from 'class-transformer';
import { getConnection, getRepository } from 'typeorm';
import { paginate } from '../../utils/pagination';
import { InviteState } from '../billUser/config';
import { BillUser } from '../billUser/entity';
import { remap } from '../billUser/utils';
import { Bill } from './entity';
import { BillsArgs, CreateBillInput, UpdateBillInput } from './types.d';

export interface BillModel {
  getById: typeof getById;
  getUserBills: typeof getUserBills;
  getBillUsers: typeof getBillUsers;
  // getBillInvites: typeof getBillInvites;
  update: typeof update;
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

// TODO: this can be maybe done with the "View Entity" from Typeorm
//https://typeorm.io/#/view-entities
// TODO: look into this and see how it can be fixed with all the typings as well
async function getBillUsers(billId: string) {
  // TODO: figure this out. Maybe Typoerm doesn't support it?
  // https://github.com/typeorm/typeorm/issues/5111
  // https://github.com/typeorm/typeorm/issues/4329
  //
  const res = await getRepository(BillUser)
    .createQueryBuilder('billUser')
    .leftJoinAndMapOne(
      'billUser.user',
      'user',
      'user',
      'user.id = billUser.userId'
    )
    .where('billUser.billId = :billId', { billId })
    .getMany();

  return res.map(remap);
}

async function update(id: string, input: UpdateBillInput) {
  const { raw } = await getConnection()
    .createQueryBuilder()
    .update(Bill)
    .set(input)
    .where('id = :id', { id })
    .updateEntity(true)
    .output('*')
    .execute();

  return plainToClass(Bill, raw[0]);
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

  await getRepository(BillUser)
    .create({
      billId: bill.id,
      userId: creatorId,
      state: InviteState.ACCEPTED,
    })
    .save();

  return bill;
}

export default {
  getById,
  getUserBills,
  getBillUsers,
  // getBillInvites,
  update,
  createOne,
  remove,
};
