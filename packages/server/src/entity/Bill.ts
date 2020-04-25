import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillUser } from './BillUser';
import { Receipt } from './Receipt';
import { User } from './User';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ nullable: true, default: null, type: 'timestamp with time zone' })
  closedAt: Date;

  @Column({ default: 'EUR' })
  currency: string;

  // TODO: fix this
  @Column({ nullable: true })
  createdById: string;
  @ManyToOne(() => User, (user) => user.billsCreated)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: Promise<User>;

  @OneToMany(() => BillUser, (billUser) => billUser.bill, {
    cascade: true,
  })
  billUsers: Promise<BillUser[]>;

  @OneToMany(() => Receipt, (receipt) => receipt.bill)
  receipts: Promise<Receipt[]>;
}
