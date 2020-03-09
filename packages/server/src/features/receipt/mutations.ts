import { MyContext } from '../../types.d';
import { CreateReceiptArgs } from './types.d';

export default {
  Mutation: {
    createReceipt: async (
      _: any,
      { input }: CreateReceiptArgs,
      { user, models }: MyContext
    ) => {
      return models.Receipt.createOne(input, user.id);
    },
  },
};
