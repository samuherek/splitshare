import * as faker from 'faker';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CustomNamingStrategy } from '../../../db';
import { Bill as BillEntity } from '../../../entity/bill';
import { Notification as NotificationEntity } from '../../../entity/Notification';
import { NotificationObject as NotificationObjectEntity } from '../../../entity/NotificationObject';
import { User as UserEntity } from '../../../entity/user';
import Bill from '../../bill/model';
import User from '../../user/model';
import { ACTION_TYPE, ENTITY_TYPE } from '../config/entity-types';
import Notification, { ClearType } from '../model';

describe('notification model', () => {
  let user1: UserEntity;
  let user2: UserEntity;
  let bill: BillEntity;

  const notificationType = {
    id: expect.any(String),
    isRead: expect.any(Boolean),
    isSeen: expect.any(Boolean),
    notificationObjectId: expect.any(String),
    recipientId: expect.any(String),
  };

  const notificationObjectType = {
    actionTypeId: expect.any(Number),
    actorId: expect.any(String),
    createdAt: expect.any(Date),
    entityId: expect.any(String),
    entityTypeId: expect.any(Number),
    id: expect.any(String),
  };

  const createNotificationResultType = {
    notificationObject: {
      ...notificationObjectType,
    },
    notifications: expect.arrayContaining([
      expect.objectContaining({
        ...notificationType,
      }),
    ]),
  };

  beforeEach(async () => {
    const conn = await createConnection({
      database: 'splitshare-test2',
      dropSchema: true,
      host: 'localhost',
      name: 'default',
      password: '',
      namingStrategy: new CustomNamingStrategy(),
      port: 5432,
      entities: ['src/entity/**/*.*'],
      migrations: ['src/migration/**/*.*'],
      synchronize: true,
      type: 'postgres',
      username: 'samuherek',
    });

    user1 = await User.createOne({ email: faker.internet.email() });
    user2 = await User.createOne({ email: faker.internet.email() });
    bill = await Bill.createOne(
      { name: 'bill', currency: faker.finance.currencyCode() },
      user1.id
    );

    return conn;
  });

  afterEach(async () => {
    let conn = getConnection();
    return conn.close();
  });

  describe('createOne', () => {
    test('returns type of createNotificationResultType after success', async () => {
      const result = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });

      expect(result).toEqual({ ...createNotificationResultType });
    });

    test('creates notification object in the database', async () => {
      await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });

      const result = await getRepository(NotificationObjectEntity)
        .createQueryBuilder('notificationObject')
        .where('notificationObject.entityId = :entityId', { entityId: bill.id })
        .getMany();

      expect(result.length).toEqual(1);
    });

    test('creates notification for only one user if only one recipient ', async () => {
      await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });

      const result = await getRepository(NotificationEntity)
        .createQueryBuilder('notification')
        .where('notification.recipientId = :recipientId', {
          recipientId: user2.id,
        })
        .getMany();

      expect(result.length).toEqual(1);
    });

    test('creates notifications as many recipients as specified', async () => {
      await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id, user1.id],
      });

      const result = await getRepository(NotificationEntity)
        .createQueryBuilder('notification')
        .where('notification.recipientId  IN (:...recipientId)', {
          recipientId: [user2.id, user1.id],
        })
        .getMany();

      expect(result.length).toEqual(2);
      expect(result.map((n) => n.recipientId)).toEqual([user2.id, user1.id]);
    });
  });

  describe('removeUserNotification', () => {
    let notificationObject: NotificationObjectEntity;

    beforeEach(async () => {
      const res = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });
      notificationObject = res.notificationObject;
    });

    test('should return typeof notification', async () => {
      const result = await Notification.removeUserNotification(
        notificationObject.entityId,
        user2.id
      );

      expect(result).toEqual({ ...notificationType });
    });

    test('removes the notification from the database', async () => {
      const res = await Notification.removeUserNotification(
        notificationObject.entityId,
        user2.id
      );

      const result = await NotificationEntity.find({ id: res.id });

      expect(result).toEqual([]);
    });

    test('should not remove notification for a different recipient of the same notification object', async () => {
      const notification = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user1.id, user2.id],
      });

      await Notification.removeUserNotification(
        notification.notificationObject.entityId,
        user1.id
      );

      const result = await NotificationEntity.find({
        notificationObjectId: notification.notificationObject.id,
      });

      expect(result.length).toEqual(1);
      expect(result[0].recipientId).toEqual(user2.id);
    });

    test('should not remove the notification object', async () => {
      await Notification.removeUserNotification(
        notificationObject.entityId,
        user2.id
      );

      const result = await getRepository(NotificationObjectEntity)
        .createQueryBuilder('notificationObject')
        .where('notificationObject.id = :id', { id: notificationObject.id })
        .getOne();

      expect(result).toEqual(notificationObject);
    });

    test('throws an error when no such notification is found', async () => {
      await expect(
        Notification.removeUserNotification(uuidv4(), uuidv4())
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    let notifications: NotificationEntity[];
    let notificationObject: NotificationObjectEntity;

    beforeEach(async () => {
      const res = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });
      notifications = res.notifications;
      notificationObject = res.notificationObject;
    });

    test('should return typeof notification', async () => {
      const result = await Notification.update(notifications[0].id, {
        isRead: true,
      });

      expect(result).toEqual({ ...notificationType });
    });

    test('throws and error when no such notification is found', async () => {
      await expect(
        Notification.update(uuidv4(), { isRead: true })
      ).rejects.toThrow();
    });

    test('returns updated notification', async () => {
      const result = await Notification.update(notifications[0].id, {
        isRead: true,
        isSeen: true,
      });

      expect(notifications[0].isRead).toEqual(false);
      expect(notifications[0].isSeen).toEqual(false);
      expect(result.isRead).toEqual(true);
      expect(result.isSeen).toEqual(true);
    });
  });

  describe('clearCount', () => {
    let notifications: NotificationEntity[];

    beforeEach(async () => {
      const res = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });
      notifications = res.notifications;
      const res2 = await Notification.createOne({
        actorId: user2.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user1.id],
      });
      notifications = notifications.concat(res2.notifications);
    });

    test('returns typeof boolean', async () => {
      const result = await Notification.clearCount(user1.id, ClearType.READ);

      expect(result).toEqual(expect.any(Boolean));
    });

    test('clears read type count if type provided as read', async () => {
      await Notification.clearCount(user1.id, ClearType.READ);

      const result = await getRepository(NotificationEntity)
        .createQueryBuilder('notification')
        .where('notification.recipientId = :recipientId', {
          recipientId: user1.id,
        })
        .getMany();

      expect(notifications.filter((n) => !n.isRead).length).toEqual(2);
      expect(result.filter((n) => n.isRead).length).toEqual(1);
      expect(result.filter((n) => !n.isRead).length).toEqual(0);
    });

    test('clears seen type count if type provided as seen', async () => {
      await Notification.clearCount(user1.id, ClearType.SEEN);

      const result = await getRepository(NotificationEntity)
        .createQueryBuilder('notification')
        .where('notification.recipientId = :recipientId', {
          recipientId: user1.id,
        })
        .getMany();

      expect(notifications.filter((n) => !n.isSeen).length).toEqual(2);
      expect(result.filter((n) => n.isSeen).length).toEqual(1);
      expect(result.filter((n) => !n.isSeen).length).toEqual(0);
    });
  });

  describe('getCount', () => {
    let notifications: NotificationEntity[];

    beforeEach(async () => {
      const res = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });
      notifications = res.notifications;
      const res2 = await Notification.createOne({
        actorId: user2.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user1.id],
      });
      notifications = notifications.concat(res2.notifications);
    });

    test('returns type number', async () => {
      const result = await Notification.getCount(user1.id);

      expect(result).toEqual(expect.any(Number));
    });
  });

  describe('remove', () => {
    let notifications: NotificationEntity[];
    let notificationObject: NotificationObjectEntity;

    beforeEach(async () => {
      const res = await Notification.createOne({
        actorId: user1.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: bill.id,
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user2.id],
      });
      notifications = res.notifications;
      notificationObject = res.notificationObject;
    });

    test('returns typeof db info', async () => {
      const res = await Notification.remove({
        entityId: bill.id,
      });

      expect(res).toEqual({
        affected: expect.any(Number),
        raw: expect.any(Array),
      });
    });

    test('removes the notification object as well as all related notifications', async () => {
      await Notification.remove({
        entityId: bill.id,
      });

      const resNotifications = await getRepository(NotificationEntity)
        .createQueryBuilder('notification')
        .where('notification.notificationObjectId = :id', {
          id: notificationObject.id,
        })
        .getMany();

      const resNotificationObject = await getRepository(
        NotificationObjectEntity
      ).findOne({ id: notificationObject.id });

      expect(resNotifications.length).toEqual(0);
      expect(resNotificationObject).toEqual(undefined);
    });

    test('does not remove other notifications and notification objects', async () => {
      await Notification.createOne({
        actorId: user2.id,
        entityTypeId: ENTITY_TYPE.BILL,
        entityId: uuidv4(),
        actionTypeId: ACTION_TYPE.CREATED,
        recipientIds: [user1.id, user2.id],
      });

      await Notification.remove({
        entityId: bill.id,
      });

      const resNotifications = await getRepository(NotificationEntity).find();

      const resNotificationObject = await getRepository(
        NotificationObjectEntity
      ).find();

      expect(
        resNotifications.filter(
          (n) => n.notificationObjectId !== notificationObject.id
        ).length
      ).toEqual(2);
      expect(resNotifications.length).toEqual(2);

      expect(
        resNotificationObject.filter((n) => n.entityId !== bill.id).length
      ).toEqual(1);
      expect(resNotificationObject.length).toEqual(1);
    });
  });
});
