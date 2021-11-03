import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';
import CompletionInstance from "components/HabitInstance/CompletionInstance";
import { useEffect } from "react";

type CompactHabitProps = {
    habitData: Habit,
    completionData: Completion[],
    partitions: Date[][]
}

const CompactHabit = ({ habitData, completionData, partitions }: CompactHabitProps) => {
    const base = "CompactHabit";

    const {
        completionType,
        completionFrequency,
        completionTimescale,
        completionInterval
    } = habitData;

    const partitionsAsTimes = partitions.map(partition => partition.map(date => date.getTime()));

    const entriesPerDay = completionTimescale === 'day' ? completionFrequency : 1;

    /*
        Create a list of completionEntries
        - each entry (= completionEntry) in the list contains entries for a single datePartition
        - each completionEntry contains at least one HabitInstance, depending on the habit's completionFrequency
        - how do we handle cases like the following: 
            timestep = 'day', habit.completionFrequency = 1, habit.completionTimescale = 'week'
        - put existing completionEntries (from completionData, matching a date in a given partition) in the correct spot
    */

    /**
     *  For every date in each partition, create the appropriate number of CompletionInstances,
     *      allocating any completion entries that already exist in the database (i.e. each entry in completionData)
     *      to its respective CompletionInstance
     */
    const habitEntries = partitions.map((partition, partitionIndex) => {
        const timestamps = partitionsAsTimes[partitionIndex];

        return partition.map(
            date => {
                return [...Array(entriesPerDay).keys()].map(
                    entryIndex => {
                        const existingEntry = completionData.filter(completionEntry => {
                            const entryTime = new Date(completionEntry.habitEntryDate).getTime();
                            return timestamps.includes(entryTime) && completionEntry.entryIndex === entryIndex;
                        }
                        )[0];

                        const [completed, rangeValue] = existingEntry
                            ? [existingEntry.completed, existingEntry.rangeValue]
                            : [false, 0]

                        return <CompletionInstance
                            key={`${partitionIndex}-${entryIndex}`}
                            habitId={habitData.habitId}
                            habitEntryDate={date}
                            {...{ completionInterval, entryIndex, completionType, completed, rangeValue }}
                        />
                    })
            }
        )
    });

    console.log(habitEntries);

    return (
        <li className={`${base}`}>
            <span>
                {habitData.habitName}
            </span>

            {
                habitEntries.map((entry, index) =>
                    <ul
                        key={index}
                        className={`${base}__entry`}
                    >
                        {entry}
                    </ul>
                )
            }
        </li>
    )
}

export default CompactHabit