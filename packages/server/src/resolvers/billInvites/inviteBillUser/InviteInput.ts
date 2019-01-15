import { InputType, Field } from 'type-graphql';
import { IsEmail, IsUUID } from 'class-validator';

@InputType()
export class InviteInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsUUID()
  billId: string;
}
