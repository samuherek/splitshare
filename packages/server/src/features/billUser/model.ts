import { getConnection, getRepository } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { BillUser } from '../../entity/BillUser';
import { remap } from '../../utils/entity';
import { InviteState } from './config';
import { CreateBillUserInput } from './types.d';
import { getInviteId } from './utils';
import mapObject = require('map-obj');

export interface BillUserModel {
  getBillInvite: typeof getBillInvite;
  createOne: typeof createOne;
  getBillUser: typeof getBillUser;
  getBillUsersById: typeof getBillUsersById;
  remove: typeof remove;
  update: typeof update;
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

  return !res ? null : remap(res, '__user__');
}

async function getBillUsersById(billId: string, userIds: string[]) {
  return getRepository(BillUser)
    .createQueryBuilder('billUser')
    .where('billUser.billId = :billId', { billId })
    .andWhere('billUser.userId IN (:...userIds)', { userIds })
    .getMany();
}

async function getBillInvite(billId: string, userId: string) {
  const res = await getRepository(BillUser)
    .createQueryBuilder('billUser')
    .where('billUser.userId = :userId', { userId })
    .andWhere('billUser.billId = :billId', { billId })
    .getOne();

  return !res
    ? null
    : {
        ...res,
        id: getInviteId(res),
      };
}

async function update(billId: string, state: InviteState, userId: string) {
  const { raw } = await getConnection()
    .createQueryBuilder()
    .update(BillUser)
    // @ts-ignore
    .set({ state })
    .where('billId = :billId', { billId })
    .andWhere('userId = :userId', { userId })
    .updateEntity(true)
    .output('*')
    .execute();

  const [res] = raw;

  if (!res) {
    throw new Error('No such bill invite found');
  }

  const mappedObj = mapObject(res, (key, val) => [
    camelCase(key as string),
    val,
  ]);
  return {
    ...mappedObj,
    // FIXME: figure out typing
    // @ts-ignore
    id: getInviteId(mappedObj),
  };
}

async function remove(billId: string, userId: string) {
  const res = await getBillUser(billId, userId);
  await getRepository(BillUser).delete({ billId, userId });
  return res;
}

async function createOne(input: CreateBillUserInput) {
  return getRepository(BillUser).create(input).save();
}

export default {
  createOne,
  getBillUser,
  getBillUsersById,
  getBillInvite,
  remove,
  update,
};
