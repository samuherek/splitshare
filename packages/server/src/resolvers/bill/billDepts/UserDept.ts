import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class UserDept {
  @Field()
  userId: string;

  @Field()
  sum: number;

  @Field()
  currency: string;

  @Field()
  owingToId: string;
}
