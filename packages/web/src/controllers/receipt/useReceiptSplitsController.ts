import React from 'react';
import { SplitInput } from '../../graphql/types';
import {
  getEqualDistribution,
  getEqualRemainderDistribution,
  getMaxValueDistribution,
  UserSplit,
} from '../../libs/splits';

interface Options {
  total: number;
  splits: {
    [userId: string]: UserSplit;
  };
}

function useReceiptSplitsController({ total, splits }: Options) {
  const cachedTotalRef = React.useRef(total);
  const [splitValues, setSplitValues] = React.useState(splits);

  // In case users are added or removed, reset the splits
  React.useEffect(() => {
    if (Object.keys(splits).length !== Object.keys(splitValues).length) {
      const nextSplits = getEqualDistribution(splits, total);
      setSplitValues(nextSplits);
    }
  }, [splits, setSplitValues, splitValues, total]);

  // In case we change total, redistribute the splits again
  React.useEffect(() => {
    if (cachedTotalRef.current !== total) {
      const nextSplits = getEqualDistribution(splitValues, total);
      cachedTotalRef.current = total;
      setSplitValues(nextSplits);
    }
  }, [splitValues, total, setSplitValues]);

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

      setSplitValues(nextSplits);
    },
    [splitValues, setSplitValues, total]
  );

  const getSplitValue = React.useCallback(
    (userId: string) => {
      return splitValues[userId]?.value;
    },
    [splitValues]
  );

  const getInputSplits = React.useCallback((): SplitInput[] => {
    return Object.keys(splitValues).map(key => ({
      userId: key,
      value: splitValues[key].parsedValue,
    }));
  }, [splitValues]);

  console.log(splitValues);

  return {
    value: splitValues,
    getSplitValue,
    getInputSplits,
    onChange: handleSplitChange,
  };
}

export default useReceiptSplitsController;
