import sortBy from 'lodash.sortby';
import { BillUser, UserSplit } from '../graphql/types';
import { floor } from '../utils/number';
import { maybe } from '../utils/object';

export interface SplitItem {
  value: string;
  parsedValue: number;
  isCustom: boolean;
  isLocked: boolean;
}

export interface SplitsMap {
  [userId: string]: SplitItem;
}

const defaultSplit = {
  value: '0',
  parsedValue: 0,
  isCustom: false,
  isLocked: false,
};

export function toEntry(userId: string, split: SplitItem): [string, SplitItem] {
  return [userId, split];
}

export function getRemainder(
  originalValue: number,
  nextValue: number,
  total: number
) {
  const reminder = Math.abs(originalValue - nextValue);
  console.log(reminder, reminder > total, total, reminder);
  return reminder > total ? total : reminder;
}

export function getEntriesLeft(
  changingSplitPassed: boolean,
  length: number,
  index: number
) {
  const left = length - index;
  return changingSplitPassed ? left : left - 1;
}

export function getEqualDistribution(
  splits: { [userId: string]: SplitItem },
  total: number
) {
  const idsArr = Object.keys(splits);
  const nextValue = total / idsArr.length;

  return idsArr.reduce<{ [userId: string]: SplitItem }>((acc, userId) => {
    acc[userId] = {
      ...defaultSplit,
      value: String(nextValue),
      parsedValue: nextValue,
    };
    return acc;
  }, {});
}

export function getMaxValueDistribution(
  splits: { [userId: string]: SplitItem },
  total: number,
  changeUserId: string
) {
  return Object.keys(splits).reduce<{ [userId: string]: SplitItem }>(
    (acc, userId) => {
      const isChangingSplit = userId === changeUserId;
      const nextVal = isChangingSplit ? total : 0;

      acc[userId] = {
        ...splits[userId],
        value: String(nextVal),
        parsedValue: nextVal,
        isCustom: isChangingSplit,
      };
      return acc;
    },
    {}
  );
}

export function getEqualRemainderDistribution(
  splits: { [userId: string]: SplitItem },
  value: number,
  total: number,
  changeUserId: string
) {
  const originalValue = splits[changeUserId].parsedValue;
  const splitsLength = Object.keys(splits).length;
  const shouldDeduct = originalValue < value;
  let remainder = getRemainder(originalValue, value, total);

  let changingSplitPassed = false;

  const nextSplitEntries = sortBy(Object.entries(splits), ['[1].value']).map(
    ([userId, split], i) => {
      if (userId === changeUserId) {
        changingSplitPassed = true;

        return toEntry(userId, {
          ...split,
          ...maybe('isCustom', true, userId === changeUserId),
          value: String(value),
          parsedValue: value,
        });
      }

      const splitValuePart =
        remainder / getEntriesLeft(changingSplitPassed, splitsLength, i);

      let safeValueToUse = splitValuePart;

      if (shouldDeduct) {
        const canDeduct = Math.floor(split.parsedValue - splitValuePart) >= 0;
        safeValueToUse = canDeduct ? splitValuePart : split.parsedValue;
      }

      const nextValue = shouldDeduct
        ? floor(split.parsedValue - safeValueToUse, 2)
        : floor(split.parsedValue + safeValueToUse, 2);

      remainder -= safeValueToUse;

      return toEntry(userId, {
        ...split,
        value: String(nextValue),
        parsedValue: nextValue,
      });
    }
  );

  return Object.fromEntries(nextSplitEntries);
}

export function getSplitsFromBillUsers(users: BillUser[]) {
  return users.reduce<{ [userId: string]: SplitItem }>((acc, user) => {
    acc[user.id] = { ...defaultSplit };
    return acc;
  }, {});
}

export function getSplitsFromUserSplits(splits: UserSplit[]) {
  return splits.reduce<{ [userId: string]: SplitItem }>((acc, split) => {
    acc[split.user.id] = {
      ...defaultSplit,
      value: String(split.value),
      parsedValue: split.value,
    };
    return acc;
  }, {});
}

export function getInputSplitsFromSplits(splits: {
  [userId: string]: SplitItem;
}) {
  return Object.keys(splits).map(userId => ({
    userId,
    value: splits[userId].parsedValue,
  }));
}

export function sameSplitKeys(splits: SplitsMap, compareSplits: SplitsMap) {
  const leftKeys = Object.keys(splits);
  const rightKeys = Object.keys(compareSplits);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  return !leftKeys.some(key => !compareSplits[key]);
}
