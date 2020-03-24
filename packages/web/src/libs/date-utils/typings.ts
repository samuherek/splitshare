import dayjs, { Dayjs } from 'dayjs';

export type UtilsLibType = typeof dayjs | null;
export type UtilsDateType = Dayjs | null;

export interface DateUtilsFormats<TLibFormatToken = string> {
  /** eu date  @example "1. Jan 2019"*/
  /** Not localized keyboard input friendly date/time 24h format @example "2019/01/01 11:44 PM" */
  euFullDate: TLibFormatToken;
}

export interface IDateUtils<TLib, TDate> {
  lib: TLib;
  formats: DateUtilsFormats;
  date(value?: any): TDate | null;
  isValid(value?: any): boolean;
  isEqual(value: any, comparing: any): boolean;
  toJsDate(value: TDate): Date;
  format(value: TDate, formatKey: keyof DateUtilsFormats): string;
  formatByString(value: TDate, formatString: string): string;
  timeAgo(value: TDate): string;
}
