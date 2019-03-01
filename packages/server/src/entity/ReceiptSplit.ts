import { Ctx, Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MyContext } from '../types/Context';
import { Receipt } from './Receipt';
import { User } from './User';

@Entity()
@ObjectType()
export class ReceiptSplit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  value: number;

  @Field()
  @Column()
  currency: string;

  @Column('uuid')
  receiptId: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => Receipt, receipt => receipt.splits, { onDelete: 'CASCADE' })
  receipt: Promise<Receipt>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.splits)
  async user(@Ctx() ctx: MyContext): Promise<User> {
    return ctx.userLoader.load(this.userId);
  }
}
