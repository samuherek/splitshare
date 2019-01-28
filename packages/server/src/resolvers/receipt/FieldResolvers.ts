import { Resolver, FieldResolver, Root, Ctx } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';
import { MyContext } from '../../types/Context';
import { ReceiptSplit } from '../../entity/ReceiptSplit';

@Resolver(() => Receipt)
export class ReceiptFieldResolversResolver {
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
    const res = await ReceiptSplit.find({ where: { receiptId: receipt.id } });
    return res;
  }
}
