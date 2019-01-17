import { ArgsType, Field } from 'type-graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export default class RemoveBillInviteArgs {
  @Field()
  @IsUUID()
  id: string;
}
