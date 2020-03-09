// @ts-ignore
import * as tryToCatch from 'try-to-catch';
import { createConnection } from 'typeorm';
import { CustomNamingStrategy } from '../db';

export async function connectTestDatabase({ drop }: { drop: boolean }) {
  const [error, conn] = await tryToCatch(createConnection, {
    database: 'splitshare-test2',
    dropSchema: drop,
    host: 'localhost',
    name: 'default',
    password: '',
    namingStrategy: new CustomNamingStrategy(),
    port: 5432,
    entities: [__dirname + '/../features/**/entity.*'],
    migrations: [__dirname + '/../migration/**/*.*'],
    subscribers: [__dirname + '/../subscriber/**/*.*'],
    synchronize: drop,
    type: 'postgres',
    username: 'samuherek',
  });

  if (error) {
    throw new Error(error.message);
  }

  return conn;
}
