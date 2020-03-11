import { getRepository } from 'typeorm';
import { BillUser } from './entity';
import { CreateBillUserInput } from './types.d';

export interface BillUserModel {
  // createOne: typeof createOne;
  createOne: typeof createOne;
  getBillUser: typeof getBillUser;
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
  return getRepository(BillUser).findOne({ billId, userId });
}

async function createOne(input: CreateBillUserInput) {
  return getRepository(BillUser)
    .create(input)
    .save();
}

export default {
  createOne,
  getBillUser,
  // getById,
  // remove,
  // createOne,
};
