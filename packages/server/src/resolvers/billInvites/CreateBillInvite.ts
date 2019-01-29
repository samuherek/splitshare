import { Resolver, Authorized, Mutation, Args } from 'type-graphql';
import { BillInvite } from '../../entity/BillInvite';
import CreateBillInviteArgs from './createBillInvite/CreateBillInviteArgs';

@Resolver(BillInvite)
export class CreateBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createBillInvite(@Args() { email, billId }: CreateBillInviteArgs) {
    await BillInvite.create({
      billId,
      email: email,
    }).save();

    return true;
  }
}
