import { MyContext } from '../../types.d';
import { Bill } from '../bill/entity';
import { ENTITY_TYPE, NotificationUtils } from './config/entity-types';
import { NotificationObjectRaw } from './model';
import { NotificationsArgs, NotificationsCountInput } from './types.d';

export default {
  Query: {
    notifications: (
      _: any,
      args: NotificationsArgs,
      { models, user }: MyContext
    ) => {
      return models.Notification.getUserNotifications(user.id, args);
    },
    notificationsCount: (
      _: any,
      { filter }: NotificationsCountInput,
      { models, user }: MyContext
    ) => {
      return models.Notification.getCount(user.id, filter);
    },
  },
  Notification: {
    action: (root: NotificationObjectRaw) => {
      return NotificationUtils.getAction(root.actionTypeId);
    },
    entityType: (root: NotificationObjectRaw) => {
      return NotificationUtils.getEntity(root.entityTypeId);
    },
    actor: (root: NotificationObjectRaw, __: any, { models }: MyContext) => {
      return models.User.getById(root.actorId);
    },
    entity: (
      { entityId, entityTypeId }: NotificationObjectRaw,
      __: any,
      { models, user }: MyContext
    ) => {
      if (NotificationUtils.sameType(entityTypeId, ENTITY_TYPE.BILL)) {
        return models.Bill.getById(entityId, user.id);
      } else if (
        NotificationUtils.sameType(entityTypeId, ENTITY_TYPE.BILL_INVITE)
      ) {
        return models.BillUser.getBillInvite(entityId, user.id);
      }
      throw new Error('No such entity type for notification');
    },
  },
  NotificationEntity: {
    __resolveType: (root: Bill) => {
      if (root.hasOwnProperty('icon')) {
        return 'Bill';
      } else if (root.hasOwnProperty('state')) {
        return 'BillInvite';
      }
      return null;
    },
  },
};
