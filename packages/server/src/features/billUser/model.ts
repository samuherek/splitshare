import { InviteInput } from './types.d';

export interface BillUserModel {
  createInvite: typeof createInvite;
  // getById: typeof getById;
  // remove: typeof remove;
  // createOne: typeof createOne;
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

async function createInvite(input: InviteInput, creatorId: string) {
  return;
}

export default {
  createInvite,
  // getById,
  // remove,
  // createOne,
};
