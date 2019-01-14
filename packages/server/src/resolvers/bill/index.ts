import {
  Resolver,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql';
import { BillInput } from './billInput';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { User } from '../../entity/User';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BillInvite } from '../../entity/BillInvite';

@Resolver(Bill)
export class BillResolver {
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

  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    return Bill.find({
      where: { creatorId: ctx.req.session!.userId },
      order: { updatedAt: 'DESC' },
    });
  }

  @Authorized()
  @Query(() => Bill)
  async bill(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;

    const bill = await Bill.findOne({ where: { id } });

    const billHasUserId =
      bill &&
      bill.usersIds &&
      bill.usersIds.findIndex(id => id === userId) !== -1;

    if (!billHasUserId) {
      throw new Error("We couldn't find what you were looking for");
    }

    return bill;
  }

  @Authorized()
  @Mutation(() => Bill)
  async createBill(
    @Arg('billInput') billInput: BillInput,
    @Ctx() ctx: MyContext
  ) {
    const creatorId = ctx.req.session!.userId;

    const owner = await User.findOne({ where: { id: creatorId } });

    const bill = await Bill.create({
      ...billInput,
      creatorId,
      users: Promise.resolve([owner]),
      usersIds: [creatorId],
    }).save();

    return bill;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeBill(@Arg('id') id: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Bill)
        .where('id = :id', { id })
        .execute();

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
