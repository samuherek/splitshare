import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MyContext } from '../types/Context';
import { Bill } from './Bill';
import { ReceiptSplit } from './ReceiptSplit';
import { User } from './User';

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
  imageId?: string;

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  total: number;

  @Field()
  @Column({ default: 'EUR' })
  currency: string;

  @Field()
  @Column()
  paidAt: Date;

  @Field()
  @Column({ type: 'timestamp with time zone' })
  // @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column('uuid')
  paidById: string;

  @Column('uuid')
  creatorId: string;

  @Column('uuid')
  billId: string;

  @ManyToOne(() => Bill, bill => bill.receiptsCon)
  bill: Promise<Bill>;

  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.receipt)
  splitsCon: Promise<ReceiptSplit[]>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.paidReceipts)
  async paidBy(@Ctx() ctx: MyContext) {
    return ctx.userLoader.load(this.paidById);
  }

  @Field(() => User)
  @ManyToOne(() => User, user => user.creatorOfReceipts)
  async creator(@Ctx() ctx: MyContext) {
    return ctx.userLoader.load(this.creatorId);
  }

  @Field(() => [ReceiptSplit])
  async splits(@Ctx() { receiptSplitsLoader }: MyContext): Promise<
    ReceiptSplit[]
  > {
    return receiptSplitsLoader.load(this.id);
  }
}
