import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class ReceiptsArgs {
  @Field()
  @IsUUID()
  billId: string;
}
