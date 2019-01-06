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
import { Receipt } from '../../entity/Receipt';
import { MyContext } from 'src/types/Context';
import { ReceiptInput } from './receiptInput';
import { ReceiptSplitInput } from './receiptSplitInput';
import { User } from '../../entity/User';

@Resolver(Receipt)
export class ReceiptResolver {
  constructor() {}

  @FieldResolver()
  async paidBy(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(receipt.paidById);
  }

  @FieldResolver()
  async creator(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(receipt.creatorId);
  }

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

    return receipt;
  }
}
