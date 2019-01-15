import { InputType, Field } from 'type-graphql';
import { ReceiptSplit } from 'src/entity/ReceiptSplit';
import { IsUUID } from 'class-validator';

@InputType()
export class ReceiptSplitInput implements Partial<ReceiptSplit> {
  @Field()
  @IsUUID()
  userId: string;

  @Field()
  value: number;
}
