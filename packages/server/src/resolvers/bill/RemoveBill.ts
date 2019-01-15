import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import RemoveBillArgs from './removeBill/RemoveArgs';

@Resolver()
export class RemoveBillResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removeBill(@Args() { id }: RemoveBillArgs) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Bill)
        .where('id = :id', { id })
        .execute();

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
