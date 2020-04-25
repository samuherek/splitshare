import { MyContext } from '../../types';
import { ACTION_TYPE, ENTITY_TYPE } from '../notification/config/entity-types';
// import { notificationTypes } from '../notificationType/config';
import {
  CreateBillArgs,
  CreateBillInviteArgs,
  DeleteBillArgs,
  RemoveBillInviteArgs,
  UpdateBillArgs,
  UpdateBillInviteArgs,
  UpdateBillModelInput,
} from './types.d';

export default {
  Mutation: {
    createBill: (
      _: any,
      { input }: CreateBillArgs,
      { models, user }: MyContext
    ) => {
      return models.Bill.createOne(input, user.id);
    },
    updateBill: async (
      _: any,
      { id, input }: UpdateBillArgs,
      { models }: MyContext
    ) => {
      const { closed, ...args } = input;

      const updateInput: UpdateBillModelInput = {
        ...args,
      };

      if (closed !== undefined) {
        updateInput.closedAt = closed ? new Date() : null;
      }

      return models.Bill.update(id, updateInput);
    },
    deleteBill: async (
      _: any,
      { id }: DeleteBillArgs,
      { models, user }: MyContext
    ) => {
      const res = await models.Bill.getById(id, user.id);

      if (!res) {
        throw new Error('No such a bill exists');
      }

      await models.Receipt.remove({ billId: id });
      await models.Bill.remove(id);

      return res;
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
        // TODO: add email validator here
        // https://www.validator.pizza/email/email@test.com
        // https://verify-email.org/
        inviteUser = await models.User.createOne({ email: input.email });
      }

      const billUser = await models.BillUser.createOne({
        ...input,
        userId: inviteUser.id,
        addedById: user.id,
      });

      if (!billUser) {
        throw new Error('Something went wrong with the invitation.');
      }

      // TODO: this should be extracted into a messaging system ?
      await models.Notification.createOne({
        actorId: user.id,
        entityTypeId: ENTITY_TYPE.BILL_INVITE,
        actionTypeId: ACTION_TYPE.CREATED,
        entityId: input.billId,
        recipientIds: [billUser.userId],
      });

      // TODO: Sending emails should be moved outside of this because it can be done later
      // TODO: this should be extracted into a messaging system ?
      if (process.env.ACTIVATE_EMAILS === 'true') {
        const bill = await models.Bill.getById(input.billId, user.id);

        models.Email.sendBillInvite({
          toEmail: inviteUser.email,
          billName: bill?.name ?? '',
          fromName: `${user.firstName} ${user.lastName}`,
        });
      }

      return billUser;
    },
    updateBillInvite: (
      _: any,
      { input }: UpdateBillInviteArgs,
      { models, user }: MyContext
    ) => {
      return models.BillUser.update(input.billId, input.state, user.id);
    },
    removeBillUser: async (
      _: any,
      { input }: RemoveBillInviteArgs,
      { models }: MyContext
    ) => {
      const res = await models.BillUser.remove(input.billId, input.userId);
      await models.Notification.removeUserNotification(
        input.billId,
        input.userId
      );

      return res;
    },
  },
};
