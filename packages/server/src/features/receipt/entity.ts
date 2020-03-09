import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bill } from '../bill/entity';
import { User } from '../user/entity';
import console = require('console');

export type UserSplitsMap = {
  [userId: string]: number;
};

export class UserSplitValue {
  userId: string;
  value: number;
}

@Entity()
export class Receipt extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'numeric', scale: 2 })
  total: number;

  @Column({ default: 'EUR' })
  currency: string;

  @Column({ type: 'date' })
  paidAt: Date;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ default: false })
  isSettlement: boolean;

  @Column()
  billId: string;
  @ManyToOne(() => Bill, bill => bill.receipts)
  @JoinColumn({ name: 'bill_id' })
  bill: Promise<Bill>;

  @Column()
  paidById: string;
  @ManyToOne(() => User, user => user.receiptsPaid)
  @JoinColumn({ name: 'paid_by_id' })
  paidBy: Promise<User>;

  @Column()
  createdById: string;
  @ManyToOne(() => User, user => user.receiptsCreated)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: Promise<User>;

  @Column({ type: 'jsonb' })
  splits: UserSplitsMap;
}
