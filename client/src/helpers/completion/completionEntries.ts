import { partitionsAsTimestamps } from "helpers/time/partitionDates";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";

type Args = {
	partitionsAsTimes: ReturnType<typeof partitionsAsTimestamps>;
	completionData: Completion[];
	entriesPerDay: number;
	habitId: Habit["habitId"];
	completionType: Habit["completionType"];
	completionInterval: Habit["completionInterval"];
};

/**
 * Map a list of timestamps in partitions to a list of completionEntries
 *  - partitionsAsTimes is a `number[][]`.
 *  - each `partitions[i]` represents a single partition,
 *  - each partition is a list of timestamps
 *  - each timestamp corresponds to one day's date
 *
 * In the end, each timestamp is mapped to a list of length `entriesPerDay`,
 * in which each entry is an object used to generate a single HabitCompletionInstance component
 *
 */
export function makeCompletionEntries({
	partitionsAsTimes,
	completionData,
	entriesPerDay,
	habitId,
	completionType,
    completionInterval
}: Args) {
	const entryIndices = [...Array(entriesPerDay).keys()];

	return partitionsAsTimes.map((partition) =>
		partition.map((timestamp) => {
			const existingEntriesAtDate = completionData.filter(
				(d) => new Date(d.habitEntryDate).getTime() === timestamp
			);

			return entryIndices.map((entryIndex) => {
				// @note: typescript seems to fail here.
				// it thinks existingEntryAtIndex is always Completion, but it might be undefined
				const existingEntryAtIndex = existingEntriesAtDate.filter((entry) =>
					indexMatches(entry, entryIndex)
				)[0];

				const entryProps: any = {
					completed: existingEntryAtIndex?.completed || false,
					rangeValue: existingEntryAtIndex?.rangeValue || 0,
					completionId: existingEntryAtIndex?.completionId || null,
					entryIndex,
				};

				return {
					_key: `${timestamp}-${entryIndex}`,
					habitEntryDate: new Date(timestamp),
					habitId,
					completionType,
                    completionInterval,
					...entryProps,
				};
			});
		})
	);
}

/**
 * Given a `Completion` instance, check whether its entryIndex value matches `index`
 */
export function indexMatches(entry: Completion, index: number) {
	return entry.entryIndex === index;
}
