import { Resolver, Authorized, Mutation, Arg, Ctx } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

import { MyContext } from '../../types/Context';
import { ReceiptSplit } from '../../entity/ReceiptSplit';
import { ReceiptSplitInput } from './createReceipt/ReceiptsSplitInput';
import { ReceiptInput } from './createReceipt/ReceiptInput';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

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

    const receipt = await getConnection()
      .getRepository(Receipt)
      .save({
        ...receiptInput,
        billId,
        creatorId,
      });

    // TODO: Make this into a transaction with the receipt just in case.
    await Promise.all(
      splitsInput.map(split => {
        return getConnection()
          .getRepository(ReceiptSplit)
          .save({
            ...split,
            receiptId: receipt.id,
            currency: receiptInput.currency,
          });
      })
    );

    return plainToClass(Receipt, receipt);
  }
}
