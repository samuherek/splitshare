import dayjs, { Dayjs } from 'dayjs';
import en from 'dayjs/locale/en';
import { defaultFormats } from '../defaults';
import { DateUtilsFormats, IDateUtils } from '../typings';
import relativeTime from './utils/dayjs-timeago';

type Options = {
  instance?: typeof dayjs;
  locale?: string;
};
type DjsWithOptions = (...args: Parameters<typeof dayjs>) => Dayjs;

// function withLocale(dayjsVla: typeof dayjs, locale?: string): DjsWithOptions {
//   return !locale ? dayjsVla : (...args) => dayjsVla(...args).locale(locale);
// }

function withOptions(djs: typeof dayjs, options?: any): DjsWithOptions {
  return !options ? djs : (...args) => djs(...args).locale(options.locale);
}

export class DayjsDateUtils implements IDateUtils<typeof dayjs, Dayjs> {
  public lib: typeof dayjs;
  public dayjs: DjsWithOptions;
  public locale?: string;
  public formats: DateUtilsFormats;

  constructor({ instance }: Options = {}) {
    this.lib = instance || dayjs;
    this.dayjs = withOptions(this.lib, { locale: { ...en, weekStart: 1 } });
    // this.locale = locale;
    this.formats = { ...defaultFormats };
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    return this.dayjs(value);
  }

  public isValid(value: any) {
    return this.dayjs(value).isValid();
  }

  public isEqual(value: any, comparing: any) {
    if (value === null && comparing === null) {
      return true;
    }

    return this.dayjs(value).isSame(comparing);
  }

  public toJsDate(value: Dayjs) {
    return value.toDate();
  }

  public format(date: Dayjs, formatKey: keyof DateUtilsFormats) {
    return this.formatByString(date, this.formats[formatKey]);
  }

  public formatByString(date: Dayjs, formatString: string) {
    return this.dayjs(date).format(formatString);
  }

  public timeAgo(date: Dayjs) {
    return relativeTime(this.dayjs(date));
  }
}
