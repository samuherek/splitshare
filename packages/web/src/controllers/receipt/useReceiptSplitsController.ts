import sortBy from 'lodash.sortby';
import React from 'react';

type Options = {
  total: string;
  splits?: any[];
  users: any[];
};

export type SplitObj = {
  value: number;
  isCustom: boolean;
};

export type SplitObjMap = {
  [userId: string]: SplitObj;
};

export type SplitEntry = [string, SplitObj];

export function getBaseSplits(total: number, users: any[]): SplitObjMap {
  return users.reduce((prev, u) => {
    prev[u.id] = {
      value: total / users.length,
      isCustom: false,
    };
    return prev;
  }, {});
}

export function fromEntriesToObjMap(entries: SplitEntry[]): SplitObjMap {
  return entries.reduce((prev: { [key: string]: any }, [key, split]) => {
    prev[key] = split;
    return prev;
  }, {});
}

export function getNextSplits(
  splitValues: SplitObjMap,
  totalNum: number,
  userId: string,
  value: number
): SplitObjMap {
  const userSplit = splitValues[userId];
  const sortedSplitEntries = sortBy(Object.entries(splitValues), ['[1].value']);

  // We don't allow bigger number than the total value of the receipt
  if (value >= totalNum) {
    const nextSplitEntries = sortedSplitEntries.map(([key, split]) => {
      const nextEntry: SplitEntry = [key, split];
      const isBeingEditedSplit = key === userId;

      nextEntry[1] = {
        ...split,
        value: isBeingEditedSplit ? totalNum : 0,
        isCustom: isBeingEditedSplit,
      };

      return nextEntry;
    });

    return fromEntriesToObjMap(nextSplitEntries);
  }

  let remainder = Math.abs(userSplit.value - value);

  if (remainder > totalNum) {
    remainder = totalNum;
  }

  const shouldDeduct = userSplit.value < value;

  let actionUserPassed = false;

  const nextSplitEntries = sortedSplitEntries.map(([key, split], i) => {
    const nextEntry: SplitEntry = [key, split];

    if (key === userId) {
      actionUserPassed = true;
      nextEntry[1] = {
        ...split,
        isCustom: true,
        value,
      };
      return nextEntry;
    }

    const entriesLeft = actionUserPassed
      ? sortedSplitEntries.length - i
      : sortedSplitEntries.length - 1 - i;

    const splitValuePart = remainder / entriesLeft;

    let safeValueToUse = splitValuePart;

    if (shouldDeduct) {
      const canDeduct = Math.floor(split.value - splitValuePart) >= 0;
      safeValueToUse = canDeduct ? splitValuePart : split.value;
    }

    const nextValue = shouldDeduct
      ? split.value - safeValueToUse
      : split.value + safeValueToUse;

    remainder -= safeValueToUse;

    nextEntry[1] = {
      ...split,
      value: Math.round(nextValue * 100) / 100,
    };

    return nextEntry;
  });

  return fromEntriesToObjMap(nextSplitEntries);
}

function useReceiptSplitsController({ total, users, splits }: Options) {
  const totalNum = Number(total);

  // TODO: a case when only one user?

  const [isCustomSplit, setIsCustomSplit] = React.useState(false);
  const [splitValues, setSplitValues] = React.useState<SplitObjMap>(() =>
    getBaseSplits(totalNum, users)
  );

  React.useEffect(() => {
    setSplitValues(getBaseSplits(totalNum, users));
  }, [users, splits]);

  React.useEffect(() => {
    if (isCustomSplit) {
      setIsCustomSplit(false);
    }

    setSplitValues(getBaseSplits(totalNum, users));
  }, [total]);

  function handleSetSplitValues(userId: string, value: number) {
    if (!isCustomSplit) {
      setIsCustomSplit(true);
    }

    const nextSplits = getNextSplits(splitValues, totalNum, userId, value);
    setSplitValues(nextSplits);
  }

  return {
    map: splitValues,
    onChange: handleSetSplitValues,
  };
}

export default useReceiptSplitsController;
