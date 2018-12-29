import { InputType, Field } from 'type-graphql';
import { User } from '../../entity/User';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
