import { IsUUID } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RemoveReceiptArgs {
  @Field()
  @IsUUID()
  id: string;
}
