import { Timestep } from "types/time";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { asDates, asTimes } from "./asDates";
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
 * @todo: consider renaming the `partitions` argument to `partitionLabels`,
 *      since the dates we use in partitions aren't actually partitions,
 *      they're just dates we use in conjunction with `timescale`
 *      to derive the actual date range belonging to each final partition
 * @todo consider renaming this function `mapDatesToPartitions` or something similar
 *      to more accurately reflect functionality
 *
 * @example
 * Example input:
 * - dates = [Jan 1, Jan 2, Jan 3, Jan 11],
 * - partitions = [Jan 4, Jan 10],
 * - timescale = 'week'
 *
 * Example return: [[Jan 1, Jan 2, Jan 3], [Jan 11]]
 *
 * @param returnIndices if true, each partition is not Date[], but { date: Date, index: number }[]
 * where date === dates[index]. This way, if we wish to place objects in partitions instead of just dates,
 * we can use each index as a handle to place each object where we want it
 */
export function partitionDates(
	dates: Date[],
	partitions: Date[],
	timescale: Timestep,
	returnIndices: boolean = false
) {
	const truncateFn = dateTruncateMap[timescale];
	const partitionedDates = partitions.map((partitionLabelDate) => {
		const truncatedLabel = truncateFn(dayjs(partitionLabelDate));
		const datesForPartition = dates.filter(
			(date) =>
				isSameYear(dayjs(partitionLabelDate), dayjs(date)) &&
				truncateFn(dayjs(date)) === truncatedLabel
		);

		if (!datesForPartition.length) return [];
		if (!returnIndices) return datesForPartition;

		return datesForPartition.map((date) => ({
			date,
			index: dates.findIndex((d) => d === date),
		}));
	});

	return partitionedDates;
}

export function partitionsAsTimestamps(
	partitions: Date[][] // ReturnType<typeof partitionDates>
) {
	return partitions.map(asTimes);
}

type DateAndIndex = {
	date: Date;
	index: number;
};

/**
 * Returns a list of objects in partitions, where each partition
 * is a list of objects whose dateProperty matches the date of the partition
 * @param objects objects to partition
 * @param dateProperty the property of each object[i] that denotes the date to use for partitioning
 * @param dates list of dates derived from objects. for this function to work properly,
 * @param partitionDateLabels list of dates to use as partition labels. ideally, each label corresponds to one partition // @todo: use Array.from(new Set(partitionDateLabels)) to ensure uniqueness
 * @param timescale width of each partition
 */
export function partitionObjectsByDate(
	objects: any[],
	dateProperty: string, // denotes whichever property of objects[i] corresponds to a date
	timescale: Timestep,
	partitionDateLabels: Dayjs[]
) {
	// 1. map each object to its date (e.g. its habitEntryDate in case of a `Completion` instance)
	const dates = objects.map((entry) => entry[dateProperty]);

	// 2. create partitions of dates with indices
	const datePartitions = partitionDates(
		dates,
		asDates(partitionDateLabels),
		timescale,
		true
	);

	// 3. map each entry in each partition to the correct object using the index from each partition entry
	// @note: this only works when dates[i] === objects[i][dateProperty]
	const partitionedObjects = datePartitions.map((partition: DateAndIndex[]) =>
		partition.map(({ date, index }) => objects[index])
	);

	return partitionedObjects;
}
