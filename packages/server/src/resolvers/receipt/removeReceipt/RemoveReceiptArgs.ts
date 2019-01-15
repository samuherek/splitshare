import { ArgsType } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class RemoveReceiptArgs {
  @IsUUID()
  id: string;
}
