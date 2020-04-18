import { Bill } from '../../entity/Bill';
import { MyContext } from '../../types.d';
import { BillArgs, BillsArgs, UserBalanceRaw } from './types.d';
import { receiptIntoBalance, reduceIntoBalance } from './utils';

export default {
  Query: {
    bill: async (_: any, { id }: BillArgs, { models, user }: MyContext) => {
      return models.Bill.getById(id, user.id);
    },
    bills: (_: any, args: BillsArgs, { models, user }: MyContext) => {
      return models.Bill.getUserBills(args, user.id);
    },
  },
  Bill: {
    users: async (root: Bill, _: any, { models }: MyContext) => {
      return models.Bill.getBillUsers(root.id);
    },
    myBalance: async (
      root: Bill,
      _: any,
      { models, user }: MyContext
    ): Promise<UserBalanceRaw> => {
      const receipts = await models.Receipt.getAllBillReceipts(root.id);

      const balance = reduceIntoBalance(receipts.map(receiptIntoBalance));

      return {
        userId: user.id,
        value: balance[user.id] || 0,
        currency: root.currency,
      };
    },
  },
  UserBalance: {
    // TODO: make it use dataloader
    user: (root: UserBalanceRaw, __: any, { models }: MyContext) => {
      return models.User.getById(root.userId);
    },
  },
};
