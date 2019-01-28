import { Resolver, Query, Authorized, Args, Arg } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

import { ReceiptsResponse } from './receiptsResponse';
import { ReceiptsArgs } from './receipts/ReceiptsArgs';
import { getConnection } from 'typeorm';
import { FilterInput } from './receipts/ReceiptsWhereArgs';

@Resolver()
export class ReceiptsResolver {
  @Authorized()
  @Query(() => ReceiptsResponse)
  async receipts(
    @Args() { billId }: ReceiptsArgs,
    @Arg('where') { limit, startIndex }: FilterInput
  ): Promise<ReceiptsResponse> {
    const receipts = await getConnection()
      .getRepository(Receipt)
      .createQueryBuilder('receipts')
      .where('"billId" = :billId', { billId })
      .skip(startIndex)
      .take(limit + 1)
      .orderBy('"createdAt"', 'DESC')
      .getMany();

    return {
      hasMore: receipts.length === limit + 1,
      receipts: receipts.slice(0, limit),
    };
  }
}
