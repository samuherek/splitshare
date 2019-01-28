import { ArgsType, Field } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@ArgsType()
export default class RegisterArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(3, 30)
  password: string;
}
