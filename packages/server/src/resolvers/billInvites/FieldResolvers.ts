import { Resolver, Ctx, FieldResolver, Root } from 'type-graphql';
import { MyContext } from '../../types/Context';
import { BillInvite } from '../../entity/BillInvite';

@Resolver(BillInvite)
export class BillInviteFieldResolversResolver {
  constructor() {}

  @FieldResolver()
  async invitedBy(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(billInvite.invitedById);
  }

  @FieldResolver()
  async bill(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.billLoader.load(billInvite.billId);
  }
}
