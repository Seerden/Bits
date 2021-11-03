import CompletionInstance from "components/HabitInstance/CompletionInstance";
import { EntryProps } from "types/HabitEntry";

const DailyEntry = ({ completionEntries }: EntryProps) => {
    const base = "DailyEntry";
    
    return (
        <ul className={`${base}`}>
            {
                completionEntries.map((entry, idx) => <CompletionInstance key={idx} entry={entry} />)
            }
        </ul>
    )
}

export default DailyEntry