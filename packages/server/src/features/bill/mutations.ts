import { MyContext } from '../../types';
import { CreateBillArgs, CreateBillInviteArgs } from './types.d';

export default {
  Mutation: {
    createBill: (
      _: any,
      { input }: CreateBillArgs,
      { models, user }: MyContext
    ) => {
      return models.Bill.createOne(input, user.id);
    },
    createBillInvite: async (
      _: any,
      { input }: CreateBillInviteArgs,
      { models, user }: MyContext
    ) => {
      let inviteUser = await models.User.getUser({ email: input.email });

      if (inviteUser) {
        const billAlreadyHasThisUser = await models.BillUser.getBillUser(
          input.billId,
          inviteUser.id
        );

        if (billAlreadyHasThisUser) {
          throw new Error(`${input.email} is already a part of the bill`);
        }
      }

      if (!inviteUser) {
        inviteUser = await models.User.createOne({ email: input.email });
      }

      const invite = await models.BillUser.createOne({
        ...input,
        userId: inviteUser.id,
        invitedById: user.id,
      });

      // TODO: Sending emails should be moved outside of this because it can be done later
      const bill = await models.Bill.getById(input.billId, user.id);

      models.Email.sendBillInvite({
        toEmail: inviteUser.email,
        billName: bill?.name ?? '',
        fromName: `${user.firstName} ${user.lastName}`,
      });

      return Boolean(invite);
    },
  },
};
