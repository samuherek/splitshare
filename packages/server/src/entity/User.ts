import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { Bill } from './Bill';
import { ReceiptSplit } from './ReceiptSplit';
import { Receipt } from './Receipt';
import { BillInvite } from './BillInvite';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  photoUrl?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToMany(() => Bill, bill => bill.users)
  bills: Promise<Bill[]>;

  @OneToMany(() => Receipt, receipt => receipt.paidBy)
  receipts: Promise<Receipt[]>;

  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.user)
  splits: Promise<ReceiptSplit[]>;

  @Field(() => [BillInvite])
  @OneToMany(() => BillInvite, billInvite => billInvite.user)
  invites: Promise<BillInvite[]>;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
