import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from '../bill/entity';
import { BillUser } from '../billUser/entity';
import { Receipt } from '../receipt/entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  displayName?: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;

  @OneToMany(() => BillUser, billUser => billUser.user)
  billUsers: Promise<BillUser[]>;

  @OneToMany(() => Bill, bill => bill.createdById)
  billsCreated: Promise<Bill[]>;

  @OneToMany(() => Receipt, receipt => receipt.paidBy)
  receiptsPaid: Promise<Receipt[]>;

  @OneToMany(() => Receipt, receipt => receipt.createdBy)
  receiptsCreated: Promise<Receipt[]>;
}
