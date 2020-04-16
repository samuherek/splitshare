import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity';
import { NotificationObject } from '../entity/NotificationObject';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: false })
  isSeen: boolean;

  @Column({ type: 'uuid' })
  notificationObjectId: string;
  @ManyToOne(
    () => NotificationObject,
    notificationObject => notificationObject.notification
  )
  @JoinColumn({ name: 'notification_object_id' })
  notificationObject: Promise<NotificationObject>;

  @Column({ type: 'uuid' })
  recipientId: string;
  @ManyToOne(
    () => User,
    user => user.notifications
  )
  @JoinColumn({ name: 'recipient_id' })
  recipient: Promise<User>;
}
