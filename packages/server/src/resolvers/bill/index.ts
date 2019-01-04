import { Resolver, Arg, Mutation, Ctx, Authorized, Query } from 'type-graphql';
import { BillInput } from './billInput';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { User } from '../../entity/User';

@Resolver(Bill)
export class BillResolver {
  constructor() {}

  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    return Bill.find({
      where: { creatorId: ctx.req.session!.userId },
      order: { createdAt: 'DESC' },
    });
  }

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
      users: [owner],
    }).save();

    return bill;
  }
}
