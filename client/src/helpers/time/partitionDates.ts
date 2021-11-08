import { Timestep } from "types/time";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { asTimes } from "./asDates";
dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

type TruncateFn = {
	[K in Timestep]: (d: Dayjs) => number;
};

// @todo: What happens if the displayed date range spans multiple years?
//  In that case, d.month() for two dates a year apart will be equal,
//      though they shouldn't be in the same partition
export const dateTruncateMap: TruncateFn = {
	day: (d) => d.dayOfYear(),
	week: (d) => d.week(),
	month: (d) => d.month(),
	year: (d) => d.year(),
};

/**
 * Given two dates, returns a boolean depending on if the two dates exist in the same year.
 */
export function isSameYear(date1: Dayjs, date2: Dayjs) {
	return date1.year() === date2.year();
}

/**
 * Given a list of `partitions` and a list of `dates`, assign each date in `dates` to a partition
 *
 * @param partitions A `partition` is a date corresponding to a certain time interval,
 * and is elsewhere in the code computed using a `Date` and a `timescale`,
 * e.g. dates of January 1, 2021 and January 10, 2021,
 *      combined with a timescale of 'year':
 *      both dates are mapped to the year '2021'
 *
 * @example
 * Example input:
 * - dates = [Jan 1, Jan 2, Jan 3, Jan 11],
 * - partitions = [Jan 4, Jan 10],
 * - timescale = 'week'
 *
 * Example return: [[Jan 1, Jan 2, Jan 3], [Jan 11]]
 */
export function partitionDates(
	dates: Date[],
	partitions: Date[],
	timescale: Timestep
) {
	const truncateFn = dateTruncateMap[timescale];
	const partitionedDates = partitions.map((partitionLabelDate) => {
		const truncatedLabel = truncateFn(dayjs(partitionLabelDate));

		const filtered = dates.filter(
			(date) =>
				isSameYear(dayjs(partitionLabelDate), dayjs(date)) &&
				truncateFn(dayjs(date)) === truncatedLabel
		);

		return filtered.length > 0 ? filtered : [];
	});

	return partitionedDates;
}

export function partitionsAsTimestamps(
	partitions: ReturnType<typeof partitionDates>
) {
	return partitions.map(asTimes);
}
