import { Resolver, Mutation, Ctx, Authorized, Arg } from 'type-graphql';

import { MyContext } from '../../types/Context';
import { User } from '../../entity/User';
import { getConnection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { MeInput } from './updateMe/MeInput';

@Resolver()
export class UpdateMeResolver {
  @Authorized()
  @Mutation(() => User)
  async updateMe(@Arg('meInput') meInput: MeInput, @Ctx() ctx: MyContext) {
    const { raw } = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ ...meInput })
      .where('id = :id', { id: ctx.req.session!.userId })
      .returning('*')
      .execute();

    return plainToClass(User, raw[0]);
  }
}
