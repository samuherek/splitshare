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
  @Query(() => Bill)
  async findBillById(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;

    const bill = await Bill.findOne({ where: { id } });

    const billHasUserId =
      bill && bill.usersIds.findIndex(id => id === userId) !== -1;

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
}
