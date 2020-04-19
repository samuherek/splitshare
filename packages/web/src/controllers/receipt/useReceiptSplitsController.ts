import React from 'react';
import { SplitInput } from '../../graphql/types';
import {
  getEqualRemainderDistribution,
  getMaxValueDistribution,
  SplitsMap,
} from '../../libs/splits';

interface Options {
  total: number;
  splits: SplitsMap;
}

function useReceiptSplitsController({ total, splits }: Options) {
  const [hasCustomSplits, setHasCustomSplits] = React.useState(false);
  const [splitValues, setSplitValues] = React.useState(splits);

  const handleSplitChange = React.useCallback(
    (userId: string, value: string) => {
      const parsedVal = parseFloat(value);
      let nextSplits = null;

      // We don't allow bigger number than the total value of the receipt
      if (parsedVal >= total) {
        nextSplits = getMaxValueDistribution(splitValues, total, userId);
      } else {
        nextSplits = getEqualRemainderDistribution(
          splitValues,
          parsedVal,
          total,
          userId
        );
      }
      console.log(nextSplits);

      setSplitValues(nextSplits);
    },
    [splitValues, setSplitValues, total]
  );

  const setNextSplits = React.useCallback(
    (nextSplits: SplitsMap) => {
      console.log('in here', nextSplits);
      setSplitValues(nextSplits);
    },
    [setSplitValues]
  );

  const getSplitValue = React.useCallback(
    (userId: string) => {
      // In case the split is undefined we need to return string.
      // so the rest of the app can make sure of a specific value coming always
      return splitValues[userId]?.value ?? '';
    },
    [splitValues]
  );

  const getInputSplits = React.useCallback((): SplitInput[] => {
    return Object.keys(splitValues).map((key) => ({
      userId: key,
      value: splitValues[key].parsedValue,
    }));
  }, [splitValues]);

  const isAnyValueChanged = React.useCallback(() => {
    return Object.keys(splits).some((userId) => {
      const originalValue = splits[userId].parsedValue;
      // When we render it first time, the splits might not be set yet.
      // In such case we need to make sure we check for a non existent
      // user split.
      const stateValue = splitValues[userId]?.parsedValue ?? null;
      return originalValue !== stateValue;
    });
  }, [splits, splitValues]);

  return {
    value: splitValues,
    getSplitValue,
    getInputSplits,
    setSplitValues: setNextSplits,
    onChange: handleSplitChange,
    isChanged: isAnyValueChanged(),
  };
}

export default useReceiptSplitsController;
