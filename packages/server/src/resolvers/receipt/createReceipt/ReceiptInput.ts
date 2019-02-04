import { InputType, Field } from 'type-graphql';
import { Receipt } from 'src/entity/Receipt';

@InputType()
export class ReceiptInput implements Partial<Receipt> {
  @Field()
  company: string;

  @Field({ nullable: true })
  comment: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  country: string;

  @Field()
  paidAt: Date;

  @Field()
  paidById: string;

  @Field()
  total: number;

  // TODO: This should be enum
  @Field()
  currency: string;
}
