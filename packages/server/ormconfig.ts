import { CustomNamingStrategy } from './src/db';

// We have to have this file for typeorm cli.js to inject the "CustomNamingStrategy"
// otherwise it reads things from the ".env" file.
// Also, because of this, have to have dedicated ".env" files per environment like this
// ".env.development" or ".env.production"
// https://github.com/typeorm/typeorm/issues/3420

module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  username: 'samuherek',
  password: '',
  database: 'st',
  port: 5432,
  logging: true,
  entities: ['src/entity/**/*.*'],
  migrations: ['src/migration/**/*.*'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
  migrationsRun: true,
  namingStrategy: new CustomNamingStrategy(),
};
