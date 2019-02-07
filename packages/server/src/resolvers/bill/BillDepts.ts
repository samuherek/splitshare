import { Resolver, Authorized, Query, Arg, Ctx } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
import { MyContext } from '../../types/Context';

@Resolver()
export class BillDeptsResolver {
  @Authorized()
  @Query(() => Bill)
  async billDepts(@Arg('id') id: string, @Ctx() ctx: MyContext) {
    const res = await getConnection().query(
      `select b.id, b.name, sum(s.value) as owing from bill b left join receipt r on b.id = r."billId" left join receipt_split s on r.id = s."receiptId" where b.id = $1 and s."userId" = $2 group by b.id, b.name;`,
      [id, ctx.req.session!.userId]
    );

    console.log(res);

    return Bill.findOne({ where: { id } });
  }
}
