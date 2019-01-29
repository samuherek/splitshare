import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';

@Resolver(BillInvite)
export class MyPendingInvitesResolver {
  @Authorized()
  @Query(() => [BillInvite])
  async myPendingInvites(@Ctx() ctx: MyContext) {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!user) {
      throw new Error('Oh... some issue heree');
    }

    const billInvites = await getConnection()
      .getRepository(BillInvite)
      .createQueryBuilder('billInvite')
      .where('email = :email', { email: user.email })
      .andWhere('pending = TRUE')
      .getMany();

    return billInvites;
  }
}
