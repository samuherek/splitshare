import { MyContext } from '../../types.d';

export default {
  Query: {
    me: (_: any, __: any, { models, user }: MyContext) => {
      return models.User.getById(user.id);
    },
    myUsers: (_: any, __: any, { models, user }: MyContext) => {
      return models.User.getBillUsersByUserId(user.id);
    },
  },
};
