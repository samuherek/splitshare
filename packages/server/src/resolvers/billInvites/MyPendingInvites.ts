import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Resolver(BillInvite)
export class MyPendingInvitesResolver {
  @Authorized()
  @Query(() => [BillInvite])
  async myPendingInvites(@Ctx() ctx: MyContext) {
    const billInvites = await getConnection()
      .createQueryBuilder()
      .from(BillInvite, 'billInvite')
      .where('"userId" = :userId', { userId: ctx.req.session!.userId })
      .andWhere('pending = TRUE')
      .execute();

    return plainToClass(BillInvite, billInvites);
  }
}
