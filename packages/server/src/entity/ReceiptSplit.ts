import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Ctx } from 'type-graphql';
import { User } from './User';
import { Receipt } from './Receipt';
import { MyContext } from '../types/Context';

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

  @ManyToOne(() => Receipt, receipt => receipt.splits)
  receipt: Promise<Receipt>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.splits)
  async user(@Ctx() ctx: MyContext): Promise<User> {
    return ctx.userLoader.load(this.userId);
  }
}
