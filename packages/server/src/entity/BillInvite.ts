import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Bill } from './Bill';
import { Field, ID, ObjectType, Root, Ctx } from 'type-graphql';
import { MyContext } from '../types/Context';

@Entity()
@ObjectType()
export class BillInvite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  pending: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @Column('uuid')
  invitedById: string;

  @Field(() => User)
  async invitedBy(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(billInvite.invitedById);
  }

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  billId: string;

  @ManyToOne(() => User, user => user.billInvites)
  user: Promise<User>;

  @Field(() => Bill)
  @ManyToOne(() => Bill, bill => bill.billInvites)
  async bill(@Root() billInvite: BillInvite, @Ctx() ctx: MyContext) {
    return ctx.billLoader.load(billInvite.billId);
  }
}
