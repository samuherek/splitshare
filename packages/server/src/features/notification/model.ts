import { getConnection, getRepository } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { Notification } from '../../entity/Notification';
import { NotificationObject } from '../../entity/NotificationObject';
import { remapJoin } from '../../utils/entity';
import { paginate } from '../../utils/pagination';
import {
  CreateNotificationInput,
  NotificationsArgs,
  NotificationsFilter,
  UpdateNotificationInput,
} from './types.d';
import mapObject = require('map-obj');

// FIXME: for whatever reason I can not import it without
// typescript failing the compilation pr
// So it needs to be store here for the time being
export enum ClearType {
  SEEN = 'SEEN',
  READ = 'READ',
}

export interface NotificationModel {
  getUserNotifications: typeof getUserNotifications;
  createOne: typeof createOne;
  remove: typeof remove;
  removeUserNotification: typeof removeUserNotification;
  getCount: typeof getCount;
  clearCount: typeof clearCount;
  update: typeof update;
}

export interface NotificationObjectRaw
  extends Pick<
      Notification,
      'id' | 'isRead' | 'notificationObjectId' | 'recipientId'
    >,
    Pick<
      NotificationObject,
      'createdAt' | 'actionTypeId' | 'entityTypeId' | 'entityId' | 'actorId'
    > {}

async function getUserNotifications(
  userId: string,
  { pagination }: NotificationsArgs = {}
) {
  const query = getRepository(Notification)
    .createQueryBuilder('notification')
    .innerJoinAndSelect(
      'notification.notificationObject',
      'notificationObject',
      'notificationObject.id = notification.notificationObjectId'
    )
    .where('notification.recipientId = :userId', { userId })
    .orderBy('notificationObject.createdAt');

  return paginate<NotificationObjectRaw>(
    // FIXME: typing
    // @ts-ignore
    query,
    pagination,
    remapJoin('__notificationObject__')
  );
}

async function getCount(
  userId: string,
  { isRead, isSeen }: NotificationsFilter = {}
) {
  const query = getRepository(Notification)
    .createQueryBuilder('notification')
    .where('notification.recipientId = :userId', { userId });

  if (typeof isRead === 'boolean') {
    query.andWhere('notification.isRead = :isRead', { isRead });
  }

  if (typeof isSeen === 'boolean') {
    query.andWhere('notification.isSeen = :isSeen', { isSeen });
  }

  return query.getCount();
}

async function clearCount(userId: string, type: ClearType) {
  const query = getConnection()
    .createQueryBuilder()
    .update(Notification)
    .where('recipientId = :userId', { userId });

  if (type === ClearType.READ) {
    query.set({ isRead: true });
    query.andWhere('isRead is FALSE');
  }

  if (type === ClearType.SEEN) {
    query.set({ isSeen: true });
    query.andWhere('isSeen is FALSE');
  }

  await query.execute();

  return true;
}

async function update(id: string, input: UpdateNotificationInput) {
  const { raw } = await getConnection()
    .createQueryBuilder()
    .update(Notification)
    .set(input)
    .where('id = :id', { id })
    .updateEntity(true)
    .output('*')
    .execute();

  const [res] = raw;

  if (!res) {
    throw new Error('No such notification');
  }

  return mapObject(res, (key, val) => [camelCase(key as string), val]);
}

async function remove(criteria: string | string[]) {
  return getRepository(Notification).delete(criteria);
}

async function createOne({
  actorId,
  entityTypeId,
  actionTypeId,
  entityId,
  recipientIds,
}: CreateNotificationInput) {
  const notificationObject = await getRepository(NotificationObject)
    .create({
      actorId,
      entityId,
      entityTypeId,
      actionTypeId,
    })
    .save();

  await Promise.all(
    recipientIds.map((id) =>
      getRepository(Notification)
        .create({
          recipientId: id,
          notificationObjectId: notificationObject.id,
        })
        .save()
    )
  );

  return;
}

async function removeUserNotification(entityId: string, userId: string) {
  const res = await getRepository(Notification)
    .createQueryBuilder('notification')
    .innerJoin(
      'notification.notificationObject',
      'notificationObject',
      'notification.notificationObjectId = notificationObject.id'
    )
    .where('notification.recipientId = :userId', { userId })
    .andWhere('notificationObject.entityId = :entityId', { entityId })
    .getOne();

  // If we don't find it then let's return right away
  if (!res) {
    return res;
  }

  await getRepository(Notification).delete(res.id);

  return res;
}

export default {
  getUserNotifications,
  getCount,
  createOne,
  remove,
  removeUserNotification,
  clearCount,
  update,
};
