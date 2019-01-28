import { Resolver, Authorized, Arg, Mutation } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';
import { InviteInput } from './createBillInvite/inviteInput';
import { User } from '../../entity/User';

@Resolver(BillInvite)
export class CreateBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createBillInvite(@Arg('inviteInput') { email, billId }: InviteInput) {
    const user = await User.findOne({ where: { email } });

    // If we don't have a registered user with such email not allow
    if (!user) {
      throw new Error('We could not invite such user');
    }

    await BillInvite.create({
      billId,
    }).save();

    return true;
  }
}
