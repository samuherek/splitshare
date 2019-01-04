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
// import { getConnection } from 'typeorm';

@Resolver(Bill)
export class BillResolver {
  constructor() {}

  @FieldResolver()
  async creator(@Root() bill: Bill, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(bill.creatorId);
  }

  @FieldResolver()
  async users(@Root() bill: Bill, @Ctx() ctx: MyContext) {
    const users = await ctx.userLoader.loadMany(bill.usersIds);
    return users;
  }

  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    return Bill.find({
      where: { creatorId: ctx.req.session!.userId },
      order: { createdAt: 'DESC' },
    });
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
    }).save();

    return bill;
  }
}
