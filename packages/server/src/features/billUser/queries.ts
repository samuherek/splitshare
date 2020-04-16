import { MyContext } from '../../types';
import { BillUser } from './entity';

export default {
  Query: {},
  BillInvite: {
    user: (root: BillUser, __: any, { models }: MyContext) => {
      return models.User.getById(root.userId);
    },
    invitedBy: (root: BillUser, __: any, { models }: MyContext) => {
      return models.User.getById(root.addedById);
    },
    bill: (root: BillUser, __: any, { models, user }: MyContext) => {
      return models.Bill.getById(root.billId, user.id);
    },
  },
};
