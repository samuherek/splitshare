import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { RegisterInput } from './registerInput';
import { MyContext } from 'src/types/Context';
import * as bcrypt from 'bcrypt';

import { User } from '../../entity/User';
import { userSessionIdPrefix } from '../../constants';

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() ctx: MyContext
  ) {
    // console.log('stuff', registerInput);
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

    // registration successful
    ctx.req.session!.userId = user.id;

    if (ctx.req.sessionID) {
      await ctx.redis.lpush(
        `${userSessionIdPrefix}${user.id}`,
        ctx.req.sessionID
      );
    }

    return true;
  }

  @Mutation(() => Boolean)
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
    ctx.req.session!.userId = user.id;

    if (ctx.req.sessionID) {
      await ctx.redis.lpush(
        `${userSessionIdPrefix}${user.id}`,
        ctx.req.sessionID
      );
    }

    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext) {
    return new Promise(res => {
      ctx.req.session!.destroy(err => {
        console.log(err);
        res(!!err);
      });

      // TODO: Remove all the sessions associated with the user.

      ctx.res.clearCookie('qid');
      return true;
    });
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }
}
