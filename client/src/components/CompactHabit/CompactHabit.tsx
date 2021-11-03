import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';
import HabitEntry from "components/HabitEntry/HabitEntry";

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
                    : [false, 0];

                return {
                    // @todo: modify key to include habit-specific property,
                    // so that entries for different habits don't end up with same key accidentally
                    _key: `${timestamp}-${entryIndex}`,
                    habitEntryDate: new Date(timestamp),
                    completed,
                    rangeValue,
                    completionType,
                    completionFrequency,
                    completionInterval,
                    completionTimescale
                }
            })
        })
    );

    return (
        <li className={`${base}`}>
            <span className={`${base}__name`}>
                {habitData.habitName}
            </span>
            <ul>
                {
                    habitEntries.map((partition, idx) =>
                        <HabitEntry
                            key={idx}
                            completionEntries={partition}
                        />
                    )
                }
            </ul>
        </li>
    )
}

export default CompactHabit