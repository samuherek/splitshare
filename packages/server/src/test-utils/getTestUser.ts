import { Connection } from 'typeorm';
import { User } from '../features/user/entity';

export const testUser = {
  email: 'user@email.com',
};

export async function getTestUser(conn: Connection) {
  const user = await conn.getRepository(User).findOne(testUser);

  if (!user) {
    throw new Error('No Test user found');
  }

  return user;
}
