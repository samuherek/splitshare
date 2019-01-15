import { ArgsType, Field } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export default class LoginArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
