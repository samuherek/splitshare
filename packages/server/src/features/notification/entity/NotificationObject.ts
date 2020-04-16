import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity';
import { Notification } from './Notification';

@Entity()
export class NotificationObject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column()
  entityTypeId: number;

  @Column()
  actionTypeId: number;

  @Column({ type: 'uuid' })
  entityId: string;

  @Column({ type: 'uuid' })
  actorId: string;
  @ManyToOne(
    () => User,
    user => user.notificationsActor
  )
  @JoinColumn({ name: 'actor_id' })
  actor: Promise<User>;

  @OneToMany(
    () => Notification,
    notification => notification.notificationObject
  )
  notification: Promise<Notification[]>;
}
