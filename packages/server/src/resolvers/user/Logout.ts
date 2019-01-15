import { Resolver, Mutation, Ctx, Authorized } from 'type-graphql';

import { MyContext } from '../../types/Context';

@Resolver()
export class LogoutResolver {
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
}
