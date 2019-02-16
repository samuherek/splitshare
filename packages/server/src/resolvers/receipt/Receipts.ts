import { Arg, Args, Authorized, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Receipt } from '../../entity/Receipt';
import { ReceiptsArgs } from './receipts/ReceiptsArgs';
import { FilterInput } from './receipts/ReceiptsWhereArgs';
import { ReceiptsResponse } from './receiptsResponse';

@Resolver()
export class ReceiptsResolver {
  @Authorized()
  @Query(() => ReceiptsResponse)
  async receipts(
    @Args() { billId }: ReceiptsArgs,
    @Arg('where') { limit, offset }: FilterInput
  ): Promise<ReceiptsResponse> {
    console.log(limit, offset);
    const receipts = await getConnection()
      .getRepository(Receipt)
      .createQueryBuilder('receipts')
      .where('"billId" = :billId', { billId })
      .skip(offset)
      .take(limit + 1)
      .orderBy('"createdAt"', 'DESC')
      .getMany();

    return {
      hasMore: receipts.length === limit + 1,
      receipts: receipts.slice(0, limit),
    };
  }
}
