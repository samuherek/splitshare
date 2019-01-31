import { Resolver, Authorized, Mutation, Args, Ctx } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import CreateBillArgs from './createBill/CreateBillArgs';
import { MyContext } from '../../types/Context';
import { BillUser } from '../../entity/BillUser';

@Resolver()
export class CreateBillResolver {
  @Authorized()
  @Mutation(() => Bill)
  async createBill(@Args() { name }: CreateBillArgs, @Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;

    const bill = await Bill.create({
      name,
    }).save();

    console.log('======== BILL =======', bill);
    await BillUser.create({
      billId: bill.id,
      userId: userId,
    }).save();

    return bill;
  }
}
