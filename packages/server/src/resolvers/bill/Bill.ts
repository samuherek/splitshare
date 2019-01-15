import { Resolver, Ctx, Authorized, Query, Arg } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';

@Resolver()
export class BillsResolver {
  @Authorized()
  @Query(() => Bill)
  async bill(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;

    const bill = await Bill.findOne({ where: { id } });

    const billHasUserId =
      bill &&
      bill.usersIds &&
      bill.usersIds.findIndex(id => id === userId) !== -1;

    if (!billHasUserId) {
      throw new Error("We couldn't find what you were looking for");
    }

    return bill;
  }
}
