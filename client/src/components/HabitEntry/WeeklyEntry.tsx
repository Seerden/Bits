import { CompletionInstanceProps } from "types/CompletionInstance";

const WeeklyEntry = ({
    completionEntries,
}: {
    completionEntries: CompletionInstanceProps[][];
}) => {
    const size = 10;
    const entriesPerDay = completionEntries[0].length;

    return (
        <svg width={8 * size} height={entriesPerDay * size}>
            {completionEntries.map((dailyEntry, index) =>
                dailyEntry.map((instance, entryIndex) => (
                    <circle
                        key={entryIndex}
                        r={size / 2}
                        width={size}
                        height={size}
                        cx={(index + 1) * size}
                        cy={entryIndex * size + size / 2}
                        fill={instance.completed ? "seagreen" : "#333"}
                    />
                ))
            )}
        </svg>
    );
};

export default WeeklyEntry;
