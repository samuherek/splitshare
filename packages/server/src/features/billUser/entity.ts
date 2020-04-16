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
import { InviteState } from './config';

@Entity()
export class BillUser extends BaseEntity {
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({
    default: InviteState.PENDING,
    type: 'enum',
    enum: InviteState,
  })
  state: InviteState;

  @PrimaryColumn()
  userId: string;
  @ManyToOne(
    () => User,
    user => user.billUsers,
    { primary: true }
  )
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column({ nullable: true, type: 'uuid' })
  addedById: string;
  @ManyToOne(
    () => User,
    user => user.addedInvites
  )
  @JoinColumn({ name: 'added_by_id' })
  addedBy: Promise<User>;

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
