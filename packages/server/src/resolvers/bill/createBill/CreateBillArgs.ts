import { ArgsType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@ArgsType()
export default class CreateBillArgs {
  @Field()
  @Length(3, 25)
  name: string;
}
