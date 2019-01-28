import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Bill } from './Bill';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class BillUser extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(() => User, user => user.bills)
  user: Promise<User>;

  @PrimaryColumn('uuid')
  billId: string;

  @ManyToOne(() => Bill, bill => bill.users)
  bill: Promise<Bill>;
}
