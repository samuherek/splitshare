import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Bill } from './Bill';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class BillInvite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  accepted: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column('uuid')
  invitedById: string;

  @Field(() => User)
  invitedBy: Promise<User>;

  @Field()
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  billId: string;

  @ManyToOne(() => User, user => user.invites)
  @JoinColumn()
  user: Promise<User>;

  @Field(() => Bill)
  @ManyToOne(() => Bill, bill => bill.invites)
  @JoinColumn()
  bill: Promise<Bill>;
}
