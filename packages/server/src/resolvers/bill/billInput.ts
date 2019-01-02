import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Bill } from 'src/entity/Bill';
import { User } from 'src/entity/User';

@InputType()
export class BillInput implements Partial<Bill> {
  @Field()
  @Length(3, 100)
  name: string;

  @Field(() => [String], { nullable: true })
  users: User[];
}
