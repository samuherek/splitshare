import { Resolver, Mutation, Authorized, Args } from 'type-graphql';

import UpdateBillArgs from './updateBill/UpdateBillArgs';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Resolver()
export class UpdateBillResolver {
  @Authorized()
  @Mutation(() => Bill)
  async updateBill(@Args() { billId, name, icon }: UpdateBillArgs) {
    const bill = await Bill.findOne(billId);

    if (!bill) {
      throw new Error('No such bill');
    }

    const toUpdate: Partial<Bill> = {};
    if (name) {
      toUpdate.name = name;
    }
    if (icon) {
      toUpdate.icon = icon;
    }

    try {
      const { raw } = await getConnection()
        .createQueryBuilder()
        .update(Bill)
        .set({ ...toUpdate })
        .where('id = :id', { id: billId })
        .returning('*')
        .execute();

      return plainToClass(Bill, raw[0]);
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }
}
