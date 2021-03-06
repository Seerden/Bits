import dayjs, { Dayjs } from "dayjs";
import { DateOrDayjs } from "types/time";

/**
 * Convert array `dates` from Dayjs[] to Date[]
 */
export function asDates(dates: Array<DateOrDayjs>) {
    return dates.map((date) => dayjs(date).toDate());
}

/**
 * Convert array `dates` from `Dayjs[] | Date[]` to array of timestamps (i.e. an array typed like the result of new Date().getTime())
 */
export function asTimes(dates: string[] | Date[] | Dayjs[]) {
    const toTimes = (dates: Date[]) => dates.map((date) => date.getTime());

    if (typeof dates[0] === "string") {
        // dates is String[]
        return toTimes(dates.map((date) => new Date(date)));
    } else if (dates.length > 0 && "getTime" in dates[0]) {
        // dates is Date[]
        return toTimes(dates as Date[]);
    } else {
        // dates is Dayjs[]
        return toTimes(asDates(dates as Dayjs[]));
    }
}
