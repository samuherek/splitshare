import { Resolver, Authorized, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { Receipt } from '../../entity/Receipt';
import { MyContext } from 'src/types/Context';
import { ReceiptInput } from './receiptInput';
import { ReceiptSplitInput } from './receiptSplitInput';
import { User } from '../../entity/User';

@Resolver(Bill)
export class ReceiptResolver {
  constructor() {}

  // @FieldResolver()
  // async creator(@Root() bill: Bill, @Ctx() ctx: MyContext) {
  //   return ctx.userLoader.load(bill.creatorId);
  // }

  // @FieldResolver()
  // async users(@Root() bill: Bill, @Ctx() ctx: MyContext) {
  //   const users = await ctx.userLoader.loadMany(bill.usersIds);
  //   return users;
  // }

  @Authorized()
  @Query(() => Receipt)
  async receiptById(@Arg('id') id: string) {
    return Receipt.findOne(id);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createReceipt(
    @Arg('receiptInput') receiptInput: ReceiptInput,
    @Arg('splitsInput', () => [ReceiptSplitInput])
    splitsInput: ReceiptSplitInput[],
    @Ctx() ctx: MyContext
  ) {
    const creatorId = ctx.req.session!.userId;

    const users = await User.findByIds(splitsInput.map(s => s.userId));

    const receipt = await Receipt.create({
      ...receiptInput,
      creatorId,
      creator: Promise.resolve(users.find(u => u.id === creatorId)),
    }).save();

    console.log(receiptInput, creatorId, users, receipt);

    return true;
  }
}
