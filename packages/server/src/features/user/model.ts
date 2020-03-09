import { getRepository } from 'typeorm';
import { User } from './entity';
import { UserFilter, UserInput } from './types.d';

export interface UserModel {
  createOne: typeof createOne;
  getUser: typeof getUser;
  getById: typeof getById;
  remove: typeof remove;
}

async function getById(id: string) {
  return User.findOne(id);
}

async function getUser(filter: UserFilter) {
  return getRepository(User).findOne(filter);
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
  remove,
};
