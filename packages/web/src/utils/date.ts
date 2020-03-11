import dayjs, { Dayjs } from 'dayjs';
// @ts-ignore
import en from 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';

// TODO: For whatever reason extending the dayjs relativeTime plugin doesn't work
// The only work around I could have figured out was to hard code the plugin partial section
// here and use it as a separate function.
// There was no github issue related to this.
// For the sake of speed, I keep it this way, but we should come back to it
// and find a proper solution to.
function relativeTime(input: Dayjs, withoutSuffix: boolean): string {
  const loc = {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  };
  const T = [
    { l: 's', r: 44, d: 'second' },
    { l: 'm', r: 89 },
    { l: 'mm', r: 44, d: 'minute' },
    { l: 'h', r: 89 },
    { l: 'hh', r: 21, d: 'hour' },
    { l: 'd', r: 35 },
    { l: 'dd', r: 25, d: 'day' },
    { l: 'M', r: 45 },
    { l: 'MM', r: 10, d: 'month' },
    { l: 'y', r: 17 },
    { l: 'yy', d: 'year' },
  ];

  const Tl = T.length;
  let result;
  let out;

  for (let i = 0; i < Tl; i += 1) {
    let t = T[i];
    if (t.d) {
      // @ts-ignore
      result = input.diff(dayjs(), t.d, true);
    }
    // @ts-ignore
    const abs = Math.round(Math.abs(result));
    // @ts-ignore
    if (abs <= t.r || !t.r) {
      if (abs === 1 && i > 0) t = T[i - 1]; // 1 minutes -> a minute
      // @ts-ignore
      out = loc[t.l].replace('%d', abs);
      break;
    }
  }
  if (withoutSuffix) {
    return out;
  }
  // @ts-ignore
  return (result > 0 ? loc.future : loc.past).replace('%s', out);
}

dayjs.locale({ ...en, weekStart: 1 });
dayjs.extend(utc);

const djsToday = dayjs();

export const djsAnchors: { [key: string]: Dayjs } = {
  today: djsToday,
  yesterday: djsToday.subtract(1, 'day'),
};

// Used to make sure we are receiving a valid date to use.
function validateAndGetDjs(date: Dayjs): Dayjs {
  const djsDate = dayjs(date);
  if (!djsDate.isValid()) {
    throw new Error(
      `checkValidDate: provided value is not a valid date (${date.toString()})`
    );
  }
  return djsDate;
}

// Used to make sure we are using a "Date" object and not a string
// or other types
export function ensureDate(date: Dayjs): Date {
  const djs = validateAndGetDjs(date);
  return djs.toDate();
}

// Used to format the timestamp. Either for display in the UI
// or for including the date in the URL as a param or sending
// it over graphql request
export function format(date: Dayjs, format: string = 'DD-MM-YYYY'): string {
  const djsDate = validateAndGetDjs(date);

  switch (format) {
    case 'utcWithTime':
      return djsDate.utc().format();
    default:
      return djsDate.format(format);
  }
}

// Get the relative time ago based on the timestamp provided
export function timeAgo(date: Dayjs, hideAgo: boolean = false): string {
  const djsDate = validateAndGetDjs(date);
  return relativeTime(djsDate, hideAgo);
}
