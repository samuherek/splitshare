import { InputType, Field } from 'type-graphql';
import { User } from '../../../entity/User';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(3, 30)
  password: string;
}
