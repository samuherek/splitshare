import { Resolver, Authorized, Mutation, Arg, Ctx } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

import { MyContext } from '../../types/Context';
import { ReceiptSplit } from '../../entity/ReceiptSplit';
import { ReceiptSplitInput } from './createReceipt/ReceiptsSplitInput';
import { ReceiptInput } from './createReceipt/ReceiptInput';

@Resolver()
export class CreateReceiptResolver {
  @Authorized()
  @Mutation(() => Receipt)
  async createReceipt(
    @Arg('receiptInput') receiptInput: ReceiptInput,
    @Arg('splitsInput', () => [ReceiptSplitInput])
    splitsInput: ReceiptSplitInput[],
    @Arg('billId') billId: string,
    @Ctx() ctx: MyContext
  ) {
    const creatorId = ctx.req.session!.userId;

    const receipt = await Receipt.create({
      ...receiptInput,
      billId,
      creatorId,
    }).save();

    // TODO: Make this into a transaction with the receipt just in case.
    await Promise.all(
      splitsInput.map(split => {
        return ReceiptSplit.create({
          ...split,
          receiptId: receipt.id,
          currency: receiptInput.currency,
        }).save();
      })
    );

    return receipt;
  }
}
