import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';

import RejectBillInviteArgs from './rejectBillInvite/RejectBillInviteArgs';

@Resolver(BillInvite)
export class RejectBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async rejectBillInvite(@Args() { id }: RejectBillInviteArgs) {
    const billInvite = await BillInvite.findOne(id);

    if (!billInvite) {
      throw new Error('No such invite');
    }

    await BillInvite.update(id, {
      pending: false,
      deletedAt: new Date(),
    });

    return true;
  }
}
