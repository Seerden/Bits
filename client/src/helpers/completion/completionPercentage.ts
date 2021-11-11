import { Dayjs } from "dayjs";
import { partitionObjectsByDate } from "helpers/time/partitionDates";
import { Timestep } from "types/time";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";

/**
 * Takes a completionEntry and determines based on the habit's properties
 *  whether the entry can be considered as a successful one
 *
 * @param number threshold: fraction (e.g. 50% -> 0.5) of completionInterval
 * at which a range entry can be considered successful
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
 *  map each completionEntry to { isSuccessful, habitEntryDate, entryIndex }
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
 *
 * @todo we create partitions for the date range for which there are successfulEntries,
 * but we create this function to be used in HabitDetails,
 * which might already contain partitions for which there are no successfulEntries (yet)
 *      is it, then, not a better idea to use the partition labels that we used for the partitions in CompactHabit to begin with?
 *      if we do that, the reult we get from this function has an entry for each displayed partition,
 *      so we can could directly display this result in the UI somehow, if we wanted to
 */
export function getCompletionSuccessPerPartition(
	successfulEntries: ReturnType<typeof getCompletionSuccess>,
	timestep: Timestep,
	labelDates: Dayjs[]
) {
	const n = successfulEntries.length;

	if (n == 0) return [];

	const partitionedObjects = partitionObjectsByDate(
		successfulEntries,
		"habitEntryDate",
		timestep,
		labelDates
	);
	return partitionedObjects;
}

function getCompletionSuccessPercentage(
	successCount: number,
	totalCount: number
) {
	return Math.floor((100 * successCount) / totalCount);
}
