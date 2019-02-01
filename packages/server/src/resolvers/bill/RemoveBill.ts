import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import RemoveBillArgs from './removeBill/RemoveArgs';

@Resolver()
export class RemoveBillResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removeBill(@Args() { id }: RemoveBillArgs) {
    try {
      await Bill.delete({ id });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
