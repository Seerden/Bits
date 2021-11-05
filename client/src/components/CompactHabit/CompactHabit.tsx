import { Habit } from "../../../../shared/types/Habit";
import { Completion } from "../../../../shared/types/Completion";
import './CompactHabit.scss';
import HabitEntry from "components/HabitEntry/HabitEntry";
import { asTimes } from "helpers/time/asDates";
import { useState } from "react";
import { usePutHabit } from "helpers/api/mutateHabits";

type CompactHabitProps = {
    habitData: Habit,
    completionData: Completion[],
    partitions: Date[][]
}

const CompactHabit = ({ habitData, completionData, partitions }: CompactHabitProps) => {
    const base = "CompactHabit";
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [habitName, setHabitName] = useState<string>(habitData.habitName);
    const { mutate } = usePutHabit();

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
                const completionId = existingEntryAtIndex?.completionId

                return {
                    _key: `${timestamp}-${entryIndex}`,
                    habitEntryDate: new Date(timestamp),
                    habitId,
                    completed,
                    rangeValue,
                    completionType,
                    completionInterval,
                    entryIndex,
                    completionId
                }
            })
        })
    );

    function handleBlur(e) {
        const newName = e.target.value;
        setHabitName(newName);

        mutate({
            field: 'habitName',
            habitToUpdate: {
                habitName: newName,
                habitId
            }
        });

        setIsEditing(cur => !cur);
    };

    return (
        <li className={`${base}`}>
            <span>
                { !isEditing
                    ?   <span 
                        className={`${base}__name`}
                        onClick={() => setIsEditing(cur => !cur)}
                    >
                            {habitName}
                        </span>
                    :   <input 
                            className={`${base}__name--input`}
                            type='text' 
                            defaultValue={habitName}
                            onBlur={handleBlur}
                        />
                    
                
                }
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