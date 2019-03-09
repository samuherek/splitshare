import { createConnection, getConnectionOptions } from 'typeorm';
// import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy';
// import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
// import { snakeCase } from 'typeorm/util/StringUtils';

// class CustomNamingStrategy extends DefaultNamingStrategy
//   implements NamingStrategyInterface {
//   tableName(targetName: string, userSpecifiedName: string): string {
//     return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's';
//   }

//   columnName(
//     propertyName: string,
//     _: string,
//     embeddedPrefixes: string[]
//   ): string {
//     return snakeCase(embeddedPrefixes.concat(propertyName).join('_'));
//   }

//   columnNameCustomized(customName: string): string {
//     return customName;
//   }

//   relationName(propertyName: string): string {
//     return snakeCase(propertyName);
//   }
// }

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  let retries = 5;
  while (retries) {
    try {
      return process.env.NODE_ENV === 'production'
        ? createConnection({
            name: 'default',
            type: 'postgres',
            url: process.env.DATABASE_URL,
          })
        : createConnection({ ...connectionOptions, name: 'default' });
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
