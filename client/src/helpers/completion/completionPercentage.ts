/*

    - Each habit has a completionFrequency and completionTimescale property
    - Given a list of completion entries for that habit, 
        it's straightforward to compute various completion statistics
            - percentage of 'partitions' successully completed
            - current streak
            - best streak
*/

import dayjs from "dayjs";
import { asDates } from "helpers/time/asDates";
import { listDatesBetween } from "helpers/time/dateList";
import {
	dateTruncateMap,
	partitionObjectsByDate,
} from "helpers/time/partitionDates";
import { Timestep } from "types/time";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";

/**
 * Takes a completionEntry and determines based on the habit's properties
 *      whether the entry can be considered as a successful one
 * @param number threshold: fraction (e.g. 50% -> 0.5) of completionInterval
 *      at which an range entry can be considered successful
 */
function isSuccessfulCompletion(
	completionData: Completion,
	completionType: Habit["completionType"],
	completionInterval: Habit["completionInterval"],
	threshold: number = 1
) {
	if (completionType === "toggle") {
		return completionData.completed;
	} else {
		return completionData.rangeValue >= threshold * completionInterval;
	}
}

type ContainsEntryDate = {
	[k: string]: any;
	habitEntryDate: Completion["habitEntryDate"];
};

/**
 * Sort function, to use with `Array.sort()` in order to sort by ascending date
 * @todo there's various layers of abstraction to include to generalize this,
 *  but until we need sort-by-date anywhere else, there's no point in generalizing
 */
function sortByHabitEntryDate(a: ContainsEntryDate, b: ContainsEntryDate) {
	function getDateValue(c: ContainsEntryDate) {
		return new Date(c.habitEntryDate).valueOf();
	}
	return getDateValue(a) - getDateValue(b);
}

/**
 * Given a list of completionEntries (corresponding to a given date range)
 *  and the completion properties belonging to a specific habit,
 *  return a list of { isSuccessful, habitEntryDate, entryIndex } for all the
 *
 */
export function getCompletionSuccess(
	// completionTimescale: Habit["completionTimescale"],
	completionType: Habit["completionType"],
	completionInterval: Habit["completionInterval"],
	completionData: Completion[]
) {
	// find out which completionEntries are successful. include date and index for usage elsewhere
	return (
		completionData
			.map((completionEntry) => ({
				isSuccessful: isSuccessfulCompletion(
					completionEntry,
					completionType,
					completionInterval
				),
				habitEntryDate: completionEntry.habitEntryDate,
				entryIndex: completionEntry.entryIndex,
			}))
			.filter((entry) => entry.isSuccessful)
			// since isSuccessful == true for all of the remaining entries, we don't need the property anymore
			// @note might not be necessary to filter out this property, performance impact is absolutely negligible
			.map(({ habitEntryDate, entryIndex }) => ({ habitEntryDate, entryIndex }))
	);
}

/**
 * Given a list of successful completion entries, and a list of partitioned dates,
 * determine for which partitions the user's completion target has been achieved.
 *
 * Why do we need this?
 * - The user wishes to complete a habit completionFrequency times per completionTimescale,
 *  so the fact that a single completionEntry instance is successful
 *  doesn't necessarily mean the user's actual goal has been reached
 */
export function getCompletionSuccessPerPartition(
	successfulEntries: ReturnType<typeof getCompletionSuccess>,
	timestep: Timestep
) {
	/*  first, put all successfulEntries into partitions, 
        where the partition width is determined by `timestep`.
	    Can create partitions various ways
	        1. get the date extent of successfulEntries */
	const n = successfulEntries.length;

	if (n > 0) {
		const sortedSuccessfulEntries = successfulEntries.sort((a, b) =>
			sortByHabitEntryDate(a, b)
		);
		const [start, end] = [
			dayjs(sortedSuccessfulEntries[0].habitEntryDate),
			dayjs(sortedSuccessfulEntries[n - 1].habitEntryDate),
		];

		const datesInRange = listDatesBetween(start, end);

		// create partitions
		// truncate datesInRange
		const truncate = dateTruncateMap[timestep];

		// create list of truncated dates
		// e.g. if timestep == 'day', truncated = datesInRange.map(d => d.week())
		const truncated = [];

		// loop through datesInRange: if the date already exists in truncated, skip
		// if it doesn't exist yet, we can use this date as a partition label, so add the index to indices
		let indicesForLabels = [];
		for (let i = 0; i < datesInRange.length; i++) {
			let truncatedDate = truncate(datesInRange[i]);
			if (!truncated.includes(truncatedDate)) {
				indicesForLabels.push(i);
				truncated.push(truncatedDate);
			}
		}

		// then, get a list of the dates belonging to the indices we computed
		const partitionLabels = asDates(
			datesInRange.filter((date, index) => indicesForLabels.includes(index))
		);

		const partitionedObjects = partitionObjectsByDate(
			sortedSuccessfulEntries,
			"habitEntryDate",
			partitionLabels,
			timestep
		);
		return partitionedObjects;
	}
	return [];
}

function getCompletionSuccessPercentage(
	successCount: number,
	totalCount: number
) {
	return Math.floor((100 * successCount) / totalCount);
}
