import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bill } from '../bill/entity';
import { User } from '../user/entity';
import { inviteState } from './config';

@Entity()
export class BillUser extends BaseEntity {
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({
    default: inviteState.PENDING,
    type: 'enum',
    enum: Object.keys(inviteState),
  })
  state: keyof typeof inviteState;

  @Column({ nullable: true })
  invitedById: string;

  @PrimaryColumn()
  userId: string;
  @ManyToOne(
    () => User,
    user => user.billUsers,
    { primary: true }
  )
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @PrimaryColumn()
  billId: string;
  @ManyToOne(
    () => Bill,
    bill => bill.billUsers,
    {
      primary: true,
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'bill_id' })
  bill: Promise<Bill>;
}
