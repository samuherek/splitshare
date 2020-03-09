import { MyContext } from '../../types';
import { CreateBillArgs } from './types.d';

export default {
  Mutation: {
    createBill: (
      _: any,
      { input }: CreateBillArgs,
      { models, user }: MyContext
    ) => {
      return models.Bill.createOne(input, user.id);
    },
  },
};
