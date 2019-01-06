import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { ReceiptSplit } from './ReceiptSplit';
import { Bill } from './Bill';

@Entity()
@ObjectType()
export class Receipt extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  category?: string;

  @Field(() => String)
  @Column({ nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Column('uuid')
  paidById: string;

  @Field(() => User)
  paidBy: Promise<User>;

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  total: number;

  @Field()
  @Column({ default: 'EUR' })
  currency: string;

  @Column('uuid')
  creatorId: string;

  @Field(() => User)
  creator: Promise<User>;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field(() => [ReceiptSplit])
  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.receipt)
  splits: Promise<ReceiptSplit[]>;

  @Column('uuid')
  billId: string;

  @ManyToOne(() => Bill, bill => bill.receipts, { onDelete: 'CASCADE' })
  bill: Promise<Bill>;
}
