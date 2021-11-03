import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';
import CompletionInstance from "components/HabitInstance/CompletionInstance";
import { useEffect } from "react";
import { asDates, asTimes } from "helpers/time/asDates";

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

    // @todo: turn this into a function
    const habitEntries = partitionsAsTimes.map(partition =>
        partition.map(timestamp => {
            const foundEntry = completionData.filter(d =>
                new Date(d.habitEntryDate).getTime() === timestamp
            );

            return [...Array(entriesPerDay).keys()].map(entryIndex => {
                const foundEntryAtIndex = foundEntry.filter(entry => entry.entryIndex === entryIndex)[0];
                const [completed, rangeValue] = foundEntryAtIndex
                    ? [foundEntryAtIndex.completed, foundEntryAtIndex.rangeValue]
                    : [false, 0]

                return <CompletionInstance
                    key={`${timestamp}-${entryIndex}`}
                    habitEntryDate={new Date(timestamp)}
                    {...{
                        completed,
                        rangeValue,
                        completionType,
                        completionFrequency,
                        completionInterval,
                        completionTimescale
                    }}
                />
            })
        })
    )

    return (
        <li className={`${base}`}>
            <span>
                {habitData.habitName}
            </span>
            {habitEntries}
        </li>
    )
}

export default CompactHabit