import { Resolver, Ctx, Authorized, Query, Arg } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';

@Resolver()
export class BillsResolver {
  @Authorized()
  @Query(() => Bill)
  async bill(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;
    console.log('userId', userId);

    const bill = await Bill.findOne({ where: { id } });

    return bill;
  }
}
