import { InputType, Field } from 'type-graphql';
import { Receipt } from 'src/entity/Receipt';
import { IsDate, IsUUID, IsNumber } from 'class-validator';

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
  @IsDate()
  paidAt: Date;

  @Field()
  @IsUUID()
  paidById: string;

  @Field()
  @IsNumber()
  total: number;

  // TODO: This should be enum
  @Field()
  currency: string;
}
