import React from 'react';
import { PickerDate, useDateUtils } from '../context/DateUtilsProvider';

type Options = {
  disableFuture: boolean;
  disablePast: boolean;
  minDay: PickerDate;
  maxDay: PickerDate;
  now: PickerDate;
};

function useValidateMinMaxMonth({
  disableFuture,
  disablePast,
  minDay,
  maxDay,
  now,
}: Options) {
  const utils = useDateUtils();

  const validateDate = React.useCallback(
    (day: PickerDate) => {
      const inDisabledFuture = disableFuture && utils.isAfterMonth(day, now);
      const inDisabledPast = disablePast && utils.isBeforeMonth(day, now);
      const isBeforeMin = utils.isBeforeMonth(day, minDay);
      const isAfterMax = utils.isAfterMonth(day, maxDay);

      return Boolean(
        inDisabledFuture || inDisabledPast || isBeforeMin || isAfterMax
      );
    },
    [maxDay, minDay, disableFuture, disablePast, utils, now]
  );

  return validateDate;
}

export default useValidateMinMaxMonth;
