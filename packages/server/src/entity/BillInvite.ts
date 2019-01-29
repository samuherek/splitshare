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
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class BillInvite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field()
  @Column({ default: true })
  pending: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  @PrimaryColumn('uuid')
  billId: string;

  @Field(() => Bill)
  @ManyToOne(() => Bill, bill => bill.invites)
  bill: Promise<Bill>;
}
