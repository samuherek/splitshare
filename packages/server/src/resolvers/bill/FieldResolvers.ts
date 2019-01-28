import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BillInvite } from '../../entity/BillInvite';

@Resolver(Bill)
export class BillFieldResolversResolver {
  constructor() {}

  @FieldResolver(() => [BillInvite])
  async invites(@Root() bill: Bill) {
    const invites = await getConnection().query(
      `SELECT * FROM "bill_invite" as "b" where "b"."billId" = $1;`,
      [bill.id]
    );
    console.log(invites);
    return plainToClass(BillInvite, invites);
  }
}
