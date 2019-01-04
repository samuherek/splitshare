import { createConnection } from 'typeorm';

export const createTypeormConn = async () => {
  let retries = 5;
  while (retries) {
    try {
      // console.log('in here');
      // console.log(getConnectionOptions);
      // const config = await getConnectionOptions();
      return createConnection({
        name: 'default',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'samuherek',
        password: '',
        database: 'splitshare',
        logging: true,
        synchronize: true,
        entities: ['src/entity/**/*.*'],
        migrations: ['src/migration/**/*.*'],
        subscribers: ['src/subscriber/**/*.*'],
        cli: {
          entitiesDir: 'src/entity',
          migrationsDir: 'src/migration',
          subscribersDir: 'src/subscriber',
        },
      });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return null;
};
