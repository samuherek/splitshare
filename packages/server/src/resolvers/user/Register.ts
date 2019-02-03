// import { Resolver, Mutation, Ctx, Args } from 'type-graphql';
import { Resolver, Mutation, Args } from 'type-graphql';

// import { MyContext } from '../../types/Context';
import RegisterArgs from './register/RegisterInput';
import { User } from '../../entity/User';
// import { userSessionIdPrefix } from '../../constants';

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Args()
    { email, password }: RegisterArgs // @Ctx() ctx: MyContext
  ) {
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

    console.log(user);

    // registration successful
    // ctx.req.session!.userId = user.id;

    // if (ctx.req.sessionID) {
    //   await ctx.redis.lpush(
    //     `${userSessionIdPrefix}${user.id}`,
    //     ctx.req.sessionID
    //   );
    // }

    // await sendEmail(
    //   'samuherekbiz@gmail.com',
    //   await createConfirmEmailLink(ctx.url, user.id, ctx.redis)
    // );

    return true;
  }
}
