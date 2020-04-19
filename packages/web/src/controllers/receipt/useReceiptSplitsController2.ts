import React from 'react';
import { SplitInput } from '../../graphql/types';
import {
  getEqualDistribution,
  sameSplitKeys,
  SplitsMap,
} from '../../libs/splits';

interface Options {
  total: number;
  splits: SplitsMap;
}

interface InputError {
  message: string;
}

function useReceiptSplitsController({ total, splits }: Options) {
  // TODO: fix this awkward flag
  // Awkward fix to keep a flag for whether we have a new receipt
  // or we'll be having an exiting right after is fetched.
  const editingExistingRef = React.useRef(false);
  const [splitValues, setSplitValues] = React.useState(splits);
  const [errors, setErrors] = React.useState<InputError[] | null>(null);

  React.useEffect(() => {
    if (!sameSplitKeys(splits, splitValues)) {
      // TODO: fix this awkward flag
      editingExistingRef.current = true;
      setSplitValues(splits);
    }
  }, [splits]);

  React.useEffect(() => {
    // TODO: fix this awkward flag
    if (!editingExistingRef.current) {
      const nextSplits = getEqualDistribution(splitValues, total);
      setSplitValues(nextSplits);
    }
    // TODO: fix this awkward flag
    editingExistingRef.current = false;
  }, [total]);

  React.useEffect(() => {
    // if (hasCustomSplits) {
    const splitsTotal = Object.keys(splitValues).reduce((accTotal, nextKey) => {
      accTotal += splitValues[nextKey].parsedValue;
      return accTotal;
    }, 0);

    if (splitsTotal !== total && !errors) {
      setErrors([{ message: 'Splits must have a correct total combined' }]);
    } else if (splitsTotal === total && errors) {
      setErrors(null);
    }
    // }
  }, [splitValues, errors, setErrors]);

  const handleSplitChange = React.useCallback(
    (userId: string, value: string) => {
      const parsedValue = parseFloat(value);
      // setHasCustomSplits(true);
      setSplitValues({
        ...splitValues,
        [userId]: {
          ...splitValues[userId],
          value,
          parsedValue,
        },
      });
    },
    [splitValues, setSplitValues]
  );

  const setNextSplits = React.useCallback(
    (nextSplits: SplitsMap) => {
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
    return Object.keys(splitValues)
      .map((key) => ({
        userId: key,
        value: splitValues[key].parsedValue,
      }))
      .filter((input) => input.value !== 0);
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
    errors: errors,
  };
}

export default useReceiptSplitsController;
