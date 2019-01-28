import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Root, Ctx } from 'type-graphql';
import { User } from './User';
import { Receipt } from './Receipt';
import { BillInvite } from './BillInvite';
import { MyContext } from '../types/Context';

@Entity()
@ObjectType()
export class Bill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Column('uuid')
  creatorId: string;

  @Field(() => User)
  async creator(@Root() bill: Bill, @Ctx() ctx: MyContext) {
    return ctx.userLoader.load(bill.creatorId);
  }

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.bills)
  users: Promise<User[]>;

  @OneToMany(() => Receipt, receipt => receipt.billId)
  receipts: Promise<Receipt[]>;

  @OneToMany(() => BillInvite, billInvite => billInvite.bill)
  billInvites: Promise<BillInvite[]>;
}
