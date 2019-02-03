import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    database: 'splitshare-test',
    dropSchema: drop,
    host: 'localhost',
    name: 'default',
    password: '',
    port: 5432,
    entities: [__dirname + '/../entity/**/*.*'],
    migrations: [__dirname + '/../migration/**/*.*'],
    subscribers: [__dirname + '/../subscriber/**/*.*'],
    synchronize: drop,
    type: 'postgres',
    username: 'samuherek',
  });
};
