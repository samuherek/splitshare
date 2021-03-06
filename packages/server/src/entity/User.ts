import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserState } from '../features/user/config';
import { Bill } from './Bill';
import { BillUser } from './BillUser';
import { Notification } from './Notification';
import { NotificationObject } from './NotificationObject';
import { Receipt } from './Receipt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @Column({
    default: UserState.ONBOARDING_VERIFY_EMAIL,
    type: 'enum',
    enum: UserState,
  })
  state: UserState;

  @OneToMany(() => BillUser, (billUser) => billUser.user)
  billUsers: Promise<BillUser[]>;

  @OneToMany(() => BillUser, (billUser) => billUser.addedBy)
  addedInvites: Promise<BillUser[]>;

  @OneToMany(() => Bill, (bill) => bill.createdById)
  billsCreated: Promise<Bill[]>;

  @OneToMany(() => Receipt, (receipt) => receipt.paidBy)
  receiptsPaid: Promise<Receipt[]>;

  @OneToMany(() => Receipt, (receipt) => receipt.createdBy)
  receiptsCreated: Promise<Receipt[]>;

  @OneToMany(
    () => NotificationObject,
    (notificationObject) => notificationObject.actor
  )
  notificationsActor: Promise<NotificationObject[]>;

  @OneToMany(() => Notification, (notification) => notification.recipient)
  notifications: Promise<Notification[]>;
}
