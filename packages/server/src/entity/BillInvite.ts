import { Entity, Column, BaseEntity, PrimaryColumn, OneToOne } from 'typeorm';
import { ObjectType } from 'type-graphql';
import { User } from './User';
import { Bill } from './Bill';

@Entity()
@ObjectType()
export class BillInvite extends BaseEntity {
  @Column()
  email: string;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  billId: string;

  @OneToOne(() => User)
  user: Promise<User>;

  @OneToOne(() => Bill)
  bill: Promise<Bill>;
}
