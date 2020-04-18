import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';
import { snakeCase } from 'typeorm/util/StringUtils';
import Bill from './features/bill/model';
import BillUser from './features/billUser/model';
import Email from './features/email/invite';
import Notification from './features/notification/model';
import Receipt from './features/receipt/model';
import User from './features/user/model';

export class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  columnName(
    propertyName: string,
    _: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(embeddedPrefixes.concat(propertyName).join('_'));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

export async function init(): Promise<Connection | null> {
  const connectionOptions = await getConnectionOptions();

  let retries = 5;
  while (retries) {
    try {
      return createConnection({
        ...connectionOptions,
        namingStrategy: new CustomNamingStrategy(),
      });
      //   // @ts-ignore
      //   return createConnection({
      //     url: process.env.DATABASE_URL || '',
      //     type: 'postgres',
      //     // name: 'production',
      //     namingStrategy: new CustomNamingStrategy(),
      //     entities: [
      //       'src/entity/*.{ts,js}',
      //       // __dirname + '/features/**/entity.{ts,js}',
      //       // __dirname + '/features/**/entity/**.{ts,js}',
      //     ],
      //     migrations: ['src/migrations/*{.ts,.js}'],
      //     logging: true,
      //     // TODO: move this into migrations instead for production
      //     // synchronize: true,
      //   });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  return null;
}

export const models = {
  Bill,
  BillUser,
  Receipt,
  User,
  Notification,
  // TODO: this is weird
  Email,
};
