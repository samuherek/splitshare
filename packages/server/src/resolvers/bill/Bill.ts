import { Resolver, Authorized, Query, Args } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import BillArgs from './bill/BillArgs';

@Resolver()
export class BillsResolver {
  @Authorized()
  @Query(() => Bill)
  async bill(@Args() { id }: BillArgs) {
    return Bill.findOne({ where: { id } });
  }
}
