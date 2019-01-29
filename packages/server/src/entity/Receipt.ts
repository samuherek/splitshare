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
import { ObjectType, Field, ID, Root, Ctx } from 'type-graphql';
import { User } from './User';
import { ReceiptSplit } from './ReceiptSplit';
import { Bill } from './Bill';
import { MyContext } from '../types/Context';

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  country?: string;

  @Column('uuid')
  paidById: string;

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  total: number;

  @Field()
  @Column({ default: 'EUR' })
  currency: string;

  @Column('uuid')
  creatorId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column('uuid')
  billId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.paidReceipts)
  async paidBy(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(receipt.paidById);
  }

  @Field(() => User)
  async creator(@Root() receipt: Receipt, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(receipt.creatorId);
  }

  @Field(() => [ReceiptSplit])
  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.receipt)
  async splits(@Ctx() { receiptSplitsLoader }: MyContext): Promise<
    ReceiptSplit[]
  > {
    return receiptSplitsLoader.load(this.id);
  }

  @ManyToOne(() => Bill, bill => bill.receipts)
  bill: Promise<Bill>;
}
