import { Resolver, Authorized, Mutation, Args, Ctx } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';
import CreateBillInviteArgs from './createBillInvite/CreateBillInviteArgs';
import { MyContext } from '../../types/Context';
import { User } from '../../entity/User';

@Resolver(BillInvite)
export class CreateBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createBillInvite(
    @Args() { email, billId }: CreateBillInviteArgs,
    @Ctx() ctx: MyContext
  ) {
    const user = await User.findOne(ctx.req.session!.userId);

    if (user && user.email === email) {
      throw new Error('You can not invite yourselve');
    }

    await BillInvite.create({
      billId,
      email: email,
      invitedById: ctx.req.session!.userId,
    }).save();
    return true;
  }
}
