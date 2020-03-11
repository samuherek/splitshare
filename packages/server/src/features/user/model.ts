import { getRepository } from 'typeorm';
import { User } from './entity';
import { SetupAccountInput, UserFilter, UserInput } from './types.d';

export interface UserModel {
  createOne: typeof createOne;
  getUser: typeof getUser;
  getById: typeof getById;
  update: typeof update;
  remove: typeof remove;
}

async function getById(id: string) {
  return User.findOne(id);
}

async function getUser(filter: UserFilter) {
  return getRepository(User).findOne(filter);
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
  return getRepository(User)
    .create(input)
    .save();
}

export default {
  createOne,
  getUser,
  getById,
  update,
  remove,
};
