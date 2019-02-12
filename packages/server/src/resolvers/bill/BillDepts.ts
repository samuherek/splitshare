// import { Resolver, Authorized, Query, Arg, Ctx } from 'type-graphql';
import { Resolver, Authorized, Query, Arg } from 'type-graphql';
import { Bill } from '../../entity/Bill';
import { getConnection } from 'typeorm';
// import { MyContext } from '../../types/Context';

@Resolver()
export class BillDeptsResolver {
  @Authorized()
  @Query(() => Bill)
  // async billDepts(@Arg('id') id: string, @Ctx() ctx: MyContext) {
  async billDepts(@Arg('id') id: string) {
    const res = await getConnection().query(
      // `select s.id, s.currency, sum(s.value) from bill b left join receipt r on b.id = r."billId" left join receipt_split s on r.id = s."receiptId" where b.id = $1 and s."userId" = $2 group by s.id, s.currency;`,
      // `select distinct s."userId", s.currency, sum(s.value)`
      `select distinct s."userId", s.currency, sum(s.value) from bill b left join receipt r on b.id = r."billId" left join receipt_split s on r.id = s."receiptId" where b.id = $1 group by s."userId", s.currency;`,
      // [id, ctx.req.session!.userId]
      [id]
    );

    console.log('res res', res);

    return Bill.findOne({ where: { id } });
  }
}
