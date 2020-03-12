import { MyContext } from '../../types.d';
import { CreateReceiptArgs, DeleteReceiptArgs } from './types.d';

export default {
  Mutation: {
    createReceipt: async (
      _: any,
      { input }: CreateReceiptArgs,
      { user, models }: MyContext
    ) => {
      return models.Receipt.createOne(input, user.id);
    },
    deleteReceipt: async (
      _: any,
      { id }: DeleteReceiptArgs,
      { models }: MyContext
    ) => {
      // TODO: make sure it actually has the right to delete it.
      const res = await models.Receipt.getById(id);

      if (!res) {
        throw new Error('No such a receipt exists');
      }

      await models.Receipt.remove(id);

      return res;
    },
  },
};
