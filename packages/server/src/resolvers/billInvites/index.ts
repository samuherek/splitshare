import {
  Resolver,
  Ctx,
  Query,
  Authorized,
  FieldResolver,
  Root,
} from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';

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
}
