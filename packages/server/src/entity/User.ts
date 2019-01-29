import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { ReceiptSplit } from './ReceiptSplit';
import { Receipt } from './Receipt';
import { BillUser } from './BillUser';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  photoUrl?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @OneToMany(() => BillUser, billUser => billUser.user)
  billConnection: Promise<BillUser[]>;

  @OneToMany(() => Receipt, receipt => receipt.paidBy)
  receipts: Promise<Receipt[]>;

  @OneToMany(() => ReceiptSplit, receiptSplit => receiptSplit.user)
  splits: Promise<ReceiptSplit[]>;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
