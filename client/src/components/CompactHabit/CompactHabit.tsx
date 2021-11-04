import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';
import HabitEntry from "components/HabitEntry/HabitEntry";
import { asTimes } from "helpers/time/asDates";

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
        completionInterval,
        habitId
    } = habitData;

    const partitionsAsTimes = partitions.map(asTimes);
    const entriesPerDay = completionTimescale === 'day' ? completionFrequency : 1;

    // @todo: turn this into a function
    const habitEntries = partitionsAsTimes.map(partition =>
        partition.map(timestamp => {
            const existingEntry = completionData.filter(d =>
                new Date(d.habitEntryDate).getTime() === timestamp
            );

            return [...Array(entriesPerDay).keys()].map(entryIndex => {
                const existingEntryAtIndex = existingEntry.filter(entry => entry.entryIndex === entryIndex)[0];
                const completed = existingEntryAtIndex?.completed || false;
                const rangeValue = existingEntryAtIndex?.rangeValue || 0;

                return {
                    _key: `${timestamp}-${entryIndex}`,
                    habitEntryDate: new Date(timestamp),
                    habitId,
                    completed,
                    rangeValue,
                    completionType,
                    completionInterval,
                    entryIndex
                }
            })
        })
    );

    return (
        <li className={`${base}`}>
            <span className={`${base}__name`}>
                {habitData.habitName}
            </span>
            <ul className={`${base}__list`}>
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