import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { BillInput } from './createBill/BillInput';
// import { BillInvite } from '../../entity/BillInvite';

@Resolver()
export class CreateBillResolver {
  @Authorized()
  @Mutation(() => Bill)
  async createBill(@Arg('billInput') billInput: BillInput) {
    const bill = await Bill.create({
      ...billInput,
    }).save();

    // const billInvite = await BillInvite.create({
    //   billId: bill.id,
    //   userId: creatorId,

    // })

    return bill;
  }
}
