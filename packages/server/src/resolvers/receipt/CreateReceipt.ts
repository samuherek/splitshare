import { plainToClass } from 'class-transformer';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Receipt } from '../../entity/Receipt';
import { ReceiptSplit } from '../../entity/ReceiptSplit';
import { MyContext } from '../../types/Context';
import updateBillTimestamp from '../../utils/updateBill';
import { ReceiptInput } from './createReceipt/ReceiptInput';
import { ReceiptSplitInput } from './createReceipt/ReceiptsSplitInput';

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
    await Promise.all([
      updateBillTimestamp({ billId }),
      ...splitsInput.map(split => {
        return getConnection()
          .getRepository(ReceiptSplit)
          .save({
            ...split,
            receiptId: receipt.id,
            currency: receiptInput.currency,
          });
      }),
    ]);

    return plainToClass(Receipt, receipt);
  }
}
