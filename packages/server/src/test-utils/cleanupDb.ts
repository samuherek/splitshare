import { getConnection } from 'typeorm';

export default async function cleanupDb() {
  await getConnection().query('DELETE FROM bill_user');
  await getConnection().query('DELETE FROM receipt');
  await getConnection().query('DELETE FROM bill_invite');
  await getConnection().query('DELETE FROM bill');
  await getConnection().query('DELETE FROM "user"');
}
