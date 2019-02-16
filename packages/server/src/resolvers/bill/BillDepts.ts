import { Args, Authorized, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import BillDeptsArgs from './billDepts/BillDeptsArgs';
import { UserDept } from './billDepts/UserDept';

@Resolver()
export class BillDeptsResolver {
  @Authorized()
  @Query(() => [UserDept])
  async billDepts(@Args() { id }: BillDeptsArgs) {
    const res = await getConnection().query(
      `
      SELECT
        brs. "userId",
        sum(brs.value),
        brs.currency,
        brs. "paidById" AS "owingToId"
      FROM (
        SELECT
        rs. "userId",
        rs.value,
        rs.currency,
        r. "paidById"
        FROM
        bill b
        LEFT JOIN receipt r ON b.id = r. "billId"
        LEFT JOIN receipt_split rs ON r.id = rs. "receiptId"
      WHERE
        b.id = $1
        AND r. "paidById" != rs. "userId") AS brs
      GROUP BY
        brs. "userId",
        brs.currency,
        brs. "paidById";
      `,
      // `select distinct s."userId", s.currency, sum(s.value) from bill b left join receipt r on b.id = r."billId" left join receipt_split s on r.id = s."receiptId" where b.id = $1 group by s."userId", s.currency;`,
      // [id, ctx.req.session!.userId]
      [id]
    );
    // console.log('res res', res);

    return res;
  }
}
