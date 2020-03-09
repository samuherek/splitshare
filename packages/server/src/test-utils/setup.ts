// @ts-ignore
import * as tryToCatch from 'try-to-catch';
import { Connection } from 'typeorm';
import { connectTestDatabase } from './testConnection';

(async () => {
  const [error, conn]: [Error, Connection] = await tryToCatch(
    connectTestDatabase,
    { drop: true }
  );

  if (error) {
    throw new Error(error.message);
  }
})();
