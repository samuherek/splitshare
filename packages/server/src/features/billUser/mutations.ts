import { MyContext } from '../../types';
import { CreateInviteArgs } from './types.d';

export default {
  Mutation: {
    createInvite: (
      _: any,
      { input }: CreateInviteArgs,
      { models, user }: MyContext
    ) => {
      return models.BillUser.createInvite(input, user.id);
    },
  },
};
