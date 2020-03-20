import React from 'react';
import { PickerDate } from '../context/DateUtilsProvider';
import { AnyPickerView } from '../typings/SharedPickerProps';

type Options = {
  views: AnyPickerView[];
  openToView: AnyPickerView;
  onDayChange: (nextDay: PickerDate) => void;
};

function useViewController({ views, openToView, onDayChange }: Options) {
  const [viewValue, setViewValue] = React.useState(
    openToView && views.includes(openToView) ? openToView : views[0]
  );

  // const previousView = views[views.indexOf(viewValue) - 1];
  const nextView = views[views.indexOf(viewValue) + 1];

  const handleOpenNextView = React.useCallback(() => {
    if (nextView) {
      setViewValue(nextView);
    }
  }, [nextView, setViewValue]);

  const handleViewChange = React.useCallback(
    (nextView: AnyPickerView) => {
      setViewValue(nextView);
    },
    [setViewValue]
  );

  const handleDayChangeAndOpenNextView = React.useCallback(
    (day: PickerDate) => {
      onDayChange(day);
      handleOpenNextView();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onDayChange, nextView, handleOpenNextView]
  );

  return {
    // nextView,
    // previousView,
    openNextView: handleOpenNextView,
    view: {
      value: viewValue,
      onChange: handleViewChange,
      onDayChangeAndNext: handleDayChangeAndOpenNextView,
    },
  };
}

export default useViewController;
