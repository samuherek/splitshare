import { Resolver, Ctx, Authorized, Arg, Mutation } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';
import { InviteInput } from './createBillInvite/inviteInput';
import { User } from '../../entity/User';

@Resolver(BillInvite)
export class CreateBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createBillInvite(
    @Arg('inviteInput') { email, billId }: InviteInput,
    @Ctx() ctx: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    // If we don't have a registered user with such email not allow
    if (!user) {
      throw new Error('We could not invite such user');
    }

    const alreadyBillInvite = await BillInvite.findOne({
      where: { userId: user.id, billId },
    });

    // Check if there is already an invite for the user
    if (alreadyBillInvite) {
      throw new Error('This user is already invited to this bill');
    }

    await BillInvite.create({
      userId: user.id,
      billId,
      invitedById: ctx.req.session!.userId,
    }).save();

    return true;
  }
}
