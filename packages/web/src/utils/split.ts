import { UserSplit } from '../graphql/types';

export function getSplitKey(split: UserSplit, prefix: string = 'split') {
  return `${prefix}-${split.user.id}-${split.owingTo.id}`;
}
