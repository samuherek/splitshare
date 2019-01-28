import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Receipt } from './Receipt';
import { BillInvite } from './BillInvite';
import { BillUser } from './BillUser';

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

  @Field(() => [BillUser])
  @OneToMany(() => BillUser, billUser => billUser.bill)
  users: Promise<BillUser[]>;

  @Field(() => [Receipt])
  @OneToMany(() => Receipt, receipt => receipt.billId)
  receipts: Promise<Receipt[]>;

  @Field(() => [BillInvite])
  @OneToMany(() => BillInvite, billInvite => billInvite.bill)
  invites: Promise<BillInvite[]>;
}
