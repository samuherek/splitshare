import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
export class Bill extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column()
  name: string;

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

  @Field(() => [User])
  @ManyToMany(() => User, user => user.bills)
  @JoinTable()
  users: Promise<User[]>;

  @Field(() => [String])
  @Column({ type: 'uuid', array: true })
  usersIds: string[];
}
