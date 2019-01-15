import { Resolver, Query, Authorized, Args } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

import { ReceiptsResponse } from './receiptsResponse';
import { ReceiptsArgs } from './receipts/ReceiptsArgs';
import { getConnection } from 'typeorm';

@Resolver()
export class ReceiptsResolver {
  @Authorized()
  @Query(() => ReceiptsResponse)
  async receipts(@Args() { billId, limit, startIndex }: ReceiptsArgs): Promise<
    ReceiptsResponse
  > {
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
