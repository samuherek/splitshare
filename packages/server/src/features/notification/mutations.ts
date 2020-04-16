import { MyContext } from '../../types.d';
import { ClearNotificationsArgs, UpdateNotificationArgs } from './types.d';

export default {
  Mutation: {
    updateNotification: (
      _: any,
      { id, input }: UpdateNotificationArgs,
      { models }: MyContext
    ) => {
      return models.Notification.update(id, input);
    },
    clearNotifications: (
      _: any,
      { input }: ClearNotificationsArgs,
      { models, user }: MyContext
    ) => {
      return models.Notification.clearCount(user.id, input.type);
    },
  },
};
