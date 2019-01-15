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

    const joinPromise = getConnection().query(
      `INSERT INTO bill_users_user("billId", "userId") VALUES ($1, $2);`,
      [billInvite.billId, ctx.req.session!.userId]
    );

    const updatePromise = getConnection().query(
      `UPDATE bill SET "usersIds" = array_append("usersIds", $1) WHERE bill.id = $2;`,
      [ctx.req.session!.userId, billInvite.billId]
    );

    const invitePromise = getConnection()
      .createQueryBuilder()
      .update(BillInvite)
      .set({ accepted: true })
      .where('id = :id', { id: billInvite.id })
      .execute();

    await Promise.all([joinPromise, updatePromise, invitePromise]);

    // .createQueryBuilder()
    // .update(Bill)
    // .set({ usersIds: [ctx.req.session!.userId] })
    // .where('id = :id', { id: billInvite.billId })
    // .returning('*')
    // .execute();

    // const [user, bill] = await Promise.all([userPromise, billPromise]);

    // console.log(user);

    // const bill = await getConnection()
    //   .createQueryBuilder()
    //   .update(Bill)
    //   .set({ userIds: [billInvite.userIds]})
    // const bill = await Bill.findOne();
    // if (!bill) {
    // throw new Error('No such bill found');
    // }

    // console.log(billId);
    return true;
  }
}
