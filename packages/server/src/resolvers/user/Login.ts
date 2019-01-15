import { Resolver, Mutation, Ctx, Args } from 'type-graphql';
import * as bcrypt from 'bcrypt';

import { MyContext } from '../../types/Context';
import { User } from '../../entity/User';
import { userSessionIdPrefix } from '../../constants';
import LoginArgs from './login/LoginArgs';

@Resolver()
export class LoginResolver {
  @Mutation(() => Boolean)
  async login(@Args() { email, password }: LoginArgs, @Ctx() ctx: MyContext) {
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
}
