import { ArgsType, Field } from 'type-graphql';
import { Length, IsUUID } from 'class-validator';

@ArgsType()
export default class UpdateBillArgs {
  @Field({ nullable: true })
  @Length(3, 25)
  name: string;

  @Field({ nullable: true })
  icon: string;

  @Field()
  @IsUUID()
  billId: string;
}
