import { InputType, Field } from 'type-graphql';
import { ReceiptSplit } from 'src/entity/ReceiptSplit';

@InputType()
export class ReceiptSplitInput implements Partial<ReceiptSplit> {
  @Field()
  userId: string;

  @Field()
  total: number;
}
