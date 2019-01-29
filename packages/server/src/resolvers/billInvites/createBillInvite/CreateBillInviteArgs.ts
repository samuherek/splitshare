import { ArgsType, Field } from 'type-graphql';
import { IsUUID, IsEmail } from 'class-validator';

@ArgsType()
export default class CreateBillInviteArgs {
  @Field()
  @IsUUID()
  billId: string;

  @Field()
  @IsEmail()
  email: string;
}
