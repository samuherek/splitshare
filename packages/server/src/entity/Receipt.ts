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
import { User } from './User';
import { ReceiptSplit } from './ReceiptSplit';

@Entity()
@ObjectType()
export class Receipt extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ nullable: true })
  comment?: string;

  @Field()
  @Column({ nullable: true })
  category?: string;

  @Field()
  @Column({ nullable: true })
  company?: string;

  @Field()
  @Column({ nullable: true })
  country?: string;

  @Field()
  @Column('uuid')
  paidById: string;

  @Field(() => User)
  paidBy: Promise<User>;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column({ default: 'EUR' })
  currency: string;

  @Field()
  @Column('uuid')
  creatorId: string;

  @Field(() => User)
  creator: Promise<User>;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field(() => [ReceiptSplit])
  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.receipt)
  splits: Promise<ReceiptSplit[]>;
}
