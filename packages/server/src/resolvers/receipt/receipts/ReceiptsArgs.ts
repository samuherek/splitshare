import { ArgsType, Field, Int } from 'type-graphql';
import { Min, Max, IsUUID } from 'class-validator';

@ArgsType()
export class ReceiptsArgs {
  @IsUUID()
  billId: string;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  offset: number;

  @Field(() => Int)
  @Min(1)
  @Max(6)
  limit = 6;

  // helpers - index calculations

  // TODO: Check if this is okay to ignore;
  startIndex = this.offset;

  endIndex = this.offset + this.limit;
}
