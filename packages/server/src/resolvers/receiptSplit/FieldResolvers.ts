import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { ReceiptSplit } from '../../entity/ReceiptSplit';

@Resolver(ReceiptSplit)
export class ReceiptSplitResolver {
  constructor() {}

  @FieldResolver()
  async user(@Root() receiptSplit: ReceiptSplit, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(receiptSplit.userId);
  }
}
