import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
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

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  billId: string;

  @ManyToOne(() => User, user => user.billCon, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Bill, bill => bill.userCon, { primary: true })
  @JoinColumn({ name: 'billId' })
  bill: Promise<Bill>;
}
