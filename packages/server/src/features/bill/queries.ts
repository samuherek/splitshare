import { MyContext } from '../../types.d';
import { Bill } from './entity';
import { BillArgs, BillsArgs, UserBalanceRaw } from './types.d';

export default {
  Query: {
    bill: (_: any, { id }: BillArgs, { models, user }: MyContext) => {
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
      const receiptSplitsArr = await models.Receipt.getAllBillReceipts(root.id);

      // TODO: this whole thing only works for TWO people and no more for now.
      const totalUserMap: Map<string, number> = receiptSplitsArr.reduce(
        (acc, receipt) => {
          const { paidById, splits } = receipt;

          Object.keys(splits).forEach(key => {
            const prevValue = acc.get(key) || 0;

            if (!acc.has(key)) {
              acc.set(key, 0);
            }

            if (key !== paidById) {
              acc.set(key, prevValue + splits[key]);
            }
          });

          return acc;
        },
        new Map()
      );

      console.log(totalUserMap);

      let me = totalUserMap.get(user.id);
      totalUserMap.delete(user.id);

      if (!me) {
        throw new Error('something went bad in ME');
      }

      Array.from(totalUserMap.values()).forEach(val => {
        (me as number) -= val;
      });

      // Convert to the right value
      me *= -1;

      console.log(me);

      return {
        userId: user.id,
        value: me,
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
