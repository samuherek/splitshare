import { MyContext } from '../../types.d';
import { Receipt } from './entity';
import { ReceiptArgs, ReceiptsArgs, UserSplitRaw } from './types.d';

export default {
  Query: {
    receipt: (_: any, { id }: ReceiptArgs, { models }: MyContext) => {
      return models.Receipt.getById(id);
    },
    receipts: (_: any, args: ReceiptsArgs, { models }: MyContext) => {
      return models.Receipt.getBillReceipts(args);
    },
  },
  Receipt: {
    splits: (root: Receipt): UserSplitRaw[] => {
      return Object.keys(root.splits).map(key => ({
        userId: key,
        value: root.splits[key],
        currency: root.currency,
        paidById: root.paidById,
      }));
    },
    paidBy: (root: Receipt, _: any, { models }: MyContext) => {
      // TODO: Make this user dataloader
      return models.User.getById(root.paidById);
    },
  },
  UserSplit: {
    // TODO: make this user dataloader
    user: (root: UserSplitRaw, _: any, { models }: MyContext) => {
      return models.User.getById(root.userId);
    },
    // TODO: make this user dataloader
    owingTo: (root: UserSplitRaw, _: any, { models }: MyContext) => {
      return models.User.getById(root.paidById);
    },
  },
};
