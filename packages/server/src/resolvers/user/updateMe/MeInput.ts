import { InputType, Field } from 'type-graphql';
import { User } from '../../../entity/User';
import { IsEmail } from 'class-validator';

@InputType()
export class MeInput implements Partial<User> {
  @Field({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;
}
