import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { BillUser } from '../../entity/BillUser';
// import { BillUser } from '../../entity/BillUser';

@Resolver()
export class MyBillsResolver {
  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    const bill3 = await BillUser.find({
      join: {
        alias: 'billUser',
        innerJoinAndSelect: {
          user: 'billUser.bill',
        },
      },
      where: {
        userId: ctx.req.session!.userId,
      },
    });

    // @ts-ignore
    return bill3.map(bu => bu.__bill__);
  }
}
