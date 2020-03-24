import React from 'react';
import { checkContextProvider } from '../../utils/context';
import { IDateUtils, UtilsDateType, UtilsLibType } from './typings';

export type DateUtilsAdapter = IDateUtils<UtilsLibType, UtilsDateType>;

type DateUtilsProviderProps = {
  utils: new (...args: any) => DateUtilsAdapter;
  children: React.ReactNode;
};

const DateUtilsContext = React.createContext<DateUtilsAdapter | null>(null);

function DateUtilsProvider({ utils: Utils, ...rest }: DateUtilsProviderProps) {
  const utils = React.useMemo(() => new Utils({}), [Utils]);
  return <DateUtilsContext.Provider value={utils} {...rest} />;
}

function useDateUtils() {
  const utils = React.useContext(DateUtilsContext);
  checkContextProvider(utils);

  return utils!;
}

export { DateUtilsProvider, useDateUtils };
