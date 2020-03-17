import React from 'react';
import { AnyPickerView } from '../typings/SharedPickerProps';

type Options = {
  views: AnyPickerView[];
  openToView: AnyPickerView;
};

function useViewController({ views, openToView }: Options) {
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

  return {
    // nextView,
    // previousView,
    openNextView: handleOpenNextView,
    view: {
      value: viewValue,
      onChange: handleViewChange,
    },
  };
}

export default useViewController;
