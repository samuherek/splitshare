import { UserSplitsMap } from '../../entity/Receipt';
import { SplitInput } from './types.d';

export function getUserSplitsMap(splits: SplitInput[]) {
  return splits.reduce((acc: UserSplitsMap, split) => {
    acc[split.userId] = split.value;
    return acc;
  }, {});
}
