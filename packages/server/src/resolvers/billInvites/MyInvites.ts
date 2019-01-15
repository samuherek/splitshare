import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';

@Resolver(BillInvite)
export class MyInvitesResolver {
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
}
