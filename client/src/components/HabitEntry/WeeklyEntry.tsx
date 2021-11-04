import { EntryProps } from "types/HabitEntry";
import './WeeklyEntry.scss';

const WeeklyEntry = ({ completionEntries }: EntryProps) => {
    const base = "WeeklyEntry";
    const size = 12;
    const entriesPerDay = completionEntries[0].length;

    return (
        <svg
            className={`${base}`}
            width={8*(size)}
            height={entriesPerDay*size}
        >
            {completionEntries.map((dailyEntry, index) =>
                dailyEntry.map((instance, entryIndex) =>
                    <circle
                        key={entryIndex}
                        r={size/2}
                        width={size}
                        height={size}
                        cx={(index+1)*size}
                        cy={entryIndex*size + size/2}
                        fill={instance.completed ? 'seagreen' : '#333'}
                    />
                )
            )}
        </svg>
    )
};

export default WeeklyEntry