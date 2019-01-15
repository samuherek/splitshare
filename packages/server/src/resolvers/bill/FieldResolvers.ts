import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BillInvite } from '../../entity/BillInvite';

@Resolver(Bill)
export class BillFieldResolversResolver {
  constructor() {}

  @FieldResolver()
  async creator(@Root() bill: Bill, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(bill.creatorId);
  }

  @FieldResolver(() => [BillInvite])
  async invites(@Root() bill: Bill) {
    const invites = await getConnection().query(
      `SELECT * FROM "bill_invite" as "b" where "b"."billId" = $1;`,
      [bill.id]
    );
    console.log(invites);
    return plainToClass(BillInvite, invites);
  }

  @FieldResolver()
  async users(@Root() bill: Bill, @Ctx() ctx: MyContext) {
    // const u = await getConnection().query(
    //   `SELECT * FROM "user" JOIN "bill_invite" as "b" on "b"."userId" = "user"."id" WHERE "b"."billId" = $1;`,
    //   [bill.id]
    // );

    // return plainToClass(User, u);

    // const res: User[] = await getConnection().query(
    //   `SELECT * FROM "user" INNER JOIN "bill_users_user" as "b" on "b"."userId" = "user"."id" WHERE "b"."billId" = $1;`,
    //   [bill.id]
    // );
    // console.log('first response', res);

    // return res.map(u => plainToClass(User, u));

    return ctx.userLoader.loadMany(bill.usersIds || []);
  }
}
