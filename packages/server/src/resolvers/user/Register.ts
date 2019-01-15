import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { MyContext } from '../../types/Context';
import { RegisterInput } from './register/RegisterInput';
import { User } from '../../entity/User';
import { userSessionIdPrefix } from '../../constants';

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('registerInput') registerInput: RegisterInput,
    @Ctx() ctx: MyContext
  ) {
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

    // await sendEmail(
    //   'samuherekbiz@gmail.com',
    //   await createConfirmEmailLink(ctx.url, user.id, ctx.redis)
    // );

    return true;
  }
}
