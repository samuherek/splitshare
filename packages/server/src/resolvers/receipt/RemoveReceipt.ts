import { Args, Authorized, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Receipt } from '../../entity/Receipt';
import updateBillTimestamp from '../../utils/updateBill';
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

      updateBillTimestamp({ receiptId: id });

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
