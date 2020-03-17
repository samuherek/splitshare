import defaultDayjs from 'dayjs';
import React from 'react';
import { IDateUtils } from '../adapters/types';

// TODO: fix date type
export type PickerDate = defaultDayjs.Dayjs;
export type DateUtils = IDateUtils<PickerDate>;

export const DateUtilsContext = React.createContext<DateUtils | null>(null);

type Props = {
  utils: new (...args: any) => DateUtils;
  children: React.ReactNode;
  locale?: any;
};

export function DateUtilsProvider({ utils: Utils, locale, ...rest }: Props) {
  const utils = React.useMemo(() => new Utils({ locale }), [Utils, locale]);

  return <DateUtilsContext.Provider value={utils} {...rest} />;
}

function checkContextProvider(ctx: DateUtils | null) {
  if (!ctx) {
    throw new Error(
      'Can not find utils in context. It looks like you forgot to wrap your component in context'
    );
  }
}

export function useDateUtils() {
  const utils = React.useContext(DateUtilsContext);
  checkContextProvider(utils);

  return utils!;
}

export function useNow() {
  const utils = useDateUtils();
  const now = React.useRef(utils.date());

  return now.current!;
}
