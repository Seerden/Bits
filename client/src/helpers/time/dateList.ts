import dayjs, { Dayjs } from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Timestep } from "types/time";
import { TimescaleType } from "../../../../shared/types/Timescale";

dayjs.extend(weekOfYear);

/**
 * Returns a list of all dates in the inclusive specified range [start, end]
 */
export function listDatesBetween(start: dayjs.Dayjs, end: dayjs.Dayjs) {
    if (end.valueOf() < start.valueOf()) {
        throw('End date must be after start date')
    }

    if (start == end) {
        return [end]
    }

    try {
        const dateList: dayjs.Dayjs[] = [];
        let latest = start;
    
        while (latest <= end) {
            dateList.push(latest);
            latest = latest.add(1, 'day');
        }
    
        return dateList;
    } catch(e) {
        console.error('e')
    }
}

/**
 * Returns dates, with time set to midnight, in the inclusive range [today - n*timescale, today]
 * @param n number of dates to go back. 
 *      n > 1 returns list of n days in the past, until (and including) today
 *      n < 0 returns list of n days into the future, starting today
 * @param {TimescaleType} timescale timescale
 */
export function getPastNDates(n: number, timescale: TimescaleType['timescale']): dayjs.Dayjs[] {
    const today = dayjs(Date.now()).startOf('day');

    const startOfRange = today.add(-n, timescale);

    return listDatesBetween(startOfRange, today);
}

/**
 * Returns a list of dates for which we wish to create labels, e.g. for use in components/Timescale
 * @param {Timestep} timestep spacing between successive entries in the list (day, week, month, year)
 * @param stepsBack number of timesteps back (e.g. if stepsBack == 5), this function returns all dates from 5 days ago through today, inclusive
 * @returns list of dayjs date objects
 */
export function getDatesForLabels(timestep: Timestep, stepsBack: number) {
    const now = dayjs(Date.now()).startOf(timestep);

    const labels: Dayjs[] = [...Array(stepsBack+1).keys()]
        .map((entry, index) => now.add(-index, timestep))
        .reverse();

    return labels;

}

/**
 * Format a list of dates
 * @returns List of dates formatted following `format`
 */
export function formatDates(dates: Dayjs[], format: string) {
    return dates.map(date => date.format(format));
}

