import dayjs from "dayjs";
import { listDatesBetween } from "helpers/time/dateList";
import { dateToIdentifierMappings } from "helpers/time/truncate";
import { Timestep } from "types/time";
import { Completion } from "../../../../shared/types/Completion";
import { Habit } from "../../../../shared/types/Habit";

/**
 * Determine whether a completionEntry can be considered successful or not.
 * For a toggle habit, success is boolean, however for an interval habit,
 * we can check its current range value against the habit's completionInterval.
 *
 * @note We could loosen up requirements for completion of interval habits by specifying
 *  an optional threshold (e.g. 90% towards the target could be 'successful', still)
 */
export function isSuccessfulCompletion(
    completion: Completion,
    habitData: Partial<Habit>
) {
    const { completed, rangeValue } = completion;
    const { completionType, completionInterval } = habitData;

    if (completionType === "toggle") {
        return completed;
    }

    // completionType === 'interval'
    return rangeValue >= completionInterval;
}

/**
 * Take a habit's completionData. Map all entries to the `timescale` interval in which
 * they belong, and count the number of successful completion entries in each interval
 */
export function completionSuccessCountPerPartition(
    completionData: Completion[],
    habitData: Habit,
    timescale: Timestep
) {
    const truncator = dateToIdentifierMappings[timescale];

    return completionData.reduce((acc, entry) => {
        const label = truncator(dayjs(entry.habitEntryDate));
        const isSuccess = isSuccessfulCompletion(entry, habitData);
        const oldValue = acc[label] || 0;
        const newValue = isSuccess ? oldValue + 1 : oldValue;
        return { ...acc, [label]: newValue };
    }, {} as { [k: string]: number });
}

/**
 * For a given habit, return the percentage of intervals of width `timescale` where
 * the user completed the habit task succesfully at least `completionFrequency` times.
 *
 * @note There is a slight nuance here that might warrant a closer look. The end date is today,
 * however today might fall in the middle of an interval, meaning that the current interval
 * can't be marked successful/unsuccessful yet. Perhaps we should discard the current interval ('partition')
 * and only compute the percentage of fully elapsed intervals
 */
export function getCompletionSuccessPercentage(
    completionData: Completion[],
    habitData: Habit,
    timescale: Timestep
) {
    const partitionedSuccessCounts = completionSuccessCountPerPartition(
        completionData,
        habitData,
        timescale
    );
    const successfulPartitionCount = Object.values(partitionedSuccessCounts).filter(
        (partitionSuccessCount) => partitionSuccessCount >= habitData.completionFrequency
    ).length;

    const start = habitData.startDate || habitData.created;
    const end = dayjs(new Date()).startOf(timescale);
    const totalIntervalCount = listDatesBetween(dayjs(start), end, timescale).length;

    return Math.floor((100 * successfulPartitionCount) / totalIntervalCount);
}
