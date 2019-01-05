import {
  Resolver,
  Authorized,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { Receipt } from '../../entity/Receipt';
import { MyContext } from 'src/types/Context';
import { ReceiptInput } from './receiptInput';
import { ReceiptSplitInput } from './receiptSplitInput';
import { User } from '../../entity/User';

@Resolver(Bill)
export class ReceiptResolver {
  constructor() {}

  @FieldResolver(() => User)
  paidBy(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    console.log('field resolver', receipt);
    return ctx.userLoader.load(receipt.paidById);
  }

  @FieldResolver()
  creator(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    console.log();
    return ctx.userLoader.load(receipt.creatorId);
  }

  // @FieldResolver()
  // async users(@Root() bill: Bill, @Ctx() ctx: MyContext) {
  //   const users = await ctx.userLoader.loadMany(bill.usersIds);
  //   return users;
  // }

  @Authorized()
  @Query(() => Receipt)
  async receiptById(@Arg('id') id: string) {
    const receipt = await Receipt.findOne(id);
    return receipt;
  }

  @Authorized()
  @Mutation(() => Receipt)
  async createReceipt(
    @Arg('receiptInput') receiptInput: ReceiptInput,
    @Arg('splitsInput', () => [ReceiptSplitInput])
    splitsInput: ReceiptSplitInput[],
    @Ctx() ctx: MyContext
  ) {
    const users = await User.findByIds(splitsInput.map(s => s.userId));
    const creatorId = ctx.req.session!.userId;
    const { paidById } = receiptInput;

    const receipt = await Receipt.create({
      ...receiptInput,
      paidBy: Promise.resolve(users.find(u => u.id === paidById)),
      creatorId,
      creator: Promise.resolve(users.find(u => u.id === creatorId)),
    }).save();

    console.log(receiptInput, creatorId, users, receipt);

    return receipt;
  }
}
