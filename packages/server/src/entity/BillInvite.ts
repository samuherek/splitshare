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
import { Bill } from './Bill';
import { Field, ID, ObjectType, Ctx } from 'type-graphql';
import { User } from './User';
import { MyContext } from '../types/Context';

@Entity()
@ObjectType()
export class BillInvite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field()
  @Column({ default: true })
  pending: boolean;

  @Column('uuid')
  invitedById: string;

  @PrimaryColumn('uuid')
  billId: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, user => user.creatorOfBillInvites)
  async invitedBy(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.invitedById);
  }

  @Field(() => Bill)
  @ManyToOne(() => Bill, bill => bill.invitesCon)
  async bill(@Ctx() { billLoader }: MyContext): Promise<Bill> {
    return billLoader.load(this.billId);
  }
}
