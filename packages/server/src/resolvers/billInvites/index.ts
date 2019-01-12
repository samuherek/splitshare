import {
  Resolver,
  Ctx,
  Query,
  Authorized,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';
import { User } from '../../entity/User';
import { InviteInput } from './inviteInput';
import { getConnection } from 'typeorm';

@Resolver(BillInvite)
export class BillInviteResolver {
  constructor() {}

  @FieldResolver()
  async invitedBy(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(billInvite.invitedById);
  }

  @FieldResolver()
  async bill(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.billLoader.load(billInvite.billId);
  }

  @Authorized()
  @Query(() => [BillInvite])
  async myInvites(@Ctx() ctx: MyContext) {
    return BillInvite.find({
      where: {
        userId: ctx.req.session!.userId,
        accepted: false,
      },
    });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async inviteBillUser(
    @Arg('inviteInput') { email, billId }: InviteInput,
    @Ctx() ctx: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    // If we don't have a registered user with such email not allow
    if (!user) {
      throw new Error('We could not invite such user');
    }

    const alreadyBillInvite = await BillInvite.findOne({
      where: { userId: user.id },
    });

    // Check if there is already an invite for the user
    if (alreadyBillInvite) {
      throw new Error('This user is already invited to this bill');
    }

    await BillInvite.create({
      userId: user.id,
      billId,
      invitedById: ctx.req.session!.userId,
    }).save();

    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async acceptBillInvite(
    @Arg('id') billInviteId: string,
    @Ctx() ctx: MyContext
  ) {
    const billInvite = await BillInvite.findOne({
      where: { id: billInviteId },
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
