import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import RemoveBillArgs from './removeBill/RemoveArgs';
import { BillUser } from '../../entity/BillUser';
import { getConnection, In } from 'typeorm';
import { Receipt } from '../../entity/Receipt';
import { ReceiptSplit } from '../../entity/ReceiptSplit';
import { BillInvite } from '../../entity/BillInvite';

@Resolver()
export class RemoveBillResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async removeBill(@Args() { id }: RemoveBillArgs) {
    try {
      const bill = await Bill.findOne(id);

      if (bill) {
        const [receipts, count] = await Receipt.findAndCount({
          where: { billId: id },
        });

        if (count > 20) {
          throw new Error(
            'You have too many receipts. Please archive it instead'
          );
        }

        // console.log(receipts);

        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(BillUser)
          .where({ billId: id })
          .execute();

        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(ReceiptSplit)
          .where({ receiptId: In(receipts.map(r => r.id)) })
          .execute();

        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(BillInvite)
          .where({ billId: id })
          .execute();

        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Receipt)
          .where({ billId: id })
          .execute();

        await bill.remove();

        return true;
      }
      throw new Error('No such bill');
    } catch (err) {
      throw new Error(err);
    }
  }
}
