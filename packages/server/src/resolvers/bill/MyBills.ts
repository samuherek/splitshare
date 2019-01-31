import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { BillUser } from '../../entity/BillUser';

@Resolver()
export class MyBillsResolver {
  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    const bills = await BillUser.find({
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
    const billsMap: Bill[] = bills.map(bu => bu.__bill__);

    // TODO: Figure out how to order within the query;
    return billsMap.sort((a: Bill, b: Bill) => {
      // @ts-ignore
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }
}
