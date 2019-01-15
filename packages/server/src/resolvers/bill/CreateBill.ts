import { Resolver, Ctx, Authorized, Mutation, Arg } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { User } from '../../entity/User';
import { BillInput } from './createBill/BillInput';

@Resolver()
export class CreateBillResolver {
  @Authorized()
  @Mutation(() => Bill)
  async createBill(
    @Arg('billInput') billInput: BillInput,
    @Ctx() ctx: MyContext
  ) {
    const creatorId = ctx.req.session!.userId;

    const owner = await User.findOne({ where: { id: creatorId } });

    const bill = await Bill.create({
      ...billInput,
      creatorId,
      users: Promise.resolve([owner]),
      usersIds: [creatorId],
    }).save();

    return bill;
  }
}
