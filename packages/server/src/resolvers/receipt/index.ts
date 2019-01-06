import {
  Resolver,
  Authorized,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
  Int,
} from 'type-graphql';
import { Receipt } from '../../entity/Receipt';
import { MyContext } from 'src/types/Context';
import { ReceiptInput } from './receiptInput';
import { ReceiptSplitInput } from './receiptSplitInput';
import { ReceiptSplit } from '../../entity/ReceiptSplit';
import { ReceiptsResponse } from './receiptsResponse';
import { getConnection } from 'typeorm';

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
  async receipt(@Arg('id') id: string) {
    const receipt = await Receipt.findOne(id);
    return receipt;
  }

  @Authorized()
  @Query(() => [Receipt])
  async receipts(
    @Arg('billId') billId: string,
    @Arg('limit', () => Int) limit: number,
    @Arg('offset', () => Int) offset: number
  ): Promise<ReceiptsResponse> {
    const receipts = await getConnection()
      .getRepository(Receipt)
      .createQueryBuilder('receipt')
      .where('id = :id', { id: billId })
      .skip(offset)
      .take(limit + 1)
      .orderBy('"createdAt"', 'DESC')
      .getMany();

    return {
      hasMore: receipts.length === limit + 1,
      receipts: receipts.slice(0, limit),
    };
  }

  @Authorized()
  @Mutation(() => Receipt)
  async createReceipt(
    @Arg('receiptInput') receiptInput: ReceiptInput,
    @Arg('splitsInput', () => [ReceiptSplitInput])
    splitsInput: ReceiptSplitInput[],
    @Ctx() ctx: MyContext
  ) {
    const creatorId = ctx.req.session!.userId;

    const receipt = await Receipt.create({
      ...receiptInput,
      creatorId,
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

    return receipt;
  }
}
