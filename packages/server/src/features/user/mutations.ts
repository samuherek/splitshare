import { MyContext } from '../../types.d';
import { UserState } from './config';
import { SetupAccountArgs } from './types.d';

export default {
  Mutation: {
    setupAccount: (
      _: any,
      { input }: SetupAccountArgs,
      { models, user }: MyContext
    ) => {
      return models.User.update(
        {
          ...input,
          // TODO: learn how to type this
          // @ts-ignore
          state: UserState.ACTIVE,
        },
        user.id
      );
    },
  },
};
