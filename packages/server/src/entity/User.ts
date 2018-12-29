import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  displayName: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  photoUrl: string | null;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // @ManyToMany(() => Bill)
  // @JoinTable()
  // bills: Bill[]
}
