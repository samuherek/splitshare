import { Resolver, Authorized, Mutation, Args, Ctx } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';
import CreateBillInviteArgs from './createBillInvite/CreateBillInviteArgs';
import { MyContext } from '../../types/Context';

@Resolver(BillInvite)
export class CreateBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createBillInvite(
    @Args() { email, billId }: CreateBillInviteArgs,
    @Ctx() ctx: MyContext
  ) {
    await BillInvite.create({
      billId,
      email: email,
      invitedById: ctx.req.session!.userId,
    }).save();
    return true;
  }
}
