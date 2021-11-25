import { Fragment } from "react";
import CompletionInstance from "components/HabitInstance/CompletionInstance";
import "./DailyEntry.scss";
import { CompletionInstanceProps } from "types/CompletionInstance";

const DailyEntry = ({
    completionEntries,
}: {
    completionEntries: CompletionInstanceProps[][];
}) => {
    const base = "DailyEntry";

    return (
        <ul className={`${base}`}>
            {completionEntries.map((entry, idx) => {
                const startDate = entry[0].startDate || entry[0].created;
                const startDateValue = new Date(startDate).valueOf();

                return new Date(entry[0].habitEntryDate).valueOf() >= startDateValue ? (
                    <CompletionInstance key={idx} entry={entry} />
                ) : (
                    <Fragment key={idx}></Fragment>
                );
            })}
        </ul>
    );
};

export default DailyEntry;
