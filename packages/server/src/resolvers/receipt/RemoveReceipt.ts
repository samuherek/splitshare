import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

import { getConnection } from 'typeorm';
import { RemoveReceiptArgs } from './removeReceipt/RemoveReceiptArgs';

@Resolver()
export class RemoveReceiptResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removeReceipt(@Args() { id }: RemoveReceiptArgs) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Receipt)
        .where('id = :id', { id })
        .execute();

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
