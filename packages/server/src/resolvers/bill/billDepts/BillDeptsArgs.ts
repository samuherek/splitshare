import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export default class BillDeptsArgs {
  @Field()
  @IsUUID()
  id: string;
}
