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
// import { User } from '../../entity/User';
import { ReceiptSplit } from '../../entity/ReceiptSplit';

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

  @FieldResolver()
  async splits(@Root() receipt: Receipt) {
    return ReceiptSplit.find({ where: { receiptId: receipt.id } });
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
    // const users = await User.findByIds(splitsInput.map(s => s.userId));
    const creatorId = ctx.req.session!.userId;
    // const { paidById } = receiptInput;

    const receipt = await Receipt.create({
      ...receiptInput,
      // paidBy: Promise.resolve(users.find(u => u.id === paidById)),
      creatorId,
      // creator: Promise.resolve(users.find(u => u.id === creatorId)),
    }).save();

    await Promise.all(
      splitsInput.map(split => {
        return ReceiptSplit.create({
          ...split,
          receiptId: receipt.id,
          currency: receiptInput.currency,
        }).save();
      })
    );

    // receipt.splits = Promise.resolve(splits);
    // const updatedReceipt = await Receipt.save(receipt);

    return receipt;
  }
}
