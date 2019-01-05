import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Receipt } from './Receipt';

@Entity()
@ObjectType()
export class ReceiptSplit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  currency: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.splits)
  user: Promise<User>;

  @Field()
  @Column('uuid')
  receiptId: string;

  @Field(() => Receipt)
  @ManyToOne(() => Receipt, receipt => receipt.splits)
  receipt: Promise<Receipt>;
}
