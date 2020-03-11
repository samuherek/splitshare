import { getRepository } from 'typeorm';
import { BillUser } from './entity';
import { CreateBillUserInput } from './types.d';
import { remap } from './utils';

export interface BillUserModel {
  createOne: typeof createOne;
  getBillUser: typeof getBillUser;
  remove: typeof remove;
}

// async function getById(id: string) {
//   return getRepository(BillInvite).findOne(id);
// }

// async function remove(criteria: string | string[]) {
//   return getRepository(BillInvite).delete(criteria);
// }

// async function createOne(input: InviteInput, creatorId: string) {
//   return getRepository(BillInvite)
//     .create({ ...input, invitedById: creatorId })
//     .save();
// }

async function getBillUser(billId: string, userId: string) {
  const res = await getRepository(BillUser)
    .createQueryBuilder('billUser')
    .leftJoinAndMapOne(
      'billUser.user',
      'user',
      'user',
      'user.id = billUser.userId'
    )
    .where('billUser.billId = :billId', { billId })
    .andWhere('billUser.userId = :userId', { userId })
    .getOne();

  if (!res) {
    throw new Error('No such bill user have been found');
  }

  return remap(res);
}

async function remove(billId: string, userId: string) {
  const res = await getBillUser(billId, userId);
  await getRepository(BillUser).delete({ billId, userId });
  return res;
}

async function createOne(input: CreateBillUserInput) {
  await getRepository(BillUser)
    .create(input)
    .save();

  return getBillUser(input.billId, input.userId);
}

export default {
  createOne,
  getBillUser,
  remove,
};
