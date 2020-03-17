import defaultDayjs from 'dayjs';
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat';
import { IDateUtils } from './types';
import { DateFormats } from './types.d';

defaultDayjs.extend(localizedFormatPlugin);

type Options = {
  locale?: string;
  instance?: typeof defaultDayjs;
  formats?: Partial<DateFormats>;
};

type Dayjs = defaultDayjs.Dayjs;
type Constructor = (...args: Parameters<typeof defaultDayjs>) => Dayjs;

function withLocale(dayjs: typeof defaultDayjs, locale?: string): Constructor {
  return !locale ? dayjs : (...args) => dayjs(...args).locale(locale);
}

const defaultFormats: DateFormats = {
  normalDateWithWeekday: 'ddd, MMM D',
  normalDate: 'D MMMM',
  shortDate: 'MMM D',
  monthAndDate: 'MMMM D',
  dayOfMonth: 'D',
  year: 'YYYY',
  month: 'MMMM',
  monthShort: 'MMM',
  monthAndYear: 'MMMM YYYY',
  minutes: 'mm',
  hours12h: 'hh',
  hours24h: 'HH',
  seconds: 'ss',
  fullTime: 'LT',
  fullTime12h: 'hh:mm A',
  fullTime24h: 'HH:mm',
  fullDate: 'll',
  fullDateTime: 'lll',
  fullDateTime12h: 'll hh:mm A',
  fullDateTime24h: 'll HH:mm',
  keyboardDate: 'L',
  keyboardDateTime: 'L LT',
  keyboardDateTime12h: 'L hh:mm A',
  keyboardDateTime24h: 'L HH:mm',
};

export default class DayjsUtils implements IDateUtils<defaultDayjs.Dayjs> {
  public rawDayJsInstance: typeof defaultDayjs;
  public dayjs: Constructor;
  public locale?: string;
  public formats: DateFormats;

  constructor({ locale, formats, instance }: Options = {}) {
    this.rawDayJsInstance = instance || defaultDayjs;
    this.dayjs = withLocale(this.rawDayJsInstance, locale);
    this.locale = locale;

    this.formats = { ...defaultFormats, ...formats };
  }

  public date(value?: any) {
    if (value === null) {
      return null;
    }

    return this.dayjs(value);
  }

  public toJsDate(date: Dayjs) {
    return date.toDate();
  }

  public getWeekdays() {
    const start = this.dayjs().startOf('week');
    return [0, 1, 2, 3, 4, 5, 6].map(diff => {
      return this.formatByString(start.add(diff, 'day'), 'dd');
    });
  }

  public getMonthArray(date: Dayjs) {
    const firstMonth = date.clone().startOf('year');
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  }

  public isValid(value: any) {
    return this.dayjs(value).isValid();
  }

  public isAfter(date: Dayjs, value: Dayjs) {
    return date.isAfter(value);
  }

  public isAfterDay(date: Dayjs, value: Dayjs) {
    return date.isAfter(value, 'day');
  }

  public isAfterMonth(date: Dayjs, value: Dayjs) {
    return date.isAfter(value, 'month');
  }

  public isBefore(date: Dayjs, value: Dayjs) {
    return date.isBefore(value);
  }

  public isBeforeDay(date: Dayjs, value: Dayjs) {
    return date.isBefore(value, 'day');
  }

  public isBeforeMonth(date: Dayjs, value: Dayjs) {
    return date.isBefore(value, 'month');
  }

  public isSameDay(date: Dayjs, value: Dayjs) {
    return date.isSame(value, 'day');
  }

  public isSameMonth(date: Dayjs, value: Dayjs) {
    return date.isSame(value, 'month');
  }

  public startOfMonth(date: Dayjs) {
    return date.clone().startOf('month');
  }

  public startOfDay(date: Dayjs) {
    return date.clone().startOf('day');
  }

  public endOfDay(date: Dayjs) {
    return date.clone().endOf('day');
  }

  public endOfMonth(date: Dayjs) {
    return date.clone().endOf('month');
  }

  public getYear(date: Dayjs) {
    return date.year();
  }

  public getWeekArray(date: Dayjs) {
    const start = this.dayjs(date)
      .clone()
      .startOf('month')
      .startOf('week');

    const end = this.dayjs(date)
      .clone()
      .endOf('month')
      .endOf('week');

    let count = 0;
    let current = start;
    const nestedWeeks: Dayjs[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  }

  public getNextMonth(date: Dayjs) {
    return date.clone().add(1, 'month');
  }

  public getPreviousMonth(date: Dayjs) {
    return date.clone().subtract(1, 'month');
  }

  public getMonth(date: Dayjs) {
    return date.month();
  }

  public getYearRange(start: Dayjs, end: Dayjs) {
    const startDate = this.dayjs(start).startOf('year');
    const endDate = this.dayjs(end).endOf('year');
    const years: Dayjs[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'year');
    }

    return years;
  }

  public setYear(date: Dayjs, year: number) {
    return date.clone().set('year', year);
  }

  public setMonth(date: Dayjs, month: number) {
    return date.clone().set('month', month);
  }

  public format(date: Dayjs, formatKey: keyof DateFormats) {
    return this.formatByString(date, this.formats[formatKey]);
  }

  public formatByString(date: Dayjs, formatString: string) {
    return this.dayjs(date).format(formatString);
  }
}
