import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';

@Resolver()
export class MyBillsResolver {
  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    return Bill.find({
      where: { creatorId: ctx.req.session!.userId },
      order: { updatedAt: 'DESC' },
    });
  }
}
