import { Resolver, Ctx, Authorized, Query } from 'type-graphql';
import { MyContext } from 'src/types/Context';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Resolver()
export class MyBillsResolver {
  @Authorized()
  @Query(() => [Bill])
  async myBills(@Ctx() ctx: MyContext) {
    const bills = await getConnection().query(
      `SELECT * FROM bill JOIN bill_user ON bill_user."userId" = $1 ORDER BY bill."createdAt" DESC`,
      [ctx.req.session!.userId]
    );
    return plainToClass(Bill, bills);
  }
}
