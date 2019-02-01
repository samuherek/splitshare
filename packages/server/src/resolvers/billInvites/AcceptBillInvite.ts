import { Resolver, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';

import AcceptBillInviteArgs from './acceptBillInvite/AcceptBillInviteArgs';
import { BillUser } from '../../entity/BillUser';

@Resolver(BillInvite)
export class AcceptBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async acceptBillInvite(
    @Args() { id }: AcceptBillInviteArgs,
    @Ctx() ctx: MyContext
  ) {
    const billInvite = await BillInvite.findOne({
      where: {
        id,
      },
    });

    if (!billInvite) {
      throw new Error('No such invite');
    }

    const billUserPrs = BillUser.create({
      billId: billInvite.billId,
      userId: ctx.req.session!.userId,
    }).save();

    const invitePrs = BillInvite.delete({ id });

    await Promise.all([billUserPrs, invitePrs]);

    return true;
  }
}
