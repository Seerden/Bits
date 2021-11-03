import { Dayjs } from "dayjs";

// @todo: add tests

/**
 * Convert array `dates` from Dayjs[] to Date[]
 */
export function asDates(dates: Dayjs[]) {
    return dates.map(date => date.toDate());
};

/**
 * Convert array `dates` from `Dayjs[] | Date[]` to array of timestamps (i.e. an array typed like the result of new Date().getTime())
 */
export function asTimes(dates: Date[] | Dayjs[]) {
    const toTimes = (dates: Date[]) => dates.map(date => date.getTime())

    if (dates.length > 0 && 'getTime' in dates[0]) {  // dates is Date[]
        return toTimes(dates as Date[]);
    } else {  // dates is Dayjs[]
        return toTimes(asDates(dates as Dayjs[]));
    }
}