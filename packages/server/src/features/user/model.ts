import { getRepository } from 'typeorm';
import { BillUser } from '../../entity/BillUser';
import { User } from '../../entity/User';
import { SetupAccountInput, UserFilter, UserInput } from './types.d';

export interface UserModel {
  createOne: typeof createOne;
  getUser: typeof getUser;
  getBillUsersByUserId: typeof getBillUsersByUserId;
  getById: typeof getById;
  update: typeof update;
  remove: typeof remove;
  getUsersByIds: typeof getUsersByIds;
  getByEmails: typeof getByEmails;
}

async function getById(id: string) {
  return User.findOne(id);
}

async function getUser(filter: UserFilter) {
  return getRepository(User).findOne(filter);
}

async function getUsersByIds(ids: string[]) {
  return getRepository(User)
    .createQueryBuilder('user')
    .where('user.id IN (:...ids)', { ids })
    .getMany();
}

async function getByEmails(emails: string[]) {
  return getRepository(User)
    .createQueryBuilder('user')
    .where('user.email IN (:...emails)', { emails })
    .getMany();
}

async function getBillUsersByUserId(userId: string) {
  const selectedBillUsers = await getRepository(BillUser)
    .createQueryBuilder('billUser')
    .select('billUser.userId')
    .where((qb) => {
      const subQuery = qb
        .subQuery()
        .select('billUser.billId')
        .from(BillUser, 'billUser')
        .where('billUser.userId = :userId', { userId })
        .getQuery();
      return `billUser.billId IN ${subQuery}`;
    })
    .groupBy('billUser.userId')
    .addGroupBy('billUser.billId')
    .getMany();

  return getRepository(User)
    .createQueryBuilder('user')
    .where('user.id IN (:...userIds)', {
      userIds: selectedBillUsers.map((bu) => bu.userId),
    })
    .getMany();
}

async function update(input: SetupAccountInput, userId: string) {
  try {
    await getRepository(User).update(userId, input);
    return true;
  } catch (e) {
    throw new Error(e);
  }
}

async function remove(criteria: string | string[]) {
  return getRepository(User).delete(criteria);
}

async function createOne(input: UserInput) {
  return getRepository(User).create(input).save();
}

export default {
  createOne,
  getUser,
  getBillUsersByUserId,
  getById,
  update,
  remove,
  getUsersByIds,
  getByEmails,
};
