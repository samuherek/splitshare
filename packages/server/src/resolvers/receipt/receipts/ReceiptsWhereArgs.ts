import { Field, Int, InputType } from 'type-graphql';
import { Min, Max } from 'class-validator';

@InputType()
export class FilterInput {
  @Field()
  billId: string;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number;

  @Field(() => Int)
  @Min(1)
  @Max(6)
  limit = 6;

  // TODO: Check if this is okay to ignore;
  startIndex = this.offset as number;
}
