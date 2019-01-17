import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';

import { getConnection } from 'typeorm';
import RejectBillInviteArgs from './rejectBillInvite/RejectBillInviteArgs';

@Resolver(BillInvite)
export class RejectBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async rejectBillInvite(@Args() { id }: RejectBillInviteArgs) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(BillInvite)
        .set({ deletedAt: new Date(), accepted: true })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new Error('Something went wrong rejecting the invite');
    }

    return true;
  }
}
