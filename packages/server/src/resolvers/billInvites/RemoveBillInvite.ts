import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';

import { getConnection } from 'typeorm';
import RemoveBillInviteArgs from './removeBillInvite/RemoveBillInviteArgs';

@Resolver(BillInvite)
export class RemoveBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removeBillInvite(@Args() { id }: RemoveBillInviteArgs) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(BillInvite)
        .set({ deletedAt: new Date(), pending: false })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new Error('Something went wrong rejecting the invite');
    }

    return true;
  }
}
