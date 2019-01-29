import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, Ctx } from 'type-graphql';
import { Receipt } from './Receipt';
import { BillInvite } from './BillInvite';
import { BillUser } from './BillUser';
import { User } from './User';
import { MyContext } from '../types/Context';

@Entity()
@ObjectType()
export class Bill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  icon: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;

  @OneToMany(() => BillUser, billUser => billUser.bill)
  userConnection: Promise<BillUser[]>;

  @Field(() => [User])
  async users(@Ctx() { billUsersLoader }: MyContext): Promise<User[]> {
    return billUsersLoader.load(this.id);
  }

  @Field(() => [Receipt])
  @OneToMany(() => Receipt, receipt => receipt.billId)
  receipts: Promise<Receipt[]>;

  @Field(() => [BillInvite])
  @OneToMany(() => BillInvite, billInvite => billInvite.bill)
  invites: Promise<BillInvite[]>;
}
