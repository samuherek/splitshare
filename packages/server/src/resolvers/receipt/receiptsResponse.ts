import { ObjectType, Field } from 'type-graphql';
import { Receipt } from '../../entity/Receipt';

@ObjectType()
export class ReceiptsResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Receipt])
  receipts: Receipt[];
}
