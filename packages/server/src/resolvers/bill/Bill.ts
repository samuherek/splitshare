import { Resolver, Authorized, Query, Arg } from 'type-graphql';
import { Bill } from '../../entity/Bill';

@Resolver()
export class BillsResolver {
  @Authorized()
  @Query(() => Bill)
  async bill(@Arg('id') id: string) {
    return Bill.findOne({ where: { id } });
  }
}
