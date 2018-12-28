import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me(@Arg('id', { nullable: true }) id: string) {
    if (id) {
      return User.find({ id });
    } else {
      return null;
    }
  }
}
