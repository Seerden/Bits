import dayjs, { Dayjs } from "dayjs";
import { Timestep } from "types/time";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

type Map = {
    [k in Timestep]: (d: Date | Dayjs) => number;
};

/**
 * Maps each timestep to a function that takes a date and returns its value matching the timestep
 *
 * e.g. this['day'] returns a function that maps a date to its day of the year, 'week' to the date's week of the year, etc.
 */
const dateToTimestepMapping: Map = {
    day: (d) => dayjs(d).dayOfYear(),
    week: (d) => dayjs(d).week(),
    month: (d) => dayjs(d).month(),
    year: (d) => dayjs(d).year(),
};

type Args = {
    startDate: Date | Dayjs;
    endDate?: Date | Dayjs;
    timestep: Timestep;
};

/**
 * Return the number of `timestep`s since `date`. If given 'week' as timestep, return the difference between weeks of year
 * @param Timestep timestep: day/week/month/year
 * @example { today: December 31, 2021, date: January 1, 2021, timestep: 'week' }: return 51,
 *  since weeks corresponding to dates are 1 and 52, so the dates differ by 51 weeks
 */
export function timestepsSince({ startDate, endDate, timestep }: Args) {
    const end = endDate || dayjs(new Date()).startOf("day");
    const start = dayjs(startDate);
    const dateToTimestep = dateToTimestepMapping[timestep];

    return dateToTimestep(end) - dateToTimestep(start);
}
