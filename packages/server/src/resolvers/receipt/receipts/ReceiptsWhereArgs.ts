import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class FilterInput {
  @Field(() => Int)
  @Min(0)
  offset: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(6)
  limit = 6;
}
