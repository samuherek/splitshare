import { Resolver, Ctx, Authorized, Mutation, Args } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';

import { getConnection } from 'typeorm';
import AcceptBillInviteArgs from './acceptBillInvite/AcceptBillInviteArgs';

@Resolver(BillInvite)
export class AcceptBillInviteResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async acceptBillInvite(
    @Args() { id }: AcceptBillInviteArgs,
    @Ctx() ctx: MyContext
  ) {
    const billInvite = await BillInvite.findOne({
      where: { id },
    });

    if (!billInvite) {
      throw new Error('No such invite');
    }

    const updatePromise = getConnection().query(
      `UPDATE bill SET "usersIds" = array_append("usersIds", $1) WHERE bill.id = $2;`,
      [ctx.req.session!.userId, billInvite.billId]
    );

    const invitePromise = getConnection()
      .createQueryBuilder()
      .update(BillInvite)
      .set({ pending: false })
      .where('id = :id', { id: billInvite.id })
      .execute();

    await Promise.all([updatePromise, invitePromise]);

    return true;
  }
}
