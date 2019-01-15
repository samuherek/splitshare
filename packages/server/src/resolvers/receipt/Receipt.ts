import { Resolver, Query, Authorized, Args } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';
import ReceiptArgs from './receipt/ReceiptArgs';

@Resolver()
export class ReceiptResolver {
  @Authorized()
  @Query(() => Receipt)
  async receipt(@Args() { id }: ReceiptArgs) {
    const receipt = await Receipt.findOne(id);
    return receipt;
  }
}
