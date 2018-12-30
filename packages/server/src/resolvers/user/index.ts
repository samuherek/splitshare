import { Resolver, Query, Arg, Mutation, Ctx } from 'type-graphql';
import { RegisterInput } from './registerInput';
import { MyContext } from 'src/types/Context';
import * as bcrypt from 'bcrypt';

import { User } from '../../entity/User';
import { userSessionIdPrefix } from '../../constants';

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
      throw new Error('User already exists');
    }

    const user = await User.create({
      email,
      password,
    }).save();

    console.log(userAlreadyExists);
    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Either your email or password doesn't match");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Either your email or password doesn't match");
    }

    // login successful
    ctx.session.userId = user.id;
    if (ctx.req.sessionID) {
      await ctx.redis.lpush(
        `${userSessionIdPrefix}${user.id}`,
        ctx.req.sessionID
      );
    }

    console.log('ctx', ctx, ctx.session);

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
