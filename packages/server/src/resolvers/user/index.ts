import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/User';
import { RegisterInput } from './registerInput';

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Mutation(() => User)
  async register(@Arg('registerInput') registerInput: RegisterInput) {
    console.log('stuff', registerInput);
    const { email, password } = registerInput;

    const userAlreadyExists = await User.findOne({
      where: { email },
      select: ['id'],
    });

    if (userAlreadyExists) {
      return false;
    }

    const user = await User.create({
      email,
      password,
    }).save();

    console.log(userAlreadyExists);
    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@Arg('id', { nullable: true }) id: string) {
    if (id) {
      return User.find({ id });
    } else {
      return null;
    }
  }
}
